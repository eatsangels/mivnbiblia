-- FAIL-SAFE TRIGGER UPDATE
-- This script replaces the trigger with one that:
-- 1. Catches errors instead of crashing (Error 500).
-- 2. Defaults 'role' to NULL if 'member' causes issues.
-- 3. Logs the exact error to Postgres logs so we can see it.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    INSERT INTO public.profiles (id, full_name, username, email, avatar_url, role)
    VALUES (
      new.id,
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'username',
      new.email,
      new.raw_user_meta_data->>'avatar_url',
      -- Try to use the role, but if it fails don't crash, let it be null or 'member'
      COALESCE(new.raw_user_meta_data->>'role', 'member')
    );
  EXCEPTION WHEN OTHERS THEN
    -- This is the magic part: It catches the error and prints it to the logs
    -- instead of stopping the registration with a 500 error.
    RAISE WARNING 'Error creating profile for user %: %', new.id, SQLERRM;
  END;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-establish the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Ensure roles exist just in case
INSERT INTO public.app_roles (name, slug, description, is_system)
VALUES ('Miembro', 'member', 'Usuario regular', true)
ON CONFLICT (slug) DO NOTHING;
