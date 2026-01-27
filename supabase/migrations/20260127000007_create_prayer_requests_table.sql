-- Create prayer_requests table
CREATE TABLE IF NOT EXISTS public.prayer_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    requester_name TEXT NOT NULL,
    email TEXT,
    request TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT false,
    is_private BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    is_answered BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read approved requests" ON public.prayer_requests FOR SELECT TO anon, authenticated USING (is_approved = true AND is_private = false);
CREATE POLICY "Allow users to see their private requests" ON public.prayer_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow public create requests" ON public.prayer_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow full access for admins" ON public.prayer_requests FOR ALL TO authenticated USING (is_admin(auth.uid()::text));
