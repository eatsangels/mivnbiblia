-- Create youtube_videos table for caching
CREATE TABLE IF NOT EXISTS public.youtube_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    published_at TIMESTAMPTZ NOT NULL,
    duration TEXT,
    is_live BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.youtube_videos ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read videos
CREATE POLICY "Anyone can view youtube videos"
    ON public.youtube_videos FOR SELECT
    USING (true);

-- Policy: Only admins can manage videos
CREATE POLICY "Admins can manage youtube videos"
    ON public.youtube_videos FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
        )
    );

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_youtube_videos_published_at ON public.youtube_videos(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_is_live ON public.youtube_videos(is_live);
