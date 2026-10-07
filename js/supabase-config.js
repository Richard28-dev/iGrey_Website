/**
 * iGREY HOLDINGS — Supabase Configuration
 * 
 * Paste your Supabase Project URL and Public Anon Key below.
 * Both are found in your Supabase Dashboard -> Settings -> API.
 * 
 * IMPORTANT SECURITY NOTE:
 * - NEVER put the service_role key here.
 * - ONLY the public anon key goes in this file.
 * - Database security is enforced by Row Level Security (RLS) policies in setup.sql.
 */

window.SUPABASE_CONFIG = {
  // Replace with your project URL, for example: 'https://xyzcompany.supabase.co'
  url: 'https://placeholder-project.supabase.co',

  // Replace with your project public anon key (starts with 'eyJ...')
  anonKey: 'placeholder-anon-key-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
};

/**
 * Helper to safely initialize the Supabase client from CDN
 * Returns null if the URL or key are still placeholders or invalid.
 */
window.getSupabaseClient = function () {
  try {
    const config = window.SUPABASE_CONFIG;
    if (!config || !config.url || !config.anonKey) {
      return null;
    }
    // Check if still placeholder
    if (
      config.url.includes('placeholder-project') ||
      config.anonKey.includes('placeholder-anon-key') ||
      config.url.trim() === '' ||
      config.anonKey.trim() === ''
    ) {
      return null;
    }

    if (window.supabase && typeof window.supabase.createClient === 'function') {
      if (!window.__igreySupabaseClient) {
        window.__igreySupabaseClient = window.supabase.createClient(config.url, config.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          },
        });
      }
      return window.__igreySupabaseClient;
    }
    return null;
  } catch (err) {
    console.warn('[iGrey Supabase] Client initialization error:', err);
    return null;
  }
};
