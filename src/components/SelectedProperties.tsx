import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { siteImages } from '../data/images';
import { propertyService, PROPERTIES_UPDATED_EVENT } from '../admin/services/propertyService';

export interface PropertyCardData {
  id: string;
  status: string;
  category: string;
  price: string;
  name: string;
  location: string;
  propertyId: string;
  listingLabel: string;
  images: string[];
  image?: { src: string; alt: string; width: number; height: number };
}

const propertiesData: PropertyCardData[] = [
  {
    id: 'solarium-pavilion',
    status: 'AVAILABLE',
    category: 'GATED SOCIETY • 2 BHK',
    price: '₹85 L',
    name: 'Executive 2 BHK Residence',
    location: 'Gokulam, Mysuru',
    propertyId: 'SS-MYS-02',
    listingLabel: 'Property for Sale',
    images: [
      siteImages.propSolarium.src,
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    ],
  },
  {
    id: 'villa-obscura',
    status: 'AVAILABLE',
    category: 'GATED SOCIETY • 2 BHK',
    price: '₹95 L',
    name: 'Executive 2 BHK Residence',
    location: 'Gokulam, Mysuru',
    propertyId: 'SS-MYS-03',
    listingLabel: 'Property for Sale',
    images: [
      siteImages.propObscura.src,
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    ],
  },
  {
    id: 'apex-penthouse',
    status: 'AVAILABLE',
    category: 'GATED SOCIETY • 2 BHK',
    price: '₹1.2 Cr',
    name: 'Executive 2 BHK Residence',
    location: 'Gokulam, Mysuru',
    propertyId: 'SS-MYS-04',
    listingLabel: 'Property for Sale',
    images: [
      siteImages.propApex.src,
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
    ],
  },
];

interface PropertyImageCarouselProps {
  images: string[];
  name: string;
  status: string;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  hasVideo?: boolean;
}

export const PropertyImageCarousel: React.FC<PropertyImageCarouselProps> = ({
  images,
  name,
  status,
  isFavorite,
  onToggleFavorite,
  hasVideo = false,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = images && images.length > 0 ? images.length : 1;
  const safeIdx = ((currentIdx % total) + total) % total;

  const handlePrev = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % total);
  };

  const handleDotClick = (e: React.MouseEvent | React.TouchEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - (touchStartY.current ?? 0);
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        setCurrentIdx((prev) => (prev + 1) % total);
      } else {
        setCurrentIdx((prev) => (prev - 1 + total) % total);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 11',
        overflow: 'hidden',
        backgroundColor: '#070B09',
        userSelect: 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="property-carousel-container"
    >
      {/* Preloaded Image Slides with 300ms Smooth Crossfade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {images.map((src, i) => {
          const isActive = i === safeIdx;
          return (
            <img
              key={src + i}
              src={src}
              alt={`${name} - Photo ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 300ms ease-in-out, transform 600ms ease',
                pointerEvents: 'none',
                zIndex: isActive ? 2 : 1,
              }}
              className="property-card-image"
            />
          );
        })}
      </div>

      {/* Subtle bottom gradient for dot readability */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '45px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.45) 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Property Status Badge */}
      {(() => {
        if (!status || !status.trim()) return null;
        const s = status.trim().toUpperCase();

        let modifierClass = 'status-badge--available';
        let displayLabel = 'AVAILABLE';
        let ariaStatus = 'Available';

        if (s.includes('SOLD')) {
          modifierClass = 'status-badge--sold';
          displayLabel = 'SOLD';
          ariaStatus = 'Sold';
        } else if (s.includes('UPCOMING')) {
          modifierClass = 'status-badge--upcoming';
          displayLabel = 'UPCOMING';
          ariaStatus = 'Upcoming';
        } else if (s.includes('OFFER') || s.includes('CONSTRUCTION')) {
          modifierClass = 'status-badge--under-offer';
          displayLabel = 'UNDER OFFER';
          ariaStatus = 'Under Offer';
        } else if (s.includes('AVAILABLE') || s.includes('ACTIVE')) {
          modifierClass = 'status-badge--available';
          displayLabel = 'AVAILABLE';
          ariaStatus = 'Available';
        } else {
          displayLabel = s;
          ariaStatus = status.trim();
        }

        return (
          <div
            className={`status-badge ${modifierClass}`}
            aria-label={`Status: ${ariaStatus}`}
          >
            <span className="status-badge__dot" aria-hidden="true" />
            <span>{displayLabel}</span>
          </div>
        );
      })()}

      {/* Video Indicator Pill (Bottom-Left) */}
      {hasVideo && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            zIndex: 25,
            backgroundColor: 'rgba(10, 16, 13, 0.85)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(201, 167, 124, 0.45)',
            color: '#c9a77c',
            padding: '3px 8px',
            borderRadius: '999px',
            fontSize: '10.5px',
            fontFamily: "'Manrope', var(--font-sans)",
            fontWeight: 700,
            letterSpacing: '0.06em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            pointerEvents: 'none',
          }}
          aria-label="Property includes video"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          <span>VIDEO</span>
        </div>
      )}

      {/* Favorite Heart Button: Top-right offset 16px (higher z-index: 30) */}
      <button
        type="button"
        onClick={onToggleFavorite}
        aria-label={isFavorite ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: 'rgba(23, 31, 28, 0.65)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 30,
          transition: 'all 0.25s ease',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
          color: isFavorite ? '#E11D48' : '#FFFFFF',
          outline: 'none',
        }}
        className="property-favorite-btn"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(23, 31, 28, 0.88)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
          e.currentTarget.style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(23, 31, 28, 0.65)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Heart
          size={17}
          color={isFavorite ? '#E11D48' : '#FFFFFF'}
          fill={isFavorite ? '#E11D48' : 'none'}
          strokeWidth={1.9}
        />
      </button>

      {/* Always Visible Left & Right Navigation Arrows */}
      {total > 1 && (
        <>
          {/* Previous Arrow Button (36px circular, rgba(0,0,0,0.55)) */}
          <button
            type="button"
            onClick={handlePrev}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onTouchEnd={handlePrev}
            aria-label="Previous photo"
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.28)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 25,
              pointerEvents: 'auto',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
              outline: 'none',
              padding: 0,
              transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
            }}
            className="property-carousel-arrow property-carousel-arrow-prev"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.55)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.55)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2.4} />
          </button>

          {/* Next Arrow Button (36px circular, rgba(0,0,0,0.55)) */}
          <button
            type="button"
            onClick={handleNext}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onTouchEnd={handleNext}
            aria-label="Next photo"
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.28)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 25,
              pointerEvents: 'auto',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
              outline: 'none',
              padding: 0,
              transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
            }}
            className="property-carousel-arrow property-carousel-arrow-next"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.55)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.55)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={20} color="#FFFFFF" strokeWidth={2.4} />
          </button>

          {/* Dot Indicators */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(10, 16, 13, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '4px 8px',
              borderRadius: '999px',
              zIndex: 25,
              pointerEvents: 'auto',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
            }}
            className="property-carousel-dots"
          >
            {images.map((_, dotIdx) => {
              const isActive = dotIdx === safeIdx;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => handleDotClick(e, dotIdx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onTouchEnd={(e) => handleDotClick(e, dotIdx)}
                  aria-label={`Jump to photo ${dotIdx + 1}`}
                  style={{
                    width: isActive ? '16px' : '5px',
                    height: '5px',
                    borderRadius: '3px',
                    backgroundColor: isActive ? 'var(--bronze-hi, #C5A880)' : 'rgba(255, 255, 255, 0.45)',
                    boxShadow: isActive ? '0 0 8px rgba(197, 168, 128, 0.75)' : 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    outline: 'none',
                  }}
                  className={`property-carousel-dot ${isActive ? 'is-active' : ''}`}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export interface SelectedPropertiesProps {
  onSelectProperty?: (propertyId: string) => void;
}

export const SelectedProperties: React.FC<SelectedPropertiesProps> = ({ onSelectProperty }) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, propId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [propId]: !prev[propId] }));
  };

  const handlePropertyCardClick = (e: React.MouseEvent, prop: PropertyCardData) => {
    e.preventDefault();
    const targetId = prop.propertyId || prop.id;
    if (onSelectProperty) {
      onSelectProperty(targetId);
      return;
    }
    const basePath = import.meta.env.BASE_URL || '/';
    const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
    try {
      window.history.pushState({}, '', `${cleanBase}/properties/${targetId}`);
    } catch {
      // ignore
    }
    window.location.hash = `#/properties/${targetId}`;
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [properties, setProperties] = useState<PropertyCardData[]>(propertiesData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const syncProperties = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const publicProps = await propertyService.getPublicProperties();
      if (publicProps && publicProps.length > 0) {
        const mapped: PropertyCardData[] = publicProps.map((p) => {
          let statusLabel = 'AVAILABLE';
          if (p.status === 'Upcoming') statusLabel = 'UPCOMING';
          else if (p.status === 'Under Construction' || p.status === 'Under Offer') statusLabel = 'UNDER OFFER';
          else if (p.status === 'Sold') statusLabel = 'SOLD';

          return {
            id: p.id,
            status: statusLabel,
            category: `${p.propertyType.toUpperCase()} • ${p.bedrooms} BHK`,
            price: p.price,
            name: p.title,
            location: `${p.locality || p.city}, ${p.city}`,
            propertyId: p.propertyId,
            listingLabel: 'Property for Sale',
            images: p.galleryImages && p.galleryImages.length > 0 ? p.galleryImages : [p.coverImage],
          };
        });
        setProperties(mapped);
      } else {
        // Keep existing static properties as fallback
        setProperties(propertiesData);
      }
    } catch (err: any) {
      console.warn('Failed to load public properties from database:', err);
      setLoadError(err?.message || 'Network request failed');
      // Keep static content as fallback
      setProperties(propertiesData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncProperties();
    window.addEventListener(PROPERTIES_UPDATED_EVENT, syncProperties);
    return () => window.removeEventListener(PROPERTIES_UPDATED_EVENT, syncProperties);
  }, []);

  return (
    <section
      id="properties"
      style={{
        backgroundColor: '#090D0B',
        color: '#FFFFFF',
        padding: 'clamp(96px, 8.5vw, 135px) 0',
        position: 'relative',
        borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: 'clamp(2.8rem, 4.8vw, 4rem)',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--bronze)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.9rem',
              }}
            >
              SELECTED RESIDENCES
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 5.2vw, 4.4rem)',
                lineHeight: 1.08,
                color: '#FAF8F4',
                letterSpacing: '-0.02em',
                fontWeight: 400,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}
            >
              <span style={{ fontSize: '0.88em', display: 'inline-block' }}>★</span>
              <span>Featured</span>
            </h2>
          </div>

          <div>
            <a
              href="./properties.html"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--bronze)',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: '1px solid var(--bronze)',
                paddingBottom: '0.35rem',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--bronze)';
                e.currentTarget.style.borderColor = 'var(--bronze)';
              }}
            >
              <span>VIEW ALL PROPERTIES</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Optional Retry Alert if network failed */}
        {loadError && (
          <div style={{ padding: '14px 20px', borderRadius: '4px', backgroundColor: 'rgba(224, 122, 111, 0.08)', border: '1px solid rgba(224, 122, 111, 0.25)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <span style={{ color: '#e07a6f', fontSize: '13px' }}>Could not sync live database. Displaying offline portfolio.</span>
            <button type="button" onClick={syncProperties} style={{ background: 'transparent', border: '1px solid #c9a77c', color: '#c9a77c', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Retry</button>
          </div>
        )}

        {/* 3-Column Equal-Height Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            alignItems: 'stretch',
          }}
          className="properties-three-grid"
        >
          {isLoading ? (
            [1, 2, 3].map((n) => (
              <div
                key={`prop-skel-${n}`}
                style={{
                  backgroundColor: '#0F1613',
                  border: '1px solid rgba(197, 168, 128, 0.12)',
                  borderRadius: '2px',
                  minHeight: '440px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: '240px', backgroundColor: 'rgba(255, 255, 255, 0.03)' }} />
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ height: '14px', width: '60%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '3px' }} />
                  <div style={{ height: '24px', width: '85%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '3px' }} />
                  <div style={{ height: '14px', width: '40%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '3px' }} />
                </div>
              </div>
            ))
          ) : properties.length === 0 ? (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: '64px 20px',
                textAlign: 'center',
                backgroundColor: '#0F1613',
                border: '1px solid rgba(197, 168, 128, 0.15)',
                borderRadius: '4px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: '#FAF8F4', margin: '0 0 10px', fontWeight: 400 }}>New listings are coming soon</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', color: 'rgba(237, 232, 223, 0.65)', maxWidth: '420px', margin: '0 auto' }}>Our acquisition advisory team is currently curating prime architectural residences. Check back shortly.</p>
            </div>
          ) : (
            properties.map((prop, idx) => {
            const cardImages = prop.images && prop.images.length > 0
              ? prop.images
              : prop.image
              ? [prop.image.src]
              : [];

            return (
              <motion.a
                key={prop.id}
                href={`#${prop.propertyId || prop.id}`}
                onClick={(e) => handlePropertyCardClick(e, prop)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: '#0F1613',
                  border: '1px solid rgba(197, 168, 128, 0.18)',
                  borderRadius: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
                }}
                className="property-card-curated-dark"
                aria-label={`View architectural details for ${prop.name} - ${prop.price}`}
              >
                {/* Image Area with Integrated Carousel */}
                <PropertyImageCarousel
                  images={cardImages}
                  name={prop.name}
                  status={prop.status}
                  isFavorite={!!favorites[prop.id]}
                  onToggleFavorite={(e) => toggleFavorite(e, prop.id)}
                  hasVideo={Array.isArray((prop as any).videos) && (prop as any).videos.length > 0}
                />

                {/* Card Body */}
                <div
                  className="property-card-body"
                  style={{
                    padding: '24px 26px 22px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    backgroundColor: '#0F1613',
                  }}
                >
                  <div>
                    {/* Row 1: Category on left, Price on right */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        marginBottom: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '11.5px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'var(--bronze)',
                          fontWeight: 600,
                        }}
                      >
                        {prop.category}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '22px',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {prop.price}
                      </span>
                    </div>

                    {/* Row 2: Property title in serif font */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.35rem, 1.7vw, 1.6rem)',
                        lineHeight: 1.22,
                        color: '#FAF8F4',
                        fontWeight: 400,
                        margin: '0 0 10px 0',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {prop.name}
                    </h3>

                    {/* Row 3: Location & ID with diamond indicator */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'rgba(237, 232, 223, 0.65)',
                        fontSize: '13.5px',
                        fontFamily: 'var(--font-sans)',
                        marginBottom: '20px',
                      }}
                    >
                      <span style={{ color: 'var(--bronze)', fontSize: '11px', display: 'inline-block' }}>✦</span>
                      <span>{prop.location} • ID: {prop.propertyId}</span>
                    </div>
                  </div>

                  {/* Row 4: Listing Label with gold tag icon on left, Inquire on right */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: "'Manrope', var(--font-sans)",
                      paddingTop: '6px',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#b9b2a2',
                        fontFamily: "'Manrope', var(--font-sans)",
                        fontSize: '12.5px',
                        letterSpacing: '0.01em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Tag size={14} color="#c9a77c" style={{ flexShrink: 0 }} />
                      <span>{prop.listingLabel || 'Property for Sale'}</span>
                    </span>

                    <span
                      style={{
                        color: '#FAF8F4',
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'color 0.25s ease',
                      }}
                      className="inquire-cta"
                    >
                      <span>Inquire</span>
                      <span
                        style={{
                          display: 'inline-block',
                          transition: 'transform 0.25s ease',
                        }}
                        className="inquire-arrow"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          }))}
        </div>
      </div>

      <style>{`
        .property-card-curated-dark:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
          border-color: rgba(197, 168, 128, 0.5) !important;
        }
        .property-card-curated-dark:focus-visible {
          outline: 2px solid var(--bronze);
          outline-offset: 4px;
        }
        .property-card-curated-dark:hover .property-card-image {
          transform: scale(1.04);
        }
        .property-card-curated-dark:hover .inquire-cta {
          color: var(--bronze-hi) !important;
        }
        .property-card-curated-dark:hover .inquire-arrow {
          transform: translateX(4px);
        }

        /* Carousel Navigation Controls: ALWAYS visible on desktop and mobile */
        .property-carousel-arrow {
          opacity: 1 !important;
          pointer-events: auto !important;
          display: flex !important;
        }

        @media (max-width: 991px) {
          .properties-three-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 600px) {
          .properties-three-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .property-card-body {
            padding: 20px 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
