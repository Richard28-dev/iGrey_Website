/**
 * iGREY HOLDINGS — Admin Dashboard Types & Interfaces
 */

export type PropertyStatus = 'Draft' | 'Active' | 'Sold' | 'Rented' | 'Archived' | 'Under Offer';
export type ListingType = 'For Sale' | 'For Rent';
export type PropertyType =
  | 'Villa'
  | 'Penthouse'
  | 'Architectural Estate'
  | 'Apartment'
  | 'Gated Residence'
  | 'Commercial'
  | 'Duplex';

export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'Immediate';

export interface AdminProperty {
  id: string;
  propertyId: string; // e.g. "IGH-MYS-01"
  title: string;
  shortDescription: string;
  fullDescription: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: string; // e.g. "₹38,000" or "₹4.5 Cr"
  priceNumeric: number;
  currency: string; // "INR", "USD", "EUR", "GBP"
  status: PropertyStatus;

  // Step 2: Property Details
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  builtUpArea: string; // e.g. "2,450 sq.ft"
  carpetArea?: string;
  plotArea?: string;
  furnishing: FurnishingStatus;
  propertyAge?: string; // e.g. "Brand New", "1-2 Years"
  floorNumber?: number;
  totalFloors?: number;
  parking: number; // e.g. 2
  possession: PossessionStatus;

  // Step 3: Location Details
  address: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  landmark?: string;
  googleMapsUrl?: string;

  // Step 4: Media
  coverImage: string;
  galleryImages: string[];
  floorPlanImage?: string;
  videoUrl?: string;
  virtualTourUrl?: string;

  // Step 5: Amenities & Highlights
  amenities: string[];
  customAmenities?: string[];
  highlights?: string[];

  // Step 6: SEO & Publishing
  seoTitle?: string;
  metaDescription?: string;
  slug: string;
  isFeatured: boolean;
  homepageVisible: boolean;

  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Follow-up' | 'Closed';

export interface Enquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  interestedPropertyId?: string;
  interestedPropertyTitle?: string;
  date: string;
  status: EnquiryStatus;
  role?: string;
  city?: string;
  message: string;
  internalNotes?: string[];
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Property Manager' | 'Advisory Lead';
  avatar?: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  sizeBytes: number;
  dimensions?: string;
  uploadedAt: string;
  propertyCount?: number;
}

export interface PropertyFilterOptions {
  search?: string;
  location?: string;
  propertyType?: string;
  listingType?: string;
  status?: string;
  sortBy?: 'newest' | 'oldest' | 'price-asc' | 'price-desc';
}
