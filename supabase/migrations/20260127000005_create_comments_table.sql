-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_type TEXT NOT NULL,
    content_id TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    author_name TEXT NOT NULL,
    comment TEXT NOT NULL,
    parent_id UUID REFERENCES public.comments(id),
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read approved comments" ON public.comments FOR SELECT TO anon, authenticated USING (is_approved = true);
CREATE POLICY "Allow user read own comments" ON public.comments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow insert for authenticated users" ON public.comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow full access for admins" ON public.comments FOR ALL TO authenticated USING (is_admin(auth.uid()::text));
