-- COMPREHENSIVE CLEANUP SCRIPT (V2)
-- Deletes dependent data in the correct order to avoid Foreign Key errors.

-- 1. Progress & Gamification (The error you just saw)
DELETE FROM public.user_progress
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

DELETE FROM public.user_milestones
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

DELETE FROM public.user_certificates
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

-- 2. Engagement Data
DELETE FROM public.prayer_requests
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

DELETE FROM public.event_registrations
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

-- 3. Profiles (The main child table)
DELETE FROM public.profiles 
WHERE id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

-- 4. FINALLY: The Users themselves
DELETE FROM auth.users 
WHERE email NOT IN ('eatsangelsgaming@gmail.com');

-- 5. Verification
SELECT email FROM auth.users;
