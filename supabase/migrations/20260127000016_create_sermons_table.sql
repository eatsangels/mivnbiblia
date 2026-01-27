-- Create sermons table
CREATE TABLE IF NOT EXISTS public.sermons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    preacher TEXT,
    description TEXT,
    thumbnail_url TEXT,
    video_url TEXT,
    audio_url TEXT,
    category TEXT,
    series TEXT,
    slug TEXT UNIQUE,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Toggle RLS
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view sermons" ON public.sermons FOR SELECT USING (true);
CREATE POLICY "Admins can manage sermons" ON public.sermons FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'super_admin')
    )
);
