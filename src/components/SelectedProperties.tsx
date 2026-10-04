import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { siteImages } from '../data/images';
import { scrollToTarget } from '../utils/scroll';

interface PropertyCardData {
  id: string;
  status: 'AVAILABLE' | 'PRIVATE TREATY';
  category: string;
  price: string;
  name: string;
  location: string;
  description: string;
  specs: string;
  image: { src: string; alt: string; width: number; height: number };
}

const propertiesData: PropertyCardData[] = [
  {
    id: 'solarium-pavilion',
    status: 'AVAILABLE',
    category: 'ARCHITECTURAL ESTATE',
    price: '$28,500,000',
    name: 'The Solarium Pavilion',
    location: 'Bel-Air Crest, Los Angeles',
    description: 'Cantilevered sanctuary framed by twilight reflection and open living spaces.',
    specs: '12,400 sq.ft • 6 Beds',
    image: siteImages.propSolarium,
  },
  {
    id: 'villa-obscura',
    status: 'PRIVATE TREATY',
    category: 'VILLA',
    price: '€19,200,000',
    name: 'Villa Obscura',
    location: 'Lake Como, Lombardy',
    description: 'Monolithic charcoal concrete framing dramatic alpine views and glass walls.',
    specs: '9,850 sq.ft • 5 Beds',
    image: siteImages.propObscura,
  },
  {
    id: 'apex-penthouse',
    status: 'AVAILABLE',
    category: 'PENTHOUSE',
    price: '£24,750,000',
    name: 'The Apex Penthouse',
    location: 'One Bishopsgate, London',
    description: 'Triplex sky residence commanding 360-degree metropolitan views.',
    specs: '8,200 sq.ft • 4 Beds',
    image: siteImages.propApex,
  },
];

export const SelectedProperties: React.FC = () => {
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
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
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
                marginBottom: '1rem',
              }}
            >
              SELECTED RESIDENCES
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 4.8vw, 4rem)',
                lineHeight: 1.1,
                color: '#FAF8F4',
                letterSpacing: '-0.02em',
                fontWeight: 400,
                margin: 0,
              }}
            >
              Curated Architectural
              <span style={{ display: 'block' }}>Portfolio</span>
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
                border: '1px solid rgba(197, 168, 128, 0.2)',
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
              aria-label={`View details for ${prop.name} - ${prop.price}`}
            >
              {/* Image Container with 4:3 Aspect Ratio and Top-Left Badge */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
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

                {/* Status Badge: Top-left offset 16px, white background, uppercase, 11-12px, gold text */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: '#FFFFFF',
                    padding: '6px 12px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11.5px',
                    letterSpacing: '0.15em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: '#9a7432',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                    borderRadius: '2px',
                    lineHeight: 1.2,
                  }}
                >
                  {prop.status}
                </div>
              </div>

              {/* Card Body: 32px desktop, responsive mobile */}
              <div
                className="property-card-body"
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  backgroundColor: '#0F1613',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  {/* Row 1: Category on left (uppercase, 12px, letter-spacing 0.18em, gold) and price on right (sans-serif, 20px, medium, bright) */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        letterSpacing: '0.18em',
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
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {prop.price}
                    </span>
                  </div>

                  {/* Row 2: Property name in Cormorant Garamond serif ~30px, regular, elegant light tone */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '30px',
                      lineHeight: 1.15,
                      color: '#FAF8F4',
                      fontWeight: 400,
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {prop.name}
                  </h3>

                  {/* Row 3: Small gold map-pin icon + location in muted grey 15px */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      color: 'rgba(237, 232, 223, 0.72)',
                      fontSize: '15px',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    <MapPin size={15} color="var(--bronze)" strokeWidth={1.8} style={{ flexShrink: 0 }} />
                    <span>{prop.location}</span>
                  </div>

                  {/* Row 4: Short description, muted grey, truncated to a single line with ellipsis */}
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14.5px',
                      lineHeight: 1.5,
                      color: 'rgba(237, 232, 223, 0.55)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={prop.description}
                  >
                    {prop.description}
                  </p>
                </div>

                {/* Bottom Section: Divider + Footer Row */}
                <div style={{ marginTop: '16px' }}>
                  {/* Thin divider (1px border) */}
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: 'rgba(197, 168, 128, 0.18)',
                      marginBottom: '16px',
                    }}
                  />

                  {/* Footer Row: Specs on left ("12,400 sq.ft • 6 Beds", muted, 14px) and "Catalogue →" on right (gold, 14px, medium, letter-spacing 0.05em) */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    <span
                      style={{
                        color: 'rgba(237, 232, 223, 0.65)',
                        fontSize: '14px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {prop.specs}
                    </span>

                    <span
                      style={{
                        color: 'var(--bronze-hi)',
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                      className="catalogue-cta"
                    >
                      <span>Catalogue</span>
                      <span
                        style={{
                          display: 'inline-block',
                          transition: 'transform 0.25s ease',
                        }}
                        className="catalogue-arrow"
                      >
                        →
                      </span>
                    </span>
                  </div>
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
        .property-card-curated-dark:hover .catalogue-arrow {
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
            padding: 22px 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
