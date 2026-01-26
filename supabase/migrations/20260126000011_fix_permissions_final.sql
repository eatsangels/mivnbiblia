-- FIX PERMISSIONS (RLS)
-- This script gives users permission to create and view their own profile.
-- Run this in the Supabase SQL Editor.

-- 1. Reset RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Drop old policies to ensure clean slate
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- 3. Create correct policies

-- ALLOW INSERT: Critical for the "Self-Healing" to work
CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK ( auth.uid() = id );

-- ALLOW SELECT: Critical to see the profile after creating it
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING ( auth.uid() = id );

-- ALLOW UPDATE: Critical for editing profile settings
CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING ( auth.uid() = id );

-- 4. Grant basic access
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
