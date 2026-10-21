import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PropertyListing } from '../data/propertiesData';

const DARK_PLACEHOLDER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%230D1513'/%3E%3Crect x='20' y='20' width='760' height='460' rx='16' fill='none' stroke='%231F2B27' stroke-width='2'/%3E%3Cpath d='M360 210h80v80h-80z' fill='%23DEB686' opacity='0.25'/%3E%3Ctext x='50%25' y='52%25' font-family='sans-serif' font-size='18' fill='%23A3AEA9' text-anchor='middle'%3EiGREY HOLDINGS PROPERTY%3C/text%3E%3C/svg%3E";

export interface PropertyCardProps {
  property: PropertyListing;
  index?: number;
  onSelect?: (property: PropertyListing) => void;
  onEnquire?: (property: PropertyListing) => void;
  onScheduleVisit?: (property: PropertyListing) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  index = 0,
  onSelect,
  onEnquire,
  onScheduleVisit,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const images = property.images && property.images.length > 0 ? property.images : [DARK_PLACEHOLDER_SVG];
  const total = images.length;
  const safeIdx = ((currentIdx % total) + total) % total;

  // Sync wishlist from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('igrey_wishlist');
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list) && list.includes(property.id)) {
          setIsFavorite(true);
        }
      }
    } catch {
      // ignore
    }
  }, [property.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => {
      const next = !prev;
      try {
        const stored = localStorage.getItem('igrey_wishlist');
        let list: string[] = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(list)) list = [];
        if (next) {
          if (!list.includes(property.id)) list.push(property.id);
        } else {
          list = list.filter((id) => id !== property.id);
        }
        localStorage.setItem('igrey_wishlist', JSON.stringify(list));
      } catch {
        // ignore
      }
      return next;
    });
  };

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (diffX > 40) {
      handlePrev(e);
    } else if (diffX < -40) {
      handleNext(e);
    }
    touchStartX.current = null;
  };

  // Status badge styling
  const statusLower = (property.status || 'Available').toLowerCase();
  let statusClass = 'status-available';
  let statusText = 'Available';

  if (statusLower.includes('sold') || statusLower.includes('rented') || statusLower.includes('leased')) {
    statusClass = 'status-closed';
    statusText = property.status;
  } else if (statusLower.includes('offer')) {
    statusClass = 'status-under-offer';
    statusText = 'Under Offer';
  } else if (statusLower.includes('upcoming')) {
    statusClass = 'status-upcoming';
    statusText = 'Upcoming';
  } else {
    statusClass = 'status-available';
    statusText = 'Available';
  }

  // Listing type badge label
  let listingTypeLabel = 'For Sale';
  if (property.listingType === 'rent') listingTypeLabel = 'For Rent';
  if (property.listingType === 'lease') listingTypeLabel = 'For Lease';

  // Action handlers prefilling enquiry form
  const handleEnquireClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEnquire) {
      onEnquire(property);
    } else {
      const role = property.listingType === 'sale' ? 'Looking for Buy' : 'Tenant / Looking for Stay';
      const detail = {
        message: `I am interested in acquiring/leasing ${property.title} (ID: ${property.id}) located at ${property.location}. Please share comprehensive details, financial terms, and availability.`,
        role,
        propertyCode: property.id,
        propertyId: property.id,
      };
      window.dispatchEvent(new CustomEvent('igrey_prefill_contact', { detail }));
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleScheduleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onScheduleVisit) {
      onScheduleVisit(property);
    } else {
      const role = property.listingType === 'sale' ? 'Looking for Buy' : 'Tenant / Looking for Stay';
      const detail = {
        message: `I would like to schedule a private walkthrough visit for ${property.title} (ID: ${property.id}) located at ${property.location}. Please contact me with available inspection slots.`,
        role,
        propertyCode: property.id,
        propertyId: property.id,
      };
      window.dispatchEvent(new CustomEvent('igrey_prefill_contact', { detail }));
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.article
      className="property-card"
      tabIndex={0}
      role="region"
      aria-label={`${property.title} - ${listingTypeLabel}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect && onSelect(property)}
      style={{ cursor: onSelect ? 'pointer' : 'default' }}
    >
      {/* Media Box with Image Carousel */}
      <div
        className="property-card-media"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[safeIdx]}
          alt={`${property.title} - ${property.type} view ${safeIdx + 1} of ${total}`}
          className="property-card-img"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== DARK_PLACEHOLDER_SVG) {
              target.onerror = null;
              target.src = DARK_PLACEHOLDER_SVG;
            }
          }}
        />

        {/* Status Badge: Solid high-contrast badge (no dot) */}
        <span className={`card-badge-status ${statusClass}`} aria-label={`Status: ${statusText}`}>
          {statusText}
        </span>

        {/* Listing Type Badge */}
        <span className="card-badge-listing-type" style={{ right: '58px' }}>
          {listingTypeLabel}
        </span>

        {/* Wishlist Heart Button (Top-Right) */}
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={isFavorite ? `Remove ${property.title} from wishlist` : `Save ${property.title} to wishlist`}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(13, 21, 19, 0.75)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            transition: 'all 0.25s ease',
            color: isFavorite ? '#E11D48' : '#FFFFFF',
            outline: 'none',
          }}
          className="property-favorite-btn"
        >
          <Heart
            size={16}
            color={isFavorite ? '#E11D48' : '#FFFFFF'}
            fill={isFavorite ? '#E11D48' : 'none'}
            strokeWidth={2}
          />
        </button>

        {/* Carousel Navigation Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(10, 15, 14, 0.7)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 25,
                transition: 'background-color 0.2s ease',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(10, 15, 14, 0.7)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 25,
                transition: 'background-color 0.2s ease',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Photo Index Counter */}
        {total > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '12px',
              backgroundColor: 'rgba(10, 15, 14, 0.75)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '999px',
              padding: '2px 8px',
              fontSize: '10.5px',
              fontFamily: "'Inter', var(--font-sans)",
              color: '#FAF8F4',
              zIndex: 20,
              pointerEvents: 'none',
              letterSpacing: '0.04em',
            }}
          >
            {safeIdx + 1} / {total}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="property-card-body">
        {/* Type Tag */}
        <div className="property-type-tag">{property.type}</div>

        {/* Title */}
        <h3 className="property-card-title">{property.title}</h3>

        {/* Location & ID */}
        <div className="property-card-location">
          <div className="location-inner">
            <span className="location-diamond" aria-hidden="true">✦</span>
            <span>{property.location}</span>
          </div>
          <span className="property-id-pill">ID: {property.id}</span>
        </div>

        {/* Key Specifications Chips */}
        {property.keySpecs && property.keySpecs.length > 0 && (
          <ul className="property-specs-list" aria-label="Key specifications">
            {property.keySpecs.slice(0, 4).map((spec, sIdx) => (
              <li key={`spec-${property.id}-${sIdx}`} className="property-spec-chip">
                {spec}
              </li>
            ))}
          </ul>
        )}

        {/* Pricing Block: Sale listings show sale price; Rent/Lease show rent & lease specs. NEVER show sale price on rent/lease */}
        <div className="property-pricing-box">
          {property.listingType === 'sale' ? (
            <div className="sale-pricing-wrap">
              <span className="pricing-label">Guide Price</span>
              <span className="pricing-figure-sale">{property.salePrice || 'Price on Request'}</span>
            </div>
          ) : (
            <div className="rent-pricing-wrap">
              <div className="rent-main-row">
                <span className="pricing-label">Monthly Rent</span>
                <div>
                  <span className="pricing-figure-rent">{property.monthlyRent || 'Rent on Request'}</span>
                </div>
              </div>
              <div className="rent-specs-grid">
                <div className="rent-spec-item">
                  <span className="lbl">Deposit:</span>
                  <span className="val">{property.securityDeposit || 'N/A'}</span>
                </div>
                <div className="rent-spec-item">
                  <span className="lbl">Tenure:</span>
                  <span className="val">{property.leaseTenure || 'Flexible'}</span>
                </div>
                {property.maintenanceCharges && (
                  <div className="rent-spec-item">
                    <span className="lbl">Maint:</span>
                    <span className="val">{property.maintenanceCharges}</span>
                  </div>
                )}
                <div className="rent-spec-item">
                  <span className="lbl">Available:</span>
                  <span className="val">{property.availabilityDate || 'Immediate'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dual Actions: Enquire Now & Schedule a Visit */}
        <div className="property-card-actions">
          <button
            type="button"
            className="btn-primary-gold card-action-btn"
            onClick={handleEnquireClick}
            aria-label={`Enquire now about ${property.title}`}
          >
            Enquire Now
          </button>
          <button
            type="button"
            className="btn-secondary-outline card-action-btn"
            onClick={handleScheduleClick}
            aria-label={`Schedule a visit for ${property.title}`}
          >
            Schedule a Visit
          </button>
        </div>
      </div>
    </motion.article>
  );
};
