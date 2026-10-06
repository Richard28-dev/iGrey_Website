/**
 * iGREY HOLDINGS — Enquiry Data Access Layer
 * 
 * Manages customer inquiries submitted via public contact & property forms.
 * Provides internal status workflows ('New' -> 'Contacted' -> 'Follow-up' -> 'Closed')
 * and internal notes for the advisory team.
 */

import type { Enquiry, EnquiryStatus } from '../types';

const ENQUIRIES_KEY = 'igrey_admin_enquiries_v1';
export const ENQUIRIES_UPDATED_EVENT = 'igrey_enquiries_updated';

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    customerName: 'Vikramaditya Singhania',
    email: 'vikram.singhania@apexcapital.in',
    phone: '9845012345',
    interestedPropertyId: 'solarium-pavilion',
    interestedPropertyTitle: 'Executive 2 BHK Residence (Gokulam)',
    date: '2026-10-06',
    status: 'New',
    role: 'Property Investor',
    city: 'Mysuru',
    message: 'Seeking immediate acquisition terms for executive residences in Gokulam. Would like to schedule an in-person advisory viewing this Thursday.',
    internalNotes: ['High-intent investor lead. Assigned to Senior Client Partner Rahul.'],
    createdAt: '2026-10-06T09:15:00Z',
  },
  {
    id: 'enq-102',
    customerName: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@globaltech.com',
    phone: '9880198765',
    interestedPropertyId: 'apex-penthouse',
    interestedPropertyTitle: 'Executive 2 BHK Residence (Penthouse Tier)',
    date: '2026-10-05',
    status: 'Follow-up',
    role: 'Tenant / Looking for Stay',
    city: 'Bangalore',
    message: 'Relocating executive from Singapore to South India regional office. Inquiring regarding multi-year lease terms and corporate payment invoicing.',
    internalNotes: ['Follow-up scheduled for 10th Oct via Zoom. Floor plans and contract sent.'],
    createdAt: '2026-10-05T14:30:00Z',
  },
  {
    id: 'enq-103',
    customerName: 'Kavitha Ramachandran',
    email: 'kavitha.r@nriholding.ae',
    phone: '9900234567',
    interestedPropertyId: 'villa-obscura',
    interestedPropertyTitle: 'Executive 2 BHK Residence (Villa Obscura)',
    date: '2026-10-04',
    status: 'Contacted',
    role: 'Property Owner / Landlord',
    city: 'Dubai / Mysuru',
    message: 'Interested in hands-free asset management for family inherited estate in Gokulam. Requesting asset yield appraisal.',
    internalNotes: ['Called client via WhatsApp. Sent NRI Advisory Kit.'],
    createdAt: '2026-10-04T11:00:00Z',
  },
  {
    id: 'enq-104',
    customerName: 'Rajesh K. Mehta',
    email: 'rajesh.mehta@mumbaiinfra.com',
    phone: '9820011223',
    interestedPropertyId: 'mirador-estate-blr',
    interestedPropertyTitle: 'The Solarium Sovereign Villa',
    date: '2026-10-02',
    status: 'Closed',
    role: 'Looking for Buy',
    city: 'Mumbai',
    message: 'Inquiry regarding title diligence and site inspection dates for Sadashivanagar estate.',
    internalNotes: ['Site inspection completed on Oct 3rd. Contract in legal drafting.'],
    createdAt: '2026-10-02T16:20:00Z',
  },
];

class EnquiryService {
  private dispatchChange() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(ENQUIRIES_UPDATED_EVENT));
    }
  }

  private loadRaw(): Enquiry[] {
    if (typeof window === 'undefined') return INITIAL_ENQUIRIES;
    try {
      const stored = localStorage.getItem(ENQUIRIES_KEY);
      if (!stored) {
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(INITIAL_ENQUIRIES));
        return INITIAL_ENQUIRIES;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_ENQUIRIES;
    }
  }

  private saveRaw(list: Enquiry[]) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(list));
      } catch (err) {
        console.error('Failed to save enquiries to storage:', err);
      }
      this.dispatchChange();
    }
  }

  async getAllEnquiries(statusFilter?: string): Promise<Enquiry[]> {
    const list = this.loadRaw();
    if (!statusFilter || statusFilter === 'all') return list;
    return list.filter((e) => e.status === statusFilter);
  }

  async createEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'date'>): Promise<Enquiry> {
    const list = this.loadRaw();
    const now = new Date();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      date: now.toISOString().split('T')[0],
      createdAt: now.toISOString(),
      internalNotes: enquiry.internalNotes || [],
    };
    list.unshift(newEnquiry);
    this.saveRaw(list);
    return newEnquiry;
  }

  async updateStatus(id: string, status: EnquiryStatus): Promise<Enquiry> {
    const list = this.loadRaw();
    const idx = list.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Enquiry not found');
    list[idx] = { ...list[idx], status };
    this.saveRaw(list);
    return list[idx];
  }

  async addNote(id: string, note: string): Promise<Enquiry> {
    const list = this.loadRaw();
    const idx = list.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Enquiry not found');
    const existingNotes = list[idx].internalNotes || [];
    list[idx] = {
      ...list[idx],
      internalNotes: [note, ...existingNotes],
    };
    this.saveRaw(list);
    return list[idx];
  }

  async deleteEnquiry(id: string): Promise<boolean> {
    const list = this.loadRaw();
    const filtered = list.filter((e) => e.id !== id);
    if (filtered.length === list.length) return false;
    this.saveRaw(filtered);
    return true;
  }

  async getSummaryStats() {
    const list = this.loadRaw();
    return {
      total: list.length,
      new: list.filter((e) => e.status === 'New').length,
      contacted: list.filter((e) => e.status === 'Contacted').length,
      followUp: list.filter((e) => e.status === 'Follow-up').length,
      closed: list.filter((e) => e.status === 'Closed').length,
    };
  }
}

export const enquiryService = new EnquiryService();
