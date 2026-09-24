export interface Property {
  id: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  type: 'Villa' | 'Penthouse' | 'Architectural Estate' | 'Private Island Residence';
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  featuredImage: string;
  gallery: string[];
  description: string;
  architecturalHighlights: string[];
  amenities: string[];
  status: 'Available' | 'Private Treaty' | 'Under Offer';
}

export interface Service {
  number: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  image: string;
}

export interface Testimonial {
  quote: string;
  client: string;
  role: string;
  property: string;
  location: string;
  year: string;
}

export interface FAQItem {
  number: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Partner {
  name: string;
  category: string;
  descriptor: string;
}
