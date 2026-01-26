-- FORCE CLEANUP SCRIPT
-- This deletes the profile first, then the user, ensuring no constraint errors.

-- 1. Delete from profiles (Child table)
DELETE FROM public.profiles 
WHERE email LIKE '%@%'; -- CAREFUL: Deletes ALL profiles with an email address. 
-- Ideally the user replaces '%@%' with their specific email, e.g. 'juan@gmail.com'

-- 2. Delete from auth.users (Parent table)
DELETE FROM auth.users 
WHERE email LIKE '%@%';

-- 3. Also clean up any potential orphans in other tables just in case
DELETE FROM public.event_registrations WHERE email LIKE '%@%';
DELETE FROM public.prayer_requests WHERE email LIKE '%@%';

-- 4. Check that they are gone
SELECT id, email FROM auth.users WHERE email LIKE '%@%';
