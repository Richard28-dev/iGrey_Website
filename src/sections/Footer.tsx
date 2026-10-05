import React from 'react';
import { MapPin, Globe, Mail } from 'lucide-react';
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
  { label: 'Why Choose iGrey', href: '#why-igrey' },
  { label: 'List Your Property', href: '#contact' },
];

const serviceLinks: FooterLink[] = [
  { label: 'Guaranteed Rent Payouts', href: '#why-igrey' },
  { label: 'Tenant KYC Verification', href: '#why-igrey' },
  { label: 'Property Inspections & Repairs', href: '#why-igrey' },
  { label: 'Legal Rental Agreements', href: '#why-igrey' },
  { label: 'Zero Brokerage Stays', href: '#why-igrey' },
];

// Crisp Luxury Brand Social Icons
const FacebookIcon = ({ size = 18, color = '#c9a77c' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18, color = '#c9a77c' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XIcon = ({ size = 15, color = '#c9a77c' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 18, color = '#c9a77c' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      scrollToTarget(href, { offset: -40, duration: 1.25 });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Main Columns Grid */}
        <div className="footer-grid-columns">
          {/* Column 1: Brand block, Contact details, Social icons */}
          <div className="footer-col-brand">
            {/* Section 1: Brand Block */}
            <div className="footer-brand-block">
              <a
                href="#hero"
                onClick={(e) => handleLinkClick(e, '#hero')}
                className="footer-logo-link"
              >
                <img
                  src={logoWhite}
                  alt="iGrey Holdings"
                  className="footer-logo-img"
                />
              </a>

              <p className="footer-brand-desc">
                India's premier end-to-end residential property services company. Guaranteed on-time rent, 100% verified background checks, and seamless property care.
              </p>
            </div>

            {/* Section 2: Contact Details */}
            {/* PLACEHOLDER: Company contact details below */}
            <div className="footer-contact-details">
              {/* PLACEHOLDER: Office Address */}
              <div className="footer-contact-row">
                <MapPin size={18} color="#c9a77c" className="footer-contact-icon" />
                <span className="footer-contact-text">Office address line, Mysuru, Karnataka</span>
              </div>

              {/* PLACEHOLDER: Website URL */}
              <div className="footer-contact-row">
                <Globe size={18} color="#c9a77c" className="footer-contact-icon" />
                <a
                  href="https://www.igreyholdings.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-text footer-contact-link"
                >
                  www.igreyholdings.com
                </a>
              </div>

              {/* Email */}
              <div className="footer-contact-row">
                <Mail size={18} color="#c9a77c" className="footer-contact-icon" />
                <a
                  href="mailto:hello@igreyholdings.com"
                  className="footer-contact-text footer-contact-link"
                >
                  hello@igreyholdings.com
                </a>
              </div>
            </div>

            {/* Section 3: Social Icons */}
            <div className="footer-social-row">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="footer-social-btn"
              >
                <FacebookIcon size={17} color="#c9a77c" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social-btn"
              >
                <InstagramIcon size={17} color="#c9a77c" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="footer-social-btn"
              >
                <XIcon size={15} color="#c9a77c" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer-social-btn"
              >
                <LinkedInIcon size={17} color="#c9a77c" />
              </a>
            </div>
          </div>

          {/* Section 4: Link Columns Container */}
          <div className="footer-links-container">
            {/* Quick Links Column */}
            <div className="footer-links-col">
              <h4 className="footer-col-title">Quick Links</h4>
              <div className="footer-title-underline" />
              <ul className="footer-links-list">
                {quickLinks.map((link) => (
                  <li key={link.label} className="footer-link-item">
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="footer-nav-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services Column */}
            <div className="footer-links-col">
              <h4 className="footer-col-title">Our Services</h4>
              <div className="footer-title-underline" />
              <ul className="footer-links-list">
                {serviceLinks.map((link) => (
                  <li key={link.label} className="footer-link-item">
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="footer-nav-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Bottom Legal & Copyright Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2026 iGrey Holdings. All rights reserved.
          </div>

          <div className="footer-legal-links">
            <a
              href="#privacy"
              onClick={(e) => e.preventDefault()}
              className="footer-legal-link"
            >
              Privacy Policy
            </a>
            <span className="footer-legal-dot">•</span>
            <a
              href="#terms"
              onClick={(e) => e.preventDefault()}
              className="footer-legal-link"
            >
              Terms of Service
            </a>
            <span className="footer-legal-dot">•</span>
            <a
              href="#trust"
              onClick={(e) => e.preventDefault()}
              className="footer-legal-link"
            >
              Trust &amp; Safety
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #0a0f0e;
          color: #FFFFFF;
          padding: clamp(4rem, 6vw, 5.5rem) 0 2.5rem 0;
          border-top: 1px solid rgba(197, 168, 128, 0.18);
          position: relative;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* Desktop Layout (Default > 767px) */
        .footer-grid-columns {
          display: grid;
          grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1.2fr);
          gap: clamp(2.5rem, 5vw, 4.5rem);
          padding-bottom: clamp(3rem, 5vw, 4rem);
          align-items: start;
        }

        .footer-col-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
        }

        .footer-brand-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-logo-link {
          text-decoration: none;
          display: inline-block;
          margin-bottom: 1.25rem;
        }

        .footer-logo-img {
          height: 42px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .footer-brand-desc {
          font-family: var(--font-sans);
          font-size: 13.5px;
          line-height: 1.65;
          color: #b9b2a2;
          max-width: 440px;
          margin: 0;
          font-weight: 400;
        }

        /* Contact Details */
        .footer-contact-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }

        .footer-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .footer-contact-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .footer-contact-text {
          font-family: var(--font-sans);
          font-size: 13px;
          line-height: 1.5;
          color: #cfc7b6;
          word-break: break-word;
        }

        .footer-contact-link {
          text-decoration: none;
          transition: color 200ms ease;
        }

        .footer-contact-link:hover {
          color: #c9a77c;
        }

        /* Social Icons */
        .footer-social-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-social-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #121816;
          border: 0.5px solid #3a3225;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 200ms ease;
          flex-shrink: 0;
        }

        .footer-social-btn:hover,
        .footer-social-btn:active {
          border-color: #c9a77c;
          background-color: rgba(201, 167, 124, 0.08);
          transform: translateY(-1px);
        }

        /* Desktop: Links container acts as transparent pass-through */
        .footer-links-container {
          display: contents;
        }

        .footer-links-col {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .footer-col-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          color: #f7f2e8;
          font-weight: 500;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .footer-title-underline {
          width: 26px;
          height: 2px;
          background-color: #c9a77c;
          margin-top: 6px;
          margin-bottom: 1.4rem;
          border-radius: 1px;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .footer-link-item {
          display: flex;
        }

        .footer-nav-link {
          font-family: var(--font-sans);
          font-size: 13.5px;
          color: #cfc7b6;
          text-decoration: none;
          transition: color 200ms ease;
          display: inline-block;
          line-height: 1.4;
        }

        .footer-nav-link:hover {
          color: #FFFFFF;
        }

        /* Bottom Row */
        .footer-bottom-bar {
          border-top: 0.5px solid #3a3225;
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          font-family: var(--font-sans);
          font-size: 13px;
          color: #8f897b;
        }

        .footer-copyright {
          font-size: 13px;
          color: #8f897b;
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .footer-legal-link {
          color: #8f897b;
          text-decoration: none;
          font-size: 12.5px;
          transition: color 200ms ease;
        }

        .footer-legal-link:hover {
          color: #FFFFFF;
        }

        .footer-legal-dot {
          color: rgba(201, 167, 124, 0.3);
        }

        /* ======================================================== */
        /* MOBILE VIEW (under 768px) - Exact Match to User Request  */
        /* ======================================================== */
        @media (max-width: 767px) {
          .site-footer {
            padding: 36px 20px clamp(100px, 14vw, 120px) 20px !important;
            overflow-x: hidden !important;
          }

          .footer-grid-columns {
            display: flex !important;
            flex-direction: column !important;
            gap: 28px !important;
            padding-bottom: 28px !important;
          }

          .footer-col-brand {
            display: flex !important;
            flex-direction: column !important;
            gap: 28px !important;
            width: 100% !important;
          }

          .footer-logo-img {
            height: 38px !important;
          }

          .footer-brand-desc {
            font-size: 13px !important;
            line-height: 1.6 !important;
            color: #b9b2a2 !important;
            margin-top: 14px !important;
            max-width: 100% !important;
          }

          .footer-contact-details {
            gap: 10px !important;
          }

          .footer-contact-text {
            font-size: 13px !important;
            color: #cfc7b6 !important;
            line-height: 1.5 !important;
          }

          .footer-social-row {
            gap: 12px !important;
            padding-top: 2px !important;
          }

          .footer-social-btn {
            width: 42px !important;
            height: 42px !important;
          }

          /* Two columns side-by-side for Quick Links & Our Services */
          .footer-links-container {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 18px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          .footer-links-col {
            min-width: 0 !important;
          }

          .footer-col-title {
            font-family: 'Cormorant Garamond', Georgia, serif !important;
            font-size: 17px !important;
            color: #f7f2e8 !important;
            font-weight: 500 !important;
            margin: 0 !important;
          }

          .footer-title-underline {
            width: 22px !important;
            height: 1.5px !important;
            background-color: #c9a77c !important;
            margin-top: 6px !important;
            margin-bottom: 14px !important;
          }

          .footer-links-list {
            gap: 12px !important;
          }

          .footer-nav-link {
            font-size: 13px !important;
            color: #cfc7b6 !important;
            min-height: 40px !important;
            display: flex !important;
            align-items: center !important;
            line-height: 1.35 !important;
            word-break: normal !important;
            overflow-wrap: break-word !important;
          }

          .footer-bottom-bar {
            border-top: 0.5px solid #3a3225 !important;
            padding-top: 24px !important;
            justify-content: center !important;
          }

          .footer-copyright {
            font-size: 12px !important;
            color: #8f897b !important;
            text-align: center !important;
            width: 100% !important;
            line-height: 1.5 !important;
          }

          .footer-legal-links {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
};
