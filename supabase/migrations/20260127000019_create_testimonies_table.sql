-- Create testimonies table
CREATE TABLE IF NOT EXISTS public.testimonies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    content TEXT NOT NULL,
    category TEXT,
    is_approved BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Toggle RLS
ALTER TABLE public.testimonies ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read approved testimonies" ON public.testimonies FOR SELECT USING (is_approved = true);
CREATE POLICY "Authenticated users can submit testimonies" ON public.testimonies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all testimonies" ON public.testimonies ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'super_admin')
    )
);
