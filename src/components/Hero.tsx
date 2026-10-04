import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteContent } from '../data/content';
import { siteImages } from '../data/images';
import { scrollToTarget } from '../utils/scroll';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [activeStatIdx, setActiveStatIdx] = useState<number | null>(null);
  const { headlinePart1, headlinePart2, subtitle, primaryCta, stats } = siteContent.hero;
  const heroImage = siteImages.heroResidential;

  const handleExplore = () => {
    if (onExploreClick) onExploreClick();
    else scrollToTarget('#properties', { offset: -40, duration: 1.25 });
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users size={16} color="var(--bronze-hi)" />;
      case 'building':
        return <Building2 size={16} color="var(--bronze-hi)" />;
      case 'trending':
        return <TrendingUp size={16} color="var(--bronze-hi)" />;
      case 'shield':
      default:
        return <ShieldCheck size={16} color="var(--bronze-hi)" />;
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: '#090D0B',
        color: '#FFFFFF',
        paddingTop: 'clamp(7.5rem, 11vw, 10rem)',
      }}
    >
      {/* Background Hero Image matching Reference Sunset Villa */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 45%',
            filter: 'brightness(0.85) contrast(1.06) saturate(1.12)',
          }}
        />

        {/* Cinematic Scrim Gradients for Perfect Legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(8, 13, 11, 0.72) 0%, rgba(8, 13, 11, 0.45) 45%, rgba(8, 13, 11, 0.15) 75%, rgba(8, 13, 11, 0.3) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(7, 12, 10, 0.55) 0%, rgba(7, 12, 10, 0.1) 40%, rgba(7, 12, 10, 0.6) 80%, rgba(7, 12, 10, 0.95) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Main Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          {/* Main Headline: Where Trust Meets Architectural Grandeur */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.9rem, 5.8vw, 5.6rem)',
              lineHeight: 1.08,
              fontWeight: 400,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            {headlinePart1 || 'Where Trust Meets'}{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--bronze-hi)',
                display: 'block',
              }}
            >
              {headlinePart2 || 'Architectural Grandeur.'}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.88)',
              maxWidth: '580px',
              marginBottom: '2.5rem',
              fontWeight: 300,
            }}
          >
            {subtitle}
          </motion.p>

          {/* Single Gold Action Button matching reference */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={handleExplore}
              className="btn-bronze"
              style={{
                padding: '1rem 2.25rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 28px rgba(0, 0, 0, 0.35)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 14px 34px rgba(197, 168, 128, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.35)';
              }}
            >
              <span>{primaryCta.replace('→', '').trim()}</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Bottom Stats Card matching reference */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          paddingTop: '1.25rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '1020px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(14, 22, 18, 0.88) 0%, rgba(8, 13, 11, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(197, 168, 128, 0.35)',
            borderRadius: '20px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            padding: '1.1rem 1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.85rem',
            alignItems: 'stretch',
          }}
          className="hero-floating-stats-grid"
        >
          {stats.map((st, idx) => {
            const isActive = activeStatIdx === idx;
            return (
              <motion.div
                key={st.label}
                onClick={() => setActiveStatIdx((prev) => (prev === idx ? null : idx))}
                whileHover={!isActive ? { y: -5, scale: 1.02 } : undefined}
                whileTap={{ scale: 0.97 }}
                animate={
                  isActive
                    ? {
                        y: [-6, -13, -6],
                        scale: 1.035,
                      }
                    : {
                        y: 0,
                        scale: 1,
                      }
                }
                transition={
                  isActive
                    ? {
                        y: {
                          repeat: Infinity,
                          duration: 2.4,
                          ease: 'easeInOut',
                        },
                        scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                      }
                    : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0.75rem 0.65rem',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  position: 'relative',
                  userSelect: 'none',
                  border: isActive
                    ? '1px solid rgba(229, 203, 163, 0.85)'
                    : '1px solid transparent',
                  background: isActive
                    ? 'linear-gradient(180deg, rgba(35, 54, 43, 0.85) 0%, rgba(14, 23, 18, 0.95) 100%)'
                    : 'transparent',
                  boxShadow: isActive
                    ? '0 16px 36px rgba(0, 0, 0, 0.65), 0 0 24px rgba(197, 168, 128, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : 'none',
                  transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                className="hero-stat-pillar"
              >
                {/* Circular Badge Icon with Active Pulse Glow */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: isActive
                      ? 'rgba(197, 168, 128, 0.25)'
                      : 'rgba(10, 16, 13, 0.75)',
                    border: isActive
                      ? '1.5px solid #E8D5B7'
                      : '1px solid rgba(197, 168, 128, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.65rem',
                    boxShadow: isActive
                      ? '0 0 16px rgba(197, 168, 128, 0.75), 0 4px 10px rgba(0, 0, 0, 0.4)'
                      : '0 4px 10px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {getStatIcon(st.icon)}
                </div>

                {/* Stat Value with Luminous Gold Text Shadow */}
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(1.65rem, 2.1vw, 2.15rem)',
                    fontWeight: 700,
                    color: isActive ? '#FFFFFF' : '#FFFFFF',
                    lineHeight: 1.1,
                    marginBottom: '0.2rem',
                    letterSpacing: '-0.02em',
                    textShadow: isActive
                      ? '0 0 20px rgba(229, 203, 163, 0.65), 0 2px 6px rgba(0, 0, 0, 0.9)'
                      : 'none',
                    transition: 'text-shadow 0.3s ease',
                  }}
                >
                  {st.value}
                </div>

                {/* Stat Label */}
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: isActive ? '#F7F3ED' : '#FFFFFF',
                    marginBottom: '0.12rem',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {st.label}
                </div>

                {/* Stat Sublabel */}
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    color: isActive ? '#E5CBA3' : 'rgba(255, 255, 255, 0.6)',
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {st.sublabel}
                </div>

                {/* Bottom Luminous Accent Hairline when Active */}
                {isActive && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '45px', opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      height: '2px',
                      backgroundColor: '#C5A880',
                      borderRadius: '1px',
                      boxShadow: '0 0 10px rgba(197, 168, 128, 0.9)',
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .hero-floating-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            border-radius: 18px !important;
            gap: 2rem 1.5rem !important;
          }
          .hero-stat-pillar {
            border-right: none !important;
          }
        }
        @media (max-width: 540px) {
          .hero-floating-stats-grid {
            grid-template-columns: 1fr !important;
            padding: 1.75rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};

