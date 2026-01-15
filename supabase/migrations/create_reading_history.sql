-- Create reading_history table
CREATE TABLE IF NOT EXISTS reading_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  book_name text NOT NULL,
  chapter integer NOT NULL,
  read_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, book_name, chapter) -- Prevent duplicate entries for the same chapter (or maybe just track last read time?)
  -- Actually for history we might want multiple reads? 
  -- "Capítulos Leídos" usually implies unique chapters. Let's stick to unique for now to keep count accurate.
);

-- Enable RLS
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert their own history" 
ON reading_history FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own history" 
ON reading_history FOR SELECT 
USING (auth.uid() = user_id);

-- Optional: Drop the unique constraint if we want to log every time (e.g. re-reading).
-- But for "Total Chapters Read" count, unique is better or we do count(distinct).
-- Let's allow multiple reads but we'll count distinct in the query.
ALTER TABLE reading_history DROP CONSTRAINT IF EXISTS reading_history_user_id_book_name_chapter_key;
