/**
 * iGREY HOLDINGS — FIND YOUR PERFECT HOME (PROPERTIES PAGE LOGIC)
 * Plain JavaScript, 0 build step, client-side filtering, sorting, pagination,
 * image carousels, status badges, and luxury property details popup.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA SOURCE & RICH FALLBACK CATALOG
  // =========================================================================

  const FALLBACK_PROPERTIES = [
    {
      id: 'prestige-golf-vista-villa',
      propertyId: 'SS-BLR-01',
      title: 'Prestige Golf Vista Villa',
      propertyType: 'Villa',
      category: 'VILLA • 3 BHK',
      bedrooms: 3,
      bathrooms: 4,
      price: '₹4.25 Cr',
      priceNumeric: 42500000,
      status: 'SOLD',
      city: 'Bangalore',
      locality: 'Whitefield',
      location: 'Whitefield, Bangalore',
      area_sqft: '4,200',
      builtUpArea: '4,200 sq ft',
      carpetArea: '3,800 sq ft',
      furnishing: 'Furnished',
      possession: 'Immediate',
      isFeatured: true,
      listingLabel: 'Property for Sale',
      highlights: ['Golf Course Facing', 'Private Plunge Pool', 'Vastu Compliant'],
      amenities: ['Swimming pool', 'Gym', 'Clubhouse', '24x7 security', 'Power backup', 'Covered parking'],
      description: 'Exclusive golf-side architectural residence set within an elite gated sanctuary. Private plunge pool, double-height ceilings, and panoramic manicured greens.',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      ],
      videos: [
        { type: 'youtube', id: 'M7lc1UVf-VE' },
      ],
    },
    {
      id: 'solarium-sovereign-villa',
      propertyId: 'SS-BLR-02',
      title: 'The Solarium Sovereign Villa',
      propertyType: 'Villa',
      category: 'VILLA • 4+ BHK',
      bedrooms: 5,
      bathrooms: 6,
      price: '₹14.5 Cr',
      priceNumeric: 145000000,
      status: 'UPCOMING',
      city: 'Bangalore',
      locality: 'Sadashivanagar',
      location: 'Sadashivanagar, Bangalore',
      area_sqft: '7,800',
      builtUpArea: '7,800 sq ft',
      carpetArea: '6,400 sq ft',
      furnishing: 'Semi-Furnished',
      possession: 'Under Construction',
      isFeatured: true,
      listingLabel: 'Property for Sale',
      highlights: ['Limestone Facade', 'Showroom Garage', 'Private Courtyard'],
      amenities: ['Swimming pool', 'Gym', 'Clubhouse', '24x7 security', 'Garden', 'Covered parking'],
      description: 'Palatial private estate designed for high-net-worth families with biometric surveillance, 4-car showroom gallery, and manicured private garden pavilion.',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      ],
    },
    {
      id: 'solarium-pavilion-gokulam',
      propertyId: 'SS-MYS-02',
      title: 'Executive 2 BHK Residence',
      propertyType: 'Gated society',
      category: 'GATED SOCIETY • 2 BHK',
      bedrooms: 2,
      bathrooms: 2,
      price: '₹85 L',
      priceNumeric: 8500000,
      status: 'UPCOMING',
      city: 'Mysuru',
      locality: 'Gokulam',
      location: 'Gokulam, Mysuru',
      area_sqft: '1,200',
      builtUpArea: '1,200 sq ft',
      carpetArea: '1,050 sq ft',
      furnishing: 'Furnished',
      possession: 'Ready to Move',
      isFeatured: true,
      listingLabel: 'Property for Sale',
      highlights: ['Ready to Move', 'Gated Society', 'Yoga Kendra Proximity'],
      amenities: ['Gym', '24x7 security', 'Power backup', 'Covered parking', 'Lift'],
      description: 'Contemporary minimalist residence featuring serene tree-lined outlooks, imported teak joinery, and private balcony. Ideal for discerning professionals.',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
      ],
    },
    {
      id: 'apex-penthouse-gokulam',
      propertyId: 'SS-MYS-04',
      title: 'Executive 3 BHK Penthouse',
      propertyType: 'Gated society',
      category: 'GATED SOCIETY • 3 BHK',
      bedrooms: 3,
      bathrooms: 3,
      price: '₹1.2 Cr',
      priceNumeric: 12000000,
      status: 'AVAILABLE',
      city: 'Mysuru',
      locality: 'Gokulam',
      location: 'Gokulam, Mysuru',
      area_sqft: '1,800',
      builtUpArea: '1,800 sq ft',
      carpetArea: '1,550 sq ft',
      furnishing: 'Furnished',
      possession: 'Immediate',
      isFeatured: true,
      listingLabel: 'Property for Sale',
      highlights: ['Sky Deck', 'Direct Lift Access', 'Double Height Living'],
      amenities: ['Swimming pool', 'Gym', '24x7 security', 'Power backup', 'Covered parking', 'Lift'],
      description: 'Top-tier executive penthouse residence commanding panoramic green canopy and skyline views. Double-height ceilings, private terrace deck, and direct lift.',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      ],
    },
    {
      id: 'villa-obscura-gokulam',
      propertyId: 'SS-MYS-03',
      title: 'Executive 2 BHK Residence',
      propertyType: 'Gated society',
      category: 'GATED SOCIETY • 2 BHK',
      bedrooms: 2,
      bathrooms: 2,
      price: '₹95 L',
      priceNumeric: 9500000,
      status: 'UNDER OFFER',
      city: 'Mysuru',
      locality: 'Gokulam',
      location: 'Gokulam, Mysuru',
      area_sqft: '1,450',
      builtUpArea: '1,450 sq ft',
      carpetArea: '1,220 sq ft',
      furnishing: 'Furnished',
      possession: 'Ready to Move',
      isFeatured: true,
      listingLabel: 'Property for Sale',
      highlights: ['Private Terrace Garden', 'Corner Plot', 'Verified Documents'],
      amenities: ['Garden', '24x7 security', 'Power backup', 'Covered parking', 'Lift'],
      description: 'Contemporary minimalist residence featuring private terrace garden and refined wood finishes. Bright layout with natural cross ventilation.',
      images: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      ],
    },
    {
      id: 'jubilee-hills-horizon-residence',
      propertyId: 'IGH-HYD-05',
      title: 'Jubilee Hills Horizon Residence',
      propertyType: 'Villa',
      category: 'VILLA • 4+ BHK',
      bedrooms: 4,
      bathrooms: 5,
      price: '₹6.5 Cr',
      priceNumeric: 65000000,
      status: 'AVAILABLE',
      city: 'Hyderabad',
      locality: 'Jubilee Hills',
      location: 'Jubilee Hills, Hyderabad',
      area_sqft: '5,200',
      builtUpArea: '5,200 sq ft',
      carpetArea: '4,600 sq ft',
      furnishing: 'Furnished',
      possession: 'Ready to Move',
      isFeatured: false,
      listingLabel: 'Property for Sale',
      highlights: ['Golf Course Outlook', 'Infinity Lap Pool', 'Smart Automation'],
      amenities: ['Swimming pool', 'Gym', 'Clubhouse', '24x7 security', 'Lift', 'Power backup'],
      description: 'Commanding prime position in Jubilee Hills. Offers expansive double-height gallery living, heated lap pool, and bespoke Italian kitchen.',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      ],
    },
    {
      id: 'ecr-coastal-sanctuary',
      propertyId: 'IGH-CHE-07',
      title: 'ECR Ocean Sanctuary Villa',
      propertyType: 'Villa',
      category: 'VILLA • 4+ BHK',
      bedrooms: 4,
      bathrooms: 5,
      price: '₹5.2 Cr',
      priceNumeric: 52000000,
      status: 'AVAILABLE',
      city: 'Chennai',
      locality: 'East Coast Road',
      location: 'East Coast Road, Chennai',
      area_sqft: '4,800',
      builtUpArea: '4,800 sq ft',
      carpetArea: '4,100 sq ft',
      furnishing: 'Furnished',
      possession: 'Ready to Move',
      isFeatured: true,
      listingLabel: 'Property for Sale',
      highlights: ['Direct Beach Access', 'Private Saltwater Pool', 'Pergola Deck'],
      amenities: ['Swimming pool', 'Garden', '24x7 security', 'Covered parking', 'Power backup'],
      description: 'Coastal modernist sanctuary framed by tranquil ocean breezes, shaded limestone pergolas, and floor-to-ceiling acoustic glass curtains.',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      ],
    },
    {
      id: 'indiranagar-modernist-pavilion',
      propertyId: 'IGH-BLR-08',
      title: 'Indiranagar Urban Pavilion',
      propertyType: 'Independent house',
      category: 'INDEPENDENT HOUSE • 3 BHK',
      bedrooms: 3,
      bathrooms: 3,
      price: '₹2.8 Cr',
      priceNumeric: 28000000,
      status: 'AVAILABLE',
      city: 'Bangalore',
      locality: 'Indiranagar',
      location: 'Indiranagar, Bangalore',
      area_sqft: '2,600',
      builtUpArea: '2,600 sq ft',
      carpetArea: '2,250 sq ft',
      furnishing: 'Semi-Furnished',
      possession: 'Immediate',
      isFeatured: false,
      listingLabel: 'Property for Sale',
      highlights: ['Architectural Concrete', 'Private Rooftop Deck', 'Central Location'],
      amenities: ['Gym', 'Lift', '24x7 security', 'Covered parking', 'Power backup'],
      description: 'Modernist concrete pavilion in a quiet tree-lined Indiranagar avenue. Features private courtyard, automated louvers, and rooftop lounge.',
      images: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      ],
    },
    {
      id: 'hitec-city-executive-suite',
      propertyId: 'IGH-HYD-09',
      title: 'Hitec City Horizon Studio Suite',
      propertyType: 'Gated society',
      category: 'GATED SOCIETY • 1 BHK',
      bedrooms: 1,
      bathrooms: 1,
      price: '₹48 L',
      priceNumeric: 4800000,
      status: 'AVAILABLE',
      city: 'Hyderabad',
      locality: 'Hitec City',
      location: 'Hitec City, Hyderabad',
      area_sqft: '750',
      builtUpArea: '750 sq ft',
      carpetArea: '640 sq ft',
      furnishing: 'Furnished',
      possession: 'Ready to Move',
      isFeatured: false,
      listingLabel: 'Property for Sale',
      highlights: ['High Rental Yield', 'Direct Metro Connectivity', 'Concierge Service'],
      amenities: ['Gym', 'Lift', '24x7 security', 'Power backup', 'Clubhouse'],
      description: 'High-yield executive residence overlooking the Cyberabad business district. Finished with smart lighting and automated biometric entry.',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
      ],
    },
    {
      id: 'boat-club-heritage-manor',
      propertyId: 'IGH-CHE-10',
      title: 'Boat Club Sovereign Manor',
      propertyType: 'Independent house',
      category: 'INDEPENDENT HOUSE • 4+ BHK',
      bedrooms: 5,
      bathrooms: 6,
      price: '₹8.9 Cr',
      priceNumeric: 89000000,
      status: 'SOLD',
      city: 'Chennai',
      locality: 'Boat Club Road',
      location: 'Boat Club Road, Chennai',
      area_sqft: '6,100',
      builtUpArea: '6,100 sq ft',
      carpetArea: '5,300 sq ft',
      furnishing: 'Furnished',
      possession: 'Immediate',
      isFeatured: false,
      listingLabel: 'Property for Sale',
      highlights: ['Ultra-HNI Enclave', 'Grand Atrium', 'Century Trees'],
      amenities: ['Garden', 'Covered parking', 'Lift', '24x7 security', 'Power backup'],
      description: 'Prestige sovereign manor in Chennai\'s most exclusive residential address. Grand internal atrium, private courtyard pool, and manicured lawns.',
      images: [
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      ],
    },
    {
      id: 'omr-green-meadows-habitat',
      propertyId: 'IGH-CHE-11',
      title: 'OMR Green Meadows Habitat',
      propertyType: 'Gated society',
      category: 'GATED SOCIETY • 2 BHK',
      bedrooms: 2,
      bathrooms: 2,
      price: '₹68 L',
      priceNumeric: 6800000,
      status: 'AVAILABLE',
      city: 'Chennai',
      locality: 'Old Mahabalipuram Road',
      location: 'OMR, Chennai',
      area_sqft: '1,150',
      builtUpArea: '1,150 sq ft',
      carpetArea: '980 sq ft',
      furnishing: 'Semi-Furnished',
      possession: 'Ready to Move',
      isFeatured: false,
      listingLabel: 'Property for Sale',
      highlights: ['Gated Community', 'Kids Play Area', 'High Speed Elevators'],
      amenities: ['Swimming pool', 'Gym', 'Clubhouse', 'Power backup', 'Lift', '24x7 security'],
      description: 'Modern family apartment in a prime gated township along Chennai’s tech spine. Clubhouse, landscaped jogging tracks, and 24/7 security.',
      images: [
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
      ],
    },
    {
      id: 'anna-nagar-residential-plot',
      propertyId: 'IGH-CHE-12',
      title: 'Anna Nagar Prime Residential Plot',
      propertyType: 'Plot',
      category: 'PLOT • RESIDENTIAL',
      bedrooms: 0,
      bathrooms: 0,
      price: '₹1.1 Cr',
      priceNumeric: 11000000,
      status: 'AVAILABLE',
      city: 'Chennai',
      locality: 'Anna Nagar West',
      location: 'Anna Nagar, Chennai',
      area_sqft: '2,400',
      builtUpArea: '2,400 sq ft plot',
      carpetArea: '2,400 sq ft plot',
      furnishing: 'Unfurnished',
      possession: 'Immediate',
      isFeatured: false,
      listingLabel: 'Property for Sale',
      highlights: ['Clear CMDA Titles', '40ft Wide Road', 'Ready for Construction'],
      amenities: ['24x7 security', 'Garden'],
      description: 'Rare rectangular CMDA approved freehold residential plot in Anna Nagar West. Optimal dimensions for building an bespoke multi-tier architectural mansion.',
      images: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      ],
    },
  ];

  // Helper to escape HTML characters
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // =========================================================================
  // 2. STATE MANAGEMENT & URL SYNC
  // =========================================================================

  let rawProperties = [];
  let filteredProperties = [];
  let displayedCount = 9;
  const PAGE_SIZE = 9;

  const filterState = {
    search: '',
    type: 'all',
    bhk: 'all',
    budget: 'all',
    features: 'all',
    sort: 'featured',
    city: 'all',
    status: 'all',
  };

  // Wishlist / favorites state in localStorage
  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem('igrey_favorites') || '{}');
    } catch {
      return {};
    }
  }

  function setFavorites(favs) {
    try {
      localStorage.setItem('igrey_favorites', JSON.stringify(favs));
    } catch {
      // ignore
    }
  }

  function toggleFavorite(id) {
    const favs = getFavorites();
    favs[id] = !favs[id];
    setFavorites(favs);
    return favs[id];
  }

  // Read URL query params
  function readParamsFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('search')) filterState.search = params.get('search') || '';
    if (params.has('type')) filterState.type = params.get('type') || 'all';
    if (params.has('bhk')) filterState.bhk = params.get('bhk') || 'all';
    if (params.has('budget')) filterState.budget = params.get('budget') || 'all';
    if (params.has('features')) filterState.features = params.get('features') || 'all';
    if (params.has('sort')) filterState.sort = params.get('sort') || 'featured';
    if (params.has('city')) filterState.city = params.get('city') || 'all';
    if (params.has('status')) filterState.status = params.get('status') || 'all';
  }

  // Sync state to URL without reloading
  function syncParamsToUrl() {
    const params = new URLSearchParams();
    if (filterState.search) params.set('search', filterState.search);
    if (filterState.type && filterState.type !== 'all') params.set('type', filterState.type);
    if (filterState.bhk && filterState.bhk !== 'all') params.set('bhk', filterState.bhk);
    if (filterState.budget && filterState.budget !== 'all') params.set('budget', filterState.budget);
    if (filterState.features && filterState.features !== 'all') params.set('features', filterState.features);
    if (filterState.sort && filterState.sort !== 'featured') params.set('sort', filterState.sort);
    if (filterState.city && filterState.city !== 'all') params.set('city', filterState.city);
    if (filterState.status && filterState.status !== 'all') params.set('status', filterState.status);

    const qs = params.toString();
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    try {
      window.history.replaceState({ ...filterState }, '', newUrl);
    } catch {
      // ignore
    }

    updateClearFiltersButton();
  }

  function isAnyFilterActive() {
    return (
      (filterState.search && filterState.search.trim().length > 0) ||
      (filterState.type && filterState.type !== 'all') ||
      (filterState.bhk && filterState.bhk !== 'all') ||
      (filterState.budget && filterState.budget !== 'all') ||
      (filterState.features && filterState.features !== 'all') ||
      (filterState.sort && filterState.sort !== 'featured') ||
      (filterState.city && filterState.city !== 'all') ||
      (filterState.status && filterState.status !== 'all')
    );
  }

  function updateClearFiltersButton() {
    const btn = document.getElementById('clear-filters-btn');
    if (btn) {
      btn.style.display = isAnyFilterActive() ? 'inline-flex' : 'none';
    }
  }

  // =========================================================================
  // 3. FILTERING & SORTING LOGIC
  // =========================================================================

  function applyFiltersAndSort() {
    const q = filterState.search.trim().toLowerCase();
    const typeFilter = filterState.type.toLowerCase();
    const bhkFilter = filterState.bhk.toLowerCase();
    const budgetFilter = filterState.budget.toLowerCase();
    const featFilter = filterState.features.toLowerCase();
    const cityFilter = filterState.city.toLowerCase();
    const statusFilter = filterState.status.toLowerCase();

    // 1. Filter
    filteredProperties = rawProperties.filter((p) => {
      // Search: matches title, locality, city, propertyId
      if (q) {
        const title = (p.title || p.name || '').toLowerCase();
        const loc = (p.locality || '').toLowerCase();
        const city = (p.city || '').toLowerCase();
        const code = (p.propertyId || p.id || '').toLowerCase();
        const matchSearch =
          title.includes(q) || loc.includes(q) || city.includes(q) || code.includes(q);
        if (!matchSearch) return false;
      }

      // Type: all, gated society, villa, independent house, plot
      if (typeFilter !== 'all') {
        const propType = (p.propertyType || '').toLowerCase();
        if (typeFilter === 'gated society' || typeFilter === 'gated') {
          if (!propType.includes('gated') && !propType.includes('apartment') && !propType.includes('society')) {
            return false;
          }
        } else if (typeFilter === 'villa') {
          if (!propType.includes('villa')) return false;
        } else if (typeFilter === 'independent house' || typeFilter === 'independent') {
          if (!propType.includes('independent') && !propType.includes('house') && !propType.includes('manor')) {
            return false;
          }
        } else if (typeFilter === 'plot') {
          if (!propType.includes('plot')) return false;
        } else if (!propType.includes(typeFilter)) {
          return false;
        }
      }

      // Bedrooms: all, 1, 2, 3, 4+
      if (bhkFilter !== 'all') {
        const bed = Number(p.bedrooms) || 0;
        if (bhkFilter === '1' && bed !== 1) return false;
        if (bhkFilter === '2' && bed !== 2) return false;
        if (bhkFilter === '3' && bed !== 3) return false;
        if (bhkFilter === '4+' && bed < 4) return false;
      }

      // Budget: all, under-50l, 50l-1cr, 1cr-2cr, above-2cr
      if (budgetFilter !== 'all') {
        const num = Number(p.priceNumeric) || 0;
        if (budgetFilter === 'under-50l' && num >= 5000000) return false;
        if (budgetFilter === '50l-1cr' && (num < 5000000 || num > 10000000)) return false;
        if (budgetFilter === '1cr-2cr' && (num <= 10000000 || num > 20000000)) return false;
        if (budgetFilter === 'above-2cr' && num <= 20000000) return false;
      }

      // Features / Amenities
      if (featFilter !== 'all') {
        const allFeats = [
          ...(p.amenities || []),
          ...(p.highlights || []),
        ].map((f) => String(f).toLowerCase());
        const hasFeature = allFeats.some((f) => f.includes(featFilter));
        if (!hasFeature) return false;
      }

      // City chips: all, bangalore, mysuru, hyderabad, chennai
      if (cityFilter !== 'all') {
        const propCity = (p.city || '').toLowerCase();
        if (!propCity.includes(cityFilter)) return false;
      }

      // Status chips: all, available, upcoming, under offer, sold
      if (statusFilter !== 'all') {
        const propStatus = (p.status || '').toLowerCase();
        if (statusFilter === 'available') {
          if (!propStatus.includes('available') && !propStatus.includes('active')) return false;
        } else if (statusFilter === 'upcoming') {
          if (!propStatus.includes('upcoming')) return false;
        } else if (statusFilter === 'under offer' || statusFilter === 'under_offer' || statusFilter === 'underoffer') {
          if (!propStatus.includes('offer') && !propStatus.includes('construction')) return false;
        } else if (statusFilter === 'sold') {
          if (!propStatus.includes('sold')) return false;
        }
      }

      return true;
    });

    // 2. Sort
    // "Featured First" puts featured properties at the top.
    // Sold properties always go to the end of the list when sort is "Featured First" or "Newest First"!
    const isSold = (p) => (p.status || '').toUpperCase().includes('SOLD');

    filteredProperties.sort((a, b) => {
      const aSold = isSold(a);
      const bSold = isSold(b);

      if (filterState.sort === 'featured') {
        // Sold goes to end
        if (aSold !== bSold) return aSold ? 1 : -1;
        // Featured first
        if (a.isFeatured !== b.isFeatured) return b.isFeatured ? 1 : -1;
        return 0;
      }

      if (filterState.sort === 'newest') {
        // Sold goes to end
        if (aSold !== bSold) return aSold ? 1 : -1;
        const aDate = new Date(a.created_at || a.createdAt || 0).getTime();
        const bDate = new Date(b.created_at || b.createdAt || 0).getTime();
        if (aDate !== bDate) return bDate - aDate;
        return String(b.propertyId || '').localeCompare(String(a.propertyId || ''));
      }

      if (filterState.sort === 'price-asc') {
        return (a.priceNumeric || 0) - (b.priceNumeric || 0);
      }

      if (filterState.sort === 'price-desc') {
        return (b.priceNumeric || 0) - (a.priceNumeric || 0);
      }

      if (filterState.sort === 'area-desc') {
        const aArea = parseFloat(String(a.area_sqft || a.builtUpArea || '0').replace(/[^0-9.]/g, '')) || 0;
        const bArea = parseFloat(String(b.area_sqft || b.builtUpArea || '0').replace(/[^0-9.]/g, '')) || 0;
        return bArea - aArea;
      }

      return 0;
    });

    // Reset pagination to first batch
    displayedCount = PAGE_SIZE;

    renderGrid();
    syncParamsToUrl();
  }

  // =========================================================================
  // 4. RENDERING PROPERTY CARDS & GRID
  // =========================================================================

  function getBadgeConfig(status) {
    if (!status || !status.trim()) return null;
    const s = status.trim().toUpperCase();

    if (s.includes('SOLD')) {
      return {
        modifier: 'status-badge--sold',
        label: 'SOLD',
        ariaLabel: 'Status: Sold',
      };
    }
    if (s.includes('UPCOMING')) {
      return {
        modifier: 'status-badge--upcoming',
        label: 'UPCOMING',
        ariaLabel: 'Status: Upcoming',
      };
    }
    if (s.includes('OFFER') || s.includes('CONSTRUCTION')) {
      return {
        modifier: 'status-badge--under-offer',
        label: 'UNDER OFFER',
        ariaLabel: 'Status: Under Offer',
      };
    }
    return {
      modifier: 'status-badge--available',
      label: 'AVAILABLE',
      ariaLabel: 'Status: Available',
    };
  }

  function renderCard(prop) {
    const images = Array.isArray(prop.images) && prop.images.length > 0
      ? prop.images
      : [prop.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'];

    const totalPhotos = images.length;
    const badge = getBadgeConfig(prop.status);
    const favs = getFavorites();
    const isFav = !!favs[prop.id || prop.propertyId];

    const safeTitle = escapeHtml(prop.title || prop.name || 'Exclusive Residence');
    const safeCategory = escapeHtml(prop.category || `${(prop.propertyType || 'Villa').toUpperCase()} • ${prop.bedrooms || 2} BHK`);
    const safePrice = escapeHtml(prop.price || 'Price on Request');
    const safeLocation = escapeHtml(prop.location || `${prop.locality || ''}, ${prop.city || 'South India'}`);
    const safeCode = escapeHtml(prop.propertyId || prop.id || 'SS-PROP-01');
    const safeLabel = escapeHtml(prop.listingLabel || 'Property for Sale');

    // Slide images HTML
    const slidesHtml = images
      .map(
        (src, idx) => `
        <img
          src="${escapeHtml(src)}"
          alt="${safeTitle} - Photo ${idx + 1}"
          class="card-slide-img ${idx === 0 ? 'active' : ''}"
          data-slide-index="${idx}"
          loading="lazy"
          decoding="async"
        />
      `
      )
      .join('');

    // Dots HTML
    const dotsHtml = images
      .map(
        (_, idx) => `
        <button
          type="button"
          class="card-dot ${idx === 0 ? 'active' : ''}"
          data-dot-index="${idx}"
          aria-label="View photo ${idx + 1}"
        ></button>
      `
      )
      .join('');

    // Status Badge HTML
    const badgeHtml = badge
      ? `
        <div class="status-badge ${badge.modifier}" aria-label="${badge.ariaLabel}">
          <span class="status-badge__dot" aria-hidden="true"></span>
          <span>${badge.label}</span>
        </div>
      `
      : '';

    return `
      <div
        class="property-card-curated"
        data-property-id="${escapeHtml(prop.id || prop.propertyId)}"
        tabindex="0"
        role="article"
        aria-label="Property: ${safeTitle} - ${safePrice}"
      >
        <!-- Top Carousel Area -->
        <div class="card-image-box" data-active-slide="0" data-total-slides="${totalPhotos}">
          <div class="card-slides-wrapper">
            ${slidesHtml}
          </div>

          <!-- Status Badge (Top-Left) -->
          ${badgeHtml}

          <!-- Wishlist Heart Button (Top-Right) -->
          <button
            type="button"
            class="card-heart-btn ${isFav ? 'is-favorite' : ''}"
            data-favorite-id="${escapeHtml(prop.id || prop.propertyId)}"
            aria-label="${isFav ? 'Remove from wishlist' : 'Save to wishlist'}"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#090D0B' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>

          <!-- Prev/Next Controls (If multiple photos) -->
          ${
            totalPhotos > 1
              ? `
            <button type="button" class="carousel-btn prev" aria-label="Previous image">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button type="button" class="carousel-btn next" aria-label="Next image">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          `
              : ''
          }

          <!-- Photo Counter Pill (Bottom-Right, e.g. "1 / 5") -->
          <div class="photo-counter-pill" aria-hidden="true">
            <span class="current-photo-num">1</span> / ${totalPhotos}
          </div>

          <!-- Video Indicator Pill (Bottom-Left) -->
          ${Array.isArray(prop.videos) && prop.videos.length > 0 ? `
            <div class="card-video-pill" aria-label="Property includes video">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              <span>VIDEO</span>
            </div>
          ` : ''}

          <!-- Dots Indicator (Bottom-Center) -->
          ${totalPhotos > 1 ? `<div class="card-dots-bar">${dotsHtml}</div>` : ''}
        </div>

        <!-- Card Body -->
        <div class="card-body">
          <div>
            <div class="card-row-category-price">
              <span class="card-category-label">${safeCategory}</span>
              <span class="card-price-value">${safePrice}</span>
            </div>

            <h3 class="card-title">${safeTitle}</h3>

            <div class="card-location">
              <span class="card-location-diamond">✦</span>
              <span>${safeLocation} • ID: ${safeCode}</span>
            </div>
          </div>

          <div class="card-row-footer">
            <span class="card-tag-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
              <span>${safeLabel}</span>
            </span>

            <span class="card-inquire-btn">
              <span>Inquire</span>
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    `;
  }

  function renderGrid() {
    const grid = document.getElementById('properties-grid');
    const resultsCount = document.getElementById('results-count');
    const loadMoreContainer = document.getElementById('load-more-container');
    const loadMoreBtn = document.getElementById('btn-load-more');
    const loadMoreLabel = document.getElementById('load-more-label');

    if (!grid) return;

    const total = filteredProperties.length;
    if (resultsCount) {
      resultsCount.textContent = total;
    }

    // Empty State
    if (total === 0) {
      grid.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-state-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
          </div>
          <h2 class="empty-state-title">No properties match your filters</h2>
          <p class="empty-state-desc">Try clearing your filters or broadening your search criteria to discover our portfolio.</p>
          <button type="button" class="btn-empty-clear" id="btn-empty-clear-action">Clear all filters</button>
        </div>
      `;

      if (loadMoreContainer) loadMoreContainer.style.display = 'none';

      const emptyClearBtn = document.getElementById('btn-empty-clear-action');
      if (emptyClearBtn) {
        emptyClearBtn.addEventListener('click', resetAllFilters);
      }
      return;
    }

    // Paginated slice
    const slice = filteredProperties.slice(0, displayedCount);
    grid.innerHTML = slice.map(renderCard).join('');

    // Attach carousel and card interactions
    initCardInteractions();

    // Load More Visibility
    if (loadMoreContainer && loadMoreBtn && loadMoreLabel) {
      if (total > displayedCount) {
        loadMoreContainer.style.display = 'flex';
        loadMoreLabel.textContent = `Showing ${slice.length} of ${total}`;
      } else {
        loadMoreContainer.style.display = 'none';
      }
    }
  }

  // =========================================================================
  // 5. CAROUSEL & CARD EVENTS
  // =========================================================================

  function initCardInteractions() {
    const cards = document.querySelectorAll('.property-card-curated');

    cards.forEach((card) => {
      const propId = card.getAttribute('data-property-id');
      const prop = rawProperties.find((p) => String(p.id) === propId || String(p.propertyId) === propId);

      // Card click opens modal
      card.addEventListener('click', (e) => {
        // Ignore clicks on carousel buttons or favorite heart
        if (e.target.closest('.carousel-btn') || e.target.closest('.card-heart-btn') || e.target.closest('.card-dot')) {
          return;
        }
        if (prop) {
          openPropertyModal(prop);
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          if (prop) openPropertyModal(prop);
        }
      });

      // Heart button toggle
      const heartBtn = card.querySelector('.card-heart-btn');
      if (heartBtn) {
        heartBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isNowFav = toggleFavorite(propId);
          heartBtn.classList.toggle('is-favorite', isNowFav);
          heartBtn.setAttribute('aria-label', isNowFav ? 'Remove from wishlist' : 'Save to wishlist');
          const svg = heartBtn.querySelector('svg');
          if (svg) svg.setAttribute('fill', isNowFav ? '#090D0B' : 'none');
        });
      }

      // Carousel controls
      const imageBox = card.querySelector('.card-image-box');
      if (!imageBox) return;

      const totalSlides = parseInt(imageBox.getAttribute('data-total-slides'), 10) || 1;
      if (totalSlides <= 1) return;

      const slides = imageBox.querySelectorAll('.card-slide-img');
      const dots = imageBox.querySelectorAll('.card-dot');
      const counterSpan = imageBox.querySelector('.current-photo-num');

      function goToSlide(newIdx) {
        const safeIdx = ((newIdx % totalSlides) + totalSlides) % totalSlides;
        imageBox.setAttribute('data-active-slide', safeIdx);

        slides.forEach((img, i) => {
          img.classList.toggle('active', i === safeIdx);
        });

        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === safeIdx);
        });

        if (counterSpan) {
          counterSpan.textContent = safeIdx + 1;
        }
      }

      const prevBtn = imageBox.querySelector('.carousel-btn.prev');
      const nextBtn = imageBox.querySelector('.carousel-btn.next');

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const current = parseInt(imageBox.getAttribute('data-active-slide'), 10) || 0;
          goToSlide(current - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const current = parseInt(imageBox.getAttribute('data-active-slide'), 10) || 0;
          goToSlide(current + 1);
        });
      }

      dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const idx = parseInt(dot.getAttribute('data-dot-index'), 10) || 0;
          goToSlide(idx);
        });
      });

      // Touch swipe support
      let touchStartX = null;
      let touchStartY = null;

      imageBox.addEventListener(
        'touchstart',
        (e) => {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        },
        { passive: true }
      );

      imageBox.addEventListener(
        'touchend',
        (e) => {
          if (touchStartX === null) return;
          const diffX = e.changedTouches[0].clientX - touchStartX;
          const diffY = e.changedTouches[0].clientY - (touchStartY || 0);

          if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
            const current = parseInt(imageBox.getAttribute('data-active-slide'), 10) || 0;
            if (diffX < 0) {
              goToSlide(current + 1);
            } else {
              goToSlide(current - 1);
            }
          }
          touchStartX = null;
          touchStartY = null;
        },
        { passive: true }
      );
    });
  }

  // =========================================================================
  // 6. PROPERTY DETAILS MODAL POPUP
  // =========================================================================

  let activeModalProperty = null;
  let activeModalItem = { type: 'photo', index: 0 };

  function unloadActiveVideo() {
    const modal = document.getElementById('property-details-modal');
    if (!modal) return;
    const vids = modal.querySelectorAll('video');
    vids.forEach((v) => {
      try {
        v.pause();
        v.removeAttribute('src');
        v.load();
      } catch (e) {}
    });
    const ifrs = modal.querySelectorAll('iframe');
    ifrs.forEach((f) => {
      try {
        f.src = 'about:blank';
        f.remove();
      } catch (e) {}
    });
  }

  function openPropertyModal(prop) {
    unloadActiveVideo();
    activeModalProperty = prop;
    activeModalItem = { type: 'photo', index: 0 };

    const modal = document.getElementById('property-details-modal');
    if (!modal) return;

    renderModalContent();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closePropertyModal() {
    unloadActiveVideo();
    const modal = document.getElementById('property-details-modal');
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeModalProperty = null;
  }

  function renderModalContent() {
    const prop = activeModalProperty;
    if (!prop) return;

    const modal = document.getElementById('property-details-modal');
    if (!modal) return;

    const images = Array.isArray(prop.images) && prop.images.length > 0
      ? prop.images
      : [prop.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'];

    // Filter videos to only allow safe hosts or storage bucket
    const rawVideos = Array.isArray(prop.videos) ? prop.videos : [];
    const videos = rawVideos.filter((v) => {
      if (!v) return false;
      if (v.type === 'youtube') return /^[a-zA-Z0-9_-]{11}$/.test(String(v.id || ''));
      if (v.type === 'vimeo') return /^[0-9]{6,12}$/.test(String(v.id || ''));
      if (v.type === 'file') return typeof v.url === 'string' && (v.url.includes('/property-videos/') || v.url.includes('/storage/'));
      return false;
    });

    const totalPhotos = images.length;
    const safeTitle = escapeHtml(prop.title || prop.name || 'Exclusive Residence');
    const safeCategory = escapeHtml(prop.category || `${(prop.propertyType || 'Villa').toUpperCase()} • ${prop.bedrooms || 2} BHK`);
    const safePrice = escapeHtml(prop.price || 'Price on Request');
    const safeLocation = escapeHtml(prop.location || `${prop.locality || ''}, ${prop.city || 'South India'}`);
    const safeDesc = escapeHtml(prop.description || prop.fullDescription || prop.shortDescription || 'Bespoke architectural residence offering privacy and refined craftsmanship.');

    // Gallery Thumbnails: photos first, then videos
    let thumbsHtml = images
      .map(
        (src, idx) => `
        <button
          type="button"
          class="modal-thumb-btn ${activeModalItem.type === 'photo' && activeModalItem.index === idx ? 'active' : ''}"
          data-item-type="photo"
          data-item-idx="${idx}"
          aria-label="View photo ${idx + 1}"
        >
          <img src="${escapeHtml(src)}" alt="Thumbnail ${idx + 1}" loading="lazy">
        </button>
      `
      )
      .join('');

    if (videos.length > 0) {
      thumbsHtml += videos
        .map((v, vIdx) => {
          const poster = v.poster || (v.type === 'youtube' ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : '');
          return `
            <button
              type="button"
              class="modal-thumb-btn modal-thumb-video ${activeModalItem.type === 'video' && activeModalItem.index === vIdx ? 'active' : ''}"
              data-item-type="video"
              data-item-idx="${vIdx}"
              aria-label="Play video ${vIdx + 1}"
            >
              <img src="${escapeHtml(poster)}" alt="Video thumbnail ${vIdx + 1}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'58\' height=\'42\' fill=\'%23121816\'%3E%3Crect width=\'100%25\' height=\'100%25\'/%3E%3C/svg%3E';" />
              <span class="thumb-video-badge" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              </span>
            </button>
          `;
        })
        .join('');
    }

    // Amenities Chips HTML
    const amenities = Array.isArray(prop.amenities) ? prop.amenities : [];
    const amenitiesHtml = amenities
      .map((item) => `<span class="modal-amenity-tag">${escapeHtml(item)}</span>`)
      .join('');

    modal.innerHTML = `
      <div class="property-modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-prop-title">
        <button type="button" class="modal-close-btn" aria-label="Close dialog">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <!-- Left Gallery Column -->
        <div class="modal-gallery-col">
          <div class="modal-main-image-box" id="modal-main-media-box">
            <!-- Main media content is mounted dynamically -->
          </div>

          ${(totalPhotos + videos.length) > 1 ? `<div class="modal-thumbnails-row">${thumbsHtml}</div>` : ''}
        </div>

        <!-- Right Details Column -->
        <div class="modal-details-col">
          <span class="modal-prop-category">${safeCategory}</span>
          <h2 class="modal-prop-title" id="modal-prop-title">${safeTitle}</h2>
          <div class="card-location" style="margin-bottom: 8px;">
            <span class="card-location-diamond">✦</span>
            <span>${safeLocation}</span>
          </div>
          <div class="modal-prop-price">${safePrice}</div>

          <!-- Specs Grid -->
          <div class="modal-specs-grid">
            <div class="modal-spec-item">
              <span class="modal-spec-label">Bedrooms</span>
              <span class="modal-spec-value">${prop.bedrooms || '—'} BHK</span>
            </div>
            <div class="modal-spec-item">
              <span class="modal-spec-label">Bathrooms</span>
              <span class="modal-spec-value">${prop.bathrooms || '—'} Baths</span>
            </div>
            <div class="modal-spec-item">
              <span class="modal-spec-label">Built-up Area</span>
              <span class="modal-spec-value">${escapeHtml(prop.builtUpArea || prop.area_sqft ? prop.area_sqft + ' sq ft' : '—')}</span>
            </div>
            <div class="modal-spec-item">
              <span class="modal-spec-label">Furnishing</span>
              <span class="modal-spec-value">${escapeHtml(prop.furnishing || 'Furnished')}</span>
            </div>
          </div>

          <!-- Description -->
          <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin-bottom: 14px;">
            ${safeDesc}
          </p>

          <!-- Amenities -->
          ${
            amenities.length > 0
              ? `
            <div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; font-weight: 600;">Amenities & Features</div>
            <div class="modal-amenities-tags">${amenitiesHtml}</div>
          `
              : ''
          }

          <!-- Enquire CTA Button -->
          <a
            href="./#contact"
            class="btn-modal-enquire"
            id="modal-enquire-action"
          >
            <span>Enquire About This Property</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    `;

    // Dynamic Main Media Rendering (no layout jump, 16:10 ratio)
    function displayMainItem(item) {
      unloadActiveVideo();
      const mediaBox = modal.querySelector('#modal-main-media-box');
      if (!mediaBox) return;

      if (item.type === 'photo') {
        const photoUrl = images[item.index] || images[0];
        mediaBox.innerHTML = `
          <img id="modal-main-image" src="${escapeHtml(photoUrl)}" alt="${safeTitle}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
          <div class="photo-counter-pill" id="modal-counter-pill" style="bottom: 12px; right: 12px;">
            <span id="modal-counter-num">${item.index + 1}</span> / ${totalPhotos}
          </div>
        `;
      } else if (item.type === 'video') {
        const v = videos[item.index];
        if (!v) return;
        const posterUrl = v.poster || (v.type === 'youtube' ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : '');

        if (v.type === 'youtube' || v.type === 'vimeo') {
          mediaBox.innerHTML = `
            <div class="modal-video-box" id="modal-video-placeholder" style="cursor: pointer; position: absolute; inset: 0; width: 100%; height: 100%;">
              <img src="${escapeHtml(posterUrl)}" alt="${safeTitle} video thumbnail" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.onerror=null; this.style.display='none';" />
              <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.38); display: flex; align-items: center; justify-content: center;">
                <button type="button" class="modal-video-play-btn" aria-label="Play ${safeTitle} video">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 3px;"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                </button>
              </div>
            </div>
          `;

          const placeholder = mediaBox.querySelector('#modal-video-placeholder');
          if (placeholder) {
            const startPlaying = () => {
              unloadActiveVideo();
              let embedUrl = '';
              if (v.type === 'youtube') {
                embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}?autoplay=1&rel=0`;
              } else if (v.type === 'vimeo') {
                embedUrl = `https://player.vimeo.com/video/${encodeURIComponent(v.id)}?autoplay=1`;
              }
              mediaBox.innerHTML = `
                <div class="modal-video-box" style="position: absolute; inset: 0; width: 100%; height: 100%;">
                  <iframe
                    src="${embedUrl}"
                    title="${safeTitle} Video"
                    loading="lazy"
                    allow="fullscreen; picture-in-picture"
                    allowfullscreen
                    style="width: 100%; height: 100%; border: none; display: block;"
                    onerror="this.parentElement.innerHTML='<div class=\\\'video-error-state\\\'>This video isn\\\'t available right now</div>'"
                  ></iframe>
                </div>
              `;
            };
            placeholder.addEventListener('click', startPlaying);
          }
        } else if (v.type === 'file') {
          // Uploaded file: controls, playsinline, preload="none", never autoplay
          mediaBox.innerHTML = `
            <div class="modal-video-box" style="position: absolute; inset: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
              <video
                controls
                playsinline
                preload="none"
                poster="${escapeHtml(posterUrl)}"
                style="width: 100%; height: 100%; object-fit: contain; display: block;"
                onerror="this.parentElement.innerHTML='<div class=\'video-error-state\'>This video isn\'t available right now</div>'"
              >
                <source src="${escapeHtml(v.url)}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          `;
        }
      }

      // Update active thumbnail borders
      const allThumbs = modal.querySelectorAll('.modal-thumb-btn');
      allThumbs.forEach((btn) => {
        const bType = btn.getAttribute('data-item-type');
        const bIdx = parseInt(btn.getAttribute('data-item-idx'), 10);
        btn.classList.toggle('active', bType === item.type && bIdx === item.index);
      });
    }

    // Initialize media box with current active item
    displayMainItem(activeModalItem);

    // Modal Close
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closePropertyModal);
    }

    // Thumbnail click events
    const thumbBtns = modal.querySelectorAll('.modal-thumb-btn');
    thumbBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const itemType = btn.getAttribute('data-item-type') || 'photo';
        const itemIdx = parseInt(btn.getAttribute('data-item-idx'), 10) || 0;
        activeModalItem = { type: itemType, index: itemIdx };
        displayMainItem(activeModalItem);
      });
    });

    // Enquire CTA click
    const enquireBtn = document.getElementById('modal-enquire-action');
    if (enquireBtn) {
      enquireBtn.addEventListener('click', () => {
        closePropertyModal();
      });
    }
  }

  // Global Keydown (Escape to close modal)
  window.addEventListener('keydown', (e) => {
    const modal = document.getElementById('property-details-modal');
    if (modal && modal.classList.contains('is-open')) {
      if (e.key === 'Escape') {
        closePropertyModal();
      }
    }
  });

  // =========================================================================
  // 7. CONTROLS SETUP & EVENT LISTENERS
  // =========================================================================

  let searchDebounceTimer = null;

  function bindFilterControls() {
    // 1. Search input (debounced 250ms)
    const searchInput = document.getElementById('filter-search');
    const searchClear = document.getElementById('filter-search-clear');

    if (searchInput) {
      searchInput.value = filterState.search;
      if (searchClear) {
        searchClear.style.display = filterState.search ? 'flex' : 'none';
      }

      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchDebounceTimer);
        const val = e.target.value;
        if (searchClear) {
          searchClear.style.display = val ? 'flex' : 'none';
        }

        searchDebounceTimer = setTimeout(() => {
          filterState.search = val;
          applyFiltersAndSort();
        }, 250);
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchClear.style.display = 'none';
        filterState.search = '';
        applyFiltersAndSort();
      });
    }

    // 2. Selects
    const selectType = document.getElementById('filter-type');
    const selectBhk = document.getElementById('filter-bhk');
    const selectBudget = document.getElementById('filter-budget');
    const selectFeatures = document.getElementById('filter-features');
    const selectSort = document.getElementById('filter-sort');

    if (selectType) {
      selectType.value = filterState.type;
      selectType.addEventListener('change', (e) => {
        filterState.type = e.target.value;
        applyFiltersAndSort();
      });
    }

    if (selectBhk) {
      selectBhk.value = filterState.bhk;
      selectBhk.addEventListener('change', (e) => {
        filterState.bhk = e.target.value;
        applyFiltersAndSort();
      });
    }

    if (selectBudget) {
      selectBudget.value = filterState.budget;
      selectBudget.addEventListener('change', (e) => {
        filterState.budget = e.target.value;
        applyFiltersAndSort();
      });
    }

    if (selectFeatures) {
      selectFeatures.value = filterState.features;
      selectFeatures.addEventListener('change', (e) => {
        filterState.features = e.target.value;
        applyFiltersAndSort();
      });
    }

    if (selectSort) {
      selectSort.value = filterState.sort;
      selectSort.addEventListener('change', (e) => {
        filterState.sort = e.target.value;
        applyFiltersAndSort();
      });
    }

    // 3. City Chips
    const cityChips = document.querySelectorAll('[data-filter-group="city"] .chip-btn');
    cityChips.forEach((chip) => {
      const val = chip.getAttribute('data-value');
      const isSelected = val.toLowerCase() === filterState.city.toLowerCase();
      chip.classList.toggle('active', isSelected);
      chip.setAttribute('aria-checked', isSelected ? 'true' : 'false');

      chip.addEventListener('click', () => {
        filterState.city = val;
        cityChips.forEach((c) => {
          const match = c.getAttribute('data-value') === val;
          c.classList.toggle('active', match);
          c.setAttribute('aria-checked', match ? 'true' : 'false');
        });
        applyFiltersAndSort();
      });
    });

    // 4. Status Chips
    const statusChips = document.querySelectorAll('[data-filter-group="status"] .chip-btn');
    statusChips.forEach((chip) => {
      const val = chip.getAttribute('data-value');
      const isSelected = val.toLowerCase() === filterState.status.toLowerCase();
      chip.classList.toggle('active', isSelected);
      chip.setAttribute('aria-checked', isSelected ? 'true' : 'false');

      chip.addEventListener('click', () => {
        filterState.status = val;
        statusChips.forEach((c) => {
          const match = c.getAttribute('data-value') === val;
          c.classList.toggle('active', match);
          c.setAttribute('aria-checked', match ? 'true' : 'false');
        });
        applyFiltersAndSort();
      });
    });

    // 5. Clear Filters Link in Filter Card
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetAllFilters();
      });
    }

    // 6. Load More Button
    const loadMoreBtn = document.getElementById('btn-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        displayedCount += PAGE_SIZE;
        renderGrid();
      });
    }

    // 7. Backdrop Click to close modal
    const modalBackdrop = document.getElementById('property-details-modal');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          closePropertyModal();
        }
      });
    }

    // 8. Browser Back / Forward buttons (popstate)
    window.addEventListener('popstate', () => {
      readParamsFromUrl();
      syncControlsWithState();
      applyFiltersAndSort();
    });
  }

  function syncControlsWithState() {
    const searchInput = document.getElementById('filter-search');
    const searchClear = document.getElementById('filter-search-clear');
    if (searchInput) {
      searchInput.value = filterState.search;
      if (searchClear) searchClear.style.display = filterState.search ? 'flex' : 'none';
    }

    const selectType = document.getElementById('filter-type');
    const selectBhk = document.getElementById('filter-bhk');
    const selectBudget = document.getElementById('filter-budget');
    const selectFeatures = document.getElementById('filter-features');
    const selectSort = document.getElementById('filter-sort');

    if (selectType) selectType.value = filterState.type;
    if (selectBhk) selectBhk.value = filterState.bhk;
    if (selectBudget) selectBudget.value = filterState.budget;
    if (selectFeatures) selectFeatures.value = filterState.features;
    if (selectSort) selectSort.value = filterState.sort;

    document.querySelectorAll('[data-filter-group="city"] .chip-btn').forEach((chip) => {
      const match = chip.getAttribute('data-value').toLowerCase() === filterState.city.toLowerCase();
      chip.classList.toggle('active', match);
      chip.setAttribute('aria-checked', match ? 'true' : 'false');
    });

    document.querySelectorAll('[data-filter-group="status"] .chip-btn').forEach((chip) => {
      const match = chip.getAttribute('data-value').toLowerCase() === filterState.status.toLowerCase();
      chip.classList.toggle('active', match);
      chip.setAttribute('aria-checked', match ? 'true' : 'false');
    });

    updateClearFiltersButton();
  }

  function resetAllFilters() {
    filterState.search = '';
    filterState.type = 'all';
    filterState.bhk = 'all';
    filterState.budget = 'all';
    filterState.features = 'all';
    filterState.sort = 'featured';
    filterState.city = 'all';
    filterState.status = 'all';

    syncControlsWithState();
    applyFiltersAndSort();
  }

  // =========================================================================
  // 8. DATA INITIALIZATION & BOOTSTRAP
  // =========================================================================

  async function initPropertiesData() {
    const grid = document.getElementById('properties-grid');

    // Show 3 Skeleton Cards while initial data loads
    if (grid) {
      grid.innerHTML = [1, 2, 3]
        .map(
          () => `
        <div class="skeleton-card" aria-hidden="true">
          <div class="skeleton-img"></div>
          <div class="skeleton-body">
            <div class="skeleton-line" style="height: 14px; width: 50%;"></div>
            <div class="skeleton-line" style="height: 22px; width: 85%;"></div>
            <div class="skeleton-line" style="height: 14px; width: 65%;"></div>
          </div>
        </div>
      `
        )
        .join('');
    }

    try {
      // 1. Try fetching live published properties from Supabase backend
      let liveProps = null;
      if (window.iGreyProperties && typeof window.iGreyProperties.fetchPublishedProperties === 'function') {
        liveProps = await window.iGreyProperties.fetchPublishedProperties();
      }

      if (Array.isArray(liveProps) && liveProps.length > 0) {
        // Normalize status to standard 4
        rawProperties = liveProps.map((p) => {
          let s = (p.status || 'AVAILABLE').toUpperCase();
          if (s.includes('CONSTRUCTION') || s.includes('OFFER')) s = 'UNDER OFFER';
          else if (s.includes('UPCOMING')) s = 'UPCOMING';
          else if (s.includes('SOLD')) s = 'SOLD';
          else s = 'AVAILABLE';
          const safeVideos = Array.isArray(p.videos) && p.videos.length > 0
            ? p.videos
            : (p.id === 'prestige-golf-vista-villa' || (p.title && p.title.includes('Prestige Golf'))
                ? [{ type: 'youtube', id: 'M7lc1UVf-VE' }]
                : []);
          return { ...p, status: s, videos: safeVideos };
        });
      } else {
        // 2. Fallback catalog
        rawProperties = [...FALLBACK_PROPERTIES];
      }
    } catch (err) {
      console.warn('[iGrey Properties] Failed to load remote properties, using offline catalog:', err);
      rawProperties = [...FALLBACK_PROPERTIES];
    }

    // Read URL params and apply
    readParamsFromUrl();
    bindFilterControls();
    syncControlsWithState();
    applyFiltersAndSort();
  }

  // DOMContentLoaded bootstrap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPropertiesData);
  } else {
    initPropertiesData();
  }
})();
