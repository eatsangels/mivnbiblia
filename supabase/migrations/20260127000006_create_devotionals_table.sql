-- Create devotionals table
CREATE TABLE IF NOT EXISTS public.devotionals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.devotionals ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON public.devotionals FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow full access for admins" ON public.devotionals FOR ALL TO authenticated USING (is_admin(auth.uid()::text));
