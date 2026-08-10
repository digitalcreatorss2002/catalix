-- Add slider_image_url column to brands table
-- This allows brands to have a separate image for the homepage slider
-- Run this in Supabase SQL Editor

-- Add column with no default value (nullable)
ALTER TABLE brands 
ADD COLUMN IF NOT EXISTS slider_image_url TEXT;

-- Add comment
COMMENT ON COLUMN brands.slider_image_url IS 'Separate image URL for homepage brand slider. Falls back to hero_image_url if not provided.';

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'brands' 
  AND column_name = 'slider_image_url';

