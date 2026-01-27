-- Create is_admin function if it doesn't exist
CREATE OR REPLACE FUNCTION public.is_admin(user_id text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = user_id::uuid
    AND (role = 'admin' OR role = 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    level TEXT,
    is_active BOOLEAN DEFAULT false,
    total_lessons INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course_lessons table
CREATE TABLE IF NOT EXISTS public.course_lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course_enrollments table
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    progress_percentage INTEGER DEFAULT 0,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access for authenticated users" ON public.courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read access for authenticated users" ON public.course_lessons FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow full access for admins" ON public.courses FOR ALL TO authenticated USING (is_admin(auth.uid()::text));
CREATE POLICY "Allow full access for admins" ON public.course_lessons FOR ALL TO authenticated USING (is_admin(auth.uid()::text));
CREATE POLICY "Allow full access for admins on enrollments" ON public.course_enrollments FOR ALL TO authenticated USING (is_admin(auth.uid()::text));

CREATE POLICY "Allow users to see their own enrollments" ON public.course_enrollments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow users to enroll themselves" ON public.course_enrollments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to update their own progress" ON public.course_enrollments FOR UPDATE TO authenticated USING (auth.uid() = user_id);
