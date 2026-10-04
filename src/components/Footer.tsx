import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { scrollToTarget } from '../utils/scroll';
import logoWhite from '../assets/logo-white.png';

interface FooterLink {
  label: string;
  href: string;
}

const quickLinks: FooterLink[] = [
  { label: 'About iGrey', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'All Properties', href: '#properties' },
  { label: 'Why Choose iGrey', href: '#about' },
  { label: 'List Your Property', href: '#contact' },
];

const serviceLinks: FooterLink[] = [
  { label: 'Guaranteed Rent Payouts', href: '#services' },
  { label: 'Tenant KYC Verification', href: '#services' },
  { label: 'Property Inspections & Repairs', href: '#services' },
  { label: 'Legal Rental Agreements', href: '#services' },
  { label: 'Zero Brokerage Stays', href: '#services' },
];

export const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      scrollToTarget(href, { offset: -40, duration: 1.25 });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#080D0B',
        color: '#FFFFFF',
        padding: 'clamp(4rem, 6vw, 5.5rem) 0 2.5rem 0',
        borderTop: '1px solid rgba(197, 168, 128, 0.18)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Main 3-Column Grid matching reference */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1.2fr)',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
          }}
          className="footer-grid-columns"
        >
          {/* Column 1: Brand, Tagline & Corporate Entity Badge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              style={{
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '1.35rem',
              }}
            >
              <img
                src={logoWhite}
                alt="iGrey Holdings"
                style={{
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </a>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                lineHeight: 1.65,
                color: 'rgba(237, 232, 223, 0.75)',
                maxWidth: '420px',
                marginBottom: '1.75rem',
                fontWeight: 400,
              }}
            >
              India's premier end-to-end residential property services company. Providing guaranteed on-time rent, 100% verified background checks, and seamless property care.
            </p>

            {/* Registered Corporate Entity Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.6rem 1.15rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: '#E2E8F0',
                fontSize: '0.84rem',
                fontWeight: 500,
                fontFamily: 'var(--font-sans)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
              }}
            >
              <ShieldCheck size={16} color="#C5A880" />
              <span>Registered Corporate Entity</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: '#FFFFFF',
                fontWeight: 600,
                marginBottom: '0.45rem',
                letterSpacing: '-0.01em',
              }}
            >
              Quick Links
            </h4>

            {/* Gold Accent Hairline Underline */}
            <div
              style={{
                width: '26px',
                height: '2px',
                backgroundColor: '#C5A880',
                borderRadius: '1px',
                marginBottom: '1.4rem',
              }}
            />

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'rgba(237, 232, 223, 0.72)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 232, 223, 0.72)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: '#FFFFFF',
                fontWeight: 600,
                marginBottom: '0.45rem',
                letterSpacing: '-0.01em',
              }}
            >
              Our Services
            </h4>

            {/* Gold Accent Hairline Underline */}
            <div
              style={{
                width: '26px',
                height: '2px',
                backgroundColor: '#C5A880',
                borderRadius: '1px',
                marginBottom: '1.4rem',
              }}
            />

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'rgba(237, 232, 223, 0.72)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 232, 223, 0.72)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row: Copyright & Legal Policies matching reference */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            fontSize: '0.82rem',
            color: 'rgba(237, 232, 223, 0.55)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <span>© 2026 iGrey Holdings. All rights reserved.</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a
              href="#privacy"
              onClick={(e) => e.preventDefault()}
              style={{
                color: 'rgba(237, 232, 223, 0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 232, 223, 0.6)')}
            >
              Privacy Policy
            </a>
            <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>•</span>
            <a
              href="#terms"
              onClick={(e) => e.preventDefault()}
              style={{
                color: 'rgba(237, 232, 223, 0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 232, 223, 0.6)')}
            >
              Terms of Service
            </a>
            <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>•</span>
            <a
              href="#trust"
              onClick={(e) => e.preventDefault()}
              style={{
                color: 'rgba(237, 232, 223, 0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 232, 223, 0.6)')}
            >
              Trust &amp; Safety
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid-columns {
            grid-template-columns: 1fr !important;
            gap: 2.75rem !important;
          }
        }
      `}</style>
    </footer>
  );
};
