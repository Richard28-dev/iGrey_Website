import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqsData } from '../data/faqs';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      style={{
        backgroundColor: '#E8EEF6',
        color: '#0F1E36',
        padding: '95px 0 105px 0',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '890px' }}>
        {/* Centered Luxury Header with Eyebrow and Editorial Serif */}
        <div style={{ textAlign: 'center', marginBottom: '3.2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '0.75rem' }}
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
              <span style={{ display: 'inline-block', width: '20px', height: '1px', backgroundColor: '#9E7B48' }} />
              CLIENT INQUIRIES & PROTOCOLS
              <span style={{ display: 'inline-block', width: '20px', height: '1px', backgroundColor: '#9E7B48' }} />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 4.4vw, 3.65rem)',
              lineHeight: 1.15,
              fontWeight: 450,
              color: '#0F1E36',
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            Frequently Asked Questions<span style={{ color: '#9E7B48' }}>.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#4B5563',
              maxWidth: '620px',
              margin: '0 auto',
              fontWeight: 450,
              letterSpacing: '0.01em',
            }}
          >
            Key inquiries regarding representation, acquisitions, privacy protocols, and property advisory.
          </motion.p>
        </div>

        {/* Stacked White Card FAQ Pills with Refined Typography */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqsData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  boxShadow: isOpen
                    ? '0 10px 28px rgba(15, 30, 54, 0.07)'
                    : '0 2px 8px rgba(15, 23, 42, 0.035)',
                  border: isOpen
                    ? '1px solid rgba(158, 123, 72, 0.4)'
                    : '1px solid rgba(15, 30, 54, 0.05)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '1.35rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '1rem',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isOpen) {
                      e.currentTarget.style.backgroundColor = 'rgba(247, 245, 240, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.15rem, 1.6vw, 1.3rem)',
                      fontWeight: 500,
                      color: isOpen ? '#9E7B48' : '#0F1E36',
                      lineHeight: 1.35,
                      letterSpacing: '0.01em',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {item.question}
                  </span>

                  {/* Circular Chevron Button with Gold Accent State */}
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? '#9E7B48' : '#EEF2F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: isOpen ? '#FFFFFF' : '#0F1E36',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ChevronDown size={17} strokeWidth={2.2} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 1.75rem 1.45rem 1.75rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.95rem',
                          lineHeight: 1.75,
                          color: '#4B5563',
                          borderTop: '1px solid #F1F5F9',
                          paddingTop: '1rem',
                          fontWeight: 450,
                        }}
                      >
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
