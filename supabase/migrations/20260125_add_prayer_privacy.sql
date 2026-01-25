-- Add is_private column to prayer_requests
ALTER TABLE prayer_requests 
ADD COLUMN is_private BOOLEAN DEFAULT false;

-- Update existing records to match default
UPDATE prayer_requests SET is_private = false WHERE is_private IS NULL;
