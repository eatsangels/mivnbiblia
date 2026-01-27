-- Enable geocoding for small groups and individual profiles
ALTER TABLE public.small_groups 
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS is_location_public BOOLEAN DEFAULT true;

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS is_location_public BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS address TEXT;

-- Update RLS for small_groups to allow any authenticated user to create a group
DROP POLICY IF EXISTS "Allow authenticated insert to small_groups" ON public.small_groups;
CREATE POLICY "Allow authenticated insert to small_groups"
ON public.small_groups FOR INSERT
TO authenticated
WITH CHECK (true);

-- Update RLS for profiles to allow users to update their own geodata
DROP POLICY IF EXISTS "Users can update own geodata" ON public.profiles;
CREATE POLICY "Users can update own geodata"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow public read of public locations in profiles
DROP POLICY IF EXISTS "Public can view public locations" ON public.profiles;
CREATE POLICY "Public can view public locations"
ON public.profiles FOR SELECT
TO public
USING (is_location_public = true);
