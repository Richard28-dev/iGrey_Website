# iGREY HOLDINGS — Luxury Architectural Real Estate & Advisory

[![Live Website](https://img.shields.io/badge/Live%20Website-Visit%20Site-gold?style=for-the-badge&logo=googlechrome&logoColor=white)](https://richard28-dev.github.io/iGrey_Website/)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://richard28-dev.github.io/iGrey_Website/)

🔗 **Live Flagship URL**: [https://richard28-dev.github.io/iGrey_Website/](https://richard28-dev.github.io/iGrey_Website/)

A bespoke, Awwwards-caliber digital flagship engineered for **iGREY HOLDINGS**—a private real estate practice and family office advisory firm specializing in residential acquisitions, curated architectural properties, and off-market mandates across London, Los Angeles, Lake Como, Zurich, and Tokyo.

---

## 1. Brand Concept: "Quiet Luxury, in Daylight"

The experience is styled as a sunlit architectural monograph and private gallery:
- **Light-First Palette**: Dominated by warm ivory (`--paper: #FAF8F4`), honed limestone (`--bone: #F1EDE6`), structural hairlines (`--stone: #E4DFD6`), and deep bronze accents (`--accent-text: #7A6035`).
- **Pacing & Typography**: Fluid Cormorant Garamond serif paired with Plus Jakarta Sans body copy, bounded to 68ch reading measures.
- **Architectural Grain**: Subtle 2.8% archival paper noise overlay.
- **120 FPS Native Motion**: Smooth inertia scrolling via Lenis, synchronized with GSAP ScrollTrigger for pinned horizontal galleries, word-by-word scroll text illumination, and SVG stroke drawing.

---

## 2. Tech Stack & Architecture

- **Bundler & Tooling**: Vite 8 (Static GitHub Pages deployment under `/iGrey_Website/`)
- **Motion & Interaction**: GSAP 3 + ScrollTrigger, Lenis (Unified ticker)
- **Styling Architecture**: Modular CSS Tokens (`tokens.css`, `base.css`, `layout.css`, `components.css`, `animations.css`)
- **Accessibility**: Skip links, ARIA 1.2 modal dialog with focus trapping, high-contrast text ratios (WCAG AAA/AA), and `@media (prefers-reduced-motion)` fallbacks.

---

## 3. Development, Build & Deployment

```bash
# 1. Install dependencies
npm install

# 2. Launch local dev server (HMR enabled)
npm run dev

# 3. Compile optimized production bundle
$env:NODE_ENV="production"; npm run build

# 4. Deploy to GitHub Pages (gh-pages branch)
npx --yes gh-pages -d dist
```

---

## 4. Imagery Asset Manifest & Replacement Guide

All images are curated high-key, natural daylight architectural photographs with a warm, desaturated color grade:

| Identifier | Subject / Location | Dimensions | Current Asset URL |
| :--- | :--- | :--- | :--- |
| **Hero Image** | Sunlit Colonnade Villa | 2600×1733 | `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2600&q=88` |
| **Residence 01** | The Solarium Pavilion (Bel-Air) | 1600×2000 | `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85` |
| **Residence 02** | Villa Obscura (Lake Como) | 1600×2000 | `https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85` |
| **Residence 03** | The Apex Penthouse (London) | 1600×2000 | `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85` |
| **Residence 04** | Mirador Ocean Sanctuary (Antibes) | 1600×2000 | `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85` |
| **Residence 05** | Higashiyama Compound (Kyoto) | 1600×2000 | `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85` |
| **Residence 06** | Sonoran Desert Pavilion (Arizona)| 1600×2000 | `https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85` |
| **About Section** | Interior Floating Stairs Living | 1200×1320 | `/iGrey_Website/about-architecture.jpg` (Local bundled asset) |

### How to Swap an Image:
1. To replace a curated residence image, update the `image` URL in `src/js/properties.js` and the corresponding `<img src="..." />` in `index.html`.
2. Always ensure the replacement image has explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).

---

## 5. Private Enquiry Form Endpoint Configuration

The contact form in `index.html` connects via `src/js/form.js`.
- By default, it runs client-side validation, animates underline focus states in `--accent-line`, and renders the graceful confirmation state.
- **Production Integration**: To route submissions directly to your CRM, email desk, or Formspree:
  1. Add an `action="https://formspree.io/f/YOUR_ENDPOINT"` attribute to `<form id="enquiry-form">`.
  2. Change method to `POST`.
  3. Update `src/js/form.js` to dispatch a native `fetch(form.action, { method: 'POST', body: new FormData(form) })`.

---

## 6. Design Tokens & Customization Guide

All brand tokens are declared in [`src/styles/tokens.css`](file:///c:/Users/Richard%20R/Downloads/IGREY%20WEB/src/styles/tokens.css):
- **Change Primary Canvas**: Modify `--paper: #FAF8F4` or `--bone: #F1EDE6`.
- **Change Champagne Gold Accent**: Modify `--accent-line: #B79B6B` and `--accent-text: #7A6035`.
- **Adjust Typography Scale**: Modify `--text-hero`, `--text-display-1`, and `--text-heading` fluid `clamp()` formulas.
- **Alter Motion Timing**: Modify `--duration-fast: 400ms`, `--duration-med: 800ms`, or `--duration-slow: 1200ms`.
