import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    quote: '"The diligence iGrey brought to our Côte d\'Azur acquisition surpassed any private banking group we have partnered with. Total discretion and flawless execution."',
    author: 'LORD HARRISON V.',
    role: 'London Family Office Principal',
  },
  {
    quote: '"Their curation filtered out ninety percent of the noise in Miami. We found a trophy waterfront asset within three weeks that never even touched the open market."',
    author: 'ELENA ROSTOVA',
    role: 'Global Tech Founder & Collector',
  },
  {
    quote: '"A true masterclass in architectural provenance and investment discipline. They treat real estate as living sculpture and capital protection."',
    author: 'MARCUS STERLING',
    role: 'Private Equity Managing Partner',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section
      id="reviews"
      style={{
        backgroundColor: '#F7F5F0',
        color: '#121416',
        padding: '120px 0',
        position: 'relative',
        borderTop: '1px solid rgba(18, 20, 22, 0.06)',
      }}
    >
      <div className="container">
        {/* Centered Header Matching Screenshot */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '0.85rem' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#C5A880',
                fontWeight: 600,
              }}
            >
              INSTITUTIONAL ACCOLADES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 4.5vw, 3.85rem)',
              lineHeight: 1.15,
              fontWeight: 500,
              color: '#111827',
              marginBottom: '1.25rem',
            }}
          >
            Private Client Reflections
          </motion.h2>

          {/* Centered Gold Accent Divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '48px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              height: '2px',
              backgroundColor: '#C5A880',
              margin: '0 auto',
            }}
          />
        </div>

        {/* 3-Column Reviews Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            alignItems: 'stretch',
          }}
          className="reviews-grid"
        >
          {reviews.map((review, idx) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                border: '1px solid rgba(197, 168, 128, 0.25)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(197, 168, 128, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.04)';
              }}
            >
              {/* Italic Serif Quote */}
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.18rem',
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  color: '#1F2937',
                  fontWeight: 480,
                  marginBottom: '2rem',
                }}
              >
                {review.quote}
              </p>

              {/* Author & Role Block */}
              <div
                style={{
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(18, 20, 22, 0.08)',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#111827',
                    fontWeight: 700,
                    marginBottom: '0.35rem',
                  }}
                >
                  {review.author}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: '#4B5563',
                    lineHeight: 1.4,
                    fontWeight: 480,
                  }}
                >
                  {review.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
