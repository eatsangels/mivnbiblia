-- Function to track reading progress transactionally
CREATE OR REPLACE FUNCTION track_reading(
  p_book_name text,
  p_chapter integer
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_last_read_date date;
  v_current_read_date date;
  v_streak integer;
  v_total_chapters integer;
BEGIN
  v_user_id := auth.uid();
  v_current_read_date := CURRENT_DATE;

  -- 1. Insert/Update reading history (ensure unique chapters are tracked)
  -- We use ON CONFLICT to update the timestamp if they read it again
  INSERT INTO reading_history (user_id, book_name, chapter, read_at)
  VALUES (v_user_id, p_book_name, p_chapter, now())
  ON CONFLICT (user_id, book_name, chapter) 
  DO UPDATE SET read_at = now();

  -- 2. Get previous progress state
  SELECT 
    (last_read_at AT TIME ZONE 'UTC')::date, 
    COALESCE(current_streak, 0)
  INTO v_last_read_date, v_streak
  FROM user_progress
  WHERE user_id = v_user_id;

  -- 3. Calculate Streak
  IF v_last_read_date IS NULL THEN
     -- First time reading ever
     v_streak := 1;
  ELSIF v_last_read_date = v_current_read_date THEN
     -- Already read today, maintain streak
     v_streak := v_streak; 
  ELSIF v_last_read_date = (v_current_read_date - 1) THEN
     -- Read yesterday, increment streak
     v_streak := v_streak + 1;
  ELSE
     -- Missed a day or more, reset to 1
     v_streak := 1;
  END IF;

  -- 4. Calculate Total Unique Chapters Read
  SELECT count(*) INTO v_total_chapters 
  FROM reading_history 
  WHERE user_id = v_user_id;

  -- 5. Upsert user_progress
  INSERT INTO user_progress (
    user_id, 
    last_book, 
    last_chapter, 
    last_read_at, 
    current_streak, 
    total_chapters_read
  )
  VALUES (
    v_user_id, 
    p_book_name, 
    p_chapter, 
    now(), 
    v_streak, 
    v_total_chapters
  )
  ON CONFLICT (user_id) DO UPDATE SET
    last_book = EXCLUDED.last_book,
    last_chapter = EXCLUDED.last_chapter,
    last_read_at = EXCLUDED.last_read_at,
    current_streak = EXCLUDED.current_streak,
    total_chapters_read = EXCLUDED.total_chapters_read;

  RETURN json_build_object(
    'success', true,
    'streak', v_streak,
    'total_chapters', v_total_chapters
  );
END;
$$;
