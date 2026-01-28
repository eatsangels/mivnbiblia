-- Add user_id column to existing testimonies table
ALTER TABLE public.testimonies 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own testimonies" ON public.testimonies;
DROP POLICY IF EXISTS "Users can update their own pending testimonies" ON public.testimonies;
DROP POLICY IF EXISTS "Users can delete their own pending testimonies" ON public.testimonies;

-- Add policy for users to view their own testimonies (even if not approved)
CREATE POLICY "Users can view their own testimonies" 
ON public.testimonies 
FOR SELECT 
USING (auth.uid() = user_id OR is_approved = true);

-- Add policy for users to update their own pending testimonies
CREATE POLICY "Users can update their own pending testimonies" 
ON public.testimonies 
FOR UPDATE 
USING (auth.uid() = user_id AND is_approved = false);

-- Add policy for users to delete their own pending testimonies
CREATE POLICY "Users can delete their own pending testimonies" 
ON public.testimonies 
FOR DELETE 
USING (auth.uid() = user_id AND is_approved = false);
