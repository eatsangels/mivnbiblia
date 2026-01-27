-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can view all subscriptions" ON public.newsletter_subscriptions FOR SELECT TO authenticated USING (is_admin(auth.uid()::text));
CREATE POLICY "Public can subscribe" ON public.newsletter_subscriptions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Users can unsubscribe via email" ON public.newsletter_subscriptions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access" ON public.newsletter_subscriptions FOR ALL TO authenticated USING (is_admin(auth.uid()::text));
