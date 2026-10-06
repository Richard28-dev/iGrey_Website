-- ==============================================================================
-- iGREY HOLDINGS — Database Setup & Schema Migration
-- Migration for Property Details Popup: Highlights & Expanded Media Gallery
-- ==============================================================================

-- 1. Ensure properties table has the highlights column (array of text chips)
ALTER TABLE IF EXISTS properties 
ADD COLUMN IF NOT EXISTS highlights text[] DEFAULT '{}'::text[];

-- 2. Optional: Add comment documenting column purpose
COMMENT ON COLUMN properties.highlights IS 'Luxury highlight chips displayed in property details popup (e.g. Ready to move in, Gated society)';

-- 3. Verification query
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'properties' AND column_name = 'highlights';
