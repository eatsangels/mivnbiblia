-- Create service_settings table
CREATE TABLE IF NOT EXISTS public.service_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    next_service_title TEXT,
    next_service_preacher TEXT,
    next_service_date TIMESTAMP WITH TIME ZONE,
    next_service_location TEXT,
    next_service_series TEXT,
    next_service_description TEXT,
    offline_message TEXT,
    offline_subtitle TEXT,
    google_maps_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create weekly_activities table
CREATE TABLE IF NOT EXISTS public.weekly_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    day_of_week TEXT NOT NULL,
    title TEXT NOT NULL,
    time TEXT,
    description TEXT,
    category TEXT DEFAULT 'general',
    icon_name TEXT DEFAULT 'Star',
    color TEXT DEFAULT '#4AA3DF',
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create app_roles table
CREATE TABLE IF NOT EXISTS public.app_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create role_permissions table
CREATE TABLE IF NOT EXISTS public.role_permissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role_id UUID REFERENCES public.app_roles(id) ON DELETE CASCADE,
    module TEXT NOT NULL,
    can_view BOOLEAN DEFAULT false,
    can_create BOOLEAN DEFAULT false,
    can_edit BOOLEAN DEFAULT false,
    can_delete BOOLEAN DEFAULT false,
    can_export BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(role_id, module)
);

-- Enable RLS
ALTER TABLE public.service_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Service Settings
CREATE POLICY "Allow public read access" ON public.service_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow full access for admins" ON public.service_settings FOR ALL TO authenticated USING (is_admin(auth.uid()::text));

-- Weekly Activities
CREATE POLICY "Allow public read access" ON public.weekly_activities FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Allow full access for admins" ON public.weekly_activities FOR ALL TO authenticated USING (is_admin(auth.uid()::text));

-- App Roles
CREATE POLICY "Allow read access for authenticated" ON public.app_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow full access for admins" ON public.app_roles FOR ALL TO authenticated USING (is_admin(auth.uid()::text));

-- Role Permissions
CREATE POLICY "Allow read access for authenticated" ON public.role_permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow full access for admins" ON public.role_permissions FOR ALL TO authenticated USING (is_admin(auth.uid()::text));

-- Insert default roles if not exist
INSERT INTO public.app_roles (slug, name, description)
VALUES 
    ('admin', 'Administrador', 'Acceso total al sistema'),
    ('editor', 'Editor', 'Acceso a edición de contenido'),
    ('member', 'Miembro', 'Acceso básico')
ON CONFLICT (slug) DO NOTHING;

-- Insert initial service setting record if not exist
INSERT INTO public.service_settings (next_service_title)
SELECT 'Próximo Servicio'
WHERE NOT EXISTS (SELECT 1 FROM public.service_settings);
