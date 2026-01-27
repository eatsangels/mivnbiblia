-- Create user_notes table
CREATE TABLE IF NOT EXISTS public.user_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    book_name TEXT NOT NULL,
    chapter INTEGER NOT NULL,
    verse_number INTEGER NOT NULL DEFAULT 1,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_highlights table
CREATE TABLE IF NOT EXISTS public.user_highlights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    book_name TEXT NOT NULL,
    chapter INTEGER NOT NULL,
    verse_number INTEGER NOT NULL,
    color TEXT DEFAULT 'yellow',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_bookmarks table
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    book_name TEXT NOT NULL,
    chapter INTEGER NOT NULL,
    verse_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create commentaries table
CREATE TABLE IF NOT EXISTS public.commentaries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    book_name TEXT NOT NULL,
    chapter INTEGER NOT NULL,
    verse_number INTEGER NOT NULL DEFAULT 1,
    type TEXT NOT NULL, -- 'history', 'tradition', etc.
    content TEXT NOT NULL,
    author TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commentaries ENABLE ROW LEVEL SECURITY;

-- Policies for user_notes
CREATE POLICY "Users can create their own notes" ON public.user_notes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own notes" ON public.user_notes FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notes" ON public.user_notes FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own notes" ON public.user_notes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Policies for user_highlights
CREATE POLICY "Users can create their own highlights" ON public.user_highlights FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own highlights" ON public.user_highlights FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own highlights" ON public.user_highlights FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Policies for user_bookmarks
CREATE POLICY "Users can create their own bookmarks" ON public.user_bookmarks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own bookmarks" ON public.user_bookmarks FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own bookmarks" ON public.user_bookmarks FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Policies for commentaries
CREATE POLICY "Allow read access for authenticated users to commentaries" ON public.commentaries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow full access for admins to commentaries" ON public.commentaries FOR ALL TO authenticated USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND (role = 'admin' OR role = 'super_admin')
    )
);
