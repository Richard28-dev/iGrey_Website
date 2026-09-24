import React from 'react';
import { ShieldCheck } from 'lucide-react';
import logoWhite from '../assets/logo-white.png';

export const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'About iGrey', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'All Properties', href: '#properties' },
    { label: 'Why Choose iGrey', href: '#why-igrey' },
    { label: 'List Your Property', href: '#contact' },
  ];

  const serviceLinks = [
    { label: 'Guaranteed Rent Payouts', href: '#why-igrey' },
    { label: 'Tenant KYC Verification', href: '#why-igrey' },
    { label: 'Property Inspections & Repairs', href: '#why-igrey' },
    { label: 'Legal Rental Agreements', href: '#why-igrey' },
    { label: 'Zero Brokerage Stays', href: '#why-igrey' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#0A0D12',
        color: '#FFFFFF',
        padding: '85px 0 35px 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Main 3-Column Footer Grid Matching User's Screenshot */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 1fr) minmax(0, 1.15fr)',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            paddingBottom: '4rem',
            alignItems: 'start',
          }}
          className="footer-reference-grid"
        >
          {/* Column 1: Brand Logo, Description, and Trust Badge */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              style={{
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '1.5rem',
              }}
            >
              <img
                src={logoWhite}
                alt="iGrey Holdings"
                style={{
                  height: '46px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </a>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: '#CBD5E1',
                maxWidth: '430px',
                fontWeight: 480,
                marginBottom: '1.75rem',
              }}
            >
              India's premier end-to-end residential property services company. Providing guaranteed on-time rent, 100% verified background checks, and seamless property care.
            </p>

            {/* Registered Corporate Entity Pill Badge */}
            <div style={{ alignSelf: 'flex-start' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.55rem 1.15rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '8px',
                  color: '#E2E8F0',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                <ShieldCheck size={16} color="#C5A880" strokeWidth={2.2} />
                <span>Registered Corporate Entity</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
                marginBottom: '0.4rem',
              }}
            >
              Quick Links
            </h3>
            {/* Gold Underline Accent */}
            <div
              style={{
                width: '28px',
                height: '2px',
                backgroundColor: '#C5A880',
                marginBottom: '1.5rem',
              }}
            />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      color: '#94A3B8',
                      textDecoration: 'none',
                      fontWeight: 480,
                      transition: 'color 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
                marginBottom: '0.4rem',
              }}
            >
              Our Services
            </h3>
            {/* Gold Underline Accent */}
            <div
              style={{
                width: '28px',
                height: '2px',
                backgroundColor: '#C5A880',
                marginBottom: '1.5rem',
              }}
            />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      color: '#94A3B8',
                      textDecoration: 'none',
                      fontWeight: 480,
                      transition: 'color 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: '#94A3B8',
            fontWeight: 480,
          }}
        >
          <div>
            © 2026 iGrey Holdings. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a
              href="#privacy"
              style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              Privacy Policy
            </a>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <a
              href="#terms"
              style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              Terms of Service
            </a>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <a
              href="#trust"
              style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              Trust & Safety
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-reference-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
};
