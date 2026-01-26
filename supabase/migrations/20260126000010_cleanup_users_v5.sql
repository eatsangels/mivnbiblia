-- PROVEN CLEANUP SCRIPT V5
-- Removed hypothetical tables (bookmarks, notes) that were causing errors.

-- 1. Known Bible Features
DELETE FROM public.reading_history
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

DELETE FROM public.user_highlights
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

-- 2. Progress & Gamification
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

-- 3. Engagement
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

-- 4. Profiles
DELETE FROM public.profiles 
WHERE id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

-- 5. Users
DELETE FROM auth.users 
WHERE email NOT IN ('eatsangelsgaming@gmail.com');

-- 6. Check results
SELECT email, created_at FROM auth.users;
