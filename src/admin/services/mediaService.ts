/**
 * iGREY HOLDINGS — Media Library Service
 * 
 * Manages media assets, uploads, and association with active property listings.
 */

import type { MediaItem } from '../types';
import { siteImages } from '../../data/images';

const MEDIA_KEY = 'igrey_admin_media_v1';

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-01',
    name: 'solarium-pavilion-facade.jpg',
    url: siteImages.propSolarium.src,
    sizeBytes: 294706,
    dimensions: '1600 × 1200',
    uploadedAt: '2026-09-15',
    propertyCount: 1,
  },
  {
    id: 'med-02',
    name: 'villa-obscura-dining.jpg',
    url: siteImages.propObscura.src,
    sizeBytes: 276621,
    dimensions: '1600 × 1200',
    uploadedAt: '2026-09-18',
    propertyCount: 1,
  },
  {
    id: 'med-03',
    name: 'apex-penthouse-terrace.jpg',
    url: siteImages.propApex.src,
    sizeBytes: 301452,
    dimensions: '1600 × 1200',
    uploadedAt: '2026-09-20',
    propertyCount: 1,
  },
  {
    id: 'med-04',
    name: 'luxury-contact-villa-dusk.jpg',
    url: siteImages.contactVilla.src,
    sizeBytes: 441642,
    dimensions: '1600 × 900',
    uploadedAt: '2026-10-05',
    propertyCount: 1,
  },
  {
    id: 'med-05',
    name: 'estate-poolside-twilight.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    sizeBytes: 812000,
    dimensions: '1920 × 1080',
    uploadedAt: '2026-10-01',
    propertyCount: 2,
  },
  {
    id: 'med-06',
    name: 'interior-double-height-salon.jpg',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    sizeBytes: 742000,
    dimensions: '1920 × 1080',
    uploadedAt: '2026-10-02',
    propertyCount: 2,
  },
];

class MediaService {
  private loadRaw(): MediaItem[] {
    if (typeof window === 'undefined') return INITIAL_MEDIA;
    try {
      const stored = localStorage.getItem(MEDIA_KEY);
      if (!stored) {
        localStorage.setItem(MEDIA_KEY, JSON.stringify(INITIAL_MEDIA));
        return INITIAL_MEDIA;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_MEDIA;
    }
  }

  private saveRaw(list: MediaItem[]) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(MEDIA_KEY, JSON.stringify(list));
      } catch (err) {
        console.error('Failed to save media items:', err);
      }
    }
  }

  async getAllMedia(): Promise<MediaItem[]> {
    return this.loadRaw();
  }

  async addMedia(file: File): Promise<MediaItem> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const rawUrl = reader.result as string;
        // Perform client-side compression using canvas
        const img = new Image();
        img.onload = () => {
          const maxDim = 1600;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedUrl = canvas.toDataURL('image/jpeg', 0.85);
            const estimatedBytes = Math.round((compressedUrl.length * 3) / 4);

            const item: MediaItem = {
              id: `med-${Date.now()}`,
              name: file.name,
              url: compressedUrl,
              sizeBytes: estimatedBytes,
              dimensions: `${width} × ${height}`,
              uploadedAt: new Date().toISOString().split('T')[0],
              propertyCount: 0,
            };
            const list = this.loadRaw();
            list.unshift(item);
            this.saveRaw(list);
            resolve(item);
            return;
          }

          // Fallback if canvas context fails
          const item: MediaItem = {
            id: `med-${Date.now()}`,
            name: file.name,
            url: rawUrl,
            sizeBytes: file.size,
            dimensions: `${img.width} × ${img.height}`,
            uploadedAt: new Date().toISOString().split('T')[0],
            propertyCount: 0,
          };
          const list = this.loadRaw();
          list.unshift(item);
          this.saveRaw(list);
          resolve(item);
        };
        img.onerror = () => {
          const item: MediaItem = {
            id: `med-${Date.now()}`,
            name: file.name,
            url: rawUrl,
            sizeBytes: file.size,
            dimensions: 'High-Res Web',
            uploadedAt: new Date().toISOString().split('T')[0],
            propertyCount: 0,
          };
          const list = this.loadRaw();
          list.unshift(item);
          this.saveRaw(list);
          resolve(item);
        };
        img.src = rawUrl;
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }

  async deleteMedia(id: string): Promise<boolean> {
    const list = this.loadRaw();
    const filtered = list.filter((m) => m.id !== id);
    if (filtered.length === list.length) return false;
    this.saveRaw(filtered);
    return true;
  }
}

export const mediaService = new MediaService();
