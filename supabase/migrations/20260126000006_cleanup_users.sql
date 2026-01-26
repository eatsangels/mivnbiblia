-- MASS DELETE USERS EXCEPT ONE
-- DANGER: This will delete ALL users and their related data (profiles, etc)
-- except for the one specified email.

DELETE FROM auth.users 
WHERE email NOT IN ('eatsangelsgaming@gmail.com');

-- Verify who is left
SELECT id, email, created_at FROM auth.users;
