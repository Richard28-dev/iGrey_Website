import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, KeyRound, TrendingUp, ShieldCheck } from 'lucide-react';
import { scrollToTarget } from '../utils/scroll';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  tags: string[];
  icon: 'advisory' | 'sales' | 'investment' | 'management';
}

const servicesData: ServiceItem[] = [
  {
    id: 'advisory',
    number: '01',
    title: 'Property Advisory',
    tagline: 'Strategic valuation and due diligence for high-value acquisitions.',
    tags: ['Valuation', 'Acquisition'],
    icon: 'advisory',
  },
  {
    id: 'sales',
    number: '02',
    title: 'Property Sales',
    tagline: 'Discreet positioning and structured negotiation for prime estates.',
    tags: ['Private Network', 'Positioning'],
    icon: 'sales',
  },
  {
    id: 'investment',
    number: '03',
    title: 'Investment Solutions',
    tagline: 'High-yield portfolio structuring and generational wealth growth.',
    tags: ['Capital Growth', 'Risk Modeling'],
    icon: 'investment',
  },
  {
    id: 'management',
    number: '04',
    title: 'Property Management',
    tagline: '100% remote asset supervision with guaranteed on-time payouts.',
    tags: ['Guaranteed Rent', 'Verified KYC'],
    icon: 'management',
  },
];

export const Services: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleEnquire = () => {
    scrollToTarget('#contact', { offset: -40, duration: 1.25 });
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'advisory':
        return <Compass size={20} color="var(--bronze-hi)" strokeWidth={1.75} />;
      case 'sales':
        return <KeyRound size={20} color="var(--bronze-hi)" strokeWidth={1.75} />;
      case 'investment':
        return <TrendingUp size={20} color="var(--bronze-hi)" strokeWidth={1.75} />;
      case 'management':
      default:
        return <ShieldCheck size={20} color="var(--bronze-hi)" strokeWidth={1.75} />;
    }
  };

  return (
    <section
      id="services"
      style={{
        backgroundColor: '#090D0B',
        color: '#FFFFFF',
        padding: 'clamp(5rem, 8vw, 8.5rem) 0',
        position: 'relative',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(197, 168, 128, 0.05) 0%, rgba(9, 13, 11, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header: Minimal & Refined */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--bronze-hi)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.85rem',
            }}
          >
            <span style={{ width: '20px', height: '1px', backgroundColor: 'var(--bronze)' }} />
            BESPOKE SERVICES
            <span style={{ width: '20px', height: '1px', backgroundColor: 'var(--bronze)' }} />
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
              lineHeight: 1.12,
              color: '#FBF9F4',
              letterSpacing: '-0.02em',
              fontWeight: 400,
              marginBottom: '0.85rem',
            }}
          >
            Distinctive Real Estate{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--bronze-hi)' }}>Expertise.</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 300,
              maxWidth: '520px',
              margin: 0,
            }}
          >
            Four dedicated pillars engineered for discerning homeowners and investors.
          </p>
        </div>

        {/* 4 Minimal Typographic Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
          className="services-cards-grid"
        >
          {servicesData.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={handleEnquire}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{
                  background: isHovered
                    ? 'linear-gradient(165deg, rgba(20, 32, 25, 0.95) 0%, rgba(9, 14, 11, 0.98) 100%)'
                    : 'linear-gradient(165deg, rgba(14, 22, 18, 0.75) 0%, rgba(7, 11, 9, 0.92) 100%)',
                  border: isHovered
                    ? '1.5px solid rgba(229, 203, 163, 0.75)'
                    : '1.5px solid rgba(197, 168, 128, 0.22)',
                  borderRadius: '20px',
                  padding: '2.25rem 1.65rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  cursor: 'pointer',
                  boxShadow: isHovered
                    ? '0 20px 45px rgba(0, 0, 0, 0.55), 0 0 24px rgba(197, 168, 128, 0.18)'
                    : '0 8px 24px rgba(0, 0, 0, 0.3)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="services-card-item"
              >
                <div>
                  {/* Top: Squircle Icon & Number */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.75rem',
                    }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(10, 16, 13, 0.85)',
                        border: '1.5px solid rgba(197, 168, 128, 0.38)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'border-color 0.3s ease',
                      }}
                    >
                      {getServiceIcon(item.icon)}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.65rem',
                        color: isHovered ? 'var(--bronze-hi)' : 'rgba(197, 168, 128, 0.45)',
                        fontStyle: 'italic',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.65rem',
                      lineHeight: 1.2,
                      color: isHovered ? 'var(--bronze-hi)' : '#FFFFFF',
                      fontWeight: 400,
                      marginBottom: '0.85rem',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Single Crisp Tagline */}
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                      color: 'rgba(255, 255, 255, 0.68)',
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {item.tagline}
                  </p>
                </div>

                {/* Bottom: Tags & Arrow */}
                <div
                  style={{
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      color: 'rgba(237, 232, 223, 0.55)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.tags[0]} • {item.tags[1]}
                  </span>
                  <ArrowUpRight
                    size={16}
                    color={isHovered ? 'var(--bronze-hi)' : 'rgba(197, 168, 128, 0.7)'}
                    style={{
                      transform: isHovered ? 'translate(2px, -2px)' : 'none',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .services-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem !important;
          }
        }
        @media (max-width: 640px) {
          .services-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.15rem !important;
          }
          .services-card-item {
            min-height: auto !important;
            padding: 1.85rem 1.35rem 1.65rem !important;
          }
        }
      `}</style>
    </section>
  );
};
