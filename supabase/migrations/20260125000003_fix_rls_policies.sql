-- Add is_published column to courses if it doesn't exist
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;

-- Enable RLS for Courses related tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- COURSES POLICIES
-- Drop existing policies to avoid conflicts if re-running
DROP POLICY IF EXISTS "Allow public read access to courses" ON courses;
DROP POLICY IF EXISTS "Allow admin full access to courses" ON courses;

-- Public read access for published courses
CREATE POLICY "Allow public read access to courses"
    ON courses FOR SELECT
    TO public
    USING (is_published = true);

-- Admin full access
CREATE POLICY "Allow admin full access to courses"
    ON courses FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- COURSE LESSONS POLICIES
DROP POLICY IF EXISTS "Allow public read access to course_lessons" ON course_lessons;
DROP POLICY IF EXISTS "Allow admin full access to course_lessons" ON course_lessons;

-- Public read access if course is published
CREATE POLICY "Allow public read access to course_lessons"
    ON course_lessons FOR SELECT
    TO public
    USING (
        EXISTS (
            SELECT 1 FROM courses
            WHERE courses.id = course_lessons.course_id
            AND courses.is_published = true
        )
    );

-- Admin full access
CREATE POLICY "Allow admin full access to course_lessons"
    ON course_lessons FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- COURSE ENROLLMENTS POLICIES
DROP POLICY IF EXISTS "Users can view own enrollments" ON course_enrollments;
DROP POLICY IF EXISTS "Users can enroll themselves" ON course_enrollments;
DROP POLICY IF EXISTS "Allow admin full access to enrollments" ON course_enrollments;

-- Users can see their own enrollments
CREATE POLICY "Users can view own enrollments"
    ON course_enrollments FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Users can enroll themselves
CREATE POLICY "Users can enroll themselves"
    ON course_enrollments FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Admin full access
CREATE POLICY "Allow admin full access to enrollments"
    ON course_enrollments FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- LESSON PROGRESS POLICIES
DROP POLICY IF EXISTS "Users can view own progress" ON lesson_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON lesson_progress;
DROP POLICY IF EXISTS "Allow admin full access to progress" ON lesson_progress;

-- Users can view their own progress
CREATE POLICY "Users can view own progress"
    ON lesson_progress FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Users can update their own progress
CREATE POLICY "Users can update own progress"
    ON lesson_progress FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Admin full access
CREATE POLICY "Allow admin full access to progress"
    ON lesson_progress FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );
