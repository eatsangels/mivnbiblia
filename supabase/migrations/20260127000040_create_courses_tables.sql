-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    thumbnail TEXT,
    instructor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    duration TEXT,
    level TEXT,
    is_published BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    total_lessons INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create course_lessons table
CREATE TABLE IF NOT EXISTS course_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    video_url TEXT,
    "order" INTEGER NOT NULL,
    duration TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create course_enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    progress INTEGER DEFAULT 0,
    progress_percentage INTEGER DEFAULT 0,
    UNIQUE(user_id, course_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_course_lessons_course ON course_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_course_lessons_order ON course_lessons(course_id, "order");
CREATE INDEX IF NOT EXISTS idx_course_enrollments_user ON course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course ON course_enrollments(course_id);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses
DROP POLICY IF EXISTS "Courses are viewable by everyone" ON courses;
CREATE POLICY "Courses are viewable by everyone"
    ON courses FOR SELECT
    USING (is_published = true OR auth.uid() = instructor_id);

DROP POLICY IF EXISTS "Instructors can insert their own courses" ON courses;
CREATE POLICY "Instructors can insert their own courses"
    ON courses FOR INSERT
    WITH CHECK (auth.uid() = instructor_id);

DROP POLICY IF EXISTS "Instructors can update their own courses" ON courses;
CREATE POLICY "Instructors can update their own courses"
    ON courses FOR UPDATE
    USING (auth.uid() = instructor_id);

DROP POLICY IF EXISTS "Instructors can delete their own courses" ON courses;
CREATE POLICY "Instructors can delete their own courses"
    ON courses FOR DELETE
    USING (auth.uid() = instructor_id);

-- RLS Policies for course_lessons
DROP POLICY IF EXISTS "Lessons are viewable by enrolled users" ON course_lessons;
CREATE POLICY "Lessons are viewable by enrolled users"
    ON course_lessons FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM courses
            WHERE courses.id = course_lessons.course_id
            AND (courses.is_published = true OR courses.instructor_id = auth.uid())
        )
    );

DROP POLICY IF EXISTS "Instructors can manage lessons" ON course_lessons;
CREATE POLICY "Instructors can manage lessons"
    ON course_lessons FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM courses
            WHERE courses.id = course_lessons.course_id
            AND courses.instructor_id = auth.uid()
        )
    );

-- RLS Policies for course_enrollments
DROP POLICY IF EXISTS "Users can view their own enrollments" ON course_enrollments;
CREATE POLICY "Users can view their own enrollments"
    ON course_enrollments FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can enroll in courses" ON course_enrollments;
CREATE POLICY "Users can enroll in courses"
    ON course_enrollments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own enrollment progress" ON course_enrollments;
CREATE POLICY "Users can update their own enrollment progress"
    ON course_enrollments FOR UPDATE
    USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_course_lessons_updated_at ON course_lessons;
CREATE TRIGGER update_course_lessons_updated_at
    BEFORE UPDATE ON course_lessons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
