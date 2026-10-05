import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle2, Loader2, Send } from 'lucide-react';
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
        backgroundColor: '#090D0B',
        color: '#FFFFFF',
        padding: 'clamp(5rem, 8vw, 8rem) 0',
        position: 'relative',
        borderTop: '1px solid rgba(197, 168, 128, 0.15)',
        borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Lighting Accents */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '0%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 168, 128, 0.05) 0%, rgba(9, 13, 11, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '0%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 35, 28, 0.45) 0%, rgba(9, 13, 11, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ maxWidth: '1220px', position: 'relative', zIndex: 2 }}>
        {/* Floating Dark Glassmorphism Card Container */}
        <div
          style={{
            background: 'linear-gradient(155deg, rgba(14, 22, 18, 0.88) 0%, rgba(7, 12, 10, 0.96) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '24px',
            border: '1.5px solid rgba(197, 168, 128, 0.28)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            padding: 'clamp(2.25rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1.25fr)',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'start',
          }}
          className="contact-card-split"
        >
          {/* Left Column: Heading, Description, Image, Location line */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Eyebrow Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 1rem',
                backgroundColor: 'rgba(197, 168, 128, 0.08)',
                border: '1px solid rgba(197, 168, 128, 0.3)',
                borderRadius: '9999px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--bronze-hi)',
                marginBottom: '1.25rem',
                width: 'fit-content',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
              }}
            >
              DIRECT ADVISORY
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 3.6vw, 3rem)',
                lineHeight: 1.15,
                color: '#FAF8F4',
                fontWeight: 400,
                letterSpacing: '-0.015em',
                margin: '0 0 1rem 0',
              }}
            >
              Contact <span style={{ fontStyle: 'italic', color: 'var(--bronze-hi)' }}>iGH</span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'rgba(237, 232, 223, 0.72)',
                margin: '0 0 1.75rem 0',
                maxWidth: '460px',
                fontWeight: 300,
              }}
            >
              Have questions or want to partner with us? Leave your message and our team at iGH will get back to you shortly.
            </p>

            {/* Architectural Property Image with Luxury Framing */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16/10',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'rgba(10, 16, 13, 0.85)',
                marginBottom: '1.5rem',
                border: '1px solid rgba(197, 168, 128, 0.28)',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
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
                  filter: 'brightness(0.92) contrast(1.05)',
                  transition: 'transform 0.5s ease',
                }}
              />
            </div>

            {/* Location Cities Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                color: 'rgba(237, 232, 223, 0.78)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              <MapPin size={17} color="var(--bronze-hi)" style={{ flexShrink: 0 }} />
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
                    padding: '3.5rem 2rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(10, 17, 13, 0.85)',
                    borderRadius: '18px',
                    border: '1.5px solid rgba(197, 168, 128, 0.35)',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <CheckCircle2 size={54} color="var(--bronze-hi)" style={{ margin: '0 auto 1.25rem auto' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.9rem',
                      color: '#FAF8F4',
                      fontWeight: 400,
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
                      color: 'rgba(237, 232, 223, 0.75)',
                      maxWidth: '400px',
                      margin: '0 auto 2rem auto',
                      fontWeight: 300,
                    }}
                  >
                    Thank you for reaching out to iGH. Our advisory team has received your inquiry and will contact you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="btn-bronze"
                    style={{
                      padding: '0.88rem 2rem',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: 'none',
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
                          color: 'rgba(237, 232, 223, 0.9)',
                          marginBottom: '0.45rem',
                          letterSpacing: '0.01em',
                        }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="contact-dark-input"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1.15rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          color: '#FAF8F4',
                          backgroundColor: 'rgba(10, 17, 13, 0.85)',
                          border: errors.name ? '1px solid #EF4444' : '1px solid rgba(197, 168, 128, 0.28)',
                          borderRadius: '10px',
                          outline: 'none',
                          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
                          transition: 'all 0.25s ease',
                        }}
                      />
                      {errors.name && (
                        <span style={{ fontSize: '0.75rem', color: '#F87171', marginTop: '0.35rem', display: 'block' }}>
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
                            color: 'rgba(237, 232, 223, 0.9)',
                            marginBottom: '0.45rem',
                            letterSpacing: '0.01em',
                          }}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 00000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="contact-dark-input"
                          style={{
                            width: '100%',
                            padding: '0.85rem 1.15rem',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.92rem',
                            color: '#FAF8F4',
                            backgroundColor: 'rgba(10, 17, 13, 0.85)',
                            border: errors.phone ? '1px solid #EF4444' : '1px solid rgba(197, 168, 128, 0.28)',
                            borderRadius: '10px',
                            outline: 'none',
                            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
                            transition: 'all 0.25s ease',
                          }}
                        />
                        {errors.phone && (
                          <span style={{ fontSize: '0.75rem', color: '#F87171', marginTop: '0.35rem', display: 'block' }}>
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
                            color: 'rgba(237, 232, 223, 0.9)',
                            marginBottom: '0.45rem',
                            letterSpacing: '0.01em',
                          }}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="contact-dark-input"
                          style={{
                            width: '100%',
                            padding: '0.85rem 1.15rem',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.92rem',
                            color: '#FAF8F4',
                            backgroundColor: 'rgba(10, 17, 13, 0.85)',
                            border: errors.email ? '1px solid #EF4444' : '1px solid rgba(197, 168, 128, 0.28)',
                            borderRadius: '10px',
                            outline: 'none',
                            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
                            transition: 'all 0.25s ease',
                          }}
                        />
                        {errors.email && (
                          <span style={{ fontSize: '0.75rem', color: '#F87171', marginTop: '0.35rem', display: 'block' }}>
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
                          color: 'rgba(237, 232, 223, 0.9)',
                          marginBottom: '0.45rem',
                          letterSpacing: '0.01em',
                        }}
                      >
                        I am a
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="contact-dark-input"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1.15rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          color: '#FAF8F4',
                          backgroundColor: '#0A110D',
                          border: '1px solid rgba(197, 168, 128, 0.28)',
                          borderRadius: '10px',
                          outline: 'none',
                          cursor: 'pointer',
                          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
                          transition: 'all 0.25s ease',
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
                          color: 'rgba(237, 232, 223, 0.9)',
                          marginBottom: '0.45rem',
                          letterSpacing: '0.01em',
                        }}
                      >
                        Location / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mysuru, Bangalore, Chennai, M G Road"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="contact-dark-input"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1.15rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          color: '#FAF8F4',
                          backgroundColor: 'rgba(10, 17, 13, 0.85)',
                          border: errors.city ? '1px solid #EF4444' : '1px solid rgba(197, 168, 128, 0.28)',
                          borderRadius: '10px',
                          outline: 'none',
                          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
                          transition: 'all 0.25s ease',
                        }}
                      />
                      {errors.city && (
                        <span style={{ fontSize: '0.75rem', color: '#F87171', marginTop: '0.35rem', display: 'block' }}>
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
                          color: 'rgba(237, 232, 223, 0.9)',
                          marginBottom: '0.45rem',
                          letterSpacing: '0.01em',
                        }}
                      >
                        Message / Property Details
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us a little about your property or stay requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="contact-dark-input"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1.15rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          color: '#FAF8F4',
                          backgroundColor: 'rgba(10, 17, 13, 0.85)',
                          border: errors.message ? '1px solid #EF4444' : '1px solid rgba(197, 168, 128, 0.28)',
                          borderRadius: '10px',
                          outline: 'none',
                          resize: 'vertical',
                          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
                          transition: 'all 0.25s ease',
                        }}
                      />
                      {errors.message && (
                        <span style={{ fontSize: '0.75rem', color: '#F87171', marginTop: '0.35rem', display: 'block' }}>
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Send Message Button matching luxury bronze CTA */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-bronze"
                      style={{
                        width: '100%',
                        padding: '1rem 1.75rem',
                        marginTop: '0.5rem',
                        fontSize: '0.96rem',
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.65rem',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        border: 'none',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(197, 168, 128, 0.15)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={16} />
                        </>
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
        .contact-dark-input:focus {
          border-color: var(--bronze-hi) !important;
          background-color: rgba(14, 23, 18, 0.95) !important;
          box-shadow: 0 0 0 3px rgba(197, 168, 128, 0.2), 0 4px 12px rgba(0, 0, 0, 0.4) !important;
        }
        .contact-dark-input::placeholder {
          color: rgba(237, 232, 223, 0.38) !important;
        }
        .contact-dark-input option {
          background-color: #0A110D;
          color: #FAF8F4;
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
