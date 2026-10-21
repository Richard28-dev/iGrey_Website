import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: 'What services does iGREY HOLDINGS provide?',
    answer:
      'We offer property buying and selling support, residential and commercial renting and leasing, property management, investment-related support, construction and development coordination, and asset management services, subject to the scope of each engagement.',
  },
  {
    question: 'Can I find a property to rent or lease?',
    answer:
      'Yes. Enquire about available residential and commercial properties by sharing your preferred location, budget, property type and required tenure. Availability is subject to confirmation.',
  },
  {
    question: 'What is the property-backed insurance offering for lease customers?',
    answer:
      'iGREY HOLDINGS is introducing a property-backed insurance offering for eligible lease customers. The intended timeline is within 90 days from the start of the contract, subject to policy terms, eligibility and final arrangements. Customers should review the applicable coverage and exclusions.',
  },
  {
    question: 'Can I list my property with iGREY HOLDINGS?',
    answer:
      'Property owners can contact our team to discuss sale, rental, leasing or management requirements. Applicable services and commercial terms will be explained before engagement.',
  },
  {
    question: 'Does iGREY HOLDINGS manage properties?',
    answer:
      'Property management services may include tenant coordination, rent administration, inspections and maintenance coordination, depending on the agreed scope.',
  },
  {
    question: 'Can I discuss a property investment opportunity?',
    answer:
      'Yes. You can contact our team to discuss property opportunities, market comparisons and potential income or cost considerations. Returns are not guaranteed.',
  },
  {
    question: 'How can I arrange a property viewing?',
    answer:
      'Select an available listing and submit an enquiry with your contact information and preferred viewing time. Our team will confirm availability and next steps.',
  },
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      style={{
        backgroundColor: '#090D0B',
        color: '#FFFFFF',
        padding: 'clamp(5.5rem, 8.5vw, 8.5rem) 0',
        position: 'relative',
        borderTop: '1px solid rgba(197, 168, 128, 0.15)',
        borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
      }}
    >
      <div className="container" style={{ maxWidth: '920px' }}>
        {/* Centered Header with Eyebrow Pill */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.25rem)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.35rem 1.15rem',
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
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
            }}
          >
            HELP &amp; CLARITY
          </div>

          <h2
            className="faq-title-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.35rem, 5.8vw, 3.6rem)',
              lineHeight: 1.15,
              color: '#FAF8F4',
              letterSpacing: '-0.02em',
              fontWeight: 400,
              margin: '0 0 1rem 0',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            }}
          >
            Frequently Asked Questions
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
              lineHeight: 1.65,
              color: 'rgba(237, 232, 223, 0.72)',
              maxWidth: '620px',
              margin: '0 auto',
              fontWeight: 400,
            }}
          >
            Everything you need to know about our services, leasing arrangements, insurance offerings, and property viewing.
          </p>
        </div>

        {/* Accordion Rows: Dark Obsidian Cards with Bronze Accents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqList.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                style={{
                  backgroundColor: '#0F1613',
                  borderRadius: '8px',
                  border: isOpen
                    ? '1px solid rgba(197, 168, 128, 0.45)'
                    : '1px solid rgba(197, 168, 128, 0.18)',
                  boxShadow: isOpen
                    ? '0 12px 30px rgba(0, 0, 0, 0.45)'
                    : '0 2px 10px rgba(0, 0, 0, 0.2)',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
                className="faq-dark-item"
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '1.35rem clamp(1.25rem, 2.5vw, 1.85rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(0.98rem, 1.15vw, 1.08rem)',
                      fontWeight: 600,
                      color: isOpen ? 'var(--bronze-hi)' : '#FAF8F4',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.45,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {item.question}
                  </span>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen
                        ? 'rgba(197, 168, 128, 0.2)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(197, 168, 128, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? 'var(--bronze-hi)' : 'rgba(237, 232, 223, 0.75)',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
                    }}
                  >
                    <ChevronDown size={17} strokeWidth={2.2} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 clamp(1.25rem, 2.5vw, 1.85rem) 1.5rem clamp(1.25rem, 2.5vw, 1.85rem)',
                          borderTop: '1px solid rgba(197, 168, 128, 0.15)',
                          marginTop: '0.25rem',
                          paddingTop: '1rem',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.96rem',
                            lineHeight: 1.75,
                            color: 'rgba(237, 232, 223, 0.78)',
                            margin: 0,
                            fontWeight: 400,
                          }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-dark-item:hover {
          border-color: rgba(197, 168, 128, 0.38) !important;
        }
      `}</style>
    </section>
  );
};
