import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ChevronDown,
  X,
} from 'lucide-react';
import { siteImages } from '../data/images';

interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  role: string;
  city: string;
  message: string;
}

const ROLE_OPTIONS = [
  'Property Owner / Landlord',
  'Tenant / Looking for Stay',
  'Property Investor',
  'Looking for Buy',
  'Looking for Sell',
  'Channel Partner / Broker',
  'Other Advisory Enquiry',
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    phone: '',
    email: '',
    role: 'Property Owner / Landlord',
    city: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen && isMobile) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isDropdownOpen, isMobile]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isDropdownOpen) {
        setIsDropdownOpen(true);
      } else {
        const currentIdx = ROLE_OPTIONS.indexOf(formData.role);
        const nextIdx =
          e.key === 'ArrowDown'
            ? (currentIdx + 1) % ROLE_OPTIONS.length
            : (currentIdx - 1 + ROLE_OPTIONS.length) % ROLE_OPTIONS.length;
        setFormData((prev) => ({ ...prev, role: ROLE_OPTIONS[nextIdx] }));
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.phone.trim()) errs.phone = 'Please enter your phone number.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.city.trim()) errs.city = 'Please enter your location or city.';
    if (!formData.message.trim()) errs.message = 'Please enter a short message or details.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        role: 'Property Owner / Landlord',
        city: '',
        message: '',
      });
      setErrors({});
    }, 850);
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#090D0B',
        color: '#FFFFFF',
        padding: 'clamp(4.5rem, 7vw, 7rem) 0',
        position: 'relative',
        borderTop: '1px solid rgba(197, 168, 128, 0.15)',
        borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '1160px', position: 'relative', zIndex: 2 }}>
        {/* Outer Dark Luxury Card */}
        <div className="contact-outer-card">
          {/* Left Column */}
          <div className="contact-left-col">
            {/* Header Area */}
            <div className="contact-left-header">
              {/* DIRECT ADVISORY Pill */}
              <div className="contact-pill">DIRECT ADVISORY</div>

              {/* Heading: Contact iGH */}
              <h2 className="contact-heading">
                Contact <span className="contact-igh">iGH</span>
              </h2>

              {/* Description Paragraph */}
              <p className="contact-subtext">
                Have questions or want to partner with us? Leave a message and our team will reply within one business day.
              </p>
            </div>

            {/* Media & Details Area (Image + 3 Contact Cards) */}
            <div className="contact-left-media">
              {/* House Image with Location Pill */}
              <div className="contact-image-wrapper">
                <img
                  src={siteImages.contactVilla.src}
                  alt="iGH Prime Architectural Residence"
                  loading="lazy"
                  decoding="async"
                />
                <div className="contact-image-pill">
                  <MapPin size={11} color="#c9a77c" style={{ flexShrink: 0 }} />
                  <span>Bangalore · Mysuru · Hyderabad · Chennai</span>
                </div>
              </div>

              {/* 3 Contact Detail Cards Stacked with 10px Gap */}
              <div className="contact-cards-stack">
                {/* Call us */}
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <Phone size={16} color="#c9a77c" />
                  </div>
                  <div className="contact-info-text">
                    <div className="contact-info-label">Call us</div>
                    <a href="tel:+919876500000" className="contact-info-value contact-info-link">
                      +91 98765 00000
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <Mail size={16} color="#c9a77c" />
                  </div>
                  <div className="contact-info-text">
                    <div className="contact-info-label">Email</div>
                    <a href="mailto:hello@igreyholdings.com" className="contact-info-value contact-info-link">
                      hello@igreyholdings.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <Clock size={16} color="#c9a77c" />
                  </div>
                  <div className="contact-info-text">
                    <div className="contact-info-label">Hours</div>
                    <div className="contact-info-value">
                      Mon to Sat, 9:30 am to 7 pm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Panel */}
          <div className="contact-right-panel">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: '3rem 1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    minHeight: '380px',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(201, 167, 124, 0.12)',
                      border: '1px solid #c9a77c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <CheckCircle2 size={28} color="#c9a77c" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '28px',
                      color: '#f4efe4',
                      fontWeight: 400,
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    Message Sent
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14.5px',
                      color: '#b9b2a2',
                      lineHeight: 1.6,
                      maxWidth: '340px',
                      margin: '0 0 1.75rem 0',
                    }}
                  >
                    Thanks, we'll be in touch within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    style={{
                      padding: '0.65rem 1.5rem',
                      backgroundColor: 'transparent',
                      border: '0.5px solid #4a3f2b',
                      borderRadius: '8px',
                      color: '#c9a77c',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#c9a77c';
                      e.currentTarget.style.backgroundColor = 'rgba(201, 167, 124, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#4a3f2b';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Form Panel Heading */}
                  <h3 className="contact-form-title">Tell us what you need</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Your Name */}
                    <div>
                      <label className="contact-field-label">Your name</label>
                      <div style={{ position: 'relative' }}>
                        <User size={16} color="#c9a77c" className="contact-field-icon" />
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: '' });
                          }}
                          className={`contact-lux-input ${errors.name ? 'input-error' : ''}`}
                        />
                      </div>
                      {errors.name && <span className="contact-error-text">{errors.name}</span>}
                    </div>

                    {/* Phone Number & Email Address (Side-by-side on desktop, stacked on mobile) */}
                    <div className="contact-phone-email-grid">
                      {/* Phone Number */}
                      <div>
                        <label className="contact-field-label">Phone number</label>
                        <div style={{ position: 'relative' }}>
                          <Phone size={16} color="#c9a77c" className="contact-field-icon" />
                          <input
                            type="tel"
                            placeholder="+91 98765 00000"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (errors.phone) setErrors({ ...errors, phone: '' });
                            }}
                            className={`contact-lux-input ${errors.phone ? 'input-error' : ''}`}
                          />
                        </div>
                        {errors.phone && <span className="contact-error-text">{errors.phone}</span>}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="contact-field-label">Email address</label>
                        <div style={{ position: 'relative' }}>
                          <Mail size={16} color="#c9a77c" className="contact-field-icon" />
                          <input
                            type="email"
                            placeholder="rahul@example.com"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (errors.email) setErrors({ ...errors, email: '' });
                            }}
                            className={`contact-lux-input ${errors.email ? 'input-error' : ''}`}
                          />
                        </div>
                        {errors.email && <span className="contact-error-text">{errors.email}</span>}
                      </div>
                    </div>

                    {/* I am a: Custom Select with 7 Options */}
                    <div>
                      <label htmlFor="role-select-trigger" className="contact-field-label">
                        I am a
                      </label>
                      <input type="hidden" name="role" value={formData.role} />
                      <div ref={dropdownRef} className="contact-select-wrapper" style={{ position: 'relative' }}>
                        <button
                          type="button"
                          id="role-select-trigger"
                          aria-haspopup="listbox"
                          aria-expanded={isDropdownOpen}
                          onClick={() => setIsDropdownOpen((prev) => !prev)}
                          onKeyDown={handleTriggerKeyDown}
                          className={`contact-lux-select-trigger ${isDropdownOpen ? 'active' : ''}`}
                        >
                          <span className="contact-selected-role-text">{formData.role}</span>
                          <ChevronDown
                            size={16}
                            color="#c9a77c"
                            style={{
                              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 200ms ease',
                              flexShrink: 0,
                            }}
                          />
                        </button>

                        {/* Desktop Dropdown: shows all 7 rows without scrolling (or scrolls if max-height 320px exceeded) */}
                        {!isMobile && isDropdownOpen && (
                          <div className="contact-desktop-dropdown" role="listbox" aria-label="I am a">
                            {ROLE_OPTIONS.map((opt, idx) => {
                              const isSelected = formData.role === opt;
                              const isLast = idx === ROLE_OPTIONS.length - 1;
                              return (
                                <div
                                  key={opt}
                                  role="option"
                                  aria-selected={isSelected}
                                  tabIndex={0}
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, role: opt }));
                                    setIsDropdownOpen(false);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      setFormData((prev) => ({ ...prev, role: opt }));
                                      setIsDropdownOpen(false);
                                    }
                                  }}
                                  className={`contact-dropdown-item ${isSelected ? 'selected' : ''} ${isLast ? 'last' : ''}`}
                                >
                                  <span className="contact-dropdown-item-label">{opt}</span>
                                  <div className={`contact-radio-circle ${isSelected ? 'selected' : ''}`}>
                                    {isSelected && <div className="contact-radio-inner-dot" />}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Location or City */}
                    <div>
                      <label className="contact-field-label">Location or city</label>
                      <div style={{ position: 'relative' }}>
                        <MapPin size={16} color="#c9a77c" className="contact-field-icon" />
                        <input
                          type="text"
                          placeholder="Mysuru, Bangalore, Chennai"
                          value={formData.city}
                          onChange={(e) => {
                            setFormData({ ...formData, city: e.target.value });
                            if (errors.city) setErrors({ ...errors, city: '' });
                          }}
                          className={`contact-lux-input ${errors.city ? 'input-error' : ''}`}
                        />
                      </div>
                      {errors.city && <span className="contact-error-text">{errors.city}</span>}
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label className="contact-field-label">Message</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your property or requirements"
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                        className={`contact-lux-textarea ${errors.message ? 'input-error' : ''}`}
                      />
                      {errors.message && <span className="contact-error-text">{errors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div style={{ marginTop: '4px' }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="contact-submit-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Sending message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send message</span>
                            <ArrowRight size={16} className="btn-arrow-icon" />
                          </>
                        )}
                      </button>

                      {/* Privacy Note */}
                      <div className="contact-privacy-note">
                        <Lock size={12} color="#7d776a" style={{ flexShrink: 0 }} />
                        <span>Your details stay private. We never share them.</span>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet Modal (Max-height ~70vh, fixed drag handle at top, scrollable list inside, 56px rows) */}
      <AnimatePresence>
        {isMobile && isDropdownOpen && (
          <>
            <motion.div
              key="sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDropdownOpen(false)}
              className="contact-sheet-backdrop"
            />
            <motion.div
              key="sheet-panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="contact-bottom-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="I am a selection"
            >
              {/* Fixed Drag Handle and Header at top */}
              <div className="contact-sheet-top-bar">
                <div className="contact-sheet-drag-handle" />
                <div className="contact-sheet-header-inner">
                  <span className="contact-sheet-header-title">I am a</span>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(false)}
                    className="contact-sheet-close-btn"
                    aria-label="Close"
                  >
                    <X size={18} color="#cfc7b6" />
                  </button>
                </div>
              </div>

              {/* Scrollable list inside sheet */}
              <div className="contact-sheet-scroll-list" role="listbox" aria-label="I am a">
                {ROLE_OPTIONS.map((opt, idx) => {
                  const isSelected = formData.role === opt;
                  const isLast = idx === ROLE_OPTIONS.length - 1;
                  return (
                    <div
                      key={opt}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, role: opt }));
                        setIsDropdownOpen(false);
                      }}
                      className={`contact-sheet-row ${isSelected ? 'selected' : ''} ${isLast ? 'last' : ''}`}
                    >
                      <span className="contact-sheet-row-text">{opt}</span>
                      <div className={`contact-radio-circle mobile ${isSelected ? 'selected' : ''}`}>
                        {isSelected && <div className="contact-radio-inner-dot mobile" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* Outer Card */
        .contact-outer-card {
          background-color: #0c1110;
          border: 0.5px solid #4a3f2b;
          border-radius: 16px;
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: stretch;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
          box-sizing: border-box;
        }

        /* Left Column */
        .contact-left-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .contact-left-header {
          display: flex;
          flex-direction: column;
        }

        .contact-pill {
          font-family: var(--font-sans);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c9a77c;
          border: 0.5px solid rgba(201, 167, 124, 0.4);
          background-color: rgba(201, 167, 124, 0.06);
          padding: 4px 14px;
          border-radius: 9999px;
          width: fit-content;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .contact-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 44px;
          line-height: 1.15;
          color: #f4efe4;
          font-weight: 400;
          letter-spacing: -0.015em;
          margin: 0 0 14px 0;
        }

        .contact-igh {
          font-style: italic;
          color: #d9b98a;
        }

        .contact-subtext {
          font-family: var(--font-sans);
          font-size: 14.5px;
          line-height: 1.6;
          color: #b9b2a2;
          margin: 0 0 20px 0;
        }

        .contact-left-media {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex-grow: 1;
          justify-content: flex-end;
        }

        .contact-image-wrapper {
          border-radius: 12px;
          border: 0.5px solid rgba(201, 167, 124, 0.35);
          overflow: hidden;
          position: relative;
          width: 100%;
          min-height: 160px;
          flex-grow: 1;
          background-color: #0b100e;
        }

        .contact-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.92) contrast(1.05);
        }

        .contact-image-pill {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background-color: rgba(12, 17, 16, 0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 0.5px solid rgba(201, 167, 124, 0.3);
          border-radius: 9999px;
          padding: 4px 10px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-sans);
          font-size: 11px;
          color: #f4efe4;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .contact-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contact-info-card {
          background-color: #121816;
          border: 0.5px solid #3a3225;
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .contact-info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-info-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .contact-info-label {
          font-family: var(--font-sans);
          font-size: 11.5px;
          color: #8e8677;
          line-height: 1.25;
          margin-bottom: 2px;
        }

        .contact-info-value {
          font-family: var(--font-sans);
          font-size: 13.5px;
          color: #f4efe4;
          font-weight: 500;
          line-height: 1.3;
        }

        .contact-info-link {
          text-decoration: none;
          transition: color 200ms ease;
        }

        .contact-info-link:hover {
          color: #c9a77c;
        }

        /* Right Column Form Panel */
        .contact-right-panel {
          background-color: #101614;
          border: 0.5px solid #3a3225;
          border-radius: 14px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .contact-form-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 26px;
          color: #FAF8F4;
          font-weight: 400;
          margin: 0 0 20px 0;
          letter-spacing: -0.01em;
        }

        .contact-field-label {
          display: block;
          font-family: var(--font-sans);
          font-size: 12.5px;
          color: #cfc7b6;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .contact-field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .contact-lux-input {
          width: 100%;
          height: 44px;
          background-color: #0b100e;
          border: 0.5px solid #4a3f2b;
          border-radius: 10px;
          padding: 0 14px 0 40px;
          color: #f4efe4;
          font-size: 14px;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 200ms ease, box-shadow 200ms ease, background-color 200ms ease;
          box-sizing: border-box;
        }

        .contact-lux-input:focus {
          border-color: #c9a77c !important;
          box-shadow: 0 0 0 3px rgba(201, 167, 124, 0.18) !important;
        }

        .contact-lux-input::placeholder {
          color: #7d776a !important;
        }

        .contact-phone-email-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        /* Selection Field: Trigger & Desktop Dropdown */
        .contact-select-wrapper {
          position: relative;
          width: 100%;
        }

        .contact-lux-select-trigger {
          width: 100%;
          height: 44px;
          background-color: #0b100e;
          border: 0.5px solid #4a3f2b;
          border-radius: 10px;
          padding: 0 14px;
          color: #f4efe4;
          font-size: 14px;
          font-family: var(--font-sans);
          outline: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 200ms ease, box-shadow 200ms ease;
          box-sizing: border-box;
          text-align: left;
        }

        .contact-lux-select-trigger:focus,
        .contact-lux-select-trigger.active {
          border-color: #c9a77c !important;
          box-shadow: 0 0 0 3px rgba(201, 167, 124, 0.18) !important;
        }

        .contact-selected-role-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 8px;
        }

        .contact-desktop-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          z-index: 60;
          background-color: #101614;
          border: 0.5px solid #3a3225;
          border-radius: 12px;
          max-height: 320px;
          overflow-y: auto;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(201, 167, 124, 0.1);
          box-sizing: border-box;
        }

        .contact-desktop-dropdown::-webkit-scrollbar {
          width: 6px;
        }

        .contact-desktop-dropdown::-webkit-scrollbar-track {
          background: #0b100e;
          border-radius: 4px;
        }

        .contact-desktop-dropdown::-webkit-scrollbar-thumb {
          background: #4a3f2b;
          border-radius: 4px;
        }

        .contact-desktop-dropdown::-webkit-scrollbar-thumb:hover {
          background: #c9a77c;
        }

        .contact-dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 16px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 13.5px;
          color: #cfc7b6;
          border-bottom: 0.5px solid #241e17;
          transition: background-color 150ms ease, color 150ms ease;
          user-select: none;
        }

        .contact-dropdown-item.last {
          border-bottom: none;
        }

        .contact-dropdown-item:hover:not(.selected) {
          background-color: rgba(255, 255, 255, 0.04);
          color: #f4efe4;
        }

        .contact-dropdown-item.selected {
          background-color: rgba(201, 167, 124, 0.08);
          color: #c9a77c;
          font-weight: 600;
        }

        .contact-radio-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1.5px solid #4a3f2b;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 150ms ease;
        }

        .contact-radio-circle.selected {
          border-color: #c9a77c;
        }

        .contact-radio-inner-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #c9a77c;
        }

        /* Mobile Bottom Sheet */
        .contact-sheet-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 9999;
        }

        .contact-bottom-sheet {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-height: 70vh;
          background-color: #101614;
          border-top: 1px solid #3a3225;
          border-radius: 20px 20px 0 0;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.85);
        }

        .contact-sheet-top-bar {
          flex-shrink: 0;
          padding: 12px 20px 10px;
          border-bottom: 0.5px solid #241e17;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #101614;
        }

        .contact-sheet-drag-handle {
          width: 38px;
          height: 4px;
          background-color: #4a3f2b;
          border-radius: 2px;
          margin-bottom: 10px;
        }

        .contact-sheet-header-inner {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .contact-sheet-header-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 19px;
          color: #f4efe4;
          font-weight: 500;
        }

        .contact-sheet-close-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          color: #cfc7b6;
          transition: background-color 150ms ease;
        }

        .contact-sheet-close-btn:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }

        .contact-sheet-scroll-list {
          overflow-y: auto;
          flex: 1;
          -webkit-overflow-scrolling: touch;
          padding-bottom: max(20px, env(safe-area-inset-bottom, 20px));
        }

        .contact-sheet-scroll-list::-webkit-scrollbar {
          width: 4px;
        }

        .contact-sheet-scroll-list::-webkit-scrollbar-thumb {
          background: #4a3f2b;
          border-radius: 2px;
        }

        .contact-sheet-row {
          height: 56px;
          min-height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          cursor: pointer;
          border-bottom: 0.5px solid #241e17;
          transition: background-color 150ms ease, color 150ms ease;
          user-select: none;
        }

        .contact-sheet-row.last {
          border-bottom: none;
        }

        .contact-sheet-row:active {
          background-color: rgba(201, 167, 124, 0.12);
        }

        .contact-sheet-row-text {
          font-family: var(--font-sans);
          font-size: 14.5px;
          color: #cfc7b6;
          font-weight: 400;
        }

        .contact-sheet-row.selected {
          background-color: rgba(201, 167, 124, 0.08);
        }

        .contact-sheet-row.selected .contact-sheet-row-text {
          color: #c9a77c;
          font-weight: 600;
        }

        .contact-radio-circle.mobile {
          width: 20px;
          height: 20px;
        }

        .contact-radio-inner-dot.mobile {
          width: 9px;
          height: 9px;
        }

        .contact-lux-textarea {
          width: 100%;
          min-height: 96px;
          background-color: #0b100e;
          border: 0.5px solid #4a3f2b;
          border-radius: 10px;
          padding: 12px 14px;
          color: #f4efe4;
          font-size: 14px;
          font-family: var(--font-sans);
          outline: none;
          resize: vertical;
          transition: border-color 200ms ease, box-shadow 200ms ease, background-color 200ms ease;
          box-sizing: border-box;
        }

        .contact-lux-textarea:focus {
          border-color: #c9a77c !important;
          box-shadow: 0 0 0 3px rgba(201, 167, 124, 0.18) !important;
        }

        .contact-lux-textarea::placeholder {
          color: #7d776a !important;
        }

        .input-error {
          border-color: #e07a6f !important;
        }

        .contact-error-text {
          font-family: var(--font-sans);
          font-size: 12px;
          color: #e07a6f;
          margin-top: 4px;
          display: block;
        }

        .contact-submit-btn {
          width: 100%;
          height: 48px;
          background-color: #c9a77c;
          color: #1a1408;
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 15px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 200ms ease, transform 200ms ease;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
        }

        .contact-submit-btn:hover:not(:disabled) {
          background-color: #d9b98a;
        }

        .contact-submit-btn:hover:not(:disabled) .btn-arrow-icon {
          transform: translateX(3px);
        }

        .btn-arrow-icon {
          transition: transform 200ms ease;
        }

        .contact-privacy-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 12px;
          font-family: var(--font-sans);
          font-size: 12px;
          color: #7d776a;
        }

        /* Mobile Responsive (under 768px) */
        @media (max-width: 767px) {
          .contact-outer-card {
            display: flex;
            flex-direction: column;
            padding: 20px;
            gap: 24px;
          }

          .contact-left-col {
            display: contents;
          }

          .contact-left-header {
            order: 1;
          }

          .contact-heading {
            font-size: 34px;
          }

          .contact-right-panel {
            order: 2;
            padding: 20px;
          }

          .contact-phone-email-grid {
            grid-template-columns: 1fr;
          }

          .contact-left-media {
            order: 3;
            margin-top: 8px;
          }

          .contact-image-wrapper {
            height: 180px;
          }
        }
      `}</style>
    </section>
  );
};
