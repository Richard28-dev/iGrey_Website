import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { siteImages } from '../data/images';
import { scrollToTarget } from '../utils/scroll';

interface PropertyCardData {
  id: string;
  status: string;
  category: string;
  price: string;
  name: string;
  location: string;
  propertyId: string;
  lease: string;
  image: { src: string; alt: string; width: number; height: number };
}

const propertiesData: PropertyCardData[] = [
  {
    id: 'solarium-pavilion',
    status: 'AVAILABLE',
    category: 'GATED SOCIETY • 2 BHK',
    price: '₹38,000',
    name: 'Executive 2 BHK Residence',
    location: 'Gokulam, Mysuru',
    propertyId: 'SS-MYS-02',
    lease: 'Lease: ₹22L (2-3 Yrs)',
    image: siteImages.propSolarium,
  },
  {
    id: 'villa-obscura',
    status: 'AVAILABLE',
    category: 'GATED SOCIETY • 2 BHK',
    price: '₹38,000',
    name: 'Executive 2 BHK Residence',
    location: 'Gokulam, Mysuru',
    propertyId: 'SS-MYS-02',
    lease: 'Lease: ₹22L (2-3 Yrs)',
    image: siteImages.propObscura,
  },
  {
    id: 'apex-penthouse',
    status: 'AVAILABLE',
    category: 'GATED SOCIETY • 2 BHK',
    price: '₹38,000',
    name: 'Executive 2 BHK Residence',
    location: 'Gokulam, Mysuru',
    propertyId: 'SS-MYS-02',
    lease: 'Lease: ₹22L (2-3 Yrs)',
    image: siteImages.propApex,
  },
];

export const SelectedProperties: React.FC = () => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, propId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [propId]: !prev[propId] }));
  };

  const handleNavToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget('#contact', { offset: -40, duration: 1.25 });
  };

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
              href="#contact"
              onClick={handleNavToContact}
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
          {propertiesData.map((prop, idx) => (
            <motion.a
              key={prop.id}
              href="#contact"
              onClick={handleNavToContact}
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
              aria-label={`Inquire about ${prop.name} - ${prop.price}`}
            >
              {/* Image Container with Top-Left Badge */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 11',
                  overflow: 'hidden',
                  backgroundColor: '#070B09',
                }}
              >
                <img
                  src={prop.image.src}
                  alt={prop.image.alt}
                  width={prop.image.width}
                  height={prop.image.height}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 600ms ease',
                    display: 'block',
                  }}
                  className="property-card-image"
                />

                {/* Status Badge: Top-left offset 16px, white background, uppercase, gold text */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: '#FFFFFF',
                    padding: '6px 14px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#9a7432',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.18)',
                    borderRadius: '2px',
                    lineHeight: 1.2,
                    zIndex: 2,
                  }}
                >
                  {prop.status}
                </div>

                {/* Favorite Heart Button: Top-right offset 16px, circular translucent button */}
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(e, prop.id)}
                  aria-label={favorites[prop.id] ? `Remove ${prop.name} from wishlist` : `Save ${prop.name} to wishlist`}
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
                    zIndex: 3,
                    transition: 'all 0.25s ease',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
                    color: favorites[prop.id] ? '#E11D48' : '#FFFFFF',
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
                    color={favorites[prop.id] ? '#E11D48' : '#FFFFFF'}
                    fill={favorites[prop.id] ? '#E11D48' : 'none'}
                    strokeWidth={1.9}
                  />
                </button>
              </div>

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

                {/* Row 4: Lease on left, Inquire on right */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-sans)',
                    paddingTop: '6px',
                  }}
                >
                  <span
                    style={{
                      color: 'rgba(237, 232, 223, 0.65)',
                      fontSize: '13.5px',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {prop.lease}
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
          ))}
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
