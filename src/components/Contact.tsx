import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { siteImages } from '../data/images';

interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  role: string;
  city: string;
  message: string;
}

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
        backgroundColor: '#F3F5F7',
        padding: 'clamp(4.5rem, 7vw, 7.5rem) 0',
        position: 'relative',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <div className="container" style={{ maxWidth: '1220px' }}>
        {/* Floating White Card Container matching reference screenshot */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1.25fr)',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'start',
          }}
          className="contact-card-split"
        >
          {/* Left Column: Heading, Description, Image, Location line */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 3.4vw, 2.85rem)',
                lineHeight: 1.15,
                color: '#0F172A',
                fontWeight: 500,
                letterSpacing: '-0.015em',
                margin: '0 0 1rem 0',
              }}
            >
              Contact iGH
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                lineHeight: 1.65,
                color: '#475569',
                margin: '0 0 1.75rem 0',
                maxWidth: '460px',
                fontWeight: 400,
              }}
            >
              Have questions or want to partner with us? Leave your message and our team at iGH will get back to you shortly.
            </p>

            {/* High-End Architectural Property Image replacing blurry traffic image */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16/10',
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: '#E2E8F0',
                marginBottom: '1.25rem',
                border: '1px solid #E5E7EB',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
              }}
            >
              <img
                src={siteImages.contactVilla.src}
                alt="iGrey Holdings Prime Architectural Residence & Advisory"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Location Cities Footer matching reference */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#334155',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
            >
              <MapPin size={17} color="#0F172A" style={{ flexShrink: 0 }} />
              <span>Bangalore • Mysuru • Hyderabad • Chennai</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '3rem 1.5rem',
                    textAlign: 'center',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <CheckCircle2 size={52} color="#0D9488" style={{ margin: '0 auto 1.25rem auto' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.9rem',
                      color: '#0F172A',
                      fontWeight: 500,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Message Received
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      color: '#475569',
                      maxWidth: '400px',
                      margin: '0 auto 2rem auto',
                    }}
                  >
                    Thank you for reaching out to iGH. Our advisory team has received your inquiry and will contact you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    style={{
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.85rem 1.75rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Your Name */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: '#0F172A',
                          marginBottom: '0.45rem',
                        }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="reference-input"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          color: '#0F172A',
                          backgroundColor: '#FFFFFF',
                          border: errors.name ? '1px solid #EF4444' : '1px solid #E2E8F0',
                          borderRadius: '8px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        }}
                      />
                      {errors.name && (
                        <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem', display: 'block' }}>
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Phone Number & Email Address (2-Column Row) */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1rem',
                      }}
                      className="contact-two-col-row"
                    >
                      {/* Phone Number */}
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            color: '#0F172A',
                            marginBottom: '0.45rem',
                          }}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 00000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="reference-input"
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.92rem',
                            color: '#0F172A',
                            backgroundColor: '#FFFFFF',
                            border: errors.phone ? '1px solid #EF4444' : '1px solid #E2E8F0',
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                          }}
                        />
                        {errors.phone && (
                          <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem', display: 'block' }}>
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            color: '#0F172A',
                            marginBottom: '0.45rem',
                          }}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="reference-input"
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.92rem',
                            color: '#0F172A',
                            backgroundColor: '#FFFFFF',
                            border: errors.email ? '1px solid #EF4444' : '1px solid #E2E8F0',
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                          }}
                        />
                        {errors.email && (
                          <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem', display: 'block' }}>
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* I am a (Dropdown) */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: '#0F172A',
                          marginBottom: '0.45rem',
                        }}
                      >
                        I am a
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="reference-input"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          color: '#0F172A',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        }}
                      >
                        <option value="Property Owner / Landlord">Property Owner / Landlord</option>
                        <option value="Tenant / Looking for Stay">Tenant / Looking for Stay</option>
                        <option value="Property Investor">Property Investor</option>
                        <option value="Channel Partner / Broker">Channel Partner / Broker</option>
                        <option value="Other Advisory Enquiry">Other Advisory Enquiry</option>
                      </select>
                    </div>

                    {/* Location / City */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: '#0F172A',
                          marginBottom: '0.45rem',
                        }}
                      >
                        Location / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mysuru, Bangalore, Chennai, M G Road"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="reference-input"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          color: '#0F172A',
                          backgroundColor: '#FFFFFF',
                          border: errors.city ? '1px solid #EF4444' : '1px solid #E2E8F0',
                          borderRadius: '8px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        }}
                      />
                      {errors.city && (
                        <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem', display: 'block' }}>
                          {errors.city}
                        </span>
                      )}
                    </div>

                    {/* Message / Property Details */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: '#0F172A',
                          marginBottom: '0.45rem',
                        }}
                      >
                        Message / Property Details
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us a little about your property or stay requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="reference-input"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          color: '#0F172A',
                          backgroundColor: '#FFFFFF',
                          border: errors.message ? '1px solid #EF4444' : '1px solid #E2E8F0',
                          borderRadius: '8px',
                          outline: 'none',
                          resize: 'vertical',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        }}
                      />
                      {errors.message && (
                        <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem', display: 'block' }}>
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Send Message Button matching reference */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '0.95rem 1.5rem',
                        marginTop: '0.5rem',
                        backgroundColor: '#0F172A',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        letterSpacing: '0.01em',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
                        transition: 'background-color 0.2s ease, transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#1E293B';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#0F172A';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .reference-input:focus {
          border-color: #0F172A !important;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08) !important;
        }
        .reference-input::placeholder {
          color: #94A3B8;
        }
        @media (max-width: 960px) {
          .contact-card-split {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .contact-two-col-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
