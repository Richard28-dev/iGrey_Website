import React from 'react';
import { motion } from 'framer-motion';

const differences = [
  {
    number: '01',
    title: 'Curated Properties',
    description: 'Every residence in our portfolio undergoes rigorous architectural assessment and verified provenance.'
  },
  {
    number: '02',
    title: 'Transparent Process',
    description: 'Direct valuations, unvarnished market intelligence, and complete clarity across every transaction.'
  },
  {
    number: '03',
    title: 'Personalized Guidance',
    description: 'Senior-level counsel tailored to the unique goals of private clients and family offices.'
  },
  {
    number: '04',
    title: 'Long-Term Value',
    description: 'Prioritizing timeless architecture and enduring capital resilience across prime locations.'
  }
];

export const Difference: React.FC = () => {
  return (
    <section
      id="difference"
      style={{
        backgroundColor: '#FAF8F5',
        color: '#141618',
        padding: '110px 0',
        position: 'relative',
        borderTop: '1px solid rgba(18, 20, 22, 0.06)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#9E7B48',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ display: 'inline-block', width: '18px', height: '1px', backgroundColor: '#9E7B48' }} />
              THE IGREY DIFFERENCE
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 4.5vw, 3.85rem)',
              lineHeight: 1.15,
              fontWeight: 500,
              color: '#111827',
              letterSpacing: '-0.01em',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            Crafting a New Paradigm in Luxury Acquisition.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#374151',
              fontWeight: 480,
            }}
          >
            A deliberate departure from conventional brokerage, uniting architectural excellence with institutional intelligence.
          </motion.p>
        </div>

        {/* 4 Pillars Grid with Editorial Large Numbers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {differences.map((diff, idx) => (
            <motion.div
              key={diff.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                padding: '2.5rem 2rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '0px',
                border: '1px solid rgba(197, 168, 128, 0.28)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(158, 123, 72, 0.55)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(197, 168, 128, 0.16)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.28)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Top: Large Serif Number */}
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(3rem, 4vw, 3.75rem)',
                  lineHeight: 1,
                  color: 'rgba(158, 123, 72, 0.55)',
                  fontWeight: 400,
                  marginBottom: '1.25rem',
                }}
              >
                {diff.number}
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    color: '#111827',
                    marginBottom: '0.65rem',
                    fontWeight: 500,
                  }}
                >
                  {diff.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    lineHeight: 1.65,
                    color: '#374151',
                    fontWeight: 480,
                  }}
                >
                  {diff.description}
                </p>
              </div>

              {/* Subtle Bronze Accent Mark */}
              <div
                style={{
                  width: '28px',
                  height: '1px',
                  backgroundColor: '#9E7B48',
                  marginTop: '1.75rem',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
