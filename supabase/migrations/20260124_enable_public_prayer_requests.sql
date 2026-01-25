-- Enable RLS on prayer_requests if not already enabled
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous users) to insert prayer requests
CREATE POLICY "Allow public insert on prayer_requests"
ON prayer_requests
FOR INSERT
TO public
WITH CHECK (true);

-- Allow everyone to read approved requests (already likely exists or covered by previous logic, but good to be explicit)
CREATE POLICY "Allow public read approved requests"
ON prayer_requests
FOR SELECT
TO public
USING (is_approved = true);
