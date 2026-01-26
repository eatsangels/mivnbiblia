-- Create service_settings table for managing service configuration
CREATE TABLE IF NOT EXISTS service_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    next_service_title TEXT NOT NULL DEFAULT 'La Fe que Mueve Montañas',
    next_service_preacher TEXT NOT NULL DEFAULT 'Pastor David Morales',
    next_service_date TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '7 days',
    next_service_location TEXT NOT NULL DEFAULT 'Auditorio Principal, MIVN',
    next_service_image TEXT,
    next_service_series TEXT DEFAULT 'Serie: Fundamentos',
    next_service_description TEXT,
    offline_message TEXT NOT NULL DEFAULT 'No Estamos en Vivo',
    offline_subtitle TEXT NOT NULL DEFAULT 'Próximo servicio: Domingo 10:00 AM',
    google_maps_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create weekly_activities table for managing weekly schedule
CREATE TABLE IF NOT EXISTS weekly_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_of_week TEXT NOT NULL,
    title TEXT NOT NULL,
    time TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'general',
    icon_name TEXT DEFAULT 'Star',
    color TEXT DEFAULT '#4AA3DF',
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default service settings (only if table is empty)
INSERT INTO service_settings (
    next_service_title,
    next_service_preacher,
    next_service_date,
    next_service_location,
    next_service_series,
    next_service_description,
    offline_message,
    offline_subtitle,
    google_maps_url
)
SELECT 
    'La Fe que Mueve Montañas',
    'Pastor David Morales',
    NOW() + INTERVAL '7 days',
    'Auditorio Principal, MIVN',
    'Serie: Fundamentos',
    'Un mensaje poderoso sobre cómo la fe puede transformar nuestras vidas y mover las montañas que enfrentamos.',
    'No Estamos en Vivo',
    'Próximo servicio: Domingo 10:00 AM',
    'https://maps.google.com'
WHERE NOT EXISTS (SELECT 1 FROM service_settings);

-- Insert default weekly activities
INSERT INTO weekly_activities (day_of_week, title, time, description, category, icon_name, color, display_order)
VALUES
    ('Martes', 'Círculo de Oración', '7:00 PM', 'Tiempo de intercesión y comunión', 'prayer', 'Heart', '#f43f5e', 1),
    ('Jueves', 'Estudio Bíblico', '7:30 PM', 'Profundizando en la Palabra de Dios', 'study', 'Star', '#d4af37', 2),
    ('Viernes', 'Noche de Jóvenes', '8:00 PM', 'Encuentro juvenil con alabanza y enseñanza', 'youth', 'Play', '#4AA3DF', 3),
    ('Sábado', 'Vida Nueva Kids', '10:00 AM', 'Ministerio infantil con actividades y enseñanza', 'kids', 'Star', '#10b981', 4)
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE service_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_settings
CREATE POLICY "Allow public read access to service_settings"
    ON service_settings FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow admin write access to service_settings"
    ON service_settings FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- RLS Policies for weekly_activities
CREATE POLICY "Allow public read access to weekly_activities"
    ON weekly_activities FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow admin write access to weekly_activities"
    ON weekly_activities FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_weekly_activities_active ON weekly_activities(is_active);
CREATE INDEX IF NOT EXISTS idx_weekly_activities_order ON weekly_activities(display_order);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_service_settings_updated_at BEFORE UPDATE ON service_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weekly_activities_updated_at BEFORE UPDATE ON weekly_activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
