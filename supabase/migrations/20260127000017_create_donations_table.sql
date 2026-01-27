-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount DECIMAL NOT NULL,
    currency TEXT DEFAULT 'DOP',
    full_name TEXT,
    email TEXT,
    payment_method TEXT,
    payment_status TEXT DEFAULT 'pending',
    transaction_id TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id),
    campaign_id UUID, -- Optional foreign key if campaigns table exists
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Toggle RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own donations" ON public.donations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all donations" ON public.donations FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'super_admin')
    )
);
