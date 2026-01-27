-- Create prayer_intersessions table
CREATE TABLE IF NOT EXISTS public.prayer_intersessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    prayer_request_id UUID REFERENCES public.prayer_requests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(prayer_request_id, user_id)
);

-- Enable RLS
ALTER TABLE public.prayer_intersessions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read intersessions" ON public.prayer_intersessions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Users can join in prayer" ON public.prayer_intersessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Full access for admins" ON public.prayer_intersessions FOR ALL TO authenticated USING (is_admin(auth.uid()::text));
