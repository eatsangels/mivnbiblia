-- Create bulletins table
CREATE TABLE IF NOT EXISTS public.bulletins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    publish_date TIMESTAMP WITH TIME ZONE,
    pdf_url TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.bulletins ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON public.bulletins FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Allow full access for admins" ON public.bulletins FOR ALL TO authenticated USING (is_admin(auth.uid()::text));
