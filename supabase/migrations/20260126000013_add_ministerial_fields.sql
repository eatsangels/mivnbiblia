-- Add ministerial fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS small_group TEXT,
ADD COLUMN IF NOT EXISTS ministry TEXT,
ADD COLUMN IF NOT EXISTS baptism_date DATE;

-- Update RLS to allow users to update these fields (existing policy should cover it, but good to ensure)
-- No extra policy needed if "Users can update own profile" is already broad.
