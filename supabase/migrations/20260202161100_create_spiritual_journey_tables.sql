-- Create spiritual_journey_steps table
CREATE TABLE IF NOT EXISTS public.spiritual_journey_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_spiritual_journey table
CREATE TABLE IF NOT EXISTS public.user_spiritual_journey (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    step_id UUID NOT NULL REFERENCES public.spiritual_journey_steps(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, step_id)
);

-- Enable RLS
ALTER TABLE public.spiritual_journey_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_spiritual_journey ENABLE ROW LEVEL SECURITY;

-- Policies for spiritual_journey_steps
CREATE POLICY "Anyone can read journey steps"
ON public.spiritual_journey_steps
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage journey steps"
ON public.spiritual_journey_steps
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

-- Policies for user_spiritual_journey
CREATE POLICY "Users can view their own journey"
ON public.user_spiritual_journey
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own journey"
ON public.user_spiritual_journey
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Leaders can view all journeys"
ON public.user_spiritual_journey
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin', 'leader')
    )
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_spiritual_journey_steps_order ON public.spiritual_journey_steps(order_index);
CREATE INDEX IF NOT EXISTS idx_user_spiritual_journey_user ON public.user_spiritual_journey(user_id);
CREATE INDEX IF NOT EXISTS idx_user_spiritual_journey_step ON public.user_spiritual_journey(step_id);
CREATE INDEX IF NOT EXISTS idx_user_spiritual_journey_completed ON public.user_spiritual_journey(completed_at);

-- Seed initial steps
INSERT INTO public.spiritual_journey_steps (name, description, order_index) VALUES
('Primera Visita', 'Primera vez en la iglesia', 1),
('Consolidación', 'Proceso de consolidación', 2),
('Bautismo', 'Bautismo en agua', 3),
('Discipulado', 'Programa de discipulado', 4),
('Líder en Formación', 'Formación de liderazgo', 5),
('Líder Activo', 'Liderando un ministerio o grupo', 6)
ON CONFLICT DO NOTHING;
