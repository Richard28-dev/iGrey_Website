import React from 'react';
import { motion } from 'framer-motion';
import type { Property } from '../types';
import { MapPin, ArrowRight } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onViewAllClick: () => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  onSelectProperty,
  onViewAllClick,
}) => {
  return (
    <section
      id="properties"
      style={{
        backgroundColor: '#F8F9FA',
        color: '#0F172A',
        padding: '120px 0',
        position: 'relative',
        borderTop: '1px solid #E5E7EB',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '0.75rem' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#B38E46',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                SELECTED RESIDENCES
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)',
                lineHeight: 1.15,
                fontWeight: 350,
                color: '#0F172A',
                letterSpacing: '-0.01em',
              }}
            >
              Curated Architectural Portfolio
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <button
              onClick={onViewAllClick}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.4rem 0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#B38E46',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderBottom: '1px solid #B38E46',
                transition: 'gap 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = '0.75rem')}
              onMouseLeave={(e) => (e.currentTarget.style.gap = '0.5rem')}
            >
              <span>View All Properties</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>

        {/* 3×2 Grid of 6 Equal-Sized Property Listing Cards with Thin 1px Hairlines and Sharp Corners */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.75rem',
          }}
          className="properties-3x2-grid"
        >
          {properties.slice(0, 6).map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectProperty(property)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '0px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(179, 142, 70, 0.6)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Photo Area (Exact 4:3 Aspect Ratio) */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '0px',
                }}
              >
                <img
                  src={property.featuredImage}
                  alt={property.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0px',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Small Status Badge in Top-Left Corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '0.25rem 0.65rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(179, 142, 70, 0.35)',
                    borderRadius: '0px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: property.status === 'Sold' ? '#9AA0A6' : '#8C6D32',
                    fontWeight: 600,
                  }}
                >
                  {property.status}
                </div>
              </div>

              {/* Information Area Below Image */}
              <div
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div>
                  {/* Category Label (Small Caps, Gold) + Price Aligned Right */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginBottom: '0.65rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#B38E46',
                        fontWeight: 600,
                      }}
                    >
                      {property.type}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#0F172A',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {property.price}
                    </span>
                  </div>

                  {/* Serif-Font Property Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.55rem',
                      fontWeight: 400,
                      color: '#0F172A',
                      marginBottom: '0.5rem',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {property.name}
                  </h3>

                  {/* Location Line with Pin Icon */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#475569',
                      fontSize: '0.82rem',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <MapPin size={13} color="#B38E46" style={{ flexShrink: 0 }} />
                    <span>{property.location}</span>
                  </div>

                  {/* One-Line Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: '#64748B',
                      lineHeight: 1.5,
                      marginBottom: '1.25rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={property.tagline}
                  >
                    {property.tagline}
                  </p>
                </div>

                {/* Footer Row: Square Footage / Beds on Left + "Catalogue →" in Gold on Right */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid #F1F5F9',
                    fontSize: '0.78rem',
                  }}
                >
                  <span style={{ color: '#475569', letterSpacing: '0.04em' }}>
                    {property.area} • {property.bedrooms} Beds
                  </span>

                  <span
                    style={{
                      color: '#B38E46',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      transition: 'gap 0.2s ease',
                    }}
                  >
                    Catalogue →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .properties-3x2-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .properties-3x2-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
