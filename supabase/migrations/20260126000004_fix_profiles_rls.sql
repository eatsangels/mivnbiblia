-- FIX RLS POLICIES FOR PROFILES
-- This ensures users can Create, Read, and Update their OWN profile.
-- Run this in Supabase SQL Editor.

-- 1. Enable RLS (if not already)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts/duplicates
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- 3. Create Permissive Policies

-- ALLOW SELECT: Users can see their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING ( auth.uid() = id );

-- ALLOW INSERT: Users can create their own profile (Critical for Self-Healing)
CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK ( auth.uid() = id );

-- ALLOW UPDATE: Users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING ( auth.uid() = id );

-- (Optional) If you want public profiles:
-- CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

-- 4. Grant permissions just in case
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role; -- Service role can do anything
