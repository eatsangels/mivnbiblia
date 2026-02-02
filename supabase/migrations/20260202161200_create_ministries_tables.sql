-- Create ministries table
CREATE TABLE IF NOT EXISTS public.ministries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    leader_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_ministries table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.user_ministries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    ministry_id UUID NOT NULL REFERENCES public.ministries(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, ministry_id)
);

-- Enable RLS
ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_ministries ENABLE ROW LEVEL SECURITY;

-- Policies for ministries
CREATE POLICY "Anyone can read ministries"
ON public.ministries
FOR SELECT
USING (is_active = TRUE OR auth.role() = 'authenticated');

CREATE POLICY "Leaders can manage ministries"
ON public.ministries
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin', 'leader')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin', 'leader')
    )
);

-- Policies for user_ministries
CREATE POLICY "Users can view ministry members"
ON public.user_ministries
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can join ministries"
ON public.user_ministries
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Leaders can manage ministry members"
ON public.user_ministries
FOR ALL
TO authenticated
USING (
    auth.uid() = user_id OR
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin', 'leader')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin', 'leader')
    )
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ministries_leader ON public.ministries(leader_id);
CREATE INDEX IF NOT EXISTS idx_ministries_active ON public.ministries(is_active);
CREATE INDEX IF NOT EXISTS idx_user_ministries_user ON public.user_ministries(user_id);
CREATE INDEX IF NOT EXISTS idx_user_ministries_ministry ON public.user_ministries(ministry_id);

-- Create updated_at trigger
CREATE TRIGGER ministries_updated_at
BEFORE UPDATE ON public.ministries
FOR EACH ROW
EXECUTE FUNCTION update_inbox_messages_updated_at(); -- Reuse existing function
