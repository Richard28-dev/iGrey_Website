// Base path helper for GitHub Pages compatibility
const basePath = import.meta.env.BASE_URL || '/';
const getImg = (name: string) => `${basePath.endsWith('/') ? basePath : basePath + '/'}images/${name}`;

export interface ImageMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const siteImages = {
  // Hero Categories (4 Tabs)
  heroResidential: {
    src: getImg('hero_residential.jpg'),
    alt: 'Cantilevered glass luxury villa with twilight infinity pool reflections',
    width: 2000,
    height: 1125,
  },
  heroCommercial: {
    src: getImg('hero_commercial.jpg'),
    alt: 'Modern architectural commercial glass tower at golden hour sunset',
    width: 2000,
    height: 1125,
  },
  heroInvestment: {
    src: getImg('hero_investment.jpg'),
    alt: 'Contemporary waterfront residences and investment apartment pavilions at dusk',
    width: 2000,
    height: 1125,
  },
  heroAdvisory: {
    src: getImg('hero_advisory.jpg'),
    alt: 'Double-height luxury penthouse interior with panoramic sunset horizon views',
    width: 2000,
    height: 1125,
  },

  // About Section
  aboutTerrace: {
    src: getImg('about_terrace.jpg'),
    alt: 'Open-concept living pavilion and wooden sun deck overlooking sunset coastal skyline',
    width: 1400,
    height: 1050,
  },

  // Services Directory (4 Cards)
  serviceAdvisory: {
    src: getImg('service_advisory.jpg'),
    alt: 'Private client advisory suite with marble conference table and architectural blueprints',
    width: 1200,
    height: 900,
  },
  serviceSales: {
    src: getImg('service_sales.jpg'),
    alt: 'High-ceiling modern luxury residence gallery and open terrace foyer',
    width: 1200,
    height: 900,
  },
  serviceInvestment: {
    src: getImg('service_investment.jpg'),
    alt: 'Architectural scale model of prime city developments and analytical blueprints',
    width: 1200,
    height: 900,
  },
  serviceManagement: {
    src: getImg('service_management.jpg'),
    alt: 'Luxury private residence reception desk and concierge hospitality lounge',
    width: 1200,
    height: 900,
  },

  // Featured Residential Properties
  propStudio: {
    src: getImg('prop_studio.jpg'),
    alt: 'Modern Studio Apartment in Koramangala Bengaluru',
    width: 574,
    height: 314,
  },
  propExecutive: {
    src: getImg('prop_executive.jpg'),
    alt: 'Executive 2 BHK Residence in Gokulam Mysuru',
    width: 574,
    height: 314,
  },
  propHouse: {
    src: getImg('prop_house.jpg'),
    alt: '3 BHK Independent House in Indiranagar Bengaluru',
    width: 574,
    height: 314,
  },
  // Selected Properties (3 Exact Reference Cards)
  propSolarium: {
    src: getImg('prop_solarium.jpg'),
    alt: 'The Solarium Pavilion — White three-storey modern villa with swimming pool',
    width: 1600,
    height: 1200,
  },
  propObscura: {
    src: getImg('prop_obscura.jpg'),
    alt: 'Villa Obscura — Contemporary dining room with floating staircase in Lake Como',
    width: 1600,
    height: 1200,
  },
  propApex: {
    src: getImg('prop_apex.jpg'),
    alt: 'The Apex Penthouse — Modern luxury villa with plunge pool and palm tree',
    width: 1600,
    height: 1200,
  },
  propFeatured: {
    src: getImg('prop_solarium.jpg'),
    alt: 'The Solarium Pavilion — White three-storey modern villa with swimming pool',
    width: 1600,
    height: 1200,
  },
  propPenthouse: {
    src: getImg('prop_apex.jpg'),
    alt: 'The Apex Penthouse — Modern luxury villa with plunge pool and palm tree',
    width: 1600,
    height: 1200,
  },
  propEstate: {
    src: getImg('prop_obscura.jpg'),
    alt: 'Villa Obscura — Contemporary dining room with floating staircase in Lake Como',
    width: 1600,
    height: 1200,
  },

  // Why iGrey Section
  whyIgrey: {
    src: getImg('why_igrey.jpg'),
    alt: 'Modern concrete architectural residence surrounded by lush tropical landscaping',
    width: 1200,
    height: 900,
  },

  // FAQ Horizon View
  faqSkyline: {
    src: getImg('faq_skyline.jpg'),
    alt: 'Panoramic city skyline of modern towers across water at golden hour sunset',
    width: 1600,
    height: 900,
  },

  // Contact Desk
  contactVilla: {
    src: getImg('contact_villa.jpg'),
    alt: 'Architectural villa at twilight framed by reflection waters',
    width: 1600,
    height: 900,
  },
};
