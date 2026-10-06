# iGREY HOLDINGS — Supabase Admin Dashboard Setup Guide

This guide explains how to connect your free **Supabase** backend to the **iGREY Holdings** Admin Dashboard and Public Website.

---

## Architecture Overview
- **Frontend / Hosting**: GitHub Pages (Static hosting under `/iGrey_Website/`).
- **Tech Stack**: Vanilla HTML5, CSS3, JavaScript (ES6+), Supabase JS SDK via CDN (`@supabase/supabase-js@2`). Zero build step required for admin tools.
- **Backend**: Supabase (Free Tier) — PostgreSQL database, Row Level Security (RLS) policies, Authentication, and Storage for property photos.

---

## Setup Steps

### 1. Create a Free Supabase Project
1. Go to [supabase.com](https://supabase.com) and log in or create a free account.
2. Click **New project**.
3. Choose an organization, enter a name (e.g. `igrey-holdings`), set a secure database password, and pick a region close to your clients (e.g. `ap-south-1` Mumbai / Singapore).
4. Wait approximately 1–2 minutes for the database to provision.

---

### 2. Run `/admin/setup.sql` in the SQL Editor
1. In your Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Open [`/admin/setup.sql`](./setup.sql) from this repository, copy its entire contents, paste it into the SQL Editor, and click **Run**.
4. This script automatically:
   - Creates the `properties` table with all fields (`property_code`, `title`, `property_type`, `bedrooms`, `price`, `area_sqft`, `status`, `city`, `locality`, `amenities`, `images`, `is_published`, `is_featured`, etc.).
   - Sets up the `admins` whitelist table.
   - Configures **Row Level Security (RLS)**:
     - **Public (anonymous visitors)**: Can only `SELECT` listings where `is_published = true`.
     - **Verified Admins**: Can `INSERT`, `UPDATE`, and `DELETE` listings.
   - Configures the public `property-images` storage bucket and its upload/delete policies.
   - Adds 3 initial seed properties (`SS-MYS-01`, `SS-MYS-02`, `SS-MYS-03`).

---

### 3. Confirm the "property-images" Storage Bucket
1. In the Supabase Dashboard, click on **Storage** in the left sidebar.
2. Verify that the bucket named `property-images` exists and is marked as **Public Bucket**.
3. If it was not created by the script:
   - Click **New bucket**.
   - Name it exactly: `property-images`.
   - Toggle **Public bucket** to **ON**.
   - Set Allowed MIME types to: `image/jpeg, image/png, image/webp`.
   - Set Maximum file size to: `5 MB`.
   - Click **Save**.
4. Under **Storage Policies**, ensure the policies from `setup.sql` are active (Public Read, Admin Insert, Admin Update, Admin Delete).

---

### 4. Create Your Admin User & Whitelist Your Email
1. In the Supabase Dashboard, click on **Authentication** -> **Users**.
2. Click **Add user** -> **Create user**.
3. Enter your email (e.g., `admin@igreyholdings.com` or your personal email) and a strong password.
4. Toggle **Auto Confirm User?** to **ON** (so no email confirmation link is needed), then click **Create user**.
5. Whitelist your email in the database:
   - Go back to **SQL Editor** -> **New query**.
   - Run:
     ```sql
     INSERT INTO public.admins (email) 
     VALUES ('your-email@example.com') 
     ON CONFLICT (email) DO NOTHING;
     ```
   *(Replace `'your-email@example.com'` with the exact email you just registered).*

---

### 5. Paste Project URL and Anon Key into `/js/supabase-config.js`
1. In your Supabase Dashboard, click **Project Settings** (gear icon) -> **API**.
2. Locate:
   - **Project URL** (e.g., `https://abcdefghijklm.supabase.co`)
   - **Project API Keys** -> `anon` / `public` (starts with `ey...`)
   > ⚠️ **SECURITY WARNING**: Never use the `service_role` secret key. Only the `anon` public key belongs in front-end client code. Row Level Security enforces all protections.
3. Open [`/js/supabase-config.js`](../js/supabase-config.js) in your codebase and update the placeholders:
   ```javascript
   const SUPABASE_CONFIG = {
     url: 'https://YOUR_ACTUAL_PROJECT_REF.supabase.co',
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
   };
   ```
4. Save the file. Also ensure [`/public/js/supabase-config.js`](../public/js/supabase-config.js) contains the exact same credentials so that production Vite builds include them automatically.

---

### 6. Commit and Push to GitHub
1. Stage and commit your changes:
   ```bash
   git add .
   git commit -m "Configure Supabase credentials and admin dashboard"
   git push origin main
   ```
2. Once deployed to GitHub Pages, open the admin sign-in page:
   ```text
   https://richard28-dev.github.io/iGrey_Website/admin/login.html
   ```
   *(For local development, navigate to `http://localhost:5173/admin/login.html`)*.

---

## 7. Operational Test Checklist

Verify each of the following flows to ensure full functionality:

- [ ] **Admin Authentication**:
  - Open `/admin/login.html`.
  - Enter invalid credentials: confirm "Wrong email or password" error banner displays without crashing.
  - Enter your valid admin email and password: confirm smooth redirect to `/admin/index.html`.
  - Check the sidebar footer: confirms your signed-in email address.
- [ ] **Summary KPIs**:
  - Confirm the four top cards (Total, Available, Under offer, Sold) display real counts matching the database.
- [ ] **Add a New Property**:
  - Fill in the form:
    - Title: *Penthouse Meridian*
    - Type: *Villa*
    - Bedrooms: *4 BHK*
    - Sale price: *15000000* (verify live Indian preview displays `₹1.5 Cr`)
    - Area: *3400 sq ft*
    - City: *Mysuru*
    - Locality: *Yadavagiri*
    - Drag & drop 2+ photos (verify WebP client-side compression and cover badge)
    - Amenities: toggle *Swimming pool*, *Gym*, *Clubhouse*
    - Description: *Panoramic terrace penthouse overlooking Chamundi Hills.*
    - Check *Show on website* and *Show in Featured*.
  - Click **Publish**.
  - Verify gold toast: *"Property published successfully"*.
  - Confirm property appears at the top of the **Recent Listings** table.
- [ ] **Public Site Verification**:
  - Open the public website homepage.
  - Scroll to the **Selected Residences / Featured** section.
  - Confirm *Penthouse Meridian* appears immediately with:
    - Status badge: `AVAILABLE`
    - Price: `₹1.5 Cr`
    - Category: `VILLA • 4 BHK`
    - Subtitle: `Yadavagiri, Mysuru • ID: SS-MYS-XX`
    - Tag: `Property for Sale`
    - Working photo carousel with arrows, dots, and touch swipe.
  - Click the card: confirm it opens the dedicated Property Details view.
- [ ] **Edit Property**:
  - In `/admin/index.html`, find the property in the table and click **Edit**.
  - Form scrolls into view populated with its data.
  - Change status to **Under offer**.
  - Click **Publish**.
  - Toast: *"Property updated successfully"*.
  - Public card updates status badge to `UNDER OFFER`.
- [ ] **Mark as Sold**:
  - Click **Edit**, toggle status badge to **Sold**, click **Publish**.
  - Verify status badge displays `SOLD`.
- [ ] **Delete Property**:
  - Click the **Delete** button next to the property in the table.
  - Confirmation modal pops up.
  - Confirm deletion: property is removed from table and Supabase Storage photos are purged.
- [ ] **Log Out**:
  - Click **Log out** in the sidebar.
  - Confirm redirect back to `/admin/login.html`.
  - Attempting to visit `/admin/index.html` redirects back to login.

---

## File Reference
| File | Purpose |
|---|---|
| [`/admin/login.html`](./login.html) | Secure admin login interface with rate-limiting and session verification |
| [`/admin/index.html`](./index.html) | Admin dashboard containing KPI metrics, listing form, photo uploader & listings table |
| [`/admin/admin.css`](./admin.css) | Dark luxury styling (`#0a0f0e`, `#101614`, `#c9a77c`, Cormorant Garamond & Manrope) |
| [`/admin/admin.js`](./admin.js) | Dashboard controller: client-side photo WebP compression, drag reordering, and CRUD |
| [`/admin/setup.sql`](./setup.sql) | Full PostgreSQL database schema, RLS policies, indexes, and Storage setup |
| [`/js/supabase-config.js`](../js/supabase-config.js) | Central Supabase client initialization and API credentials config |
| [`/js/properties.js`](../js/properties.js) | Public website dynamic loader: fetching, rendering, carousels, and error handling |
