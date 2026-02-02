-- Create bulletins table
CREATE TABLE IF NOT EXISTS public.bulletins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT,
    pdf_url TEXT,
    publish_date DATE,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.bulletins ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read published bulletins
CREATE POLICY "Anyone can read published bulletins"
ON public.bulletins
FOR SELECT
USING (is_published = TRUE OR auth.role() = 'authenticated');

-- Policy: Only admins can insert/update/delete
CREATE POLICY "Admins can manage bulletins"
ON public.bulletins
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin')
    )
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bulletins_slug ON public.bulletins(slug);
CREATE INDEX IF NOT EXISTS idx_bulletins_publish_date ON public.bulletins(publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_bulletins_is_published ON public.bulletins(is_published);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_bulletins_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bulletins_updated_at
BEFORE UPDATE ON public.bulletins
FOR EACH ROW
EXECUTE FUNCTION update_bulletins_updated_at();
