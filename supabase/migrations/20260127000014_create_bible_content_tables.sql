-- Create Bible Books table
CREATE TABLE IF NOT EXISTS public.books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    chapters INTEGER NOT NULL,
    testament TEXT,
    display_order INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create Scriptures table
CREATE TABLE IF NOT EXISTS public.scriptures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_name TEXT NOT NULL,
    chapter INTEGER NOT NULL,
    verse_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT scriptures_book_name_fkey FOREIGN KEY (book_name) REFERENCES public.books(name)
);

-- Enable RLS
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scriptures ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to books" ON public.books
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to scriptures" ON public.scriptures
    FOR SELECT USING (true);

-- Admin policies
CREATE POLICY "Allow admin full access to books" ON public.books
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.app_roles r JOIN public.profiles p ON r.id = p.role WHERE p.id = auth.uid() AND r.name = 'admin'));

CREATE POLICY "Allow admin full access to scriptures" ON public.scriptures
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.app_roles r JOIN public.profiles p ON r.id = p.role WHERE p.id = auth.uid() AND r.name = 'admin'));
