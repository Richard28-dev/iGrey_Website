import React from 'react';
import { motion } from 'framer-motion';
import { partnersData } from '../data/partners';

export const Partners: React.FC = () => {
  return (
    <section
      id="partners"
      style={{
        backgroundColor: '#0A0B0C',
        color: 'var(--color-text-primary)',
        padding: '70px 0',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="container">
        {/* Subtle Label */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="micro-label" style={{ justifyContent: 'center' }}>
            TRUSTED RELATIONSHIPS
          </span>
        </div>

        {/* Clean Monochrome Horizontal Grid with Thin Separators */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}
          className="partners-grid"
        >
          {partnersData.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '1rem 0.5rem',
                borderRight: idx !== partnersData.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                transition: 'opacity 0.25s ease',
                opacity: 0.7,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                  marginBottom: '0.25rem',
                }}
              >
                {partner.name}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bronze)',
                }}
              >
                {partner.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .partners-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }
        }
      `}</style>
    </section>
  );
};
