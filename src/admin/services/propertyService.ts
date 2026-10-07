/**
 * iGREY HOLDINGS — Property Data Access Layer
 * 
 * ARCHITECTURE NOTE:
 * This service provides a standardized async abstraction for property CRUD operations.
 * Currently uses an in-browser prototype storage layer (localStorage) with default seed data
 * for local development and demonstration.
 * 
 * TO CONNECT A REAL PRODUCTION DATABASE (e.g. Supabase, Firebase, or Node.js/Express REST API):
 * Simply swap the internal fetch/storage calls in this repository without changing any
 * component consumers or page contracts.
 */

import type { AdminProperty, PropertyFilterOptions, PropertyStatus } from '../types';
import { siteImages } from '../../data/images';
import { propertiesData as staticProperties } from '../../data/properties';

const STORAGE_KEY = 'igrey_admin_properties_v4';
export const PROPERTIES_UPDATED_EVENT = 'igrey_properties_updated';

// Initial Curated Seed Properties matching the public site
const INITIAL_PROPERTIES: AdminProperty[] = [
  {
    id: 'solarium-pavilion',
    propertyId: 'SS-MYS-02',
    title: 'Executive 2 BHK Residence',
    shortDescription: 'Bright, well-planned home in a gated society close to schools and markets. Ready to move in, with a clear layout and good natural light.',
    fullDescription: 'Bright, well-planned home in a gated society close to schools and markets. Ready to move in, with a clear layout and good natural light.',
    propertyType: 'Gated Residence',
    listingType: 'For Sale',
    price: '₹85 L',
    priceNumeric: 8500000,
    currency: 'INR',
    status: 'Active',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    builtUpArea: '1,200 sq ft',
    carpetArea: '1,050 sq ft',
    furnishing: 'Furnished',
    propertyAge: 'Brand New',
    floorNumber: 3,
    totalFloors: 5,
    parking: 2,
    possession: 'Ready to Move',
    address: '14th Cross, 3rd Stage, Gokulam',
    locality: 'Gokulam',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    postalCode: '570002',
    landmark: 'Near Yoga Kendra & Contour Road',
    coverImage: siteImages.propSolarium.src,
    galleryImages: [
      siteImages.propSolarium.src,
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    ],
    highlights: ['Ready to move in', 'Gated society'],
    amenities: ['Swimming pool', 'Gym', '24/7 security', 'Power backup', 'Covered parking', 'Lift'],
    slug: 'executive-2-bhk-residence-gokulam',
    isFeatured: true,
    homepageVisible: true,
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-10-04T12:00:00Z',
  },
  {
    id: 'villa-obscura',
    propertyId: 'SS-MYS-03',
    title: 'Executive 2 BHK Residence',
    shortDescription: 'Monolithic charcoal concrete framing dramatic garden water reflections and private terrace.',
    fullDescription: 'Contemporary minimalist residence featuring private terrace garden and refined wood finishes. Bright layout with natural ventilation and serene garden outlook.',
    propertyType: 'Villa',
    listingType: 'For Sale',
    price: '₹95 L',
    priceNumeric: 9500000,
    currency: 'INR',
    status: 'Active',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    builtUpArea: '1,450 sq ft',
    carpetArea: '1,220 sq ft',
    furnishing: 'Furnished',
    propertyAge: '1 Year',
    floorNumber: 1,
    totalFloors: 2,
    parking: 2,
    possession: 'Ready to Move',
    address: '8th Main, Gokulam 2nd Stage',
    locality: 'Gokulam',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    postalCode: '570002',
    landmark: 'Adjacent to Heritage Green Boulevard',
    coverImage: siteImages.propObscura.src,
    galleryImages: [
      siteImages.propObscura.src,
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    ],
    highlights: ['Ready to move in', 'Verified documents', 'Corner plot'],
    amenities: ['Garden', '24/7 security', 'Power backup', 'Covered parking', 'Gated society', 'Lift'],
    slug: 'executive-2-bhk-residence-villa-obscura',
    isFeatured: true,
    homepageVisible: true,
    createdAt: '2026-09-18T11:30:00Z',
    updatedAt: '2026-10-05T09:15:00Z',
  },
  {
    id: 'apex-penthouse',
    propertyId: 'SS-MYS-04',
    title: 'Executive 2 BHK Residence',
    shortDescription: 'Triplex sky-tier luxury residence commanding panoramic city skyline horizons.',
    fullDescription: 'Top-tier executive penthouse residence commanding panoramic green canopy and skyline views. Double-height ceilings, private terrace deck, and private direct lift access.',
    propertyType: 'Penthouse',
    listingType: 'For Sale',
    price: '₹1.2 Cr',
    priceNumeric: 12000000,
    currency: 'INR',
    status: 'Active',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 3,
    builtUpArea: '1,800 sq ft',
    carpetArea: '1,550 sq ft',
    furnishing: 'Furnished',
    propertyAge: 'Brand New',
    floorNumber: 5,
    totalFloors: 5,
    parking: 2,
    possession: 'Immediate',
    address: 'Penthouse Suite 501, Gokulam Prime',
    locality: 'Gokulam',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    postalCode: '570002',
    landmark: 'Gokulam Main Road Junction',
    coverImage: siteImages.propApex.src,
    galleryImages: [
      siteImages.propApex.src,
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
    ],
    highlights: ['Ready to move in', 'Newly renovated', 'Vastu compliant'],
    amenities: ['Swimming pool', 'Gym', '24/7 security', 'Power backup', 'Covered parking', 'Lift'],
    slug: 'executive-2-bhk-residence-apex-penthouse',
    isFeatured: true,
    homepageVisible: true,
    createdAt: '2026-09-20T14:00:00Z',
    updatedAt: '2026-10-05T15:45:00Z',
  },
  {
    id: 'mirador-estate-blr',
    propertyId: 'IGH-BLR-04',
    title: 'The Solarium Sovereign Villa',
    shortDescription: 'Sprawling private estate with limestone pavilion and temperature-controlled pool.',
    fullDescription: 'Located in Sadashivanagar, Bangalore, an iconic sovereign villa designed for high-net-worth families with biometric surveillance, 4-car showroom garage, and manicured private courtyard.',
    propertyType: 'Architectural Estate',
    listingType: 'For Sale',
    price: '₹14.5 Cr',
    priceNumeric: 145000000,
    currency: 'INR',
    status: 'Draft',
    bedrooms: 5,
    bathrooms: 6,
    balconies: 4,
    builtUpArea: '7,800 sq.ft',
    carpetArea: '6,400 sq.ft',
    plotArea: '10,000 sq.ft',
    furnishing: 'Semi-Furnished',
    propertyAge: 'Brand New',
    floorNumber: 1,
    totalFloors: 3,
    parking: 4,
    possession: 'Immediate',
    address: 'Palace Orchards, Sadashivanagar',
    locality: 'Sadashivanagar',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560080',
    landmark: 'Near Sankey Tank',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    ],
    amenities: ['Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security', 'CCTV', 'Gated Community'],
    slug: 'solarium-sovereign-villa-sadashivanagar',
    isFeatured: false,
    homepageVisible: false,
    createdAt: '2026-09-28T09:00:00Z',
    updatedAt: '2026-10-06T08:00:00Z',
  },
  {
    id: 'zenith-residence-hyd',
    propertyId: 'IGH-HYD-05',
    title: 'Jubilee Hills Horizon Residence',
    shortDescription: 'Modern glass and stone residence with panoramic golf course outlook.',
    fullDescription: 'Commanding prime position in Jubilee Hills, Hyderabad. Offers expansive living galleries, infinity lap pool, smart automation, and private screening room.',
    propertyType: 'Villa',
    listingType: 'For Rent',
    price: '₹2,50,000 / mo',
    priceNumeric: 250000,
    currency: 'INR',
    status: 'Active',
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    builtUpArea: '5,200 sq.ft',
    furnishing: 'Furnished',
    propertyAge: '1-2 Years',
    floorNumber: 1,
    totalFloors: 2,
    parking: 3,
    possession: 'Ready to Move',
    address: 'Road No. 36, Jubilee Hills',
    locality: 'Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500033',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
    ],
    amenities: ['Swimming Pool', 'Gym', 'Security', 'Clubhouse', 'Lift', 'Power Backup'],
    slug: 'jubilee-hills-horizon-residence',
    isFeatured: false,
    homepageVisible: false,
    createdAt: '2026-10-01T12:00:00Z',
    updatedAt: '2026-10-06T10:30:00Z',
  },
];

class PropertyService {
  private dispatchChange() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PROPERTIES_UPDATED_EVENT));
    }
  }

  private loadRaw(): AdminProperty[] {
    if (typeof window === 'undefined') return INITIAL_PROPERTIES;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
        return INITIAL_PROPERTIES;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_PROPERTIES;
    }
  }

  private saveRaw(list: AdminProperty[]) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (err) {
        console.error('Failed to save properties to storage:', err);
      }
      this.dispatchChange();
    }
  }

  async getAllProperties(filters?: PropertyFilterOptions): Promise<AdminProperty[]> {
    let list = this.loadRaw();

    if (!filters) return list;

    if (filters.search) {
      const s = filters.search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.propertyId.toLowerCase().includes(s) ||
          p.locality.toLowerCase().includes(s) ||
          p.city.toLowerCase().includes(s)
      );
    }

    if (filters.location && filters.location !== 'all') {
      list = list.filter((p) => p.city.toLowerCase() === filters.location?.toLowerCase());
    }

    if (filters.propertyType && filters.propertyType !== 'all') {
      list = list.filter((p) => p.propertyType === filters.propertyType);
    }

    if (filters.listingType && filters.listingType !== 'all') {
      list = list.filter((p) => p.listingType === filters.listingType);
    }

    if (filters.status && filters.status !== 'all') {
      list = list.filter((p) => p.status === filters.status);
    }

    if (filters.sortBy) {
      if (filters.sortBy === 'newest') {
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (filters.sortBy === 'oldest') {
        list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      } else if (filters.sortBy === 'price-asc') {
        list.sort((a, b) => a.priceNumeric - b.priceNumeric);
      } else if (filters.sortBy === 'price-desc') {
        list.sort((a, b) => b.priceNumeric - a.priceNumeric);
      }
    }

    return list;
  }

  async getPublicProperties(): Promise<AdminProperty[]> {
    if (typeof window !== 'undefined' && (window as any).getSupabaseClient) {
      try {
        const client = (window as any).getSupabaseClient();
        if (client) {
          const { data, error } = await client
            .from('properties')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            return data.map((row: any) => {
              const priceNum = Number(row.price) || 0;
              let formattedPrice = 'Price on Request';
              if (priceNum >= 10000000) {
                const cr = priceNum / 10000000;
                formattedPrice = `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2).replace(/\.?0+$/, '')} Cr`;
              } else if (priceNum >= 100000) {
                const lk = priceNum / 100000;
                formattedPrice = `₹${lk % 1 === 0 ? lk.toFixed(0) : lk.toFixed(2).replace(/\.?0+$/, '')} L`;
              } else if (priceNum > 0) {
                formattedPrice = `₹${priceNum.toLocaleString('en-IN')}`;
              }

              const statusMap: Record<string, PropertyStatus> = {
                available: 'Active',
                under_offer: 'Under Offer',
                sold: 'Sold',
                draft: 'Draft',
              };

              return {
                id: row.property_code ? row.property_code.toLowerCase().replace(/[^a-z0-9]/g, '-') : String(row.id),
                propertyId: row.property_code || 'SS-MYS-01',
                title: row.title,
                shortDescription: row.description || '',
                fullDescription: row.description || '',
                propertyType: row.property_type || 'Villa',
                listingType: 'For Sale',
                price: formattedPrice,
                priceNumeric: priceNum,
                currency: 'INR',
                status: statusMap[row.status] || 'Active',
                bedrooms: Number(row.bedrooms) || 3,
                bathrooms: 2,
                balconies: 1,
                builtUpArea: `${row.area_sqft || '1,200'} sq ft`,
                carpetArea: `${row.area_sqft || '1,000'} sq ft`,
                furnishing: 'Furnished',
                propertyAge: 'Brand New',
                floorNumber: 1,
                totalFloors: 3,
                parking: 2,
                possession: 'Ready to Move',
                address: `${row.locality || ''}, ${row.city || ''}`,
                locality: row.locality || '',
                city: row.city || 'Mysuru',
                state: 'Karnataka',
                country: 'India',
                postalCode: '570002',
                coverImage: (row.images && row.images.length > 0) ? row.images[0] : siteImages.propSolarium.src,
                galleryImages: (row.images && row.images.length > 0) ? row.images : [siteImages.propSolarium.src],
                highlights: row.highlights || ['Ready to move in', 'Gated society'],
                amenities: row.amenities || ['Swimming pool', 'Gym', '24/7 security'],
                slug: (row.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                isFeatured: !!row.is_featured,
                homepageVisible: true,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
              };
            });
          }
        }
      } catch (e) {
        console.warn('[propertyService] Supabase query failed, falling back:', e);
      }
    }

    const list = this.loadRaw();
    return list.filter((p) => p.status === 'Active' && p.homepageVisible !== false);
  }

  async getPropertyById(id: string): Promise<AdminProperty | null> {
    if (!id) return null;
    const clean = id.toLowerCase().trim();

    // Check public properties (which checks Supabase first)
    try {
      const publicList = await this.getPublicProperties();
      const match = publicList.find(
        (p) =>
          p.propertyId.toLowerCase() === clean ||
          p.id.toLowerCase() === clean ||
          (p.slug && p.slug.toLowerCase() === clean) ||
          clean.includes(p.propertyId.toLowerCase())
      );
      if (match) return match;
    } catch {
      // fallback
    }

    const list = this.loadRaw();

    // 1. Exact match by propertyId, id, or slug
    const directMatch = list.find(
      (p) =>
        p.propertyId.toLowerCase() === clean ||
        p.id.toLowerCase() === clean ||
        (p.slug && p.slug.toLowerCase() === clean)
    );
    if (directMatch) return directMatch;

    // 2. Substring/fuzzy match within list
    const fuzzyMatch = list.find(
      (p) =>
        clean.includes(p.propertyId.toLowerCase()) ||
        p.propertyId.toLowerCase().includes(clean) ||
        clean.includes(p.id.toLowerCase()) ||
        p.id.toLowerCase().includes(clean)
    );
    if (fuzzyMatch) return fuzzyMatch;

    // 3. Fallback: match in static properties catalog
    const staticProp = staticProperties.find(
      (sp) =>
        sp.id.toLowerCase() === clean ||
        clean.includes(sp.id.toLowerCase()) ||
        sp.id.toLowerCase().includes(clean)
    );
    if (staticProp) {
      return {
        id: staticProp.id,
        propertyId: staticProp.id.toUpperCase().slice(0, 10),
        title: staticProp.name,
        shortDescription: staticProp.tagline,
        fullDescription: staticProp.description,
        propertyType: (staticProp.type as any) || 'Villa',
        listingType: 'For Sale',
        price: staticProp.price,
        priceNumeric: 10000000,
        currency: 'INR',
        status: 'Active',
        bedrooms: staticProp.bedrooms,
        bathrooms: staticProp.bathrooms,
        builtUpArea: staticProp.area,
        furnishing: 'Furnished',
        possession: 'Ready to Move',
        propertyAge: 'Brand New',
        parking: staticProp.parking,
        address: staticProp.location,
        locality: staticProp.city,
        city: staticProp.city,
        state: 'Karnataka',
        country: 'India',
        postalCode: '570002',
        coverImage: staticProp.featuredImage,
        galleryImages: staticProp.gallery,
        amenities: staticProp.amenities,
        slug: staticProp.id,
        isFeatured: true,
        homepageVisible: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  async createProperty(property: Omit<AdminProperty, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdminProperty> {
    const list = this.loadRaw();
    const now = new Date().toISOString();
    const id = property.slug || `prop-${Date.now()}`;

    const newProperty: AdminProperty = {
      ...property,
      id,
      createdAt: now,
      updatedAt: now,
    };

    list.unshift(newProperty);
    this.saveRaw(list);
    return newProperty;
  }

  async updateProperty(id: string, updates: Partial<AdminProperty>): Promise<AdminProperty> {
    const list = this.loadRaw();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) {
      throw new Error(`Property with id ${id} not found.`);
    }

    const updated: AdminProperty = {
      ...list[idx],
      ...updates,
      id: list[idx].id, // preserve immutable id
      updatedAt: new Date().toISOString(),
    };

    list[idx] = updated;
    this.saveRaw(list);
    return updated;
  }

  async deleteProperty(id: string): Promise<boolean> {
    const list = this.loadRaw();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) return false;
    this.saveRaw(filtered);
    return true;
  }

  async updateStatus(id: string, status: PropertyStatus): Promise<AdminProperty> {
    return this.updateProperty(id, { status });
  }

  async getSummaryStats() {
    const list = this.loadRaw();
    return {
      total: list.length,
      active: list.filter((p) => p.status === 'Active').length,
      forSale: list.filter((p) => p.listingType === 'For Sale').length,
      forRent: list.filter((p) => p.listingType === 'For Rent').length,
      drafts: list.filter((p) => p.status === 'Draft').length,
      archived: list.filter((p) => p.status === 'Archived').length,
    };
  }

  resetToDefaultSeed() {
    this.saveRaw(INITIAL_PROPERTIES);
  }
}

export const propertyService = new PropertyService();
