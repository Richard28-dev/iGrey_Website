import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { scrollToTarget } from '../utils/scroll';
import logoWhite from '../assets/logo-white.png';

interface FooterLink {
  label: string;
  href: string;
}

const quickLinks: FooterLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About iGrey', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'All Properties', href: './properties.html' },
  { label: 'List Your Property', href: '#contact' },
];

const serviceLinks: FooterLink[] = [
  { label: 'Rent Payouts', href: '#services' },
  { label: 'Tenant KYC', href: '#services' },
  { label: 'Inspections & Repairs', href: '#services' },
  { label: 'Legal Agreements', href: '#services' },
];

// Crisp Luxury Brand Social Icons (40px circular, dark background, gold border on hover)
const FacebookIcon = ({ size = 17, color = '#c9a77c' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 17, color = '#c9a77c' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XIcon = ({ size = 15, color = '#c9a77c' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 17, color = '#c9a77c' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showLegalLinks, setShowLegalLinks] = useState(false);

  useEffect(() => {
    // Only display legal links if privacy.html exists
    if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
      fetch('./privacy.html', { method: 'HEAD' })
        .then((res) => {
          if (res.ok) setShowLegalLinks(true);
        })
        .catch(() => {});
    }
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToTarget(href, { offset: -40, duration: 1.25 });
    }
  };

  return (
    <footer className="igrey-site-footer" id="igrey-site-footer" role="contentinfo">
      <div className="footer-container">
        {/* Main Columns Grid */}
        <div className="footer-main-grid">
          {/* COLUMN 1: Brand & Socials */}
          <div className="footer-col-brand">
            <div className="footer-brand-info">
              <a
                href="./"
                onClick={(e) => handleLinkClick(e, '#hero')}
                className="footer-logo-link"
                aria-label="iGrey Holdings Home"
              >
                <img
                  src={logoWhite}
                  alt="iGrey Holdings"
                  className="footer-logo-img"
                  width="168"
                  height="42"
                />
              </a>

              <p className="footer-brand-desc">
                Redefining luxury real estate advisory and residential acquisitions across South India.
              </p>
            </div>

            {/* Social Buttons */}
            <div className="footer-social-row" role="region" aria-label="Social media links">
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
                aria-label="X (formerly Twitter)"
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

          {/* NAV WRAPPER (Quick Links & Our Services) */}
          <div className="footer-nav-wrapper">
            {/* COLUMN 2: Quick Links */}
            <nav className="footer-col-quicklinks" aria-label="Quick Links">
              <h3 className="footer-col-heading">Quick Links</h3>
              <div className="footer-heading-underline" aria-hidden="true" />
              <ul className="footer-links-list">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* COLUMN 3: Our Services */}
            <nav className="footer-col-services" aria-label="Our Services">
              <h3 className="footer-col-heading">Our Services</h3>
              <div className="footer-heading-underline" aria-hidden="true" />
              <ul className="footer-links-list">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* COLUMN 4: Get in Touch */}
          <div className="footer-col-contact">
            <h3 className="footer-col-heading">Get in Touch</h3>
            <div className="footer-heading-underline" aria-hidden="true" />
            <div className="footer-contact-list">
              {/* PLACEHOLDER: Replace with actual office address */}
              <div className="footer-contact-item">
                <MapPin size={18} color="#c9a77c" className="footer-contact-icon" aria-hidden="true" />
                <span className="footer-contact-text">
                  Office address line,<br />
                  Mysuru, Karnataka
                </span>
              </div>

              {/* PLACEHOLDER: Replace with official email address */}
              <div className="footer-contact-item">
                <Mail size={18} color="#c9a77c" className="footer-contact-icon" aria-hidden="true" />
                <a
                  href="mailto:hello@igreyholdings.com"
                  className="footer-contact-text footer-contact-link"
                >
                  hello@igreyholdings.com
                </a>
              </div>

              {/* PLACEHOLDER: Replace with direct phone number */}
              <div className="footer-contact-item">
                <Phone size={18} color="#c9a77c" className="footer-contact-icon" aria-hidden="true" />
                <a
                  href="tel:+919876500000"
                  className="footer-contact-text footer-contact-link"
                >
                  +91 98765 00000
                </a>
              </div>

              {/* PLACEHOLDER: Replace with business hours */}
              <div className="footer-contact-item">
                <Clock size={18} color="#c9a77c" className="footer-contact-icon" aria-hidden="true" />
                <span className="footer-contact-text">
                  Mon to Sat, 9:30 am to 7 pm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: Copyright & Legal Policies */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            &copy; {currentYear} iGrey Holdings. All rights reserved.
          </div>

          {showLegalLinks && (
            <div className="footer-legal-links">
              <a href="./privacy.html" className="footer-legal-link">
                Privacy Policy
              </a>
              <span className="footer-legal-dot" aria-hidden="true">
                &bull;
              </span>
              <a href="./terms.html" className="footer-legal-link">
                Terms &amp; Conditions
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
