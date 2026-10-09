-- ==============================================================================
-- iGREY HOLDINGS — Production Database Schema & Security Setup
-- Execute this script in the Supabase SQL Editor (SQL Editor -> New Query -> Run)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLES
-- ==============================================================================

-- A. ADMINS WHITELIST TABLE
CREATE TABLE IF NOT EXISTS public.admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- B. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_code text NOT NULL UNIQUE,
  title text NOT NULL,
  property_type text NOT NULL DEFAULT 'Gated society',
  bedrooms text NOT NULL DEFAULT '2 BHK',
  price bigint NOT NULL CHECK (price >= 0),
  area_sqft text NOT NULL DEFAULT '1,200',
  status text NOT NULL CHECK (status IN ('available', 'upcoming', 'under_offer', 'sold', 'draft')) DEFAULT 'available',
  listing_type text NOT NULL DEFAULT 'sale',
  city text NOT NULL,
  locality text NOT NULL,
  highlights text[] NOT NULL DEFAULT '{}'::text[],
  amenities text[] NOT NULL DEFAULT '{}'::text[],
  description text NOT NULL DEFAULT '',
  images text[] NOT NULL DEFAULT '{}'::text[],
  is_published boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Migration helper if table already exists in Supabase:
ALTER TABLE public.properties DROP CONSTRAINT IF EXISTS properties_status_check;
ALTER TABLE public.properties ADD CONSTRAINT properties_status_check CHECK (status IN ('available', 'upcoming', 'under_offer', 'sold', 'draft'));

-- C. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  role text DEFAULT 'Interested Buyer',
  city text DEFAULT 'Mysuru',
  message text DEFAULT '',
  property_code text,
  status text NOT NULL CHECK (status IN ('new', 'contacted', 'closed')) DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- D. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  job_title text NOT NULL DEFAULT 'Private Investor',
  company text NOT NULL DEFAULT 'Private Family Office',
  city text NOT NULL DEFAULT 'Bengaluru',
  tag text NOT NULL DEFAULT 'Verified investor',
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  quote text NOT NULL,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 3. HELPER FUNCTIONS & TRIGGERS
-- ==============================================================================

-- Helper to check if current authenticated user is in the admins whitelist
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins
    WHERE lower(email) = lower(auth.jwt() ->> 'email')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Trigger to automatically update updated_at on properties
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_properties_updated_at ON public.properties;
CREATE TRIGGER trigger_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- --- ADMINS TABLE POLICIES ---
DROP POLICY IF EXISTS "Admins can view admins list" ON public.admins;
CREATE POLICY "Admins can view admins list"
  ON public.admins FOR SELECT
  TO authenticated
  USING (is_admin() OR lower(email) = lower(auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "Admins can insert admins" ON public.admins;
CREATE POLICY "Admins can insert admins"
  ON public.admins FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can delete admins" ON public.admins;
CREATE POLICY "Admins can delete admins"
  ON public.admins FOR DELETE
  TO authenticated
  USING (is_admin());

-- --- PROPERTIES TABLE POLICIES ---
-- 1. Public visitors can only SELECT published properties
DROP POLICY IF EXISTS "Public can view published properties" ON public.properties;
CREATE POLICY "Public can view published properties"
  ON public.properties FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR is_admin());

-- 2. Authenticated admins can INSERT properties
DROP POLICY IF EXISTS "Admins can insert properties" ON public.properties;
CREATE POLICY "Admins can insert properties"
  ON public.properties FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- 3. Authenticated admins can UPDATE properties
DROP POLICY IF EXISTS "Admins can update properties" ON public.properties;
CREATE POLICY "Admins can update properties"
  ON public.properties FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- 4. Authenticated admins can DELETE properties
DROP POLICY IF EXISTS "Admins can delete properties" ON public.properties;
CREATE POLICY "Admins can delete properties"
  ON public.properties FOR DELETE
  TO authenticated
  USING (is_admin());

-- --- ENQUIRIES TABLE POLICIES ---
-- 1. Public can only INSERT enquiries (Contact form & Property Modal submissions)
DROP POLICY IF EXISTS "Public can submit enquiries" ON public.enquiries;
CREATE POLICY "Public can submit enquiries"
  ON public.enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 2. Only authenticated admins can SELECT enquiries
DROP POLICY IF EXISTS "Admins can view enquiries" ON public.enquiries;
CREATE POLICY "Admins can view enquiries"
  ON public.enquiries FOR SELECT
  TO authenticated
  USING (is_admin());

-- 3. Only authenticated admins can UPDATE enquiry status
DROP POLICY IF EXISTS "Admins can update enquiries" ON public.enquiries;
CREATE POLICY "Admins can update enquiries"
  ON public.enquiries FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- 4. Only authenticated admins can DELETE enquiries
DROP POLICY IF EXISTS "Admins can delete enquiries" ON public.enquiries;
CREATE POLICY "Admins can delete enquiries"
  ON public.enquiries FOR DELETE
  TO authenticated
  USING (is_admin());

-- --- REVIEWS TABLE POLICIES ---
-- 1. Public can only SELECT published reviews
DROP POLICY IF EXISTS "Public can view published reviews" ON public.reviews;
CREATE POLICY "Public can view published reviews"
  ON public.reviews FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR is_admin());

-- 2. Only authenticated admins can INSERT reviews
DROP POLICY IF EXISTS "Admins can insert reviews" ON public.reviews;
CREATE POLICY "Admins can insert reviews"
  ON public.reviews FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- 3. Only authenticated admins can UPDATE reviews
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
CREATE POLICY "Admins can update reviews"
  ON public.reviews FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- 4. Only authenticated admins can DELETE reviews
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;
CREATE POLICY "Admins can delete reviews"
  ON public.reviews FOR DELETE
  TO authenticated
  USING (is_admin());

-- ==============================================================================
-- 5. STORAGE BUCKET: property-images
-- ==============================================================================

-- Create the public storage bucket if it does not already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images',
  'property-images',
  true,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Storage RLS Policies for property-images bucket
DROP POLICY IF EXISTS "Public can read property images" ON storage.objects;
CREATE POLICY "Public can read property images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'property-images');

DROP POLICY IF EXISTS "Admins can upload property images" ON storage.objects;
CREATE POLICY "Admins can upload property images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'property-images' AND is_admin());

DROP POLICY IF EXISTS "Admins can update property images" ON storage.objects;
CREATE POLICY "Admins can update property images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'property-images' AND is_admin())
  WITH CHECK (bucket_id = 'property-images' AND is_admin());

DROP POLICY IF EXISTS "Admins can delete property images" ON storage.objects;
CREATE POLICY "Admins can delete property images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'property-images' AND is_admin());

-- ==============================================================================
-- 6. SEED INITIAL DATA (Curated Luxury Properties & Reviews)
-- ==============================================================================

-- Insert Initial Seed Properties matching the website
INSERT INTO public.properties (
  property_code, title, property_type, bedrooms, price, area_sqft, status,
  listing_type, city, locality, highlights, amenities, description, images,
  is_published, is_featured
)
VALUES
  (
    'SS-MYS-02',
    'Executive 2 BHK Residence',
    'Gated society',
    '2 BHK',
    8500000,
    '1,200',
    'available',
    'sale',
    'Mysuru',
    'Gokulam',
    ARRAY['Ready to move in', 'Gated society', 'Verified documents', 'Corner plot'],
    ARRAY['Swimming pool', 'Gym', 'Clubhouse', '24x7 security', 'Power backup', 'Covered parking'],
    'Bright, well-planned home in a gated society close to schools and markets. Ready to move in, with a clear layout and good natural light.',
    ARRAY[
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85'
    ],
    true,
    true
  ),
  (
    'SS-MYS-03',
    'Executive 2 BHK Residence',
    'Gated society',
    '2 BHK',
    9500000,
    '1,350',
    'available',
    'sale',
    'Mysuru',
    'Gokulam',
    ARRAY['Ready to move in', 'Gated society', 'Vastu compliant'],
    ARRAY['Gym', 'Clubhouse', '24x7 security', 'Power backup', 'Covered parking', 'Garden'],
    'Modern executive residence with scenic garden views, expansive master bedroom, and premium marble flooring throughout.',
    ARRAY[
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85'
    ],
    true,
    true
  ),
  (
    'SS-MYS-01',
    'Executive 2 BHK Residence',
    'Gated society',
    '2 BHK',
    12000000,
    '1,520',
    'available',
    'sale',
    'Mysuru',
    'Gokulam',
    ARRAY['Ready to move in', 'Gated society', 'Verified documents', 'Newly renovated'],
    ARRAY['Swimming pool', 'Gym', 'Clubhouse', '24x7 security', 'Power backup', 'Covered parking', 'Garden', 'Lift'],
    'Signature luxury penthouse with wrap-around balconies and panoramic mountain vistas. Equipped with imported modular kitchen.',
    ARRAY[
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    ],
    true,
    true
  ),
  (
    'SS-BLR-01',
    'Prestige Golf Vista Villa',
    'Villa',
    '4 BHK',
    42500000,
    '3,800',
    'under_offer',
    'sale',
    'Bangalore',
    'Whitefield',
    ARRAY['Gated society', 'Corner plot', 'Vastu compliant', 'Verified documents'],
    ARRAY['Swimming pool', 'Gym', 'Clubhouse', '24x7 security', 'Power backup', 'Covered parking', 'Garden'],
    'Architectural luxury villa bordering the championship golf greens with private lap pool, double-height atrium, and smart automation.',
    ARRAY[
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    ],
    true,
    false
  )
ON CONFLICT (property_code) DO NOTHING;

-- Insert Seed Reviews matching Elena Rostova, Harshvardhan Singhania, etc.
INSERT INTO public.reviews (name, job_title, company, city, tag, rating, quote, is_published)
VALUES
  (
    'Elena Rostova',
    'Founder',
    'Global Tech Ventures',
    'Bengaluru',
    'Verified investor',
    5,
    'Their curation filtered out ninety percent of the noise. We found a trophy waterfront asset within three weeks that never even touched the open market.',
    true
  ),
  (
    'Harshvardhan Singhania',
    'Principal Partner',
    'Singhania Family Office',
    'Bengaluru',
    'Verified investor',
    5,
    'Outstanding portfolio structuring and exceptional legal diligence. The onboarding had several compliance stages, but their discreet private banking execution was well worth it.',
    true
  ),
  (
    'Madhavan Sridhar',
    'Managing Director',
    'Apex Capital Partners',
    'Chennai',
    'Verified homeowner',
    5,
    'A true masterclass in architectural provenance and investment discipline. They treat luxury real estate as living sculpture and disciplined capital protection.',
    true
  ),
  (
    'Arun Venkatesh',
    'Director of Cloud Engg.',
    'Oracle Global',
    'Bengaluru',
    'Verified investor',
    5,
    'Managing our duplex from Singapore involved a longer initial KYC cycle than anticipated, yet their property management and net 7.2% rental yield have been totally reliable.',
    true
  ),
  (
    'Dr. Priya Reddy',
    'Consultant Cardiologist',
    'Apollo Health City',
    'Hyderabad',
    'Verified homeowner',
    5,
    'Their tenant verification and background checks are remarkably thorough. Disbursements are punctual on the 1st of every month, though monthly digital statements could arrive faster.',
    true
  ),
  (
    'K. S. Ramachandran',
    'Managing Director',
    'Southern Alloys Group',
    'Chennai',
    'Verified investor',
    5,
    'Entrusting our luxury beachside villa on ECR to iGrey was our best financial decision. Complete transparency in maintenance audits, zero vacancy downtime, and exemplary professionalism.',
    true
  )
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- 7. HOW TO ADD YOUR FIRST ADMIN EMAIL:
-- Replace 'your-admin@email.com' with the email you used in Authentication -> Users
-- ==============================================================================
-- INSERT INTO public.admins (email, role)
-- VALUES ('admin@igreyholdings.com', 'admin')
-- ON CONFLICT (email) DO NOTHING;
