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
        return <Users size={19} color="var(--bronze-hi)" strokeWidth={1.8} />;
      case 'building':
        return <Building2 size={19} color="var(--bronze-hi)" strokeWidth={1.8} />;
      case 'trending':
        return <TrendingUp size={19} color="var(--bronze-hi)" strokeWidth={1.8} />;
      case 'shield':
      default:
        return <ShieldCheck size={19} color="var(--bronze-hi)" strokeWidth={1.8} />;
    }
  };

  return (
    <section
      id="hero"
      className="hero-section"
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

        {/* Dark gradient overlay behind text area for mobile view (transparent at the top to rgba(0,0,0,0.7) at the bottom) */}
        <div
          className="hero-mobile-scrim"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '75%',
            background:
              'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.35) 40%, rgba(0, 0, 0, 0.7) 100%)',
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
        <div className="hero-content-inner" style={{ maxWidth: '820px' }}>
          {/* Main Headline: Where Trust Meets Architectural Grandeur */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hero-headline"
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
            className="hero-subtitle"
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
            className="hero-cta-wrapper"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={handleExplore}
              className="btn-bronze hero-cta-btn"
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
        className="container hero-stats-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          paddingBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
          paddingTop: '0.75rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '1020px',
            margin: '0 auto',
            background: 'linear-gradient(155deg, rgba(14, 22, 18, 0.88) 0%, rgba(7, 12, 10, 0.96) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(197, 168, 128, 0.38)',
            borderRadius: '22px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            padding: '1.4rem 1.6rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            alignItems: 'stretch',
          }}
          className="hero-floating-stats-grid"
        >
          {stats.map((st, idx) => {
            const isActive = activeStatIdx === idx;
            const isGoldLabel = idx === 1; // "Completed Projects" has warm gold accent in reference
            return (
              <motion.div
                key={st.label}
                onClick={() => setActiveStatIdx((prev) => (prev === idx ? null : idx))}
                whileHover={!isActive ? { y: -4, scale: 1.02 } : undefined}
                whileTap={{ scale: 0.97 }}
                animate={
                  isActive
                    ? {
                        y: [-4, -9, -4],
                        scale: 1.03,
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
                  padding: '0.85rem 0.65rem',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  position: 'relative',
                  userSelect: 'none',
                  border: isActive
                    ? '1.5px solid rgba(229, 203, 163, 0.85)'
                    : '1.5px solid transparent',
                  background: isActive
                    ? 'linear-gradient(180deg, rgba(35, 54, 43, 0.85) 0%, rgba(14, 23, 18, 0.95) 100%)'
                    : 'transparent',
                  boxShadow: isActive
                    ? '0 16px 36px rgba(0, 0, 0, 0.65), 0 0 24px rgba(197, 168, 128, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : 'none',
                  transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                className={`hero-stat-pillar hero-stat-cell-${idx} ${isActive ? 'hero-stat-active' : ''}`}
              >
                {/* Top row: Value on left, Icon on right on mobile. On desktop: contents */}
                <div className="hero-stat-top-row">
                  {/* Stat Value */}
                  <div
                    className="hero-stat-val"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(1.55rem, 2.1vw, 2.1rem)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.1,
                      marginBottom: '0.25rem',
                      letterSpacing: '-0.015em',
                      textShadow: isActive
                        ? '0 0 20px rgba(229, 203, 163, 0.65), 0 2px 6px rgba(0, 0, 0, 0.9)'
                        : 'none',
                      transition: 'text-shadow 0.3s ease',
                    }}
                  >
                    {st.value.includes('+') ? st.value.replace('+', ' +') : st.value}
                  </div>

                  {/* Icon Box */}
                  <div
                    className="hero-stat-icon-wrapper"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: isActive
                        ? 'rgba(197, 168, 128, 0.25)'
                        : 'rgba(10, 16, 13, 0.85)',
                      border: isActive
                        ? '1.5px solid #E8D5B7'
                        : '1.5px solid rgba(197, 168, 128, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                      boxShadow: isActive
                        ? '0 0 16px rgba(197, 168, 128, 0.75), 0 4px 10px rgba(0, 0, 0, 0.4)'
                        : '0 4px 12px rgba(0, 0, 0, 0.35)',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                    }}
                  >
                    {getStatIcon(st.icon)}
                  </div>
                </div>

                {/* Stat Label */}
                <div
                  className={`hero-stat-lbl hero-stat-lbl-${idx}`}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: isGoldLabel ? '#D4B280' : '#FFFFFF',
                    lineHeight: 1.25,
                    marginBottom: '0.15rem',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {idx === 0 ? (
                    <span className="hero-lbl-happy">Happy Customers</span>
                  ) : idx === 1 ? (
                    <span className="hero-lbl-completed">Completed Projects</span>
                  ) : idx === 2 ? (
                    <>
                      <span className="hero-lbl-line">On-Time</span>
                      <span className="hero-lbl-desktop-space"> </span>
                      <br className="hero-lbl-mobile-br" />
                      <span className="hero-lbl-line">Rent Payouts</span>
                    </>
                  ) : (
                    <>
                      <span className="hero-lbl-line">Verified</span>
                      <span className="hero-lbl-desktop-space"> </span>
                      <br className="hero-lbl-mobile-br" />
                      <span className="hero-lbl-line">Background KYC</span>
                    </>
                  )}
                </div>

                {/* Stat Sublabel */}
                <div
                  className="hero-stat-sub"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.68rem',
                    color: isActive ? '#E5CBA3' : 'rgba(237, 232, 223, 0.55)',
                    fontWeight: 400,
                    lineHeight: 1.25,
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

        {/* Scroll to Explore Indicator matching reference */}
        <div
          className="hero-scroll-indicator"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '1rem',
            paddingBottom: '0.5rem',
            cursor: 'pointer',
            zIndex: 10,
          }}
          onClick={() => scrollToTarget('#about', { offset: -40, duration: 1.2 })}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.62rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(212, 178, 128, 0.85)',
              fontWeight: 600,
              marginBottom: '0.45rem',
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <div
            style={{
              width: '20px',
              height: '32px',
              borderRadius: '12px',
              border: '1.5px solid rgba(197, 168, 128, 0.55)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '5px',
            }}
          >
            <motion.div
              animate={{ y: [0, 9, 0], opacity: [0.95, 0.3, 0.95] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{
                width: '3px',
                height: '6px',
                borderRadius: '2px',
                backgroundColor: '#C5A880',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-floating-stats-grid::before,
          .hero-floating-stats-grid::after {
            display: none !important;
          }
          .hero-floating-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 0 !important;
            padding: 1.35rem 1rem !important;
            align-items: center !important;
          }
          .hero-stat-pillar {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            padding: 0.85rem 1rem !important;
            border-radius: 14px !important;
            position: relative !important;
            border-right: none !important;
          }
          .hero-stat-top-row {
            display: contents !important;
          }
          .hero-stat-icon-wrapper {
            order: 1 !important;
          }
          .hero-stat-val {
            order: 2 !important;
          }
          .hero-stat-lbl {
            order: 3 !important;
          }
          .hero-stat-sub {
            order: 4 !important;
          }
          .hero-lbl-mobile-br {
            display: none !important;
          }
          .hero-lbl-desktop-space {
            display: inline !important;
          }
          .hero-stat-info {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          /* Perfectly straight, centered vertical hairline between columns */
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
              rgba(197, 168, 128, 0.45) 20%,
              rgba(197, 168, 128, 0.45) 80%,
              rgba(197, 168, 128, 0) 100%
            ) !important;
            pointer-events: none !important;
          }
        }
        @media (max-width: 991px) {
          .hero-floating-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            border-radius: 20px !important;
            gap: 0 !important;
            padding: 0.35rem !important;
            position: relative !important;
            overflow: hidden !important;
          }
          /* Crisp, straight vertical cross divider line */
          .hero-floating-stats-grid::before {
            content: '' !important;
            display: block !important;
            position: absolute !important;
            left: 50% !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 1px !important;
            transform: translateX(-50%) !important;
            background: rgba(255, 255, 255, 0.12) !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }
          /* Crisp, straight horizontal cross divider line */
          .hero-floating-stats-grid::after {
            content: '' !important;
            display: block !important;
            position: absolute !important;
            top: 50% !important;
            left: 0 !important;
            right: 0 !important;
            height: 1px !important;
            transform: translateY(-50%) !important;
            background: rgba(255, 255, 255, 0.12) !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }
          .hero-stat-pillar {
            flex-direction: row !important;
            align-items: center !important;
            text-align: left !important;
            padding: 0.95rem 0.85rem !important;
            gap: 0.75rem !important;
            border-radius: 14px !important;
            position: relative !important;
          }
          .hero-stat-pillar:not(.hero-stat-active) {
            border: 1.5px solid transparent !important;
          }
          .hero-stat-pillar.hero-stat-active {
            border: 1.5px solid rgba(229, 203, 163, 0.85) !important;
            z-index: 5 !important;
          }
          .hero-stat-cell-0,
          .hero-stat-cell-1,
          .hero-stat-cell-2,
          .hero-stat-cell-3 {
            border: none !important;
          }
          .hero-stat-cell-0::after,
          .hero-stat-cell-1::after,
          .hero-stat-cell-2::after {
            display: none !important;
          }
          .hero-stat-icon-wrapper {
            width: 44px !important;
            height: 44px !important;
            min-width: 44px !important;
            border-radius: 12px !important;
            margin-bottom: 0 !important;
            flex-shrink: 0 !important;
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
            font-size: 0.76rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.1rem !important;
            font-weight: 600 !important;
            color: #FFFFFF !important;
          }
          .hero-stat-sub {
            font-size: 0.62rem !important;
            line-height: 1.2 !important;
            color: rgba(237, 232, 223, 0.55) !important;
          }
        }
        @media (max-width: 768px) {
          .hero-mobile-scrim {
            display: block !important;
          }
          .hero-section {
            padding-top: clamp(4.5rem, 10vw, 5.25rem) !important;
            padding-bottom: 0.5rem !important;
            min-height: 100svh !important;
            justify-content: space-between !important;
          }
          .hero-main-content {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            flex-grow: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important;
          }
          .hero-content-inner {
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important;
            flex-grow: 0 !important;
            width: 100% !important;
            margin-top: auto !important;
          }
          .hero-headline {
            font-size: clamp(2.2rem, 7.8vw, 2.65rem) !important;
            margin-bottom: 1.5rem !important; /* 24px spacing between headline and subtext */
            line-height: 1.12 !important;
            text-shadow: 0 2px 14px rgba(0, 0, 0, 0.8) !important;
          }
          .hero-subtitle {
            font-size: 0.95rem !important;
            line-height: 1.55 !important;
            margin-bottom: 1.75rem !important; /* 28px spacing between subtext and button (within 24-32px) */
            max-width: 380px !important;
            color: rgba(255, 255, 255, 0.94) !important; /* Bright near-white >= 90% opacity */
            text-shadow: 0 1px 8px rgba(0, 0, 0, 0.75) !important;
          }
          .hero-cta-wrapper {
            margin-top: 0 !important;
            margin-bottom: 1.5rem !important; /* 24px spacing before stats container */
          }
          .hero-cta-btn {
            padding: 0.88rem 2rem !important;
            font-size: 0.92rem !important;
            border-radius: 8px !important;
            font-weight: 600 !important;
          }
          .hero-stats-container {
            padding-top: 0.25rem !important;
            padding-bottom: 0.25rem !important;
          }
          .hero-floating-stats-grid {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            grid-template-rows: repeat(2, 1fr) !important;
            grid-auto-rows: 1fr !important;
            border-radius: 20px !important;
            gap: 0 !important;
            padding: 0 !important;
            border: 1.5px solid rgba(197, 168, 128, 0.38) !important;
            background: linear-gradient(155deg, rgba(14, 22, 18, 0.88) 0%, rgba(7, 12, 10, 0.96) 100%) !important;
            position: relative !important;
            overflow: hidden !important;
            align-items: stretch !important;
          }
          /* Crisp, straight vertical cross divider line */
          .hero-floating-stats-grid::before {
            content: '' !important;
            display: block !important;
            position: absolute !important;
            left: 50% !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 1px !important;
            transform: translateX(-50%) !important;
            background: rgba(255, 255, 255, 0.12) !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }
          /* Crisp, straight horizontal cross divider line */
          .hero-floating-stats-grid::after {
            content: '' !important;
            display: block !important;
            position: absolute !important;
            top: 50% !important;
            left: 0 !important;
            right: 0 !important;
            height: 1px !important;
            transform: translateY(-50%) !important;
            background: rgba(255, 255, 255, 0.12) !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }
          /* Cell padding: 14px. The 2x2 grid keeps equal-height rows and existing divider lines */
          .hero-stat-pillar {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            text-align: left !important;
            padding: 14px !important;
            gap: 0 !important;
            border-radius: 0 !important;
            position: relative !important;
            box-sizing: border-box !important;
            height: 100% !important;
            min-width: 0 !important;
            width: 100% !important;
          }
          .hero-stat-pillar:not(.hero-stat-active) {
            border: 1.5px solid transparent !important;
          }
          .hero-stat-pillar.hero-stat-active {
            border: 1.5px solid rgba(229, 203, 163, 0.85) !important;
            z-index: 5 !important;
          }
          .hero-stat-cell-0,
          .hero-stat-cell-1,
          .hero-stat-cell-2,
          .hero-stat-cell-3 {
            border: none !important;
          }

          /* Top row: number on left (24px, weight 500) and icon box on right (30px square, 0.5px #5b4b32 border, 8px radius, gold icon), aligned to top */
          .hero-stat-top-row {
            display: flex !important;
            flex-direction: row !important;
            align-items: flex-start !important;
            justify-content: space-between !important;
            width: 100% !important;
            min-width: 0 !important;
            order: 1 !important;
          }
          .hero-stat-val {
            font-size: 24px !important;
            font-weight: 500 !important;
            line-height: 1.15 !important;
            color: #FFFFFF !important;
            letter-spacing: -0.015em !important;
            margin: 0 !important;
            margin-bottom: 0 !important;
            order: 1 !important;
            text-shadow: none !important;
            white-space: nowrap !important;
          }
          .hero-stat-icon-wrapper {
            width: 30px !important;
            height: 30px !important;
            min-width: 30px !important;
            min-height: 30px !important;
            border: 0.5px solid #5b4b32 !important;
            border-radius: 8px !important;
            background: rgba(10, 16, 13, 0.85) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 !important;
            margin-bottom: 0 !important;
            flex-shrink: 0 !important;
            box-shadow: none !important;
            order: 2 !important;
          }
          .hero-stat-icon-wrapper svg {
            width: 15px !important;
            height: 15px !important;
            color: #c5a880 !important;
            stroke: #c5a880 !important;
          }

          /* Below it: the label (13px, weight 500, 8px margin above) */
          .hero-stat-lbl {
            font-size: 13px !important;
            font-weight: 500 !important;
            margin-top: 8px !important;
            margin-bottom: 0 !important;
            line-height: 1.25 !important;
            text-align: left !important;
            width: 100% !important;
            min-width: 0 !important;
            order: 2 !important;
            color: #FFFFFF !important;
          }

          /* Muted sub-text (11.5px, 3px margin above) */
          .hero-stat-sub {
            font-size: 11.5px !important;
            font-weight: 400 !important;
            margin-top: 3px !important;
            margin-bottom: 0 !important;
            line-height: 1.25 !important;
            text-align: left !important;
            width: 100% !important;
            min-width: 0 !important;
            order: 3 !important;
            color: rgba(237, 232, 223, 0.55) !important;
            white-space: normal !important;
          }

          /* 1. "Completed Projects": must stay on ONE line (white-space: nowrap).
             If it doesn't fit at 360px width, reduce its font-size slightly (for example clamp(12px, 3.4vw, 13px)), but never let it wrap. */
          .hero-lbl-completed {
            white-space: nowrap !important;
            font-size: clamp(12px, 3.4vw, 13px) !important;
            display: inline-block !important;
          }

          /* 2. "On-Time Rent Payouts": split into exactly two lines: "On-Time" on line 1, "Rent Payouts" on line 2 */
          /* 3. "Verified Background KYC": two lines: "Verified" on line 1, "Background KYC" on line 2 */
          .hero-lbl-mobile-br {
            display: block !important;
          }
          .hero-lbl-desktop-space {
            display: none !important;
          }
          .hero-lbl-line {
            display: inline !important;
            white-space: nowrap !important;
          }

          /* 4. "Happy Customers": one line */
          .hero-lbl-happy {
            white-space: nowrap !important;
            display: inline-block !important;
          }

          .hero-scroll-indicator {
            padding-top: 1rem !important;
            padding-bottom: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

