export interface PropertyItem {
  id: string;
  name: string;
  category: string;
  location: string;
  price: string;
  specs: string;
  imageKey: 'propFeatured' | 'propPenthouse' | 'propEstate';
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  imageKey: 'serviceAdvisory' | 'serviceSales' | 'serviceInvestment' | 'serviceManagement';
}

export interface KeyFeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: 'mapPin' | 'compass' | 'award' | 'trendingUp' | 'userCheck' | 'leaf';
}

export interface WhyPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PartnerBrand {
  name: string;
  logoText: string;
  tagline?: string;
}

export const siteContent = {
  header: {
    navLinks: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Properties', href: './properties.html' },
      { label: 'Contact', href: '#contact' },
    ],
    ctaButton: 'Schedule a Consultation',
  },

  hero: {
    eyebrow: '',
    headlinePart1: 'Where Trust Meets',
    headlinePart2: 'Architectural Grandeur.',
    headline: 'Where Trust Meets Architectural Grandeur.',
    subtitle:
      'Discover exceptional homes, premium investments, and lifestyle spaces curated for a better tomorrow.',
    primaryCta: 'Explore Properties →',
    stats: [
      {
        value: '100+',
        label: 'Happy Customers',
        sublabel: 'Private Wealth & Families',
        icon: 'users',
      },
      {
        value: '50+',
        label: 'Completed Projects',
        sublabel: 'Prime Turnkey Enclaves',
        icon: 'building',
      },
      {
        value: '99.2%',
        label: 'On-Time Rent Payouts',
        sublabel: 'Guaranteed Yield Precision',
        icon: 'trending',
      },
      {
        value: '100%',
        label: 'Verified Background KYC',
        sublabel: 'Institutional Due Diligence',
        icon: 'shield',
      },
    ],
  },

  about: {
    eyebrow: 'THE iGREY ADVANTAGE',
    headingPart1: 'Why Choose',
    headingPart2: 'iGH?',
    heading: 'Why Choose iGH?',
    subtitle:
      'We provide a seamless and transparent experience for both homeowners and tenants.',
    features: [
      {
        id: 'tenants',
        title: 'Verified Tenants',
        description:
          'Thorough background verification, ID checks, and employment verification for complete safety.',
        icon: 'userCheck',
      },
      {
        id: 'payouts',
        title: 'On-Time Rent Payouts',
        description:
          'Reliable and timely monthly rental deposits directly to your bank account with zero hassle.',
        icon: 'home',
      },
      {
        id: 'maintenance',
        title: 'Property Maintenance',
        description:
          'Regular inspections, quick plumbing/electrical repairs, and professional housekeeping support.',
        icon: 'wrench',
      },
      {
        id: 'brokerage',
        title: 'Zero Brokerage Stays',
        description:
          'Tenants can rent clean, fully furnished, and verified rooms and flats with transparent pricing.',
        icon: 'key',
      },
    ],
  },

  services: {
    eyebrow: 'WHAT WE DO',
    heading: 'Real Estate Solutions Built Around Your Goals.',
    subtitle:
      "Whether you're searching for a property, exploring an investment opportunity or seeking professional guidance, iGREY brings a considered approach to every real-estate decision.",
    items: [
      {
        id: 'advisory',
        number: '01',
        title: 'Property Advisory',
        description:
          'Clear guidance to help clients understand opportunities, evaluate options and move forward with confidence.',
        imageKey: 'serviceAdvisory' as const,
      },
      {
        id: 'sales',
        number: '02',
        title: 'Property Sales',
        description:
          'A structured approach to presenting, positioning and negotiating property transactions.',
        imageKey: 'serviceSales' as const,
      },
      {
        id: 'investment',
        number: '03',
        title: 'Investment Solutions',
        description:
          'Explore real-estate opportunities with a focus on informed decisions and long-term value.',
        imageKey: 'serviceInvestment' as const,
      },
      {
        id: 'management',
        number: '04',
        title: 'Property Management',
        description:
          'Practical support designed to help property owners manage their assets with greater confidence and convenience.',
        imageKey: 'serviceManagement' as const,
      },
    ],
  },

  keyFeatures: {
    eyebrow: 'WHY iGREY',
    heading: 'More Than Properties. Lasting Value.',
    subtitle:
      'We focus on what matters — quality, trust and long-term value. Our properties and services are designed to create meaningful opportunities for our clients.',
    features: [
      {
        id: 'locations',
        number: '01',
        title: 'Prime Locations',
        description: 'Well-connected and future-ready locations.',
        icon: 'mapPin' as const,
      },
      {
        id: 'guidance',
        number: '02',
        title: 'Trusted Guidance',
        description: 'Honest advice at every stage of your journey.',
        icon: 'compass' as const,
      },
      {
        id: 'quality',
        number: '03',
        title: 'Quality Properties',
        description: 'Carefully selected and verified listings.',
        icon: 'award' as const,
      },
      {
        id: 'value',
        number: '04',
        title: 'Long-Term Value',
        description: 'Opportunities that grow with you.',
        icon: 'trendingUp' as const,
      },
      {
        id: 'personalized',
        number: '05',
        title: 'Personalized Service',
        description: 'Solutions tailored to your goals.',
        icon: 'userCheck' as const,
      },
      {
        id: 'sustainable',
        number: '06',
        title: 'Sustainable Growth',
        description: 'Responsible investing for a better tomorrow.',
        icon: 'leaf' as const,
      },
    ],
  },

  whyChooseUs: {
    eyebrow: 'THE iGREY ADVANTAGE',
    heading: 'Built Around What Matters.',
    principles: [
      {
        number: '01',
        title: 'Experience',
        description: 'Years of expertise in real estate, investment and advisory.',
      },
      {
        number: '02',
        title: 'Transparency',
        description: 'Clear communication and honest advice.',
      },
      {
        number: '03',
        title: 'Client First',
        description: 'Your goals, our priority.',
      },
      {
        number: '04',
        title: 'Long-Term Partnership',
        description: 'We grow with you.',
      },
    ],
    banner: {
      title: 'Your Goals. Our Focus.',
      subtitle: 'Real people. Real guidance. Real results.',
    },
  },

  testimonials: {
    eyebrow: 'CLIENT EXPERIENCES',
    heading: 'Trusted Through Every Step.',
    subtitle: 'Hear from our clients about their journey and experience with iGH.',
    featured: {
      quote:
        'Professional, responsive and genuinely focused on our needs. We felt supported at every stage of the journey.',
      author: 'Priya S.',
      role: 'Property Investor',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    items: [
      {
        id: '1',
        quote:
          'iGREY made the entire process smooth and transparent. Their guidance helped us find the right property with confidence.',
        author: 'Rahul M.',
        role: 'Home Buyer',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: '2',
        quote:
          'Excellent service and clear communication. Highly recommend iGREY for anyone looking for real estate support.',
        author: 'Anjali K.',
        role: 'Property Owner',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
    ],
  },

  partners: {
    eyebrow: 'OUR PARTNERS',
    heading: 'Trusted by Leading Brands and Institutions.',
    subtitle:
      'We collaborate with trusted partners, developers and financial institutions to bring you the best opportunities.',
    brands: [
      { name: 'Tata Realty', logoText: 'TATA REALTY' },
      { name: 'Sobha Ltd', logoText: 'SOBHA' },
      { name: 'Brigade Group', logoText: 'BRIGADE' },
      { name: 'Prestige Group', logoText: 'PRESTIGE GROUP' },
      { name: 'L&T Realty', logoText: 'L&T Realty' },
      { name: 'HDFC Bank', logoText: 'HDFC BANK' },
      { name: 'ICICI Bank', logoText: 'ICICI Bank' },
      { name: 'RERA Certified', logoText: 'RERA CERTIFIED' },
    ],
    statsStrip: [
      { label: 'Happy Clients', value: '100+' },
      { label: 'Projects', value: '50+' },
      { label: 'Trusted Partnerships', value: '100%' },
    ],
  },

  faq: {
    eyebrow: 'QUICK ANSWERS',
    heading: 'Questions, Clearly Answered.',
    subtitle: 'Find quick answers to common questions about our services, process and how we work.',
    items: [
      {
        question: 'What types of properties does iGREY work with?',
        answer:
          'We represent an exclusive portfolio of residential apartments, luxury villas, commercial spaces, and high-yield investment properties across prime growth corridors.',
      },
      {
        question: 'How can I enquire about a property?',
        answer:
          'You can enquire directly through our online enquiry form, call our client desk at +91 98765 43210, or schedule an in-person advisory consultation.',
      },
      {
        question: 'Does iGREY assist with property investment?',
        answer:
          'Yes, our team provides structured investment advisory including yield analysis, long-term capital appreciation forecasting, and portfolio diversification.',
      },
      {
        question: 'Can I schedule a consultation?',
        answer:
          "Yes, simply click on 'Schedule a Consultation' at the top of the page or fill out our enquiry form to choose your preferred date and time.",
      },
      {
        question: 'How can I list my property with iGREY?',
        answer:
          'Contact our property sales desk with your title details and floor plans. Our valuation team will verify and market your property to our qualified network of buyers.',
      },
    ],
  },

  contact: {
    eyebrow: 'GET IN TOUCH',
    heading: "Let's Talk About Your Next Property Decision.",
    subtitle:
      "Whether you're searching for a new home, exploring an investment or looking for the right property opportunity, we're here to start the conversation.",
    phone: '+91 98765 43210',
    email: 'hello@igreyholdings.com',
    location: 'Bengaluru, India',
    form: {
      title: 'Send Us a Message',
      requirements: [
        'Luxury Residential',
        'Commercial Space',
        'Investment Advisory',
        'Property Management',
      ],
      submitButton: 'Submit Enquiry →',
    },
  },

  properties: {
    microLabel: 'SELECTED RESIDENCES',
    heading: 'Curated Architectural Portfolio',
    featured: {
      id: 'featured-villa',
      badge: 'Featured Residence',
      name: 'The Solarium Pavilion',
      category: 'Architectural Estate',
      location: 'Bel-Air Crest, Los Angeles',
      price: '$28,500,000',
      specs: '6 Beds • 8 Baths • 12,400 sq.ft',
      imageKey: 'propFeatured' as const,
    },
    items: [
      {
        id: 'city-penthouse',
        name: 'City penthouse',
        category: 'Triplex Sky Residence',
        location: 'One Bishopsgate, London',
        price: '£24,750,000',
        specs: '4 Beds • 5 Baths • 8,200 sq.ft',
        imageKey: 'propPenthouse' as const,
      },
      {
        id: 'architectural-estate',
        name: 'Architectural estate',
        category: 'Oceanfront Sanctuary',
        location: 'Cap d’Antibes, French Riviera',
        price: '€34,000,000',
        specs: '7 Beds • 9 Baths • 14,100 sq.ft',
        imageKey: 'propEstate' as const,
      },
    ],
  },

  footer: {
    tagline: 'Redefining the way you experience real estate.',
    exploreLinks: [
      { label: 'About', href: '#about' },
      { label: 'Properties', href: '#properties' },
      { label: 'Services', href: '#services' },
      { label: 'Client Reflections', href: '#reviews' },
    ],
    companyLinks: [
      { label: 'Insights', href: '#faq' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    copyright: '© 2025 iGrey Holdings. All rights reserved.',
    legalLinks: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
    ],
  },
};
