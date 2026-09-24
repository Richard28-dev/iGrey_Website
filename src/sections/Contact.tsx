import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  prefilledProperty?: string;
  onSuccessNotification: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ prefilledProperty, onSuccessNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userRole: 'Property Buyer / Investor',
    location: '',
    message: prefilledProperty ? `Inquiry regarding: ${prefilledProperty}` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync if prefilledProperty changes
  React.useEffect(() => {
    if (prefilledProperty) {
      setFormData((prev) => ({
        ...prev,
        message: `Inquiry regarding: ${prefilledProperty}`,
      }));
    }
  }, [prefilledProperty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      onSuccessNotification('Thank you. Your message has been received by our senior client desk.');
    }, 600);
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#F1F5FA',
        padding: '90px 0 100px 0',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '1160px' }}>
        {/* Large Rounded White Container Card Matching Screenshot */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 6px 30px rgba(12, 35, 64, 0.06)',
            border: '1px solid #E2E8F0',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
              gap: 'clamp(2.5rem, 4.5vw, 4rem)',
              alignItems: 'start',
            }}
            className="contact-card-grid"
          >
            {/* Left Column: Heading, Subtitle, Image & Locations */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.9rem, 2.7vw, 2.4rem)',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '0.65rem',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                Contact iGrey
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.96rem',
                  lineHeight: 1.55,
                  color: '#4B5563',
                  marginBottom: '1.75rem',
                }}
              >
                Have questions or want to partner with us? Leave your message and our team will get back to you shortly.
              </motion.p>

              {/* User Uploaded Property Advisory Desk Image */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9.5',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  backgroundColor: '#E5E7EB',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                  marginBottom: '1.25rem',
                }}
              >
                <img
                  src="/contact-property.jpg"
                  alt="Property Advisory & Acquisition Desk"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Locations Row with Pin Icon */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#0C2340',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                }}
              >
                <MapPin size={17} color="#0C2340" style={{ flexShrink: 0 }} />
                <span>London • Los Angeles • Lake Como • Zurich • Tokyo</span>
              </div>
            </div>

            {/* Right Column: Form Matching Exact Screenshot Fields */}
            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: '2.5rem',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0C2340' }}>
                    <CheckCircle2 size={26} color="#0C2340" />
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>
                      Message Received
                    </span>
                  </div>
                  <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Thank you. Our private client advisory desk has received your details and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        userRole: 'Property Buyer / Investor',
                        location: '',
                        message: '',
                      });
                    }}
                    style={{
                      alignSelf: 'flex-start',
                      marginTop: '0.75rem',
                      padding: '0.65rem 1.4rem',
                      backgroundColor: '#0C2340',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {/* Your Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label
                      htmlFor="contact-name"
                      style={{ fontSize: '0.84rem', fontWeight: 600, color: '#374151' }}
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      placeholder="e.g. Julian Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        color: '#111827',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#0C2340';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(12, 35, 64, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#D1D5DB';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Phone Number & Email Address Dual Row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label
                        htmlFor="contact-phone"
                        style={{ fontSize: '0.84rem', fontWeight: 600, color: '#374151' }}
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+44 20 7946 0912"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: '8px',
                          color: '#111827',
                          fontSize: '0.92rem',
                          fontFamily: 'inherit',
                          outline: 'none',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#0C2340';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(12, 35, 64, 0.08)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#D1D5DB';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label
                        htmlFor="contact-email"
                        style={{ fontSize: '0.84rem', fontWeight: 600, color: '#374151' }}
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        placeholder="julian@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: '8px',
                          color: '#111827',
                          fontSize: '0.92rem',
                          fontFamily: 'inherit',
                          outline: 'none',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#0C2340';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(12, 35, 64, 0.08)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#D1D5DB';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* I am a Dropdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label
                      htmlFor="contact-role"
                      style={{ fontSize: '0.84rem', fontWeight: 600, color: '#374151' }}
                    >
                      I am a
                    </label>
                    <div style={{ position: 'relative' }}>
                      <select
                        id="contact-role"
                        value={formData.userRole}
                        onChange={(e) => setFormData({ ...formData, userRole: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 2.5rem 0.75rem 1rem',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: '8px',
                          color: '#111827',
                          fontSize: '0.92rem',
                          fontFamily: 'inherit',
                          outline: 'none',
                          appearance: 'none',
                          cursor: 'pointer',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#0C2340';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(12, 35, 64, 0.08)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#D1D5DB';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <option value="Property Owner / Landlord">Property Owner / Landlord</option>
                        <option value="Property Buyer / Investor">Property Buyer / Investor</option>
                        <option value="Luxury Residential Representation">Luxury Residential Representation</option>
                        <option value="Off-Market Acquisition Sourcing">Off-Market Acquisition Sourcing</option>
                        <option value="Private Wealth & Asset Advisory">Private Wealth & Asset Advisory</option>
                      </select>
                      <div
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          pointerEvents: 'none',
                          color: '#6B7280',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Location / City */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label
                      htmlFor="contact-location"
                      style={{ fontSize: '0.84rem', fontWeight: 600, color: '#374151' }}
                    >
                      Location / City
                    </label>
                    <input
                      id="contact-location"
                      type="text"
                      placeholder="e.g. London, Los Angeles, Lake Como, New York"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        color: '#111827',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#0C2340';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(12, 35, 64, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#D1D5DB';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Message / Property Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label
                      htmlFor="contact-details"
                      style={{ fontSize: '0.84rem', fontWeight: 600, color: '#374151' }}
                    >
                      Message / Property Details
                    </label>
                    <textarea
                      id="contact-details"
                      rows={4}
                      placeholder="Tell us a little about your property or stay requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        color: '#111827',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#0C2340';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(12, 35, 64, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#D1D5DB';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Send Message Full-Width Deep Navy Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                      padding: '0.9rem 1.5rem',
                      backgroundColor: '#0C2340',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s ease, transform 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#16355C')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0C2340')}
                  >
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-card-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
