/* ==========================================================================
   iGREY HOLDINGS — PINNED HORIZONTAL GALLERY & FULL-SCREEN DETAIL VIEW
   ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const propertiesInventory = [
  {
    id: 'the-solarium-residence',
    name: 'The Solarium Pavilion',
    location: 'Bel-Air Crest, Los Angeles',
    price: '$28,500,000',
    status: 'Available',
    type: 'Architectural Estate',
    area: '12,400 sq.ft',
    beds: 6,
    baths: 8,
    parking: 5,
    tagline: 'Cantilevered sanctuary framed by twilight reflection waters and monolithic stone.',
    description: 'A seamless dialogue between geometric minimalism and sweeping horizon vistas, engineered with motorized glazing and travertine decking.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
    ],
    highlights: [
      'Board-formed architectural concrete and basalt facades',
      'Subterranean 1,200-bottle climate-controlled sommelier vault',
      'Integrated wellness pavilion with Finnish sauna'
    ],
    amenities: ['Infinity Pool', '5-Car Gallery', 'Private Spa', 'Biometric Security']
  },
  {
    id: 'villa-obscura',
    name: 'Villa Obscura',
    location: 'Lake Como, Lombardy',
    price: '€19,200,000',
    status: 'Private Treaty',
    type: 'Villa',
    area: '9,850 sq.ft',
    beds: 5,
    baths: 6,
    parking: 4,
    tagline: 'Monolithic charcoal concrete framing dramatic alpine water reflections.',
    description: 'Perched upon private granite promontory overlooking Lake Como, reinterpreting Italian rationalism through an unapologetic dark palette.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
    ],
    highlights: [
      'Private deep-water boat mooring and cantilevered sundeck',
      'Sculptural floating staircase cast in bronze micro-cement',
      'Custom library clad in fumed European oak'
    ],
    amenities: ['Private Boathouse', 'Olive Groves', 'Saltwater Plunge Pool', 'Staff Quarters']
  },
  {
    id: 'the-apex-penthouse',
    name: 'The Apex Penthouse',
    location: 'One Bishopsgate, London',
    price: '£24,750,000',
    status: 'Available',
    type: 'Penthouse',
    area: '8,200 sq.ft',
    beds: 4,
    baths: 5,
    parking: 3,
    tagline: 'Triplex sky residence commanding 360-degree metropolitan panoramas.',
    description: 'Encompassing the top three levels of an iconic landmark, featuring a direct private glass elevator and rooftop heated plunge pool.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
    ],
    highlights: [
      'Internal glass atrium with bespoke sculptural chandelier',
      'Acoustically isolated private screening room',
      'Triple-glazed acoustic curtain walling engineered for quiet'
    ],
    amenities: ['Sky Deck & Spa', '24/7 Concierge', 'Direct Lift', 'Automated Valet']
  },
  {
    id: 'mirador-sanctuary',
    name: 'Mirador Ocean Sanctuary',
    location: 'Cap d’Antibes, Riviera',
    price: '€34,000,000',
    status: 'Under Offer',
    type: 'Villa',
    area: '14,100 sq.ft',
    beds: 7,
    baths: 9,
    parking: 6,
    tagline: 'Panoramic maritime compound with limestone terraces and pine groves.',
    description: 'Commanding uninterrupted Mediterranean horizons, framed by monolithic Roman travertine and fragrant parasol pine forests.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    highlights: [
      'Direct coastal shoreline access via private funicular',
      'Infinity pool suspended above coastal cliff line',
      'Commercial grade culinary facility and wine lounge'
    ],
    amenities: ['Coastal Funicular', 'Helipad Access', 'Subterranean Spa', 'Tennis Court']
  },
  {
    id: 'kyoto-sukiya-estate',
    name: 'Higashiyama Heritage Compound',
    location: 'Higashiyama, Kyoto',
    price: '¥3,200,000,000',
    status: 'Sold',
    type: 'Architectural Estate',
    area: '7,450 sq.ft',
    beds: 4,
    baths: 4,
    parking: 2,
    tagline: 'Historic Japanese timber joinery harmonized with modern concrete pavilions.',
    description: 'An architectural synthesis of 100-year-old cedar craft and contemporary volcanic glass walls surrounding a meditative moss garden.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
    ],
    highlights: [
      'Hand-carved hinoki soaking onsen baths overlooking bamboo groves',
      'Shoji lattice motorized solar screens',
      'Zen courtyard designed by revered Kyoto landscape masters'
    ],
    amenities: ['Natural Onsen', 'Tea Ceremony Pavilion', 'Moss Garden', 'Underground Vault']
  },
  {
    id: 'sonoran-desert-compound',
    name: 'Sonoran Desert Pavilion',
    location: 'Paradise Valley, Arizona',
    price: '$16,800,000',
    status: 'Available',
    type: 'Architectural Estate',
    area: '10,600 sq.ft',
    beds: 5,
    baths: 6,
    parking: 4,
    tagline: 'Rammed earth and weathered steel rising organically from the desert landscape.',
    description: 'A desert sanctuary utilizing thermal mass rammed earth walls, rusted Corten steel overhangs, and shaded reflecting pools.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    highlights: [
      'Zero-energy passive cooling architecture',
      'Open-air stargazing observation roof terrace',
      'Native desert cactus garden and sunken fire lounge'
    ],
    amenities: ['Reflection Lagoon', 'Stargazing Deck', 'Solar Geothermal', 'Wine Cellar']
  }
];

export function initPropertiesGallery() {
  const pinSection = document.querySelector('.gallery-pin-wrapper');
  const track = document.querySelector('.gallery-track');
  const isMobile = window.innerWidth < 960;

  // Horizontal pinned scroll on desktop
  if (pinSection && track && !isMobile) {
    const totalScroll = track.scrollWidth - window.innerWidth + 120;

    gsap.to(track, {
      x: () => -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: pinSection,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalScroll * 1.2}`,
        invalidateOnRefresh: true,
      }
    });
  }

  // Setup click triggers for full-screen detail view
  document.querySelectorAll('.residence-card').forEach((card) => {
    card.addEventListener('click', () => {
      const propId = card.getAttribute('data-property-id');
      const property = propertiesInventory.find((p) => p.id === propId);
      if (property) {
        openPropertyModal(property);
      }
    });
  });

  // Modal close handlers
  const backdrop = document.querySelector('.residence-modal-backdrop');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (backdrop && closeBtn) {
    closeBtn.addEventListener('click', closePropertyModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closePropertyModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
        closePropertyModal();
      }
    });
  }
}

export function openPropertyModal(property) {
  const backdrop = document.querySelector('.residence-modal-backdrop');
  const drawer = document.querySelector('.residence-modal-drawer');
  if (!backdrop || !drawer) return;

  // Populate dynamic data
  const nameEl = drawer.querySelector('.modal-prop-name');
  const locEl = drawer.querySelector('.modal-prop-location');
  const priceEl = drawer.querySelector('.modal-prop-price');
  const descEl = drawer.querySelector('.modal-prop-desc');
  const imgEl = drawer.querySelector('.modal-prop-image');
  const specsEl = drawer.querySelector('.modal-prop-specs');
  const highlightsEl = drawer.querySelector('.modal-prop-highlights');
  const enquiryBtn = drawer.querySelector('.modal-enquire-btn');

  if (nameEl) nameEl.textContent = property.name;
  if (locEl) locEl.textContent = `${property.location} • ${property.type}`;
  if (priceEl) priceEl.textContent = property.price;
  if (descEl) descEl.textContent = property.description;
  if (imgEl) {
    imgEl.src = property.image;
    imgEl.alt = property.name;
  }

  if (specsEl) {
    specsEl.innerHTML = `
      <div style="border-right: var(--border-hairline); padding-right: 1.5rem;">
        <span style="font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--mist);">Area</span>
        <p style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--ink); margin-top: 4px;">${property.area}</p>
      </div>
      <div style="border-right: var(--border-hairline); padding-right: 1.5rem;">
        <span style="font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--mist);">Bedrooms</span>
        <p style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--ink); margin-top: 4px;">${property.beds}</p>
      </div>
      <div style="border-right: var(--border-hairline); padding-right: 1.5rem;">
        <span style="font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--mist);">Bathrooms</span>
        <p style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--ink); margin-top: 4px;">${property.baths}</p>
      </div>
      <div>
        <span style="font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--mist);">Status</span>
        <p style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--accent-text); margin-top: 4px;">${property.status}</p>
      </div>
    `;
  }

  if (highlightsEl && property.highlights) {
    highlightsEl.innerHTML = property.highlights
      .map((h) => `<li style="font-size: 0.95rem; color: var(--graphite); margin-bottom: 0.65rem; display: flex; align-items: center; gap: 0.5rem;"><span style="width: 4px; height: 4px; border-radius: 50%; background: var(--accent-line);"></span>${h}</li>`)
      .join('');
  }

  if (enquiryBtn) {
    enquiryBtn.onclick = () => {
      closePropertyModal();
      const contactMsg = document.querySelector('#contact-details');
      if (contactMsg) {
        contactMsg.value = `Private inquiry regarding: ${property.name} (${property.price})`;
        contactMsg.dispatchEvent(new Event('input'));
      }
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }

  backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Focus trap
  const closeButton = drawer.querySelector('.modal-close-btn');
  if (closeButton) closeButton.focus();
}

export function closePropertyModal() {
  const backdrop = document.querySelector('.residence-modal-backdrop');
  if (!backdrop) return;
  backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
}
