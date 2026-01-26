-- COMPREHENSIVE FIX FOR REGISTRATION ERRORS
-- Run this ENTIRE script in the Supabase SQL Editor

-- 1. Ensure 'profiles' table has all necessary columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'member';

-- 2. Populate 'app_roles' foundantion data (Crucial for Foreign Key)
INSERT INTO public.app_roles (name, slug, description, is_system)
VALUES 
  ('Miembro', 'member', 'Usuario regular de la comunidad', true),
  ('Administrador', 'admin', 'Acceso total al sistema', true),
  ('Editor', 'editor', 'Puede gestionar contenido', true),
  ('Líder', 'leader', 'Líder de ministerio o grupo', false)
ON CONFLICT (slug) DO NOTHING;

-- 3. Replace the Trigger Function with a Robust Version
--    (Includes email and handles role defaulting safely)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username, email, avatar_url, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'username',
    new.email, -- Insert the email directly from the auth user
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'role', 'member')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Re-attach the trigger (Just to be safe)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Grant Permissions
GRANT ALL ON public.profiles TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.app_roles TO authenticated, anon, service_role;
