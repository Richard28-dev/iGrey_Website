# iGREY HOLDINGS — Supabase & Admin Dashboard Setup Guide

This guide walks you through connecting your free **Supabase** backend to the **iGREY Holdings** Admin Dashboard and Public Website in 6 simple steps.

---

## 1. Create a Free Supabase Project
1. Visit [supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New project**.
3. Choose an organization, choose a project name (such as `igrey-holdings`), enter a secure database password, and pick a region close to your clients (e.g. `ap-south-1` Mumbai / Singapore).
4. Wait about 1–2 minutes for Supabase to provision your database.

---

## 2. Run `/admin/setup.sql` in the SQL Editor
1. In your Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Open [`/admin/setup.sql`](./setup.sql) from this repository, copy the entire SQL text, paste it into the query editor, and click **Run**.
4. This script automatically:
   - Creates the `properties`, `enquiries`, `reviews`, and `admins` tables with complete constraints.
   - Sets up **Row Level Security (RLS)**: anonymous public visitors can only read published listings and reviews, and can only submit enquiries; only authenticated admins can manage records.
   - Creates the public storage bucket `property-images` with upload/delete security policies.
   - Populates initial verified seed listings and reviews.

---

## 3. Confirm the "property-images" Storage Bucket
1. In the Supabase Dashboard, click on **Storage** in the left menu.
2. Verify that the bucket named `property-images` exists and has the **Public** badge.
3. If you ever need to create it manually:
   - Click **New bucket** -> Name: `property-images`.
   - Toggle **Public bucket** to **ON**.
   - Allowed MIME types: `image/jpeg, image/png, image/webp, image/gif`.
   - Max file size: `5 MB`.
   - Save.

---

## 4. Create Your Admin User & Add to Admins Table
1. In the Supabase Dashboard, click **Authentication** -> **Users**.
2. Click **Add user** -> **Create user**.
3. Enter your email (e.g., `admin@igreyholdings.com` or your personal email) and a secure password.
4. Toggle **Auto Confirm User?** to **ON** (so no email confirmation link is needed), then click **Create user**.
5. Whitelist your email in the database:
   - Go to **SQL Editor** -> **New query**.
   - Run:
     ```sql
     INSERT INTO public.admins (email, role)
     VALUES ('your-email@example.com', 'admin')
     ON CONFLICT (email) DO NOTHING;
     ```
   *(Replace `'your-email@example.com'` with the exact email you just created).*

---

## 5. Paste Your Project URL & Anon Key into `/js/supabase-config.js`
1. In your Supabase Dashboard, click **Settings** (gear icon) -> **API**.
2. Copy:
   - **Project URL** (e.g. `https://yourprojectid.supabase.co`)
   - **Project API Keys** -> `anon` / `public` key (starts with `eyJ...`)
   *(⚠️ NEVER copy or expose the `service_role` key).*
3. Open [`/js/supabase-config.js`](../js/supabase-config.js) in your codebase and update:
   ```javascript
   window.SUPABASE_CONFIG = {
     url: 'https://your-actual-id.supabase.co',
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
   };
   ```

---

## 6. Commit, Push & Open `/admin/login.html`
1. Commit your changes and push to GitHub:
   ```bash
   git add .
   git commit -m "feat(admin): connect Supabase backend and admin dashboard"
   git push origin main
   ```
2. Open your live admin page at:
   `https://richard28-dev.github.io/iGrey_Website/admin/login.html`
   *(or locally at `http://localhost:5173/admin/login.html`)*
3. Sign in with the admin email and password you created in Step 4.

---

## 7. Verification Checklist
- [ ] **Login**: Sign in with admin credentials. Redirects to `/admin/index.html`.
- [ ] **Add Property**: Navigate to **+ Add property**, enter details, upload photos (tested with client-side compression), tap highlight & amenity chips, click **Preview popup** to see live modal, and click **Publish**.
- [ ] **Public Site Integration**: Open the public site (`/iGrey_Website/`). Verify the newly added property shows with correct price, badges, and cover photo.
- [ ] **Property Modal**: Click the property card. Verify the details popup opens with full gallery, highlights, amenities, and price.
- [ ] **Edit Property**: Return to Admin -> Properties. Edit the title or price and save. Verify the update on the public site.
- [ ] **Quick Status Change**: Change status to `Under offer` or `Sold` from the property row. Verify the badge updates on the public site.
- [ ] **Submit Enquiry**: On the public site, submit the contact form (or click "Enquire about this property" from a modal).
- [ ] **Enquiries Dashboard**: In Admin -> Enquiries, verify the new enquiry appears with "New" badge, property reference, and quick Call/Email buttons.
- [ ] **Manage Reviews**: In Admin -> Reviews, add a new testimonial with 5 stars. Verify it appears in the public scrolling marquee.
- [ ] **Delete Property**: Delete a test property. Confirm the modal prompt, check that the row and its storage photos are removed.
