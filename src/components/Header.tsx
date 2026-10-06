import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteContent } from '../data/content';
import { scrollToTarget } from '../utils/scroll';
import logoWhite from '../assets/logo-white.png';

interface HeaderProps {
  onScheduleClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScheduleClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { navLinks, ctaButton } = siteContent.header;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ['hero', 'about', 'services', 'properties', 'reviews', 'faq', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      scrollToTarget(href, { offset: -40, duration: 1.25 });
    } else {
      // Navigating from a sub-route like Property Details back to homepage section
      const basePath = import.meta.env.BASE_URL || '/';
      const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
      try {
        window.history.pushState({}, '', `${cleanBase}/${href}`);
      } catch {
        // ignore
      }
      window.location.hash = href;
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        scrollToTarget(href, { offset: -40, duration: 1.0 });
      }, 100);
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onScheduleClick) {
      onScheduleClick();
    } else {
      scrollToTarget('#contact', { offset: -40, duration: 1.25 });
    }
  };

  return (
    <>
      <header
        className="main-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '1rem 0' : '1.75rem 0',
          backgroundColor: scrolled ? 'rgba(13, 23, 20, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo matching reference */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <img
              src={logoWhite}
              alt="iGrey Holdings"
              style={{
                height: scrolled ? '34px' : '40px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'height 0.3s ease',
              }}
            />
          </a>

          {/* Right Navigation Links matching reference */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.75rem',
            }}
            className="header-desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '') || (link.label === 'Home' && activeSection === 'hero');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.05rem',
                    letterSpacing: '0.04em',
                    color: isActive ? 'var(--bronze-hi)' : 'rgba(255, 255, 255, 0.82)',
                    textDecoration: 'none',
                    fontWeight: 400,
                    transition: 'color var(--transition-fast)',
                    padding: '0.35rem 0',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--bronze-hi)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? 'var(--bronze-hi)' : 'rgba(255, 255, 255, 0.82)')
                  }
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeHeaderIndicator"
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--bronze-hi)',
                        borderRadius: '2px',
                        boxShadow: '0 0 8px rgba(197, 168, 128, 0.6)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div style={{ display: 'flex', alignItems: 'center' }}>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="header-mobile-toggle"
              aria-label="Toggle navigation menu"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '0.4rem',
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'var(--ink)',
              zIndex: 85,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '6.5rem 2rem 2.5rem 2rem',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span className="micro-label" style={{ color: 'var(--bronze-hi)' }}>
                DIRECTORY
              </span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.1rem',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingBottom: '0.85rem',
                  }}
                >
                  <span>{link.label}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: 'var(--bronze)',
                    }}
                  >
                    0{idx + 1}
                  </span>
                </motion.a>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={handleCtaClick}
                className="btn-bronze"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {ctaButton}
                <ArrowUpRight size={16} />
              </button>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '0.725rem',
                  color: 'var(--text-muted-dark)',
                  letterSpacing: '0.14em',
                }}
              >
                DISCRETION & DUE DILIGENCE GUARANTEED
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 992px) {
          .header-desktop-nav {
            display: flex !important;
          }
          .header-desktop-cta {
            display: inline-flex !important;
          }
          .header-mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 991px) {
          .header-desktop-nav {
            display: none !important;
          }
          .header-desktop-cta {
            display: none !important;
          }
          .header-mobile-toggle {
            display: block !important;
          }
        }
        @media (max-width: 768px) {
          .main-header {
            padding: 1.15rem 0 !important;
          }
        }
      `}</style>
    </>
  );
};
