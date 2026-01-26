-- CLEANUP SCRIPT V4 (The "Bible App" Edition)
-- Deletes dependent data including Bible interaction features

-- 1. Bible App Features (Highlights, Notes, History)
DELETE FROM public.user_notes
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

DELETE FROM public.user_highlights
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

DELETE FROM public.user_bookmarks
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email NOT IN ('eatsangelsgaming@gmail.com')
);

DELETE FROM public.reading_history
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

-- 3. Engagement Data
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

-- 5. THE USERS
DELETE FROM auth.users 
WHERE email NOT IN ('eatsangelsgaming@gmail.com');

-- 6. Verification
SELECT email FROM auth.users;
