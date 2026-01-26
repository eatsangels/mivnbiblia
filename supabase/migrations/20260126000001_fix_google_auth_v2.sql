-- Comprehensive fix for profiles table and trigger
-- 1. Ensure columns exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'username') THEN
        ALTER TABLE public.profiles ADD COLUMN username text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'email') THEN
        ALTER TABLE public.profiles ADD COLUMN email text;
    END IF;
END $$;

-- 2. Ensure unique constraint on username
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_username_key') THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);
    END IF;
END $$;

-- 3. Drop existing trigger and function to start fresh
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 4. Recreate function with robust collision handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  generated_username text;
  base_username text;
BEGIN
  -- Determine base username
  IF new.raw_user_meta_data->>'username' IS NOT NULL THEN
    base_username := new.raw_user_meta_data->>'username';
  ELSE
    base_username := split_part(new.email, '@', 1);
  END IF;

  -- Append random suffix to ensure uniqueness and avoid 'duplicate key value' errors
  -- using a timestamp part + random chars
  generated_username := base_username || '_' || substring(md5(random()::text) from 1 for 4);

  INSERT INTO public.profiles (id, full_name, username, avatar_url, role, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    generated_username,
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'role', 'member'),
    new.email
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    email = EXCLUDED.email,
    -- Keep existing username if record exists, otherwise update
    username = COALESCE(public.profiles.username, EXCLUDED.username);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
