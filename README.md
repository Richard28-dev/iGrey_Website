# iGREY HOLDINGS — Luxury Real Estate Website

A bespoke, quiet-luxury digital experience engineered for **iGREY HOLDINGS**, featuring sovereign Monaco Noir styling, high-contrast typography, interactive floating components, and smooth inertia scrolling.

🔗 **Live Working Website**: [https://richard28-dev.github.io/iGrey_Website/](https://richard28-dev.github.io/iGrey_Website/)

---

## Architecture & Section Hierarchy

1. **Header & Navigation**: Frosted dark glass on scroll, structured navigation (`Home`, `About`, `Services`, `Properties`, `Contact`), gold CTA ("Schedule a consultation"), and interactive mobile drawer.
2. **Hero Sanctuary**: High-res architectural sunset villa with 4 interactive floating metrics pills that lift and illuminate on click.
3. **About Section**: The iGrey Advantage with terrace imagery and verified credentials.
4. **Services Showcase**: Bespoke residential portfolio management, advisory, and leasing services.
5. **Selected Properties**: 3-card architectural portfolio (`The Solarium Pavilion`, `Villa Obscura`, `The Apex Penthouse`) in Monaco Noir quiet luxury.
6. **Institutional Accolades & Marquee**: Private client reflections and infinite horizontal floating marquee ticker.
7. **Frequently Asked Questions**: Accessible, smooth accordion pills with all items closed by default.
8. **Contact Section**: Luxury two-column consultation enquiry form with curated architectural photography.
9. **Footer**: Clean 3-column layout with Quick Links, Services Directory, Registered Corporate Entity badge, and legal links.

---

## Design System Tokens

- **Palette**:
  - `--ink`: `#0D1714` (Deep obsidian dark)
  - `--forest`: `#14231D` (Rich architectural green)
  - `--bronze`: `#B48F5A` (Signature metallic gold)
  - `--bronze-hi`: `#CFAE7B` (High-sheen gold hover)
  - `--bronze-deep`: `#7F6338` (High-contrast accessible bronze text)
  - `--ivory`: `#F7F4ED` (Warm gallery off-white)
  - `--sand`: `#EEE9DF` (Subtle container tone)
  - `--line`: `#DDD6C8` (Hairline architectural border)
- **Typography**:
  - Headings: `Cormorant Garamond` (Light/Regular, fluid clamp)
  - Body & UI: `Manrope` (Clean geometric sans-serif)

---

## Photography Inventory (`/public/images/`)

All images adhere to a warm golden-hour architectural aesthetic with no people or watermarks:
- `hero_residential.jpg` (2000px): Dusk glass villa with illuminated infinity pool
- `hero_commercial.jpg` (2000px): Glass tower at golden hour
- `hero_investment.jpg` (2000px): Skyline luxury residences
- `hero_advisory.jpg` (2000px): Panoramic architectural terrace
- `about_terrace.jpg` (1400px): Minimalist living room overlooking city horizon
- `prop_featured.jpg` (1400px): Evening pavilion villa with reflecting pool
- `prop_penthouse.jpg` (900px): High-floor glass terrace with skyline panorama
- `prop_estate.jpg` (900px): Timber and limestone architectural villa
- `why_igrey.jpg` (1200px): Biophilic contemporary pavilion home
- `faq_skyline.jpg` (1200px): Golden-hour metropolis through floor-to-ceiling glass
- `service_advisory.jpg` (800px): Architectural studio planning space
- `service_sales.jpg` (800px): Interior salon with natural travertine light
- `service_investment.jpg` (800px): High-rise commercial skyline perspective
- `service_management.jpg` (800px): Five-star private residential concierge lobby
- `contact_villa.jpg` (1600px): Dusk villa exterior

---

## Local Development & Build

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev

# Run TypeScript check & production bundle build
npm run build

# Preview production build locally
npm run preview
```

---

## GitHub Pages Deployment

> **Note**: As requested, deployment is held until explicitly authorized. When ready to publish to GitHub Pages:

```bash
# 1. Ensure working tree is clean and build succeeds
npm run build

# 2. Deploy dist directory to the gh-pages branch
npx gh-pages -d dist
```

---

## Placeholders & Production Configuration

- **Contact Form**: Currently operates with simulated 1.2s API delay. For production integration, update the submit handler in `src/components/Contact.tsx` to post to Formspree, Resend, or your internal API endpoint.
- **Consultation Scheduler**: The header "Schedule a consultation" CTA is wired to `#contact` with an auto-populated requirement mode. Can be connected to Calendly or SavvyCal.
- **Analytics**: Ready for Google Analytics 4 / Plausible integration in `index.html`.
