/**
 * iGREY HOLDINGS — Public Site Reviews Loader
 * 
 * Fetches published client testimonials from the Supabase backend.
 */

(function () {
  'use strict';

  function getInitials(name) {
    if (!name) return 'IG';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function mapReviewRow(row) {
    if (!row) return null;
    return {
      id: row.id,
      name: row.name || 'Verified Client',
      jobTitle: row.job_title || 'Private Investor',
      company: row.company || 'Private Portfolio',
      city: row.city || 'Bengaluru',
      tag: row.tag || 'Verified investor',
      initials: getInitials(row.name),
      rating: typeof row.rating === 'number' ? row.rating : parseInt(row.rating, 10) || 5,
      quote: row.quote || '',
      is_published: !!row.is_published,
      created_at: row.created_at,
    };
  }

  async function fetchPublishedReviews() {
    const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
    if (!client) {
      return null; // Signals unconfigured backend -> use fallback
    }

    try {
      const { data, error } = await client
        .from('reviews')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[iGrey Reviews] Supabase query error:', error.message);
        return null;
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        return [];
      }

      return data.map(mapReviewRow);
    } catch (err) {
      console.warn('[iGrey Reviews] Fetch exception:', err);
      return null;
    }
  }

  window.iGreyReviews = {
    fetchPublishedReviews: fetchPublishedReviews,
    mapReviewRow: mapReviewRow,
    getInitials: getInitials,
  };
})();
