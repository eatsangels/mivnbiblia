-- Function to reset reading progress for a user
CREATE OR REPLACE FUNCTION reset_reading_progress()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete reading history for the user
  DELETE FROM reading_history
  WHERE user_id = auth.uid();

  -- Reset progress record or delete it
  -- Option 1: Delete progress record (it will be recreated on next track_reading)
  DELETE FROM user_progress
  WHERE user_id = auth.uid();
  
  -- Option 2: Update progress record (alternative if we want to keep some historic non-aggregate data if any)
  /*
  UPDATE user_progress SET
    last_book = NULL,
    last_chapter = NULL,
    last_read_at = NULL,
    current_streak = 0,
    total_chapters_read = 0
  WHERE user_id = auth.uid();
  */
END;
$$;
