-- Alter ministries table to add leader_id if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ministries' AND column_name = 'leader_id') THEN
        ALTER TABLE ministries ADD COLUMN leader_id UUID REFERENCES profiles(id);
    END IF;
END $$;

-- Create user_ministries table (many-to-many)
CREATE TABLE IF NOT EXISTS user_ministries (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    ministry_id UUID REFERENCES ministries(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT now(),
    role TEXT DEFAULT 'member', -- member, leader, volunteer
    PRIMARY KEY (user_id, ministry_id)
);

-- Create spiritual_journey_steps table (milestone definitions)
CREATE TABLE IF NOT EXISTS spiritual_journey_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE, -- e.g., 'First Visit', 'Second Visit', 'Baptism'
    description TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_spiritual_journey table (user progress)
CREATE TABLE IF NOT EXISTS user_spiritual_journey (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    step_id UUID REFERENCES spiritual_journey_steps(id),
    completed_at TIMESTAMPTZ DEFAULT now(),
    notes TEXT,
    UNIQUE(user_id, step_id)
);

-- Create group_attendance table for tracking weekly stats
CREATE TABLE IF NOT EXISTS group_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES small_groups(id) ON DELETE CASCADE,
    meeting_date DATE NOT NULL,
    members_present_count INTEGER DEFAULT 0,
    new_guests_count INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(group_id, meeting_date)
);

-- Create aggregate_metrics table for historical snapshots
CREATE TABLE IF NOT EXISTS analytics_daily_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    metric_type TEXT NOT NULL, -- 'total_members', 'total_attendance', 'new_converts'
    value NUMERIC NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE spiritual_journey_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_spiritual_journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_daily_metrics ENABLE ROW LEVEL SECURITY;
-- ministries already has RLS likely if it existed

-- Policies
CREATE POLICY "Allow read access to anyone" ON user_ministries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow read access to anyone" ON spiritual_journey_steps;
CREATE POLICY "Allow read access to anyone" ON spiritual_journey_steps FOR SELECT USING (true);
CREATE POLICY "Allow read access to anyone" ON group_attendance FOR SELECT USING (true);
CREATE POLICY "Allow read access to anyone" ON analytics_daily_metrics FOR SELECT USING (true);

-- Insert default spiritual journey steps
INSERT INTO spiritual_journey_steps (name, order_index) VALUES
('Primera Visita', 1),
('Segunda Visita', 2),
('Consolidación', 3),
('Bautismo', 4),
('Líder Activo', 5)
ON CONFLICT (name) DO NOTHING;

-- Insert default ministries safely
INSERT INTO ministries (name, slug, description)
SELECT 'Jóvenes', 'jovenes', 'Ministerio de jóvenes'
WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE slug = 'jovenes');

INSERT INTO ministries (name, slug, description)
SELECT 'Alabanza', 'alabanza', 'Equipo de adoración'
WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE slug = 'alabanza');

INSERT INTO ministries (name, slug, description)
SELECT 'Niños', 'ninos', 'Escuela dominical'
WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE slug = 'ninos');

INSERT INTO ministries (name, slug, description)
SELECT 'Misiones', 'misiones', 'Evangelismo y misiones'
WHERE NOT EXISTS (SELECT 1 FROM ministries WHERE slug = 'misiones');
