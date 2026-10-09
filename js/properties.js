/**
 * iGREY HOLDINGS — Public Site Properties Loader
 * 
 * Fetches published properties from the Supabase backend.
 * Provides fallback formatting for UI cards and the Property Details Modal.
 */

(function () {
  'use strict';

  /**
   * Format numbers in standard Indian numbering system (Lakhs & Crores)
   * Example: 8500000 -> "₹85 L", 12000000 -> "₹1.2 Cr", 75000 -> "₹75,000"
   */
  function formatIndianPrice(amount) {
    const num = Number(amount);
    if (!num || isNaN(num) || num <= 0) return 'Price on Request';

    if (num >= 10000000) {
      // Crores
      const cr = num / 10000000;
      const formatted = cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2).replace(/\.?0+$/, '');
      return `₹${formatted} Cr`;
    } else if (num >= 100000) {
      // Lakhs
      const lk = num / 100000;
      const formatted = lk % 1 === 0 ? lk.toFixed(0) : lk.toFixed(2).replace(/\.?0+$/, '');
      return `₹${formatted} L`;
    } else {
      // Regular thousand comma formatting
      return '₹' + num.toLocaleString('en-IN');
    }
  }

  /**
   * Convert a raw database property row to the frontend application format
   */
  function mapPropertyRow(row) {
    if (!row) return null;

    const rawStatus = (row.status || 'available').toLowerCase();
    let displayStatus = 'AVAILABLE';
    if (rawStatus === 'upcoming') {
      displayStatus = 'UPCOMING';
    } else if (rawStatus === 'under_construction' || rawStatus === 'under construction') {
      displayStatus = 'UNDER CONSTRUCTION';
    } else if (rawStatus === 'under_offer' || rawStatus === 'under offer') {
      displayStatus = 'UNDER OFFER';
    } else if (rawStatus === 'sold') {
      displayStatus = 'SOLD';
    }

    const typeStr = (row.property_type || 'Residence').toUpperCase();
    const bedStr = (row.bedrooms || '2 BHK').toUpperCase();
    const category = `${typeStr} • ${bedStr.includes('BHK') ? bedStr : bedStr + ' BHK'}`;

    const formattedPrice = formatIndianPrice(row.price);

    const safeImages = Array.isArray(row.images) && row.images.length > 0
      ? row.images
      : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'];

    const cover = safeImages[0];
    const code = row.property_code || 'SS-PROP-01';

    return {
      id: row.id || code.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      propertyId: code,
      title: row.title || 'Exclusive Residence',
      name: row.title || 'Exclusive Residence',
      propertyType: row.property_type || 'Gated Residence',
      category: category,
      bedrooms: typeof row.bedrooms === 'number' ? row.bedrooms : parseInt(row.bedrooms, 10) || 2,
      price: formattedPrice,
      priceNumeric: Number(row.price) || 0,
      status: displayStatus,
      rawStatus: rawStatus,
      area_sqft: row.area_sqft || '1,200',
      builtUpArea: `${row.area_sqft || '1,200'} sq ft`,
      carpetArea: `${row.area_sqft || '1,050'} sq ft`,
      city: row.city || 'Mysuru',
      locality: row.locality || 'Prime Location',
      location: `${row.locality || 'Prime Location'}, ${row.city || 'Mysuru'}`,
      listingLabel: 'Property for Sale',
      listingType: 'For Sale',
      highlights: Array.isArray(row.highlights) ? row.highlights : [],
      amenities: Array.isArray(row.amenities) ? row.amenities : [],
      description: row.description || '',
      shortDescription: row.description || '',
      fullDescription: row.description || '',
      images: safeImages,
      coverImage: cover,
      galleryImages: safeImages,
      is_featured: !!row.is_featured,
      is_published: !!row.is_published,
      created_at: row.created_at,
    };
  }

  /**
   * Fetch all published properties from Supabase
   * Returns a promise resolving to an array of formatted properties.
   */
  async function fetchPublishedProperties() {
    const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
    if (!client) {
      return null; // Signals unconfigured backend -> use fallback
    }

    try {
      const { data, error } = await client
        .from('properties')
        .select('*')
        .eq('is_published', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[iGrey Properties] Supabase query error:', error.message);
        return null;
      }

      if (!data || !Array.isArray(data)) {
        return [];
      }

      return data.map(mapPropertyRow);
    } catch (err) {
      console.warn('[iGrey Properties] Fetch exception:', err);
      return null;
    }
  }

  // Export globally
  window.iGreyProperties = {
    fetchPublishedProperties: fetchPublishedProperties,
    mapPropertyRow: mapPropertyRow,
    formatIndianPrice: formatIndianPrice,
  };
})();
