-- Add last_accessed_at to course_enrollments to track recent activity
ALTER TABLE public.course_enrollments 
ADD COLUMN IF NOT EXISTS last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT now();
