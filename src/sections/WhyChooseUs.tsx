import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Home, Wrench, Key } from 'lucide-react';

const advantages = [
  {
    icon: UserCheck,
    title: 'Verified Tenants',
    description: 'Thorough background verification, ID checks, and employment verification for complete safety.'
  },
  {
    icon: Home,
    title: 'On-Time Rent Payouts',
    description: 'Reliable and timely monthly rental deposits directly to your bank account with zero hassle.'
  },
  {
    icon: Wrench,
    title: 'Property Maintenance',
    description: 'Regular inspections, quick plumbing/electrical repairs, and professional housekeeping support.'
  },
  {
    icon: Key,
    title: 'Zero Brokerage Stays',
    description: 'Tenants can rent clean, fully furnished, and verified residences with transparent pricing.'
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="why-igrey"
      style={{
        backgroundColor: '#F5F3EE',
        color: '#141618',
        padding: '120px 0',
        position: 'relative',
        borderTop: '1px solid rgba(18, 20, 22, 0.06)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header centered matching exact screenshot typography */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4.5rem auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '1rem' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#9E7B48',
                fontWeight: 600,
              }}
            >
              THE iGREY ADVANTAGE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.75rem, 5vw, 4.25rem)',
              lineHeight: 1.15,
              fontWeight: 500,
              color: '#111827',
              marginBottom: '1.25rem',
            }}
          >
            Why Choose{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: '#9E7B48',
                fontWeight: 500,
              }}
            >
              iGrey?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.7,
              color: '#374151',
              fontWeight: 480,
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            We provide a seamless and transparent experience for both homeowners and tenants.
          </motion.p>
        </div>

        {/* 4 Cards Grid with Refined Light Styling */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  padding: '2.5rem 2rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid rgba(197, 168, 128, 0.28)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(158, 123, 72, 0.55)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(197, 168, 128, 0.16)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.28)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Icon Container with Rounded Square */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(197, 168, 128, 0.12)',
                    border: '1px solid rgba(197, 168, 128, 0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9E7B48',
                    marginBottom: '1.75rem',
                  }}
                >
                  <Icon size={22} strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: '#111827',
                    marginBottom: '1rem',
                    fontWeight: 500,
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.94rem',
                    lineHeight: 1.65,
                    color: '#374151',
                    fontWeight: 480,
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
