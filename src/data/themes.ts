export interface LuxuryTheme {
  id: string;
  name: string;
  tagline: string;
  locationVibe: string;
  colors: {
    bg: string;
    bgAlt: string;
    surface: string;
    surfaceElevated: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentLight: string;
    borderSubtle: string;
    borderAccent: string;
  };
}

export const luxuryThemes: LuxuryTheme[] = [
  {
    id: 'onyx-gold',
    name: 'Onyx & Champagne Gold',
    tagline: 'The global standard for private wealth, Geneva estates, and Monaco penthouses.',
    locationVibe: 'Monaco & Geneva Ultra-Prime',
    colors: {
      bg: '#0C0D0E',
      bgAlt: '#111315',
      surface: '#16181B',
      surfaceElevated: '#1D2024',
      textPrimary: '#F5F5F7',
      textSecondary: '#9FA4AA',
      textMuted: '#676D74',
      accent: '#C5A880',
      accentLight: '#DFC7A5',
      borderSubtle: 'rgba(255, 255, 255, 0.08)',
      borderAccent: 'rgba(197, 168, 128, 0.3)',
    }
  },
  {
    id: 'racing-forest',
    name: 'Racing Forest & Brass',
    tagline: 'Evoking Mayfair heritage townhouses, private members clubs, and country estates.',
    locationVibe: 'Mayfair Heritage & British Estates',
    colors: {
      bg: '#08120C',
      bgAlt: '#0C1811',
      surface: '#122219',
      surfaceElevated: '#172B20',
      textPrimary: '#F2F5F3',
      textSecondary: '#9AAFA3',
      textMuted: '#5F7367',
      accent: '#C9A66B',
      accentLight: '#E2C48E',
      borderSubtle: 'rgba(255, 255, 255, 0.08)',
      borderAccent: 'rgba(201, 166, 107, 0.35)',
    }
  },
  {
    id: 'aegean-midnight',
    name: 'Aegean Midnight & Platinum',
    tagline: 'Architectural waterfront sanctuaries, French Riviera villas, and infinity pools.',
    locationVibe: 'French Riviera & Maritime Coastal',
    colors: {
      bg: '#090D14',
      bgAlt: '#0D131D',
      surface: '#121A27',
      surfaceElevated: '#182334',
      textPrimary: '#F0F4F8',
      textSecondary: '#96A4B8',
      textMuted: '#5C6A7D',
      accent: '#9BB8CD',
      accentLight: '#C3D6E4',
      borderSubtle: 'rgba(255, 255, 255, 0.08)',
      borderAccent: 'rgba(155, 184, 205, 0.35)',
    }
  },
  {
    id: 'desert-travertine',
    name: 'Travertine & Warm Espresso',
    tagline: 'Inspired by Aman resorts, warm brutalist stone, and organic modern pavilions.',
    locationVibe: 'Brutalist Architecture & Warm Minimalism',
    colors: {
      bg: '#110F0E',
      bgAlt: '#171413',
      surface: '#1E1B19',
      surfaceElevated: '#262220',
      textPrimary: '#F7F4F0',
      textSecondary: '#ABA19A',
      textMuted: '#736B65',
      accent: '#D0B296',
      accentLight: '#E8D4C0',
      borderSubtle: 'rgba(255, 255, 255, 0.08)',
      borderAccent: 'rgba(208, 178, 150, 0.35)',
    }
  }
];
