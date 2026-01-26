-- Create pastor_messages table
CREATE TABLE IF NOT EXISTS public.pastor_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    pastor_name TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    image_url TEXT,
    video_url TEXT, -- Optional: link to YouTube/Vimeo
    duration TEXT, -- e.g. "4:12"
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Toggle RLS
ALTER TABLE public.pastor_messages ENABLE ROW LEVEL SECURITY;

-- Policies
-- Everyone can view active messages
CREATE POLICY "Public can view active messages" 
ON public.pastor_messages FOR SELECT 
USING ( true );

-- Only admins/pastors can insert/update/delete
CREATE POLICY "Admins can manage messages" 
ON public.pastor_messages FOR ALL 
TO authenticated 
USING ( 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'super_admin', 'pastor', 'content_editor')
  )
);

-- Seed some initial data so it's not empty
INSERT INTO public.pastor_messages (title, pastor_name, date, image_url, duration, is_active)
VALUES 
('Caminando en Fe en Tiempos de Incertidumbre', 'Pastor David', CURRENT_DATE - 2, 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=600', '4:12', true),
('Reflexión: El poder de la reconciliación', 'Pastor Samuel', CURRENT_DATE - 5, 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=600', '3:45', true);
