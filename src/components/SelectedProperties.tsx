import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { siteImages } from '../data/images';
import { scrollToTarget } from '../utils/scroll';

interface PropertyItem {
  id: string;
  tag: string;
  title: string;
  location: string;
  rent: string;
  lease: string;
  image: { src: string; alt: string; width: number; height: number };
}

const residentialProperties: PropertyItem[] = [
  {
    id: 'SS-BLR-01',
    tag: 'FULLY FURNISHED • 1 BHK',
    title: 'Modern Studio Apartment',
    location: 'Koramangala, Bengaluru',
    rent: '₹22,000',
    lease: 'Lease: ₹12L (1-2 Yrs)',
    image: siteImages.propStudio,
  },
  {
    id: 'SS-MYS-02',
    tag: 'GATED SOCIETY • 2 BHK',
    title: 'Executive 2 BHK Residence',
    location: 'Gokulam, Mysuru',
    rent: '₹38,000',
    lease: 'Lease: ₹22L (2-3 Yrs)',
    image: siteImages.propExecutive,
  },
  {
    id: 'SS-BLR-03',
    tag: 'FULLY FURNISHED • 3 BHK',
    title: '3 BHK Independent House',
    location: 'Indiranagar, Bengaluru',
    rent: '₹42,000',
    lease: 'Lease: ₹25L (2-3 Yrs)',
    image: siteImages.propHouse,
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
        backgroundColor: '#EBF1F7',
        color: '#0F172A',
        padding: 'clamp(64px, 7vw, 105px) 0',
        position: 'relative',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Section Header - Centered */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
          }}
        >
          {/* Top Pill: READY TO MOVE IN */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FEF9C3',
              border: '1px solid #FDE68A',
              color: '#B45309',
              borderRadius: '9999px',
              padding: '6px 18px',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              boxShadow: '0 2px 6px rgba(217, 119, 6, 0.08)',
            }}
          >
            READY TO MOVE IN
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: '#0B192C',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              margin: '0 0 0.75rem 0',
            }}
          >
            Featured Residential Properties
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
              color: '#64748B',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.55,
              fontWeight: 400,
            }}
          >
            Explore verified homes available for monthly rent and flexible long-term lease.
          </motion.p>
        </div>

        {/* 3-Column Residential Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '26px',
            alignItems: 'stretch',
          }}
          className="properties-residential-grid"
        >
          {residentialProperties.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(11, 25, 44, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
              }}
              className="residential-card"
            >
              {/* Card Image Wrapper */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1.83 / 1',
                  overflow: 'hidden',
                  backgroundColor: '#E2E8F0',
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
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  className="residential-card-img"
                />
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '1.4rem 1.45rem 1.35rem 1.45rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                }}
                className="residential-card-body"
              >
                <div>
                  {/* Category Tag */}
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#0F172A',
                      marginBottom: '0.45rem',
                    }}
                  >
                    {prop.tag}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.22rem',
                      fontWeight: 700,
                      color: '#0F172A',
                      lineHeight: 1.25,
                      margin: '0 0 0.55rem 0',
                    }}
                  >
                    {prop.title}
                  </h3>

                  {/* Location & ID Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.55rem',
                      marginBottom: '1.4rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: '#64748B',
                        fontSize: '0.84rem',
                        fontWeight: 500,
                      }}
                    >
                      <MapPin size={15} style={{ color: '#64748B', flexShrink: 0 }} />
                      <span>{prop.location}</span>
                    </div>

                    <span
                      style={{
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        color: '#475569',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      • ID: {prop.id}
                    </span>
                  </div>
                </div>

                {/* Footer: Price on left, Inquire button on right */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.95rem',
                    borderTop: '1px solid #F1F5F9',
                    marginTop: 'auto',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#0F172A',
                      }}
                    >
                      {prop.rent}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        color: '#78716C',
                      }}
                    >
                      • {prop.lease}
                    </span>
                  </div>

                  <button
                    onClick={handleNavToContact}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      padding: '7px 18px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      cursor: 'pointer',
                      transition: 'all 0.22s ease',
                      flexShrink: 0,
                    }}
                    className="residential-inquire-btn"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center Bottom Action: See More Properties */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'clamp(2.5rem, 4.5vw, 3.5rem)',
          }}
        >
          <button
            onClick={handleNavToContact}
            style={{
              backgroundColor: '#0C2340',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.85rem 2.2rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.94rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(12, 35, 64, 0.25)',
              transition: 'all 0.3s ease',
            }}
            className="see-more-btn"
          >
            <span>See More Properties</span>
            <ArrowRight size={17} />
          </button>
        </motion.div>
      </div>

      <style>{`
        .residential-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 34px rgba(11, 25, 44, 0.1) !important;
          border-color: #CBD5E1 !important;
        }
        .residential-card:hover .residential-card-img {
          transform: scale(1.03);
        }
        .residential-inquire-btn:hover {
          background-color: #0F172A !important;
          color: #FFFFFF !important;
          border-color: #0F172A !important;
        }
        .see-more-btn:hover {
          background-color: #12335C !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(12, 35, 64, 0.38) !important;
        }
        @media (max-width: 991px) {
          .properties-residential-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 640px) {
          .properties-residential-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .residential-card-body {
            padding: 1.2rem 1.15rem 1.15rem 1.15rem !important;
          }
        }
      `}</style>
    </section>
  );
};
