import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserCheck, Home, Wrench, Key } from 'lucide-react';
import { siteContent } from '../data/content';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { eyebrow, headingPart1, headingPart2, subtitle, features } = siteContent.about;

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'userCheck':
        return <UserCheck size={22} color="var(--bronze-hi)" />;
      case 'home':
        return <Home size={22} color="var(--bronze-hi)" />;
      case 'wrench':
        return <Wrench size={22} color="var(--bronze-hi)" />;
      case 'key':
      default:
        return <Key size={22} color="var(--bronze-hi)" />;
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: '#070D0A',
        color: '#FFFFFF',
        padding: 'clamp(5.5rem, 8.5vw, 9rem) 0',
        position: 'relative',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Radial Glow in background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at top, rgba(197, 168, 128, 0.08) 0%, rgba(7, 13, 10, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Header matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto clamp(3.5rem, 5.5vw, 4.75rem) auto' }}
        >
          {/* Small Top Gold Dot Indicator */}
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--bronze-hi)',
              margin: '0 auto 1.35rem auto',
              boxShadow: '0 0 10px rgba(197, 168, 128, 0.8)',
            }}
          />

          {/* Eyebrow Label: THE iGREY ADVANTAGE */}
          <div style={{ marginBottom: '1rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--bronze-hi)',
                fontWeight: 600,
              }}
            >
              {eyebrow}
            </span>
          </div>

          {/* Headline: Why Choose iGH? */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.4vw, 3.8rem)',
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-0.015em',
              fontWeight: 400,
              marginBottom: '1.25rem',
            }}
          >
            {headingPart1 || 'Why Choose'}{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--bronze-hi)',
              }}
            >
              {headingPart2 || 'iGH?'}
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.72)',
              fontWeight: 300,
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* 4 Advantage Cards matching reference image */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
          className="about-advantage-grid"
        >
          {features.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'linear-gradient(180deg, rgba(14, 24, 19, 0.75) 0%, rgba(9, 15, 12, 0.9) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(197, 168, 128, 0.22)',
                borderRadius: '22px',
                padding: 'clamp(2.25rem, 3vw, 2.75rem) 1.85rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.35s ease',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
              }}
              className="about-advantage-card"
            >
              {/* Squircle Badge Icon */}
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
                className="about-card-icon-badge"
              >
                {getFeatureIcon(feat.icon)}
              </div>

              {/* Card Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  lineHeight: 1.25,
                  color: '#FFFFFF',
                  fontWeight: 500,
                  marginBottom: '1rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {feat.title}
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
              >
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .about-advantage-card:hover {
          transform: translateY(-4px);
          border-color: rgba(197, 168, 128, 0.45) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 0 0 20px rgba(197, 168, 128, 0.1) !important;
        }
        .about-advantage-card:hover .about-card-icon-badge {
          transform: scale(1.05);
          border-color: var(--bronze-hi) !important;
        }
        @media (max-width: 1024px) {
          .about-advantage-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 580px) {
          .about-advantage-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .about-advantage-card {
            padding: 1.65rem 1.25rem !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
