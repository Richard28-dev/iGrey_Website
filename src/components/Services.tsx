import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, LayoutGrid, List, Check } from 'lucide-react';
import { siteContent } from '../data/content';
import { scrollToTarget } from '../utils/scroll';

interface ServiceDetail {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  deliverables: string[];
}

const serviceItems: ServiceDetail[] = [
  {
    id: 'advisory',
    number: '01',
    category: 'STRATEGIC CAPITAL',
    title: 'Property Advisory',
    description:
      'Clear guidance to help clients understand opportunities, evaluate options, and move forward with absolute clarity and conviction.',
    deliverables: ['Market Opportunity Analysis', 'Institutional Valuation', 'Discretionary Advisory'],
  },
  {
    id: 'sales',
    number: '02',
    category: 'PRIME TRANSACTIONS',
    title: 'Property Sales',
    description:
      'A structured approach to presenting, positioning, and negotiating high-value transactions with discretion and authority.',
    deliverables: ['Bespoke Enclave Positioning', 'Private Client Network', 'Turnkey Negotiation'],
  },
  {
    id: 'investment',
    number: '03',
    category: 'WEALTH PRESERVATION',
    title: 'Investment Solutions',
    description:
      'Explore real-estate opportunities with a focus on informed decisions, yield precision, and generational capital growth.',
    deliverables: ['High-Yield Asset Allocation', 'Capital Preservation', 'Risk Modeling & Auditing'],
  },
  {
    id: 'management',
    number: '04',
    category: 'ASSET SUPERVISION',
    title: 'Property Management',
    description:
      'Turnkey support designed to help property owners manage prime residences with 100% hands-free convenience and guaranteed payouts.',
    deliverables: ['Guaranteed Rent Payouts', 'Verified Institutional KYC', 'Automated Maintenance'],
  },
];

export const Services: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { eyebrow, subtitle } = siteContent.services;

  const handleEnquire = () => {
    scrollToTarget('#contact', { offset: -40, duration: 1.25 });
  };

  return (
    <section
      id="services"
      style={{
        backgroundColor: '#090D0B',
        color: '#FFFFFF',
        padding: 'clamp(5.5rem, 9vw, 9rem) 0',
        position: 'relative',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle luxury background radial ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 168, 128, 0.06) 0%, rgba(9, 13, 11, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 168, 128, 0.04) 0%, rgba(9, 13, 11, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header: Split Title, Subtitle & Interactive View Mode Switcher */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'end',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
          }}
          className="services-header-split"
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--bronze-hi)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '18px',
                  height: '1px',
                  backgroundColor: 'var(--bronze)',
                }}
              />
              {eyebrow}
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                lineHeight: 1.12,
                color: '#FBF9F4',
                letterSpacing: '-0.02em',
                fontWeight: 400,
              }}
            >
              Comprehensive Real Estate{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--bronze-hi)' }}>Solutions.</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.72)',
                fontWeight: 300,
                margin: 0,
              }}
            >
              {subtitle}
            </p>

            {/* Design Concept Switcher (Allows user to toggle between Grid Monoliths & Editorial List) */}
            <div
              style={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'rgba(14, 22, 18, 0.85)',
                border: '1px solid rgba(197, 168, 128, 0.28)',
                borderRadius: '8px',
                padding: '4px',
                gap: '4px',
              }}
            >
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewMode === 'grid' ? 'var(--bronze)' : 'transparent',
                  color: viewMode === 'grid' ? '#090D0B' : 'rgba(255, 255, 255, 0.65)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <LayoutGrid size={14} />
                <span>Monolith Grid</span>
              </button>

              <button
                onClick={() => setViewMode('list')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewMode === 'list' ? 'var(--bronze)' : 'transparent',
                  color: viewMode === 'list' ? '#090D0B' : 'rgba(255, 255, 255, 0.65)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <List size={14} />
                <span>Editorial Rows</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: 4-Column Typographic Monolith Cards */}
        {viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
            }}
            className="services-monolith-grid"
          >
            {serviceItems.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <motion.div
                  key={item.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={handleEnquire}
                  style={{
                    background: isHovered
                      ? 'linear-gradient(170deg, rgba(22, 36, 28, 0.92) 0%, rgba(10, 16, 13, 0.98) 100%)'
                      : 'linear-gradient(170deg, rgba(14, 22, 18, 0.72) 0%, rgba(8, 12, 10, 0.92) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: isHovered
                      ? '1.5px solid rgba(229, 203, 163, 0.75)'
                      : '1.5px solid rgba(197, 168, 128, 0.22)',
                    borderRadius: '18px',
                    padding: '2rem 1.65rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '440px',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: isHovered
                      ? '0 24px 50px rgba(0, 0, 0, 0.6), 0 0 28px rgba(197, 168, 128, 0.18)'
                      : '0 12px 30px rgba(0, 0, 0, 0.35)',
                    transition: 'border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease',
                  }}
                  className="services-monolith-card"
                >
                  {/* Top: Numeral & Category Micro-tag */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        marginBottom: '1.5rem',
                        borderBottom: '1px solid rgba(197, 168, 128, 0.16)',
                        paddingBottom: '1rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '3rem',
                          lineHeight: 1,
                          fontWeight: 400,
                          color: isHovered ? 'var(--bronze-hi)' : 'rgba(197, 168, 128, 0.55)',
                          fontStyle: 'italic',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {item.number}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.64rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: isHovered ? 'var(--bronze-hi)' : 'rgba(237, 232, 223, 0.55)',
                          fontWeight: 600,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.75rem',
                        lineHeight: 1.22,
                        color: isHovered ? 'var(--bronze-hi)' : '#FFFFFF',
                        fontWeight: 400,
                        marginBottom: '1rem',
                        letterSpacing: '-0.01em',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Narrative Description */}
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.88rem',
                        lineHeight: 1.65,
                        color: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.68)',
                        fontWeight: 300,
                        marginBottom: '1.75rem',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Deliverables & Interactive Arrow */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        marginBottom: '1.75rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {item.deliverables.map((deliv) => (
                        <div
                          key={deliv}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.74rem',
                            color: isHovered ? 'rgba(255, 255, 255, 0.85)' : 'rgba(237, 232, 223, 0.55)',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          <Check size={12} color="var(--bronze-hi)" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.75rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: isHovered ? 'var(--bronze-hi)' : 'rgba(197, 168, 128, 0.85)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        Enquire Service
                      </span>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: isHovered ? 'var(--bronze)' : 'rgba(197, 168, 128, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isHovered ? '#090D0B' : 'var(--bronze-hi)',
                          transform: isHovered ? 'translateX(3px) scale(1.05)' : 'none',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* View Mode 2: Full-Width Haute Editorial Rows */}
        {viewMode === 'list' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid rgba(197, 168, 128, 0.28)',
            }}
          >
            {serviceItems.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={handleEnquire}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '70px minmax(0, 1.4fr) minmax(0, 1.8fr) 50px',
                    alignItems: 'center',
                    gap: 'clamp(1.5rem, 3vw, 3rem)',
                    padding: 'clamp(2rem, 3.5vw, 3rem) 1.5rem',
                    borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
                    cursor: 'pointer',
                    background: isHovered ? 'rgba(197, 168, 128, 0.05)' : 'transparent',
                    borderLeft: isHovered ? '4px solid var(--bronze-hi)' : '4px solid transparent',
                    transition: 'all 0.35s ease',
                  }}
                  className="services-editorial-row"
                >
                  {/* Numeral */}
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(2.2rem, 3.2vw, 3rem)',
                      color: isHovered ? 'var(--bronze-hi)' : 'rgba(197, 168, 128, 0.45)',
                      fontStyle: 'italic',
                      lineHeight: 1,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item.number}
                  </span>

                  {/* Title & Category */}
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.66rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'var(--bronze-hi)',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '0.45rem',
                      }}
                    >
                      {item.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.85rem, 2.6vw, 2.5rem)',
                        lineHeight: 1.15,
                        color: isHovered ? 'var(--bronze-hi)' : '#FFFFFF',
                        fontWeight: 400,
                        margin: 0,
                        letterSpacing: '-0.015em',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Description & Deliverable Badges */}
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.94rem',
                        lineHeight: 1.65,
                        color: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.68)',
                        fontWeight: 300,
                        margin: '0 0 0.85rem 0',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {item.deliverables.map((deliv) => (
                        <span
                          key={deliv}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.7rem',
                            padding: '0.2rem 0.65rem',
                            borderRadius: '4px',
                            background: isHovered
                              ? 'rgba(197, 168, 128, 0.15)'
                              : 'rgba(255, 255, 255, 0.05)',
                            color: isHovered ? '#FFFFFF' : 'rgba(237, 232, 223, 0.65)',
                            border: '1px solid rgba(197, 168, 128, 0.2)',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Circular Arrow Button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        border: isHovered
                          ? '1.5px solid var(--bronze-hi)'
                          : '1.5px solid rgba(255, 255, 255, 0.2)',
                        background: isHovered ? 'var(--bronze)' : 'transparent',
                        color: isHovered ? '#090D0B' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: isHovered ? 'scale(1.1) translateX(4px)' : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .services-monolith-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem !important;
          }
        }
        @media (max-width: 900px) {
          .services-header-split {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .services-editorial-row {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
            padding: 1.75rem 1rem !important;
          }
        }
        @media (max-width: 640px) {
          .services-monolith-grid {
            grid-template-columns: 1fr !important;
            gap: 1.15rem !important;
          }
          .services-monolith-card {
            min-height: auto !important;
            padding: 1.65rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};
