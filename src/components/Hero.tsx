import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteContent } from '../data/content';
import { siteImages } from '../data/images';
import { scrollToTarget } from '../utils/scroll';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { eyebrow, headlinePart1, headlinePart2, stats } = siteContent.hero;
  const heroImage = siteImages.heroResidential;

  const [heroVariant, setHeroVariant] = React.useState<number>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('hero_variant');
      if (p) {
        const n = parseInt(p, 10);
        if (n >= 1 && n <= 4) return n;
      }
    }
    return 2;
  });

  React.useEffect(() => {
    const handlePop = () => {
      const p = new URLSearchParams(window.location.search).get('hero_variant');
      if (p) {
        const n = parseInt(p, 10);
        if (n >= 1 && n <= 4) setHeroVariant(n);
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const propEl = document.getElementById('properties');
      if (propEl) {
        scrollToTarget('#properties', { offset: -40, duration: 1.25 });
      } else {
        window.location.href = './properties.html';
      }
    }
  };

  const handleServicesClick = () => {
    scrollToTarget('#services', { offset: -40, duration: 1.25 });
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users size={20} color="#D4B280" strokeWidth={1.8} />;
      case 'building':
        return <Building2 size={20} color="#D4B280" strokeWidth={1.8} />;
      case 'trending':
        return <TrendingUp size={20} color="#D4B280" strokeWidth={1.8} />;
      case 'shield':
      default:
        return <ShieldCheck size={20} color="#D4B280" strokeWidth={1.8} />;
    }
  };

  const renderStatLabel = (label: string) => {
    if (label.toLowerCase().includes('on-time')) {
      return (
        <span className="hero-stat-lbl-nowrap" style={{ whiteSpace: 'nowrap' }}>
          {label}
        </span>
      );
    }
    if (label.toLowerCase().includes('completed projects')) {
      return (
        <span className="hero-stat-lbl-nowrap" style={{ whiteSpace: 'nowrap' }}>
          {label}
        </span>
      );
    }
    if (label.toLowerCase().includes('verified background')) {
      return (
        <>
          <span className="hero-stat-lbl-line">Verified Background</span>{' '}
          <span className="hero-stat-lbl-line">and KYC</span>
        </>
      );
    }
    return label;
  };

  return (
    <section
      id="hero"
      className={`hero-section hero-variant-${heroVariant}`}
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
        paddingTop: 'clamp(4rem, 6.5vh, 5.75rem)',
        paddingBottom: 'clamp(1rem, 2vh, 2rem)',
      }}
    >
      {/* Background Hero Image */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hero-bg-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 45%',
            filter: 'brightness(0.78) contrast(1.1) saturate(1.12)',
          }}
        />

        {/* Left-to-right scrim: dark on left for text legibility, transparent on right for villa architecture */}
        <div
          className="hero-desktop-scrim"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(7, 12, 10, 0.85) 0%, rgba(7, 12, 10, 0.6) 40%, rgba(7, 12, 10, 0.2) 70%, rgba(7, 12, 10, 0.35) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top-to-bottom vignette: darker at top for header readability and bottom for stats panel grounding */}
        <div
          className="hero-desktop-vignette"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(6, 11, 9, 0.68) 0%, rgba(6, 11, 9, 0.08) 36%, rgba(6, 11, 9, 0.45) 75%, rgba(6, 11, 9, 0.95) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Dark gradient overlay behind text area for mobile view */}
        <div
          className="hero-mobile-scrim"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '80%',
            background:
              'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 35%, rgba(0, 0, 0, 0.82) 100%)',
            pointerEvents: 'none',
            display: 'none',
          }}
        />
      </div>

      {/* Main Content */}
      <div
        className="container hero-main-content"
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
        <div className="hero-content-inner" style={{ maxWidth: '960px' }}>
          {/* Text Group: Headline + Paragraph */}
          <div className="hero-text-group">
            {/* Eyebrow Label */}
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="hero-eyebrow"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(11px, 1.05vw, 13px)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--bronze-hi, #DEBA88)',
                  marginBottom: 'clamp(12px, 1.8vh, 18px)',
                  display: 'inline-block',
                }}
              >
                {eyebrow}
              </motion.div>
            )}

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hero-headline"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(40px, min(4.85vw, 9vh), 96px)',
                lineHeight: 1.1,
                fontWeight: 500,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: 0,
                marginBottom: 'clamp(16px, 2.6vh, 26px)',
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.45)',
              }}
            >
              <span className="hero-headline-line1" style={{ display: 'block', color: '#FFFFFF' }}>
                {headlinePart1 || 'Real Estate Solutions.'}
              </span>
              <span
                className="hero-headline-line2"
                style={{
                  display: 'block',
                  fontStyle: 'italic',
                  color: '#D4B280',
                }}
              >
                {headlinePart2 || 'Beyond Expectations.'}
              </span>
            </motion.h1>

            {/* Subtitle / Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hero-subtitle"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15px, min(1.2vw, 2.4vh), 18px)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.88)',
                maxWidth: '620px',
                marginTop: 0,
                marginBottom: 'clamp(20px, 3.4vh, 34px)',
                fontWeight: 300,
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.45)',
              }}
            >
              From finding the right property to managing, developing and investing{' '}
              <br className="hero-p-break" />
              in real estate, iGREY HOLDINGS brings property solutions together.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="hero-cta-wrapper"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '18px',
            }}
          >
            <button
              onClick={handleExplore}
              className="hero-cta-btn hero-cta-primary"
              style={{
                backgroundColor: '#DEBA88',
                color: '#121614',
                padding: '1rem 2.25rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                fontFamily: 'var(--font-sans)',
                border: '1.5px solid #DEBA88',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 28px rgba(0, 0, 0, 0.35)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxSizing: 'border-box',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E5C696';
                e.currentTarget.style.borderColor = '#E5C696';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 14px 34px rgba(222, 186, 136, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#DEBA88';
                e.currentTarget.style.borderColor = '#DEBA88';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.35)';
              }}
            >
              <span>Explore Properties</span>
              <ArrowRight size={18} color="#121614" strokeWidth={2.2} />
            </button>

            <button
              onClick={handleServicesClick}
              className="hero-cta-btn hero-cta-secondary"
              style={{
                backgroundColor: 'rgba(8, 13, 12, 0.45)',
                color: '#F3EBDC',
                padding: '1rem 2.25rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                fontFamily: 'var(--font-sans)',
                border: '1.5px solid #DEBA88',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 28px rgba(0, 0, 0, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxSizing: 'border-box',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DEBA88';
                e.currentTarget.style.color = '#1A1408';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 14px 34px rgba(222, 186, 136, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(8, 13, 12, 0.45)';
                e.currentTarget.style.color = '#F3EBDC';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.25)';
              }}
            >
              <span>Explore Our Services</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Bottom Stats Card */}
      <div
        className="container hero-stats-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          paddingBottom: '0.25rem',
          paddingTop: 'clamp(6px, 1.2vh, 12px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            background: 'linear-gradient(155deg, rgba(12, 20, 16, 0.92) 0%, rgba(7, 12, 10, 0.97) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(197, 168, 128, 0.32)',
            borderRadius: '22px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            padding: 'clamp(12px, 1.8vh, 18px) 1.6rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
            alignItems: 'center',
          }}
          className="hero-floating-stats-grid"
        >
          {stats.map((st, idx) => {
            return (
              <motion.div
                key={`${st.label}-${idx}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: 'clamp(4px, 0.8vh, 8px) 0.85rem',
                  borderRadius: '16px',
                  position: 'relative',
                  userSelect: 'none',
                  transition: 'background 0.3s ease',
                }}
                className={`hero-stat-pillar hero-stat-cell-${idx}`}
              >
                {/* Centered Squircle Badge Icon */}
                <div
                  className="hero-stat-icon-wrapper"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '13px',
                    background: 'rgba(10, 16, 13, 0.85)',
                    border: '1.5px solid rgba(197, 168, 128, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.65rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                  }}
                >
                  {getStatIcon(st.icon)}
                </div>

                {/* Stat Text Stack */}
                <div className="hero-stat-info">
                  {/* Stat Value */}
                  <div
                    className="hero-stat-val"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(1.75rem, 2.2vw, 2.25rem)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.1,
                      marginBottom: '0.25rem',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {st.value}
                  </div>

                  {/* Stat Label */}
                  <div
                    className="hero-stat-lbl"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      lineHeight: 1.25,
                      marginBottom: 0,
                    }}
                  >
                    {renderStatLabel(st.label)}
                  </div>

                  {/* Stat Sublabel (only if provided) */}
                  {st.sublabel ? (
                    <div
                      className="hero-stat-sub"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.7rem',
                        color: 'rgba(237, 232, 223, 0.55)',
                        fontWeight: 400,
                        lineHeight: 1.25,
                        marginTop: '0.15rem',
                      }}
                    >
                      {st.sublabel}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll to Explore Indicator */}
        <div
          className="hero-scroll-indicator"
          onClick={() => {
            const nextSec = document.getElementById('about') || document.querySelector('section:nth-of-type(2)');
            if (nextSec) {
              scrollToTarget(nextSec, { offset: -20, duration: 1.2 });
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Scroll to explore"
        >
          <span className="hero-scroll-text">SCROLL TO EXPLORE</span>
          <div className="hero-scroll-mouse">
            <motion.div
              className="hero-scroll-mouse-wheel"
              animate={{ y: [0, 8, 0], opacity: [0.9, 0.3, 0.9] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .hero-scroll-indicator {
          display: none;
        }

        @media (min-width: 1024px) {
          .hero-headline {
            font-size: clamp(40px, min(4.85vw, 9vh), 96px) !important;
            line-height: 1.1 !important;
            font-weight: 500 !important;
            margin-bottom: clamp(16px, 2.6vh, 26px) !important;
          }
          .hero-headline-line1,
          .hero-headline-line2 {
            display: block !important;
            white-space: nowrap !important;
          }
          .hero-subtitle {
            font-size: clamp(15px, min(1.2vw, 2.4vh), 18px) !important;
            line-height: 1.6 !important;
            max-width: 620px !important;
            margin-bottom: clamp(20px, 3.4vh, 34px) !important;
          }
          .hero-p-break {
            display: inline !important;
          }
          .hero-floating-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 0 !important;
            padding: clamp(12px, 1.8vh, 18px) 1rem !important;
            align-items: center !important;
          }
          .hero-stat-pillar {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            padding: clamp(4px, 0.8vh, 8px) 0.85rem !important;
            position: relative !important;
          }
          .hero-stat-info {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          /* Straight vertical dividers between desktop columns */
          .hero-stat-cell-0::after,
          .hero-stat-cell-1::after,
          .hero-stat-cell-2::after {
            content: '' !important;
            position: absolute !important;
            right: 0 !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 1px !important;
            height: 65% !important;
            background: linear-gradient(
              180deg,
              rgba(197, 168, 128, 0) 0%,
              rgba(197, 168, 128, 0.35) 20%,
              rgba(197, 168, 128, 0.35) 80%,
              rgba(197, 168, 128, 0) 100%
            ) !important;
            pointer-events: none !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-section {
            padding-top: clamp(4.5rem, 8vh, 5.75rem) !important;
            padding-bottom: clamp(1rem, 2vh, 1.75rem) !important;
          }
          .hero-headline {
            font-size: clamp(32px, 6vw, 52px) !important;
            line-height: 1.12 !important;
            font-weight: 500 !important;
            margin-bottom: 16px !important;
          }
          .hero-headline-line1,
          .hero-headline-line2 {
            display: block !important;
            white-space: nowrap !important;
          }
          .hero-subtitle {
            font-size: 15px !important;
            line-height: 1.6 !important;
            max-width: 620px !important;
            margin-bottom: 22px !important;
          }
          .hero-p-break {
            display: inline !important;
          }
          .hero-floating-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            border-radius: 20px !important;
            gap: 0 !important;
            padding: 0.35rem !important;
            position: relative !important;
            overflow: hidden !important;
          }
          .hero-floating-stats-grid::before {
            content: '' !important;
            display: block !important;
            position: absolute !important;
            left: 50% !important;
            top: 4% !important;
            bottom: 4% !important;
            width: 1px !important;
            transform: translateX(-50%) !important;
            background: rgba(197, 168, 128, 0.22) !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }
          .hero-floating-stats-grid::after {
            content: '' !important;
            display: block !important;
            position: absolute !important;
            top: 50% !important;
            left: 4% !important;
            right: 4% !important;
            height: 1px !important;
            transform: translateY(-50%) !important;
            background: rgba(197, 168, 128, 0.22) !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }
          .hero-stat-pillar {
            flex-direction: row !important;
            align-items: center !important;
            text-align: left !important;
            padding: 0.85rem 0.65rem !important;
            gap: 0.55rem !important;
            border-radius: 12px !important;
            position: relative !important;
          }
          .hero-stat-cell-0::after,
          .hero-stat-cell-1::after,
          .hero-stat-cell-2::after {
            display: none !important;
          }
          .hero-stat-icon-wrapper {
            width: 38px !important;
            height: 38px !important;
            min-width: 38px !important;
            border-radius: 10px !important;
            margin-bottom: 0 !important;
            flex-shrink: 0 !important;
          }
          .hero-stat-icon-wrapper svg {
            width: 17px !important;
            height: 17px !important;
          }
          .hero-stat-info {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left !important;
            min-width: 0 !important;
          }
          .hero-stat-val {
            font-size: 1.35rem !important;
            font-weight: 700 !important;
            margin-bottom: 0.15rem !important;
            line-height: 1.1 !important;
          }
          .hero-stat-lbl {
            font-size: clamp(0.66rem, 2.55vw, 0.74rem) !important;
            line-height: 1.25 !important;
            margin-bottom: 0.1rem !important;
            font-weight: 600 !important;
            color: #FFFFFF !important;
          }
          .hero-stat-sub {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          /* Desktop scrims disabled on mobile so only the refined mobile scrim applies */
          .hero-desktop-scrim,
          .hero-desktop-vignette {
            display: none !important;
          }

          /* Architectural villa background image positioning */
          .hero-bg-img {
            object-fit: cover !important;
            object-position: 61% 32% !important;
            filter: brightness(0.82) contrast(1.08) saturate(1.12) !important;
          }

          /* Readability scrim: transparent at top, dark behind the text */
          .hero-section::before,
          .hero-mobile-scrim {
            content: "" !important;
            display: block !important;
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 2 !important;
            background: linear-gradient(
              to bottom,
              rgba(11, 15, 14, 0.55) 0%,
              rgba(11, 15, 14, 0) 22%,
              rgba(11, 15, 14, 0) 38%,
              rgba(11, 15, 14, 0.82) 64%,
              rgba(11, 15, 14, 0.96) 100%
            ) !important;
            pointer-events: none !important;
          }

          /* Hero container: content sits at the bottom, photo shows on top */
          .hero-section {
            position: relative !important;
            min-height: 100vh !important;
            min-height: 100svh !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important;
            padding: 88px 20px max(20px, env(safe-area-inset-bottom)) !important;
            box-sizing: border-box !important;
            isolation: isolate !important;
            overflow-x: hidden !important;
            overflow-y: visible !important;
          }

          /* Header gradient so logo and menu stay legible */
          .main-header.header-top,
          .main-header:not(.scrolled-header),
          .header {
            background: linear-gradient(to bottom, rgba(11, 15, 14, 0.7), transparent) !important;
          }

          /* Hero Content Wrapper: eyebrow + heading + paragraph + buttons */
          .hero-main-content {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 0 20px 0 !important; /* exactly 20px above the stats card */
            padding: 0 !important;
            text-align: left !important;
            flex-grow: 0 !important;
            flex-shrink: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important;
            box-sizing: border-box !important;
          }
          .hero-content-inner {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            box-sizing: border-box !important;
          }
          .hero-text-group {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            box-sizing: border-box !important;
          }

          /* Eyebrow */
          .hero-eyebrow {
            font-size: 12px !important;
            letter-spacing: 0.22em !important;
            margin-bottom: 12px !important;
            color: #D9B98A !important;
            font-weight: 600 !important;
            text-transform: uppercase !important;
            display: inline-block !important;
          }

          /* Title / Heading */
          .hero-headline {
            font-size: clamp(30px, 8.4vw, 40px) !important;
            line-height: 1.1 !important;
            margin: 0 0 14px 0 !important;
            text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45) !important;
            font-weight: 500 !important;
          }
          .hero-headline-line1 {
            display: block !important;
            color: #FFFFFF !important;
            white-space: normal !important;
          }
          .hero-headline-line2 {
            display: block !important;
            color: #D9B98A !important;
            font-style: italic !important;
            white-space: normal !important;
          }

          /* Paragraph / Subtitle */
          .hero-subtitle {
            font-size: 15px !important;
            line-height: 1.55 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 0 22px 0 !important;
            color: rgba(255, 255, 255, 0.88) !important;
            text-shadow: 0 1px 10px rgba(0, 0, 0, 0.5) !important;
            font-weight: 300 !important;
          }
          .hero-p-break {
            display: none !important;
          }

          /* Hero Actions / Buttons */
          .hero-cta-wrapper {
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .hero-cta-btn {
            width: 100% !important; /* same width as the stats card */
            max-width: 100% !important;
            box-sizing: border-box !important;
            min-height: 52px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 10px !important;
            border-radius: 12px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            padding: 12px 20px !important;
            cursor: pointer !important;
          }
          .hero-cta-primary {
            background-color: #D9B98A !important;
            color: #0B0F0E !important;
            border: 1.5px solid #D9B98A !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35) !important;
          }
          .hero-cta-primary span {
            color: #0B0F0E !important;
            font-weight: 600 !important;
          }
          .hero-cta-primary svg {
            color: #0B0F0E !important;
            stroke: #0B0F0E !important;
          }
          .hero-cta-secondary {
            background: rgba(11, 15, 14, 0.45) !important;
            color: #FFFFFF !important;
            -webkit-backdrop-filter: blur(6px) !important;
            backdrop-filter: blur(6px) !important;
            border: 1px solid #D9B98A !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25) !important;
          }
          .hero-cta-secondary span {
            color: #FFFFFF !important;
            font-weight: 600 !important;
          }

          /* Stats Container & Grid */
          .hero-stats-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            flex-shrink: 0 !important;
            box-sizing: border-box !important;
          }
          .hero-floating-stats-grid {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: 1fr !important; /* equal row heights even if a label wraps */
            background: rgba(11, 15, 14, 0.72) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(217, 185, 138, 0.55) !important;
            border-radius: 18px !important;
            overflow: hidden !important;
            position: relative !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .hero-floating-stats-grid::before {
            content: "" !important;
            display: block !important;
            position: absolute !important;
            left: 50% !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 1px !important;
            transform: translateX(-50%) !important;
            background: rgba(217, 185, 138, 0.25) !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }
          .hero-floating-stats-grid::after {
            content: "" !important;
            display: block !important;
            position: absolute !important;
            top: 50% !important;
            left: 0 !important;
            right: 0 !important;
            height: 1px !important;
            transform: translateY(-50%) !important;
            background: rgba(217, 185, 138, 0.25) !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }
          .hero-stat-pillar {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 9px !important;
            min-height: 84px !important;
            height: 100% !important;
            padding: 12px 10px !important;
            box-sizing: border-box !important;
            border-radius: 0 !important;
            justify-content: flex-start !important;
            text-align: left !important;
            min-width: 0 !important;
          }
          .hero-stat-pillar:hover {
            transform: none !important;
          }
          .hero-stat-icon-wrapper {
            width: 34px !important;
            height: 34px !important;
            min-width: 34px !important;
            border-radius: 8px !important;
            background: rgba(14, 22, 18, 0.75) !important;
            border: 1px solid rgba(217, 185, 138, 0.35) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
            margin-bottom: 0 !important;
          }
          .hero-stat-icon-wrapper svg {
            width: 16px !important;
            height: 16px !important;
          }
          .hero-stat-info {
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: flex-start !important;
            text-align: left !important;
            min-width: 0 !important;
            flex: 1 !important;
          }
          .hero-stat-val {
            font-size: 22px !important;
            line-height: 1.1 !important;
            font-weight: 700 !important;
            color: #FFFFFF !important;
            margin-bottom: 2px !important;
          }
          .hero-stat-lbl {
            font-size: clamp(11px, 2.9vw, 12.5px) !important;
            line-height: 1.25 !important;
            color: rgba(255, 255, 255, 0.78) !important;
            font-weight: 500 !important;
            margin-bottom: 0 !important;
          }
          .hero-stat-lbl-line {
            display: block !important;
          }
          .hero-stat-sub {
            display: none !important;
          }

          /* Scroll to explore indicator */
          .hero-scroll-indicator {
            margin-top: 18px !important;
            align-self: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            padding: 0 !important;
            cursor: pointer !important;
            z-index: 10 !important;
          }
          .hero-scroll-text {
            font-family: var(--font-sans) !important;
            font-size: 0.65rem !important;
            letter-spacing: 0.24em !important;
            text-transform: uppercase !important;
            color: #D9B98A !important;
            font-weight: 600 !important;
            margin-bottom: 6px !important;
            opacity: 0.9 !important;
          }
          .hero-scroll-mouse {
            width: 16px !important;
            height: 25px !important;
            border-radius: 11px !important;
            border: 1.5px solid rgba(217, 185, 138, 0.5) !important;
            display: flex !important;
            justify-content: center !important;
            padding-top: 3px !important;
            box-sizing: border-box !important;
          }
          .hero-scroll-mouse-wheel {
            width: 2px !important;
            height: 4.5px !important;
            border-radius: 2px !important;
            background-color: #D9B98A !important;
          }
        }

        /* Subtle staggered entrance, respects reduced motion */
        @media (max-width: 768px) and (prefers-reduced-motion: no-preference) {
          .hero-eyebrow,
          .hero-headline,
          .hero-subtitle,
          .hero-cta-wrapper,
          .hero-stats-container {
            animation: heroUp 0.6s ease both;
          }
          .hero-eyebrow {
            animation-delay: 0s;
          }
          .hero-headline {
            animation-delay: 0.08s;
          }
          .hero-subtitle {
            animation-delay: 0.16s;
          }
          .hero-cta-wrapper {
            animation-delay: 0.24s;
          }
          .hero-stats-container {
            animation-delay: 0.32s;
          }
        }
        @keyframes heroUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};
