import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Property } from '../types';
import { X, Bed, Bath, Car, Maximize, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onEnquire: (property: Property) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onEnquire }) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!property) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(8, 9, 10, 0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1240px',
            maxHeight: '92vh',
            backgroundColor: '#121416',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
            zIndex: 101,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 2rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: '#0E1011',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="micro-label">CURATED RESIDENCE</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  padding: '0.2rem 0.6rem',
                  backgroundColor: 'rgba(197, 168, 128, 0.12)',
                  color: 'var(--color-bronze-light)',
                  border: '1px solid rgba(197, 168, 128, 0.25)',
                  textTransform: 'uppercase',
                }}
              >
                {property.status}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialogue"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                padding: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >
              <span>Close</span>
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
              gap: '2.5rem',
              padding: '2rem',
            }}
            className="property-modal-content"
          >
            {/* Left: Gallery & Architectural Presentation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Main Active Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  backgroundColor: '#080909',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <motion.img
                  key={selectedImageIdx}
                  src={property.gallery[selectedImageIdx] || property.featuredImage}
                  alt={property.name}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Thumbnail Strip */}
              {property.gallery.length > 1 && (
                <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                  {property.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      style={{
                        position: 'relative',
                        width: '90px',
                        height: '60px',
                        flexShrink: 0,
                        border: selectedImageIdx === idx ? '2px solid var(--color-bronze)' : '1px solid rgba(255, 255, 255, 0.1)',
                        padding: 0,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        opacity: selectedImageIdx === idx ? 1 : 0.6,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <img src={img} alt={`${property.name} view ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}

              {/* Architectural Highlights */}
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1.25rem',
                  backgroundColor: '#16191C',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <ShieldCheck size={16} color="var(--color-bronze)" />
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-bronze)' }}>
                    Architectural Specifications
                  </span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {property.architecturalHighlights.map((hl, hIdx) => (
                    <li key={hIdx} style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-bronze)' }}>•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Specifications, Amenities & Enquiry */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <MapPin size={15} color="var(--color-bronze)" />
                  <span>{property.location}</span>
                </div>

                {/* Name */}
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                    color: '#fff',
                    lineHeight: 1.15,
                    marginBottom: '0.65rem',
                  }}
                >
                  {property.name}
                </h2>

                {/* Price & Tagline */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.85rem',
                      color: 'var(--color-bronze-light)',
                      fontWeight: 600,
                    }}
                  >
                    {property.price}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {property.type}
                  </span>
                </div>

                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '1.75rem' }}>
                  {property.description}
                </p>

                {/* Quantitative Spec Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.75rem',
                    padding: '1.25rem 0',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '1.75rem',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                      <Maximize size={15} />
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Area</span>
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{property.area}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                      <Bed size={15} />
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Beds</span>
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{property.bedrooms}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                      <Bath size={15} />
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Baths</span>
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{property.bathrooms}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                      <Car size={15} />
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Garage</span>
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{property.parking} Cars</span>
                  </div>
                </div>

                {/* Amenities Badges */}
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-bronze)', marginBottom: '0.75rem' }}>
                    Featured Amenities
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {property.amenities.map((amenity, aIdx) => (
                      <span
                        key={aIdx}
                        style={{
                          fontSize: '0.78rem',
                          padding: '0.35rem 0.75rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <button
                  onClick={() => {
                    onClose();
                    onEnquire(property);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Request Private Dossier & Viewing
                  <ArrowRight size={16} />
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.65rem' }}>
                  Direct representation through iGrey Private Client Office.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .property-modal-content {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};
