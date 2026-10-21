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
    eyebrow: 'BEYOND PROPERTY. BUILDING VALUE.',
    headlinePart1: 'Real Estate Solutions.',
    headlinePart2: 'Beyond Expectations.',
    headline: 'Real Estate Solutions. Beyond Expectations.',
    subtitle:
      'From finding the right property to managing, developing and investing in real estate, iGREY HOLDINGS brings property solutions together.',
    primaryCta: 'Explore Properties →',
    stats: [
      {
        value: '100+',
        label: 'Happy Customers',
        sublabel: '',
        icon: 'users',
      },
      {
        value: '50+',
        label: 'Completed Projects',
        sublabel: '',
        icon: 'building',
      },
      {
        value: '99.2%',
        label: 'On-Time Rent Payouts',
        sublabel: '',
        icon: 'trending',
      },
      {
        value: '100%',
        label: 'Verified Background and KYC',
        sublabel: '',
        icon: 'shield',
      },
    ],
  },

  about: {
    overview: {
      eyebrow: 'ABOUT US',
      headingPart1: 'Real Estate, Considered',
      headingPart2: 'From Every Angle.',
      subtitle:
        'iGREY HOLDINGS brings together a range of real estate services to support individuals, businesses, property owners and investors at different stages of their property journey. From buying and selling to renting, leasing, construction, investment support and asset management, our aim is to make property decisions more structured and transparent.',
      pillars: [
        {
          id: 'vision',
          title: 'Our Vision',
          icon: 'eye' as const,
          description:
            'To build a trusted real estate group recognised for professional service, transparent practices, responsible property solutions and a long-term approach to value creation.',
        },
        {
          id: 'mission',
          title: 'Our Mission',
          icon: 'target' as const,
          description:
            'To provide integrated real estate services that help clients make informed decisions, access suitable property opportunities and manage their property requirements effectively.',
        },
        {
          id: 'values',
          title: 'Our Values',
          icon: 'heart' as const,
          valuesList: [
            'Integrity and transparency',
            'Accountability and professionalism',
            'Client-focused service',
            'Responsible property practices',
            'Long-term value creation',
          ],
        },
      ],
    },
    eyebrow: 'THE iGREY ADVANTAGE',
    headingPart1: 'Why Choose',
    headingPart2: 'iGH?',
    heading: 'Why Choose iGH?',
    subtitle:
      'Property decisions are easier with clear information, transparent processes and the right guidance.',
    features: [
      {
        id: 'tenants',
        title: 'Identified Property Opportunities',
        description:
          'Explore residential projects with relevant details and documentation.',
        icon: 'userCheck',
      },
      {
        id: 'payouts',
        title: 'Transparent Progress Monitoring',
        description:
          'Follow project updates and milestones through the proposed digital dashboard.',
        icon: 'home',
      },
      {
        id: 'maintenance',
        title: 'Defined Participation and Exit Processes',
        description:
          'Understand the applicable terms, transfer conditions and exit procedures before committing.',
        icon: 'wrench',
      },
      {
        id: 'brokerage',
        title: 'Customer-Focused Guidance',
        description:
          'Get clear explanations of the process, documentation and responsibilities.',
        icon: 'key',
      },
    ],
  },

  services: {
    eyebrow: 'OUR SERVICES',
    heading: 'One Partner. Multiple Property Solutions.',
    subtitle:
      'From property transactions to development and asset management, iGREY HOLDINGS supports a wide range of real estate requirements.',
    items: [
      {
        id: 'buying-selling',
        number: '01',
        title: 'Property Buying & Selling',
        description:
          'Explore suitable properties, connect with prospective buyers and sellers, and receive support with negotiations and transaction coordination.',
        imageKey: 'serviceSales' as const,
      },
      {
        id: 'renting-leasing',
        number: '02',
        title: 'Renting & Leasing',
        description:
          'Find residential or commercial spaces, market available properties and coordinate rental and lease arrangements.',
        imageKey: 'serviceAdvisory' as const,
      },
      {
        id: 'property-management',
        number: '03',
        title: 'Property Management',
        description:
          'Support for tenant coordination, rent administration, inspections, maintenance and day-to-day property operations.',
        imageKey: 'serviceManagement' as const,
      },
      {
        id: 'property-investment',
        number: '04',
        title: 'Property Investment',
        description:
          'Evaluate property opportunities through market research, comparative analysis, income assessment and investment planning support.',
        imageKey: 'serviceInvestment' as const,
      },
      {
        id: 'construction-development',
        number: '05',
        title: 'Construction & Development',
        description:
          'Project coordination, development planning and construction-related support aligned with the agreed scope and qualified professionals.',
        imageKey: 'serviceAdvisory' as const,
      },
      {
        id: 'asset-management-advisory',
        number: '06',
        title: 'Asset Management & Advisory',
        description:
          'Support for property performance, operating costs, portfolio oversight and informed real estate decisions.',
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
        question: 'What services does iGREY HOLDINGS provide?',
        answer:
          'We offer property buying and selling support, residential and commercial renting and leasing, property management, investment-related support, construction and development coordination, and asset management services, subject to the scope of each engagement.',
      },
      {
        question: 'Can I find a property to rent or lease?',
        answer:
          'Yes. Enquire about available residential and commercial properties by sharing your preferred location, budget, property type and required tenure. Availability is subject to confirmation.',
      },
      {
        question: 'What is the property-backed insurance offering for lease customers?',
        answer:
          'iGREY HOLDINGS is introducing a property-backed insurance offering for eligible lease customers. The intended timeline is within 90 days from the start of the contract, subject to policy terms, eligibility and final arrangements. Customers should review the applicable coverage and exclusions.',
      },
      {
        question: 'Can I list my property with iGREY HOLDINGS?',
        answer:
          'Property owners can contact our team to discuss sale, rental, leasing or management requirements. Applicable services and commercial terms will be explained before engagement.',
      },
      {
        question: 'Does iGREY HOLDINGS manage properties?',
        answer:
          'Property management services may include tenant coordination, rent administration, inspections and maintenance coordination, depending on the agreed scope.',
      },
      {
        question: 'Can I discuss a property investment opportunity?',
        answer:
          'Yes. You can contact our team to discuss property opportunities, market comparisons and potential income or cost considerations. Returns are not guaranteed.',
      },
      {
        question: 'How can I arrange a property viewing?',
        answer:
          'Select an available listing and submit an enquiry with your contact information and preferred viewing time. Our team will confirm availability and next steps.',
      },
    ],
  },

  contact: {
    eyebrow: 'CONTACT & ENQUIRIES',
    heading: 'How Can We Help With Your Property Goals?',
    subtitle:
      'Tell us what you are looking for, and our team will direct your enquiry to the appropriate property service. Share your requirements below, and we will respond using the contact details you provide.',
    phone: '+91 98765 00000',
    email: 'hello@igreyholdings.com',
    location: '178/2, Vaishnavi Senate, Bannerghatta Road, Dollars Layout, Phase 4, Bilekahalli, Bangalore, Karnataka - 560076',
    hours: 'Mon to Sat, 9:30 am to 7 pm',
    form: {
      title: 'Tell us what you need',
      roles: [
        'Property Owner / Landlord',
        'Buyer',
        'Tenant / Residential Renter',
        'Commercial Tenant / Lease Seeker',
        'Seller',
        'Real Estate Investor',
        'Construction / Development Client',
        'Business Partner',
        'Other',
      ],
      submitButton: 'Send message →',
      privacyNote: 'Your details stay private. We never share them.',
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
    tagline: 'Building with a Broader Perspective',
    description:
      'iGREY HOLDINGS provides integrated real estate solutions across property buying, selling, renting, leasing, construction, investment and asset management.',
    address:
      '178/2, Vaishnavi Senate, Bannerghatta Road, Dollars Layout, Phase 4, Bilekahalli, Bangalore, Karnataka - 560076',
    phone: '+91 98765 00000',
    email: 'hello@igreyholdings.com',
    hours: 'Mon to Sat, 9:30 am to 7 pm',
    quickLinks: [
      { label: 'Home', href: '#hero' },
      { label: 'About iGREY', href: '#about' },
      { label: 'Our Services', href: '#services' },
      { label: 'Available Properties', href: './properties.html' },
      { label: 'Terms & Conditions', href: './terms.html' },
      { label: 'List Your Property', href: '#contact' },
      { label: 'Investment Enquiries', href: '#contact' },
      { label: 'Contact', href: '#contact' },
    ],
    serviceLinks: [
      { label: 'Buying & Selling', href: '#services' },
      { label: 'Privacy Policy', href: './privacy.html' },
      { label: 'Property Management', href: '#services' },
      { label: 'Construction & Development', href: '#services' },
      { label: 'Property Investment', href: '#services' },
      { label: 'Asset Management', href: '#services' },
    ],
    copyright: '© 2026 iGrey Holdings. All rights reserved.',
    legalLinks: [
      { label: 'Privacy Policy', href: './privacy.html' },
      { label: 'Terms & Conditions', href: './terms.html' },
    ],
  },
};
