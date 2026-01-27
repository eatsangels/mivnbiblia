-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT,
    capacity INTEGER DEFAULT 0,
    speaker TEXT,
    location TEXT,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    event_date TIMESTAMP WITH TIME ZONE,
    description TEXT,
    image_url TEXT,
    image TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON public.events FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Allow full access for admins" ON public.events FOR ALL TO authenticated USING (is_admin(auth.uid()::text));
