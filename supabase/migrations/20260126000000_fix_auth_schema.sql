-- 1. Fix Missing 'username' column in profiles
-- This is likely the primary cause of the 500 Error
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'username') THEN 
        ALTER TABLE public.profiles ADD COLUMN username TEXT UNIQUE; 
    END IF; 
END $$;

-- 2. Ensure Roles Exist (Foreign Key Fix)
-- If the trigger sets role='member' but 'member' doesn't exist in app_roles, the insert fails.
INSERT INTO public.app_roles (name, slug, description, is_system)
VALUES 
    ('Miembro', 'member', 'Usuario regular de la comunidad', true),
    ('Administrador', 'admin', 'Acceso total al sistema', true),
    ('Editor', 'editor', 'Puede gestionar contenido', true),
    ('Líder', 'leader', 'Líder de ministerio o grupo', false)
ON CONFLICT (slug) DO NOTHING;

-- 3. Create Index for performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- 4. Grant permissions to ensure the trigger can write (just in case)
GRANT ALL ON public.profiles TO postgres, service_role, dashboard_user;
GRANT SELECT ON public.app_roles TO authenticated, anon, service_role;
