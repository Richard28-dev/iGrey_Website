import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  KeyRound,
  Building2,
  TrendingUp,
  HardHat,
  ShieldCheck,
} from 'lucide-react';
import { scrollToTarget } from '../utils/scroll';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: 'home' | 'key' | 'building' | 'trending' | 'construction' | 'shield';
}

const servicesData: ServiceItem[] = [
  {
    id: 'buying-selling',
    title: 'Property Buying & Selling',
    description:
      'Explore suitable properties, connect with prospective buyers and sellers, and receive support with negotiations and transaction coordination.',
    icon: 'home',
  },
  {
    id: 'renting-leasing',
    title: 'Renting & Leasing',
    description:
      'Find residential or commercial spaces, market available properties and coordinate rental and lease arrangements.',
    icon: 'key',
  },
  {
    id: 'property-management',
    title: 'Property Management',
    description:
      'Support for tenant coordination, rent administration, inspections, maintenance and day-to-day property operations.',
    icon: 'building',
  },
  {
    id: 'property-investment',
    title: 'Property Investment',
    description:
      'Evaluate property opportunities through market research, comparative analysis, income assessment and investment planning support.',
    icon: 'trending',
  },
  {
    id: 'construction-development',
    title: 'Construction & Development',
    description:
      'Project coordination, development planning and construction-related support aligned with the agreed scope and qualified professionals.',
    icon: 'construction',
  },
  {
    id: 'asset-management-advisory',
    title: 'Asset Management & Advisory',
    description:
      'Support for property performance, operating costs, portfolio oversight and informed real estate decisions.',
    icon: 'shield',
  },
];

export const Services: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleEnquire = (serviceTitle: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('igrey_prefill_contact', {
          detail: {
            service: serviceTitle,
            message: `Inquiring regarding ${serviceTitle} services with iGREY HOLDINGS.`,
          },
        })
      );
    }
    scrollToTarget('#contact', { offset: -40, duration: 1.25 });
  };

  const getServiceIcon = (type: ServiceItem['icon']) => {
    switch (type) {
      case 'home':
        return <Home size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
      case 'key':
        return <KeyRound size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
      case 'building':
        return <Building2 size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
      case 'trending':
        return <TrendingUp size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
      case 'construction':
        return <HardHat size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
      case 'shield':
      default:
        return <ShieldCheck size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
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
        {/* Section Header: Matching target layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
          }}
        >
          {/* Eyebrow: — OUR SERVICES — */}
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--bronze-hi, #DEBA88)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.85rem',
              marginBottom: '1rem',
            }}
          >
            <span style={{ width: '22px', height: '1px', backgroundColor: 'rgba(197, 168, 128, 0.45)' }} />
            OUR SERVICES
            <span style={{ width: '22px', height: '1px', backgroundColor: 'rgba(197, 168, 128, 0.45)' }} />
          </span>

          {/* Heading: One Partner. Multiple Property Solutions. */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)',
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              fontWeight: 400,
              margin: '0 0 1rem 0',
            }}
          >
            One Partner.{' '}
            <span style={{ fontStyle: 'italic', color: '#F7DAA5' }}>
              Multiple Property Solutions.
            </span>
          </h2>

          {/* Subtitle paragraph */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.65)',
              fontWeight: 300,
              maxWidth: '680px',
              margin: 0,
            }}
          >
            From property transactions to development and asset management, iGREY HOLDINGS supports a wide range of real estate requirements.
          </p>
        </div>

        {/* 6 Services Cards: 3x2 Grid matching reference image */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.75rem',
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
                onClick={() => handleEnquire(item.title)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: isHovered
                    ? 'linear-gradient(180deg, rgba(18, 30, 24, 0.9) 0%, rgba(12, 19, 15, 0.98) 100%)'
                    : 'linear-gradient(180deg, rgba(14, 24, 19, 0.72) 0%, rgba(9, 15, 12, 0.88) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: isHovered
                    ? '1px solid rgba(229, 203, 163, 0.65)'
                    : '1px solid rgba(197, 168, 128, 0.2)',
                  borderRadius: '22px',
                  padding: 'clamp(2.25rem, 3vw, 2.75rem) clamp(1.6rem, 2.2vw, 2.25rem)',
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
                {/* Squircle Badge Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '13px',
                    background: 'rgba(10, 17, 13, 0.85)',
                    border: '1px solid rgba(197, 168, 128, 0.32)',
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
                    fontSize: 'clamp(1.35rem, 1.6vw, 1.55rem)',
                    lineHeight: 1.25,
                    color: isHovered ? 'var(--bronze-hi, #DEBA88)' : '#FFFFFF',
                    fontWeight: 500,
                    marginBottom: '0.85rem',
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
                    fontSize: '0.92rem',
                    lineHeight: 1.65,
                    color: 'rgba(255, 255, 255, 0.62)',
                    fontWeight: 300,
                    margin: 0,
                  }}
                  className="services-card-desc"
                >
                  {item.description}
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
          border-color: var(--bronze-hi, #DEBA88) !important;
        }
        @media (max-width: 1024px) {
          .services-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .services-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .services-card-item {
            padding: 1.75rem 1.35rem !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
