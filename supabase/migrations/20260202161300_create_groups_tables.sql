-- Create small_groups table
CREATE TABLE IF NOT EXISTS public.small_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    leader_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    category TEXT,
    meeting_day TEXT,
    meeting_time TIME,
    location TEXT,
    members_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create group_attendance table
CREATE TABLE IF NOT EXISTS public.group_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES public.small_groups(id) ON DELETE CASCADE,
    meeting_date DATE NOT NULL,
    members_present_count INTEGER DEFAULT 0,
    new_guests_count INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, meeting_date)
);

-- Enable RLS
ALTER TABLE public.small_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_attendance ENABLE ROW LEVEL SECURITY;

-- Policies for small_groups
CREATE POLICY "Anyone can read active groups"
ON public.small_groups
FOR SELECT
USING (is_active = TRUE OR auth.role() = 'authenticated');

CREATE POLICY "Leaders can manage groups"
ON public.small_groups
FOR ALL
TO authenticated
USING (
    auth.uid() = leader_id OR
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

-- Policies for group_attendance
CREATE POLICY "Members can view group attendance"
ON public.group_attendance
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Leaders can manage attendance"
ON public.group_attendance
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.small_groups
        WHERE small_groups.id = group_id
        AND small_groups.leader_id = auth.uid()
    ) OR
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin', 'leader')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.small_groups
        WHERE small_groups.id = group_id
        AND small_groups.leader_id = auth.uid()
    ) OR
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin', 'leader')
    )
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_small_groups_leader ON public.small_groups(leader_id);
CREATE INDEX IF NOT EXISTS idx_small_groups_active ON public.small_groups(is_active);
CREATE INDEX IF NOT EXISTS idx_group_attendance_group ON public.group_attendance(group_id);
CREATE INDEX IF NOT EXISTS idx_group_attendance_date ON public.group_attendance(meeting_date DESC);

-- Create updated_at trigger for small_groups
CREATE TRIGGER small_groups_updated_at
BEFORE UPDATE ON public.small_groups
FOR EACH ROW
EXECUTE FUNCTION update_inbox_messages_updated_at(); -- Reuse existing function
