import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, KeyRound, TrendingUp, ShieldCheck } from 'lucide-react';
import { scrollToTarget } from '../utils/scroll';

interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  icon: 'advisory' | 'sales' | 'investment' | 'management';
}

const servicesData: ServiceItem[] = [
  {
    id: 'advisory',
    title: 'Property Advisory',
    tagline: 'Strategic valuation and due diligence for high-value acquisitions.',
    icon: 'advisory',
  },
  {
    id: 'sales',
    title: 'Property Sales',
    tagline: 'Discreet positioning and structured negotiation for prime estates.',
    icon: 'sales',
  },
  {
    id: 'investment',
    title: 'Investment Solutions',
    tagline: 'High-yield portfolio structuring and generational wealth growth.',
    icon: 'investment',
  },
  {
    id: 'management',
    title: 'Property Management',
    tagline: '100% remote asset supervision with guaranteed on-time payouts.',
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
        return <Compass size={22} color="var(--bronze-hi)" strokeWidth={1.8} />;
      case 'sales':
        return <KeyRound size={22} color="var(--bronze-hi)" strokeWidth={1.8} />;
      case 'investment':
        return <TrendingUp size={22} color="var(--bronze-hi)" strokeWidth={1.8} />;
      case 'management':
      default:
        return <ShieldCheck size={22} color="var(--bronze-hi)" strokeWidth={1.8} />;
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

        {/* 4 Cards matching Why Choose iGH section */}
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: isHovered
                    ? 'linear-gradient(180deg, rgba(18, 30, 24, 0.85) 0%, rgba(12, 19, 15, 0.95) 100%)'
                    : 'linear-gradient(180deg, rgba(14, 24, 19, 0.75) 0%, rgba(9, 15, 12, 0.9) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: isHovered
                    ? '1px solid rgba(229, 203, 163, 0.65)'
                    : '1px solid rgba(197, 168, 128, 0.22)',
                  borderRadius: '22px',
                  padding: 'clamp(2.25rem, 3vw, 2.75rem) 1.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  boxShadow: isHovered
                    ? '0 20px 45px rgba(0, 0, 0, 0.5), 0 0 20px rgba(197, 168, 128, 0.1)'
                    : '0 12px 35px rgba(0, 0, 0, 0.35)',
                  transform: isHovered ? 'translateY(-4px)' : 'none',
                  transition: 'all 0.35s ease',
                }}
                className="services-card-item"
              >
                {/* Squircle Badge Icon matching Why Choose iGH */}
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: 'rgba(10, 17, 13, 0.85)',
                    border: '1px solid rgba(197, 168, 128, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.75rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                  className="services-card-icon-badge"
                >
                  {getServiceIcon(item.icon)}
                </div>

                {/* Card Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    lineHeight: 1.25,
                    color: isHovered ? 'var(--bronze-hi)' : '#FFFFFF',
                    fontWeight: 500,
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em',
                    transition: 'color 0.3s ease',
                  }}
                  className="services-card-title"
                >
                  {item.title}
                </h3>

                {/* Card Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    lineHeight: 1.65,
                    color: 'rgba(255, 255, 255, 0.65)',
                    fontWeight: 300,
                    margin: 0,
                  }}
                  className="services-card-desc"
                >
                  {item.tagline}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-card-item:hover {
          transform: translateY(-4px);
          border-color: rgba(197, 168, 128, 0.45) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 0 0 20px rgba(197, 168, 128, 0.1) !important;
        }
        .services-card-item:hover .services-card-icon-badge {
          transform: scale(1.05);
          border-color: var(--bronze-hi) !important;
        }
        @media (max-width: 1024px) {
          .services-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 580px) {
          .services-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .services-card-item {
            padding: 1.65rem 1.25rem !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
