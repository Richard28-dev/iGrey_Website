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
        {/* Centered Header Matching Screenshot */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2rem, 3.4vw, 2.75rem)',
              lineHeight: 1.2,
              fontWeight: 700,
              color: '#0F1E36',
              marginBottom: '0.85rem',
              letterSpacing: '-0.02em',
            }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.98rem',
              lineHeight: 1.6,
              color: '#4B5563',
              maxWidth: '620px',
              margin: '0 auto',
              fontWeight: 400,
            }}
          >
            Key inquiries regarding representation, acquisitions, privacy protocols, and property advisory.
          </motion.p>
        </div>

        {/* Stacked White Card FAQ Pills Matching Screenshot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
                  borderRadius: '12px',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.035)',
                  border: '1px solid rgba(15, 30, 54, 0.04)',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '1.2rem 1.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      color: '#0F1E36',
                      lineHeight: 1.45,
                    }}
                  >
                    {item.question}
                  </span>

                  {/* Circular Chevron Button */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#EEF2F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#0F1E36',
                      transition: 'transform 0.3s ease, background-color 0.25s ease',
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
                          padding: '0 1.6rem 1.25rem 1.6rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          lineHeight: 1.65,
                          color: '#4B5563',
                          borderTop: '1px solid #F1F5F9',
                          paddingTop: '0.9rem',
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
