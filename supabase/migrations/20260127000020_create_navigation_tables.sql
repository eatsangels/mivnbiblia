-- Create navigation_menus table
CREATE TABLE IF NOT EXISTS public.navigation_menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create navigation_items table
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_id UUID REFERENCES public.navigation_menus(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    icon_name TEXT,
    order_index INTEGER DEFAULT 0,
    is_external BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Toggle RLS
ALTER TABLE public.navigation_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read navigation menus" ON public.navigation_menus FOR SELECT USING (true);
CREATE POLICY "Anyone can read navigation items" ON public.navigation_items FOR SELECT USING (true);

CREATE POLICY "Admins can manage navigation menus" ON public.navigation_menus ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'super_admin')
    )
);

CREATE POLICY "Admins can manage navigation items" ON public.navigation_items ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'super_admin')
    )
);
