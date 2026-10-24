import React, { useState, useRef, useMemo, useCallback } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PropertyListing } from '../data/propertiesData';

const DARK_PLACEHOLDER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23070D0B'/%3E%3Crect x='20' y='20' width='760' height='460' rx='14' fill='none' stroke='%2326332E' stroke-width='2'/%3E%3Ctext x='50%25' y='52%25' font-family='sans-serif' font-weight='600' font-size='18' fill='%239AA39E' text-anchor='middle'%3EiGREY HOLDINGS%3C/text%3E%3C/svg%3E";

export interface PropertyCardProps {
  property: PropertyListing;
  index?: number;
  onSelect?: (property: PropertyListing) => void;
  onEnquire?: (property: PropertyListing) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onEnquire,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);

  const images = property.images && property.images.length > 0 ? property.images : [DARK_PLACEHOLDER_SVG];
  const total = images.length;

  // Sync active slide index with native track scroll
  const handleScroll = useCallback(() => {
    if (isScrollingProgrammatically.current) return;
    const track = trackRef.current;
    if (!track) return;
    const scrollLeft = track.scrollLeft;
    const width = track.clientWidth || 1;
    const newIdx = Math.round(scrollLeft / width);
    if (newIdx >= 0 && newIdx < total && newIdx !== activeSlide) {
      setActiveSlide(newIdx);
    }
  }, [total, activeSlide]);

  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const targetIdx = ((index % total) + total) % total;
    isScrollingProgrammatically.current = true;
    const targetLeft = targetIdx * track.clientWidth;
    track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    setActiveSlide(targetIdx);
    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 350);
  }, [total]);

  const handlePrev = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSlide(activeSlide - 1);
  };

  const handleNext = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSlide(activeSlide + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      scrollToSlide(activeSlide - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
      scrollToSlide(activeSlide + 1);
    }
  };

  // Status Badge Determination
  // Available #278d65, Under Offer #d97706, Upcoming #2f5fd0, Sold #6b7280
  const statusLower = (property.status || 'available').toLowerCase();
  let statusText = 'AVAILABLE';
  let statusBg = '#278d65';

  if (statusLower.includes('offer')) {
    statusText = 'UNDER OFFER';
    statusBg = '#d97706';
  } else if (statusLower.includes('upcoming')) {
    statusText = 'UPCOMING';
    statusBg = '#2f5fd0';
  } else if (statusLower.includes('sold') || statusLower.includes('closed') || statusLower.includes('leased')) {
    statusText = 'SOLD';
    statusBg = '#6b7280';
  } else {
    statusText = 'AVAILABLE';
    statusBg = '#278d65';
  }

  // Listing Type: "For Sale" | "For Rent" | "For Lease"
  let listingTypeLabel = 'For Sale';
  if (property.listingType === 'rent') {
    listingTypeLabel = 'For Rent';
  } else if (property.listingType === 'lease') {
    listingTypeLabel = 'For Lease';
  } else {
    listingTypeLabel = 'For Sale';
  }

  // Category and specs row: e.g. "EXECUTIVE VILLA • 4 BHK"
  const categoryRow = useMemo(() => {
    const cat = (property.category || property.propertyType || '').toUpperCase();
    if (property.bhk && property.bhk > 0) {
      return `${cat} • ${property.bhk} BHK`;
    }
    return cat;
  }, [property.category, property.propertyType, property.bhk]);

  // Pricing display
  const isRentOrLease = property.listingType === 'rent' || property.listingType === 'lease';
  const displayPrice = property.price || 'Price on Request';
  const priceSuffix = isRentOrLease ? (property.priceSuffix || '/mo') : '';

  // Deposit or Lease note: e.g. "Deposit: ₹6.0 L" or "Lease: ₹12.0 L (2-3 Yrs)"
  const noteText = property.note ? `• ${property.note}` : '';
  const isLongNote = noteText.length > 22;

  const handleInquireClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEnquire) {
      onEnquire(property);
    } else {
      window.dispatchEvent(
        new CustomEvent('igrey_inquire_property', { detail: { property } })
      );
    }
  };

  return (
    <article
      className="prop-card"
      tabIndex={0}
      role="region"
      aria-label={`${property.title} - ${listingTypeLabel}`}
      onClick={() => onSelect && onSelect(property)}
      style={{ cursor: onSelect ? 'pointer' : 'default' }}
    >
      {/* 16:10 Photo Carousel with Native Scroll-Snap */}
      <div className="prop-card-media-wrap">
        <div
          ref={trackRef}
          className="prop-carousel-track"
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          aria-label={`Photos of ${property.title}. Use arrow keys to navigate.`}
        >
          {images.map((imgUrl, idx) => (
            <div key={idx} className="prop-carousel-slide">
              <img
                src={imgUrl}
                alt={`${property.title} - Photo ${idx + 1} of ${total}`}
                className="prop-carousel-img"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== DARK_PLACEHOLDER_SVG) {
                    target.onerror = null;
                    target.src = DARK_PLACEHOLDER_SVG;
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Top-Left Status Badge (uppercase, white text, radius 6px) */}
        <span
          className="prop-badge-status"
          style={{ backgroundColor: statusBg }}
          aria-label={`Status: ${statusText}`}
        >
          {statusText}
        </span>

        {/* Top-Right Listing Type Badge (Dark pill #111514, 1px border) */}
        <span
          className="prop-badge-type"
          aria-label={`Listing type: ${listingTypeLabel}`}
        >
          {listingTypeLabel}
        </span>

        {/* Desktop Hover Arrows (‹ ›, looping) */}
        {total > 1 && (
          <>
            <button
              type="button"
              className="prop-carousel-arrow prop-arrow-prev"
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={16} strokeWidth={2.4} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="prop-carousel-arrow prop-arrow-next"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
            </button>

            {/* Bottom-Center Dots */}
            <div className="prop-carousel-dots" role="tablist" aria-label="Photo pagination">
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`prop-carousel-dot ${dotIdx === activeSlide ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSlide(dotIdx);
                  }}
                  aria-label={`Go to photo ${dotIdx + 1}`}
                  aria-selected={dotIdx === activeSlide}
                  role="tab"
                />
              ))}
            </div>

            {/* Bottom-Right "1 / N" Counter */}
            <div className="prop-carousel-counter" aria-live="polite">
              {activeSlide + 1} / {total}
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="prop-card-body">
        {/* Category Row: "EXECUTIVE VILLA • 4 BHK" (bold, uppercase, small) */}
        <div className="prop-category-row">{categoryRow}</div>

        {/* Bold Sans Title */}
        <h3 className="prop-card-title">{property.title}</h3>

        {/* Location Row with Pin Icon and ID Chip ("• ID: IGH-RES-01") */}
        <div className="prop-location-row">
          <div className="prop-location-inner">
            <MapPin size={14} className="prop-pin-icon" aria-hidden="true" />
            <span className="prop-location-text">{property.location}</span>
          </div>
          <span className="prop-id-chip">• ID: {property.id}</span>
        </div>

        {/* Divider directly above footer */}
        <div className="prop-card-divider" />

        {/* Pinned Footer with Bold Price & Outlined Inquire Button */}
        <div className="prop-card-footer">
          <div className="prop-price-box">
            <div className="prop-price-main-line">
              <span className="prop-price-val">{displayPrice}</span>
              {priceSuffix && <span className="prop-price-suffix">{priceSuffix}</span>}
              {noteText && !isLongNote && (
                <span className="prop-note-inline">{noteText}</span>
              )}
            </div>
            {noteText && isLongNote && (
              <div className="prop-note-wrap">{noteText}</div>
            )}
          </div>

          <button
            type="button"
            className="prop-inquire-btn"
            onClick={handleInquireClick}
            aria-label={`Inquire about ${property.title}`}
          >
            Inquire
          </button>
        </div>
      </div>
    </article>
  );
};
