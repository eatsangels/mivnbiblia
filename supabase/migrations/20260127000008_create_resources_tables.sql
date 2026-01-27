-- Create resource_categories table
CREATE TABLE IF NOT EXISTS public.resource_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category_id UUID REFERENCES public.resource_categories(id),
    file_url TEXT,
    external_url TEXT,
    thumbnail TEXT,
    file_type TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Policies for resource_categories
CREATE POLICY "Allow public read categories" ON public.resource_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow full access for admins on categories" ON public.resource_categories FOR ALL TO authenticated USING (is_admin(auth.uid()::text));

-- Policies for resources
CREATE POLICY "Allow public read published resources" ON public.resources FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Allow full access for admins on resources" ON public.resources FOR ALL TO authenticated USING (is_admin(auth.uid()::text));
