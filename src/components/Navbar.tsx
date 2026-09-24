import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onEnquireClick: () => void;
}

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Properties', href: '#properties' },
  { label: 'Why iGrey', href: '#why-igrey' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onEnquireClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active link detection
      const sections = ['hero', 'about', 'services', 'properties', 'why-igrey', 'reviews', 'faq', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
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
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '1rem 0' : '1.75rem 0',
          backgroundColor: scrolled ? 'rgba(12, 13, 14, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              transition: 'opacity 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <img
              src="/logo-white.png"
              alt="iGrey Holdings"
              style={{
                height: scrolled ? '36px' : '44px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'height 0.3s ease',
              }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'color 0.25s ease',
                    padding: '0.4rem 0',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-bronze)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)')}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        backgroundColor: 'var(--color-bronze)',
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action / CTA & Mobile Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              onClick={onEnquireClick}
              className="desktop-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.4rem',
                backgroundColor: 'transparent',
                color: 'var(--color-bronze-light)',
                border: '1px solid var(--border-bronze)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bronze)';
                e.currentTarget.style.color = '#0C0D0E';
                e.currentTarget.style.borderColor = 'var(--color-bronze)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-bronze-light)';
                e.currentTarget.style.borderColor = 'var(--border-bronze)';
              }}
            >
              Enquire Now
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              aria-label="Toggle menu"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                padding: '0.4rem',
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
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
              backgroundColor: '#0C0D0E',
              zIndex: 85,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '6rem 2rem 2.5rem 2rem',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span className="micro-label" style={{ marginBottom: '0.5rem' }}>Navigation</span>
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
                    fontSize: '2rem',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingBottom: '0.75rem',
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-bronze)', fontFamily: 'var(--font-sans)' }}>
                    0{idx + 1}
                  </span>
                </motion.a>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnquireClick();
                }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Enquire Now
                <ArrowUpRight size={16} />
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
                PRIVACY & DISCRETION GUARANTEED
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 961px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 960px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};
