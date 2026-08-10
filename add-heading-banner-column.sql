-- Migration: Add heading_banner_url column to brands table
-- This column stores the URL for brand heading banners displayed above brand stories on the brands page
-- Recommended dimensions: 1184px × 200px

-- Add the column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brands' AND column_name = 'heading_banner_url'
  ) THEN
    ALTER TABLE brands ADD COLUMN heading_banner_url TEXT;
    RAISE NOTICE 'Column heading_banner_url added to brands table';
  ELSE
    RAISE NOTICE 'Column heading_banner_url already exists in brands table';
  END IF;
END $$;

-- Optional: Add a comment to document the column
COMMENT ON COLUMN brands.heading_banner_url IS 'URL for brand heading banner displayed above brand story on brands page. Recommended dimensions: 1184px × 200px';

