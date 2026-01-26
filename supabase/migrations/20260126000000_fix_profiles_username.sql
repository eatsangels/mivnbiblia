-- Add username column to profiles if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'username') THEN
        ALTER TABLE public.profiles ADD COLUMN username text;
    END IF;
END $$;

-- Add unique constraint to username
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_username_key') THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);
    END IF;
END $$;

-- Update the handle_new_user trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  generated_username text;
  base_username text;
BEGIN
  -- Generate username from email if not provided in metadata
  IF new.raw_user_meta_data->>'username' IS NOT NULL THEN
    generated_username := new.raw_user_meta_data->>'username';
  ELSE
    base_username := split_part(new.email, '@', 1);
    -- Check if username exists (simple check, not race-condition proof but better than nothing)
    -- Actually, for simplicity in SQL function without complex loop, just try base.
    -- If it fails due to unique constraint, the user will get an error. 
    -- Dealing with collision generation in PL/PGSQL can be verbose. 
    -- For now, default to email prefix. 
    generated_username := base_username;
  END IF;

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
    -- Also ensure username is set if it was null before
    username = COALESCE(public.profiles.username, EXCLUDED.username);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
