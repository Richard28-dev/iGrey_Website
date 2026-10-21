import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, Target, Heart, UserCheck, Home, Wrench, Key } from 'lucide-react';
import { siteContent } from '../data/content';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { overview, eyebrow, headingPart1, headingPart2, subtitle, features } = siteContent.about;

  const getPillarIcon = (iconName: 'eye' | 'target' | 'heart') => {
    switch (iconName) {
      case 'eye':
        return <Eye size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
      case 'target':
        return <Target size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
      case 'heart':
      default:
        return <Heart size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
    }
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'userCheck':
        return <UserCheck size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
      case 'home':
        return <Home size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
      case 'wrench':
        return <Wrench size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
      case 'key':
      default:
        return <Key size={22} color="var(--bronze-hi, #DEBA88)" strokeWidth={1.8} />;
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
      {/* Subtle Radial Glows in background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '450px',
          background: 'radial-gradient(ellipse at top, rgba(197, 168, 128, 0.08) 0%, rgba(7, 13, 10, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(197, 168, 128, 0.05) 0%, rgba(7, 13, 10, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* ======================================================== */}
        {/* PAGE 1: ABOUT US — Real Estate, Considered From Every Angle */}
        {/* ======================================================== */}
        <div className="about-overview-block">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'center',
              maxWidth: '1100px',
              margin: '0 auto clamp(3.5rem, 5.5vw, 4.75rem) auto',
            }}
          >
            {/* Small Top Gold Dot Indicator */}
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--bronze-hi, #DEBA88)',
                margin: '0 auto 1.35rem auto',
                boxShadow: '0 0 10px rgba(197, 168, 128, 0.8)',
              }}
            />

            {/* Eyebrow Label: ABOUT US */}
            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--bronze-hi, #DEBA88)',
                  fontWeight: 600,
                  display: 'inline-block',
                }}
              >
                {overview.eyebrow}
              </span>
            </div>

            {/* Headline: Real Estate, Considered From Every Angle. */}
            <h2
              className="about-headline-one-line"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.15rem, 3.25vw, 3.35rem)',
                lineHeight: 1.15,
                color: '#FFFFFF',
                letterSpacing: '-0.015em',
                fontWeight: 400,
                margin: '0 0 1.25rem 0',
                whiteSpace: 'nowrap',
              }}
            >
              {overview.headingPart1}{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  color: '#F7DAA5',
                }}
              >
                {overview.headingPart2}
              </span>
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
                lineHeight: 1.75,
                color: 'rgba(255, 255, 255, 0.72)',
                fontWeight: 300,
                maxWidth: '820px',
                margin: '0 auto',
              }}
            >
              {overview.subtitle}
            </p>
          </motion.div>

          {/* 3 Pillars Grid: Vision, Mission, Values */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.75rem',
            }}
            className="about-pillars-grid"
          >
            {overview.pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'linear-gradient(180deg, rgba(14, 24, 19, 0.75) 0%, rgba(9, 15, 12, 0.9) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(197, 168, 128, 0.22)',
                  borderRadius: '22px',
                  padding: 'clamp(2.25rem, 3vw, 2.75rem) clamp(1.6rem, 2.2vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.35s ease',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
                }}
                className="about-pillar-card"
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
                  className="about-card-icon-badge"
                >
                  {getPillarIcon(pillar.icon)}
                </div>

                {/* Card Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.4rem, 1.7vw, 1.6rem)',
                    lineHeight: 1.25,
                    color: '#FFFFFF',
                    fontWeight: 500,
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em',
                  }}
                  className="about-card-title"
                >
                  {pillar.title}
                </h3>

                {/* Description or Values List */}
                {pillar.description && (
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      lineHeight: 1.65,
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {pillar.description}
                  </p>
                )}

                {pillar.valuesList && (
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                    }}
                  >
                    {pillar.valuesList.map((val) => (
                      <li
                        key={val}
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '0.65rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          lineHeight: 1.5,
                          color: 'rgba(255, 255, 255, 0.65)',
                          fontWeight: 300,
                        }}
                      >
                        <span
                          style={{
                            color: 'var(--bronze-hi, #DEBA88)',
                            fontSize: '1rem',
                            lineHeight: 1,
                            flexShrink: 0,
                          }}
                        >
                          •
                        </span>
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Elegant Transition Divider between Page 1 and Page 2 */}
        <div
          style={{
            width: '100%',
            maxWidth: '780px',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(197, 168, 128, 0.28) 50%, transparent 100%)',
            margin: 'clamp(5rem, 8vw, 7.5rem) auto',
          }}
        />

        {/* ======================================================== */}
        {/* PAGE 2: THE iGREY ADVANTAGE — Why Choose iGH?           */}
        {/* ======================================================== */}
        <div className="about-advantage-block" id="why-choose-igh">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'center',
              maxWidth: '780px',
              margin: '0 auto clamp(3.5rem, 5.5vw, 4.75rem) auto',
            }}
          >
            {/* Small Top Gold Dot Indicator */}
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--bronze-hi, #DEBA88)',
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
                  color: 'var(--bronze-hi, #DEBA88)',
                  fontWeight: 600,
                  display: 'inline-block',
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
                margin: '0 0 1.25rem 0',
              }}
            >
              {headingPart1 || 'Why Choose'}{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  color: 'var(--bronze-hi, #DEBA88)',
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

          {/* 4 Advantage Cards */}
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
                  className="about-card-title"
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
      </div>

      <style>{`
        .about-headline-one-line {
          white-space: nowrap !important;
        }
        @media (max-width: 440px) {
          .about-headline-one-line {
            font-size: clamp(0.92rem, 4.4vw, 1.15rem) !important;
          }
        }
        .about-pillar-card:hover,
        .about-advantage-card:hover {
          transform: translateY(-4px);
          border-color: rgba(197, 168, 128, 0.45) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 0 0 20px rgba(197, 168, 128, 0.1) !important;
        }
        .about-pillar-card:hover .about-card-icon-badge,
        .about-advantage-card:hover .about-card-icon-badge {
          transform: scale(1.05);
          border-color: var(--bronze-hi, #DEBA88) !important;
        }
        @media (max-width: 1024px) {
          .about-pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .about-advantage-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .about-advantage-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .about-pillar-card,
          .about-advantage-card {
            padding: 1.75rem 1.35rem !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
