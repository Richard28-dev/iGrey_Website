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

  const renderMobileStatLabel = (idx: number, originalLabel: string) => {
    switch (idx) {
      case 0:
        return <span className="hero-stat-lbl-line">Happy Customers</span>;
      case 1:
        return <span className="hero-stat-lbl-line">Completed Projects</span>;
      case 2:
        return (
          <>
            <span className="hero-stat-lbl-line">On-Time</span>
            <span className="hero-stat-lbl-line">Rent Payouts</span>
          </>
        );
      case 3:
        return (
          <>
            <span className="hero-stat-lbl-line">Verified Background</span>
            <span className="hero-stat-lbl-line">and KYC</span>
          </>
        );
      default:
        return originalLabel;
    }
  };

  const renderStatLabel = (label: string) => {
    if (label.toLowerCase().includes('on-time')) {
      return (
        <span className="hero-stat-lbl-nowrap" style={{ whiteSpace: 'nowrap' }}>
          On-Time Rent Payouts
        </span>
      );
    }
    if (label.toLowerCase().includes('completed projects')) {
      return (
        <span className="hero-stat-lbl-nowrap" style={{ whiteSpace: 'nowrap' }}>
          Completed Projects
        </span>
      );
    }
    if (label.toLowerCase().includes('verified background')) {
      return (
        <span className="hero-stat-lbl-nowrap" style={{ whiteSpace: 'nowrap' }}>
          Verified Background and KYC
        </span>
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
      <div
        className="hero-media-window"
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}
      >
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

        {/* Mobile top and bottom gradients */}
        <div className="hero-photo-top-gradient" />
        <div className="hero-photo-bottom-gradient" />

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
              <span className="hero-desc-desktop">
                From finding the right property to managing, developing and investing{' '}
                <br className="hero-p-break" />
                in real estate, iGREY HOLDINGS brings property solutions together.
              </span>
              <span className="hero-desc-mobile">
                From finding the right property to managing and investing, iGREY HOLDINGS brings it all together.
              </span>
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
              <ArrowRight size={18} className="hero-cta-arrow" color="#121614" strokeWidth={2.2} />
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
                if (window.innerWidth > 768) {
                  e.currentTarget.style.backgroundColor = '#DEBA88';
                  e.currentTarget.style.color = '#1A1408';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 14px 34px rgba(222, 186, 136, 0.35)';
                }
              }}
              onMouseLeave={(e) => {
                if (window.innerWidth > 768) {
                  e.currentTarget.style.backgroundColor = 'rgba(8, 13, 12, 0.45)';
                  e.currentTarget.style.color = '#F3EBDC';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.25)';
                }
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
                    <span className="hero-stat-lbl-desktop">{renderStatLabel(st.label)}</span>
                    <span className="hero-stat-lbl-mobile">{renderMobileStatLabel(idx, st.label)}</span>
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

        @media (min-width: 769px) {
          .hero-media-window {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 1 !important;
          }
          .hero-photo-top-gradient,
          .hero-photo-bottom-gradient,
          .hero-desc-mobile,
          .hero-stat-lbl-mobile {
            display: none !important;
          }
          .hero-stat-lbl-desktop {
            display: inline !important;
            white-space: nowrap !important;
          }
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

        @media (min-width: 769px) and (max-width: 1023px) {
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

        /* MOBILE HERO SECTION (max-width: 768px) */
        @media (max-width: 768px) {
          /* Hide desktop scrims & elements */
          .hero-desktop-scrim,
          .hero-desktop-vignette,
          .hero-mobile-scrim,
          .hero-desc-desktop,
          .hero-stat-lbl-desktop,
          .hero-scroll-indicator,
          .hero-p-break,
          .hero-stat-sub,
          .hero-stat-cell-0::after,
          .hero-stat-cell-1::after,
          .hero-stat-cell-2::after {
            display: none !important;
          }

          /* Section container: 100svh column, solid #070d0b background */
          .hero-section {
            position: relative !important;
            min-height: 100vh !important;
            min-height: 100svh !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: stretch !important;
            padding: 0 !important;
            background-color: #070d0b !important;
            background: #070d0b !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
            overflow-y: visible !important;
          }

          /* Section B: Photo Window (~40% of viewport, building visible, gradient fade into #070d0b) */
          .hero-media-window {
            position: relative !important;
            width: 100% !important;
            height: 38svh !important;
            min-height: 240px !important;
            max-height: 310px !important;
            flex-shrink: 0 !important;
            overflow: hidden !important;
            z-index: 1 !important;
          }
          .hero-bg-img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center 38% !important;
            filter: brightness(0.85) contrast(1.08) saturate(1.12) !important;
          }
          .hero-photo-top-gradient {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            height: 80px !important;
            background: linear-gradient(
              180deg,
              rgba(7, 13, 11, 0.85) 0%,
              rgba(7, 13, 11, 0) 100%
            ) !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }
          .hero-photo-bottom-gradient {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            background: linear-gradient(
              180deg,
              rgba(7, 13, 11, 0) 0%,
              rgba(7, 13, 11, 0) 45%,
              rgba(7, 13, 11, 0.65) 70%,
              rgba(7, 13, 11, 0.95) 88%,
              #070d0b 100%
            ) !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }

          /* Section C: Content block (sits on solid #070d0b area, margin-top -48px, 20px padding) */
          .hero-main-content {
            position: relative !important;
            z-index: 10 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-top: -48px !important;
            margin-bottom: 0 !important;
            padding: 0 20px !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: stretch !important;
            flex-grow: 0 !important;
            flex-shrink: 0 !important;
          }
          .hero-content-inner,
          .hero-text-group {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left !important;
            box-sizing: border-box !important;
          }

          /* Eyebrow: 10.5px bold, letter-spacing 0.18em, colour #c9a77c, 14px to heading */
          .hero-eyebrow {
            font-size: 10.5px !important;
            font-weight: 700 !important;
            letter-spacing: 0.18em !important;
            color: #c9a77c !important;
            text-transform: uppercase !important;
            margin-bottom: 14px !important;
            line-height: 1.25 !important;
            display: inline-block !important;
            text-shadow: none !important;
          }

          /* Heading: clamp(30px, 8.5vw, 36px), line-height 1.15, line 1 #ffffff, line 2 #f7daa5, 14px to paragraph */
          .hero-headline {
            font-family: var(--font-serif) !important;
            font-size: clamp(30px, 8.5vw, 36px) !important;
            line-height: 1.15 !important;
            font-weight: 500 !important;
            margin: 0 0 14px 0 !important;
            letter-spacing: -0.015em !important;
            text-shadow: none !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .hero-headline-line1 {
            display: block !important;
            color: #ffffff !important;
            white-space: normal !important;
            opacity: 1 !important;
          }
          .hero-headline-line2 {
            display: block !important;
            font-style: italic !important;
            color: #f7daa5 !important;
            white-space: normal !important;
            opacity: 1 !important;
          }

          /* Paragraph: 14.5px, line-height 1.55, colour #c3ccc9, 22px to buttons */
          .hero-subtitle {
            font-size: 14.5px !important;
            line-height: 1.55 !important;
            color: #c3ccc9 !important;
            margin: 0 0 22px 0 !important;
            max-width: 100% !important;
            font-weight: 400 !important;
            text-shadow: none !important;
          }
          .hero-desc-mobile {
            display: inline !important;
          }

          /* D (update): Actions (mobile only, 2 full-width buttons stacked with 12px gap) */
          .hero-cta-wrapper {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            gap: 12px !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* 1) Primary: "Explore Properties →" */
          .hero-cta-primary {
            width: 100% !important;
            height: 56px !important;
            min-height: 56px !important;
            border-radius: 16px !important;
            border: none !important;
            font-weight: 600 !important;
            font-size: 16px !important;
            color: #1a1208 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            background: linear-gradient(180deg, #ecce9e 0%, #c9a06b 100%) !important;
            box-shadow: 0 10px 28px rgba(217, 177, 127, 0.35), inset 0 1px 0 rgba(255, 244, 222, 0.9) !important;
            margin: 0 !important;
            padding: 0 20px !important;
            cursor: pointer !important;
            text-decoration: none !important;
            box-sizing: border-box !important;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .hero-cta-primary span {
            color: #1a1208 !important;
            font-weight: 600 !important;
            font-size: 16px !important;
          }
          .hero-cta-primary .hero-cta-arrow,
          .hero-cta-primary svg {
            color: #1a1208 !important;
            stroke: #1a1208 !important;
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .hero-cta-primary:hover,
          .hero-cta-primary:focus {
            background: linear-gradient(180deg, #f1d7ad 0%, #d2a974 100%) !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 14px 34px rgba(217, 177, 127, 0.45), inset 0 1px 0 rgba(255, 244, 222, 0.9) !important;
          }
          .hero-cta-primary:hover .hero-cta-arrow,
          .hero-cta-primary:focus .hero-cta-arrow,
          .hero-cta-primary:hover svg,
          .hero-cta-primary:focus svg {
            transform: translateX(4px) !important;
          }
          .hero-cta-primary:active {
            transform: translateY(0) !important;
            box-shadow: 0 6px 16px rgba(217, 177, 127, 0.3), inset 0 1px 0 rgba(255, 244, 222, 0.9) !important;
          }
          .hero-cta-primary:active .hero-cta-arrow,
          .hero-cta-primary:active svg {
            transform: translateX(0) !important;
          }
          .hero-cta-primary:focus-visible {
            outline: 2px solid #f7daa5 !important;
            outline-offset: 3px !important;
          }

          /* 2) Secondary: "Explore Our Services" (no arrow) */
          .hero-cta-secondary {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            height: 48px !important;
            min-height: 48px !important;
            border-radius: 16px !important;
            background: transparent !important;
            border: 1px solid #c9a77c !important;
            color: #f4f1ea !important;
            font-size: 15px !important;
            font-weight: 600 !important;
            margin: 0 !important;
            padding: 0 20px !important;
            cursor: pointer !important;
            text-decoration: none !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .hero-cta-secondary span {
            color: #f4f1ea !important;
            font-weight: 600 !important;
            font-size: 15px !important;
          }
          .hero-cta-secondary:hover,
          .hero-cta-secondary:focus {
            background: rgba(201, 167, 124, 0.12) !important;
            border-color: #e3c49a !important;
            color: #f4f1ea !important;
            transform: none !important;
            box-shadow: none !important;
          }
          .hero-cta-secondary:active {
            background: rgba(201, 167, 124, 0.2) !important;
          }
          .hero-cta-secondary:focus-visible {
            outline: 2px solid #f7daa5 !important;
            outline-offset: 3px !important;
          }

          /* E (update): Stats Container & 2x2 Grid Card */
          .hero-stats-container {
            position: relative !important;
            z-index: 10 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-top: 24px !important;
            margin-bottom: 0 !important;
            padding: 0 20px calc(28px + env(safe-area-inset-bottom, 0px)) !important;
            flex-shrink: 0 !important;
            box-sizing: border-box !important;
          }

          /* 2 x 2 grid card (1px border #3a3326, radius 16px, background #0c1411, 1px dividers #2c3a34) */
          .hero-floating-stats-grid {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto auto !important;
            gap: 1px !important;
            background: #2c3a34 !important;
            border: 1px solid #3a3326 !important;
            border-radius: 16px !important;
            overflow: hidden !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          .hero-floating-stats-grid::before,
          .hero-floating-stats-grid::after {
            display: none !important;
          }

          /* Each cell is a flex row with align-items: center */
          .hero-stat-pillar {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-start !important;
            text-align: left !important;
            background: #0c1411 !important;
            padding: 10px 10px !important;
            height: 100% !important;
            min-height: 58px !important;
            box-sizing: border-box !important;
            border-radius: 0 !important;
            gap: 12px !important;
            user-select: none !important;
          }
          .hero-stat-pillar:hover {
            transform: none !important;
          }

          /* 36 x 36px rounded icon square (radius 10px, background #101a16, 1px border #4a3f2c, gold 18px icon) */
          .hero-stat-icon-wrapper {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 36px !important;
            height: 36px !important;
            min-width: 36px !important;
            max-width: 36px !important;
            border-radius: 10px !important;
            background: #101a16 !important;
            border: 1px solid #4a3f2c !important;
            box-shadow: none !important;
            margin-bottom: 0 !important;
            margin-right: 0 !important;
            flex-shrink: 0 !important;
          }
          .hero-stat-icon-wrapper svg {
            width: 18px !important;
            height: 18px !important;
            color: #D4B280 !important;
            stroke: #D4B280 !important;
            stroke-width: 1.8 !important;
          }

          /* Text block (12px gap from icon, number above label, vertically centered) */
          .hero-stat-info {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: center !important;
            text-align: left !important;
            min-width: 0 !important;
            flex: 1 !important;
          }

          /* Number (19px, bold, white) */
          .hero-stat-val {
            font-family: var(--font-sans) !important;
            font-size: 19px !important;
            line-height: 1.15 !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            margin: 0 0 2px 0 !important;
            letter-spacing: -0.01em !important;
            text-align: left !important;
          }

          /* Label (10.5px, #a9b4b0, line-height 1.25) */
          .hero-stat-lbl {
            font-family: var(--font-sans) !important;
            font-size: 10.5px !important;
            line-height: 1.25 !important;
            color: #a9b4b0 !important;
            font-weight: 500 !important;
            margin: 0 !important;
            text-align: left !important;
          }
          .hero-stat-lbl-mobile {
            display: block !important;
            text-align: left !important;
          }
          .hero-stat-lbl-line {
            display: block !important;
            white-space: nowrap !important;
          }
        }

        @media (max-width: 365px) {
          .hero-stat-pillar {
            padding: 9px 7px !important;
            gap: 8px !important;
          }
          .hero-stat-icon-wrapper {
            width: 32px !important;
            height: 32px !important;
            min-width: 32px !important;
          }
          .hero-stat-icon-wrapper svg {
            width: 16px !important;
            height: 16px !important;
          }
          .hero-eyebrow {
            letter-spacing: 0.12em !important;
          }
        }

        /* Subtle entrance animation, respects reduced motion */
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
        @media (max-width: 768px) and (prefers-reduced-motion: reduce) {
          .hero-cta-primary,
          .hero-cta-primary:hover,
          .hero-cta-primary:focus,
          .hero-cta-primary:active {
            transform: none !important;
          }
          .hero-cta-primary .hero-cta-arrow,
          .hero-cta-primary:hover .hero-cta-arrow,
          .hero-cta-primary:focus .hero-cta-arrow,
          .hero-cta-primary:active .hero-cta-arrow {
            transform: none !important;
          }
          .hero-eyebrow,
          .hero-headline,
          .hero-subtitle,
          .hero-cta-wrapper,
          .hero-stats-container {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
        @keyframes heroUp {
          from {
            opacity: 0;
            transform: translateY(12px);
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
