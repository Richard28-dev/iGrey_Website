import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { scrollToTarget } from '../utils/scroll';

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: 'How does iGH guarantee on-time rent payouts?',
    answer:
      'iGH utilizes an institutional-grade automated rental payout mechanism. Homeowners receive guaranteed monthly rental deposits directly into their designated bank accounts on or before the 5th of every month, regardless of tenant collection cycles.',
  },
  {
    question: 'What background verification is performed on tenants?',
    answer:
      'Every prospective tenant undergoes comprehensive institutional due diligence, including government ID validation, professional employment verification, KYC compliance, and prior tenancy history checks to ensure total safety and property preservation.',
  },
  {
    question: 'How are property maintenance, painting, and repairs handled?',
    answer:
      'Our dedicated in-house property maintenance team coordinates scheduled inspections, rapid electrical and plumbing repairs, HVAC upkeep, and turnkey restoration or repainting between tenancies with pre-approved certified vendors.',
  },
  {
    question: 'I am an NRI landlord living abroad. Can I manage my property remotely?',
    answer:
      'Yes, absolutely. We specialize in 100% remote hands-free property management for NRI and overseas asset owners. From digital lease agreements and biometric check-ins to real-time financial reporting and foreign currency payouts, your asset is fully managed.',
  },
  {
    question: 'Are there any hidden brokerages or commission fees for tenants?',
    answer:
      'No. iGH adheres to complete pricing transparency with zero brokerage on curated residential stays. All terms, utility allocations, and security deposits are clearly documented upfront with zero surprise fees.',
  },
  {
    question: 'What is the difference between Monthly Rent and Long-Term Lease?',
    answer:
      'Monthly Rent offers flexible executive stays with monthly billing cycles, whereas a Long-Term Lease guarantees continuous multi-year institutional tenancies with structured annual rental escalations and uninterrupted cash flows.',
  },
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null); // All closed by default

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget('#contact', { offset: -40, duration: 1.25 });
  };

  return (
    <section
      id="faq"
      style={{
        backgroundColor: '#EDF2F7',
        padding: 'clamp(5rem, 8vw, 8.5rem) 0',
        position: 'relative',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
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
              backgroundColor: '#FEF3C7',
              border: '1px solid rgba(217, 119, 6, 0.25)',
              borderRadius: '9999px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#B45309',
              marginBottom: '1.25rem',
              boxShadow: '0 1px 3px rgba(180, 83, 9, 0.08)',
            }}
          >
            HELP &amp; CLARITY
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 4vw, 3.4rem)',
              lineHeight: 1.15,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              fontWeight: 500,
              margin: '0 0 1rem 0',
            }}
          >
            Frequently Asked Questions
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
              lineHeight: 1.65,
              color: '#475569',
              maxWidth: '620px',
              margin: '0 auto',
              fontWeight: 400,
            }}
          >
            Everything you need to know about property onboarding, rent guarantees, and stay agreements.
          </p>
        </div>

        {/* Accordion Rows: Rounded White Pill Cards matching reference */}
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
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: isOpen ? '1px solid #CBD5E1' : '1px solid #E2E8F0',
                  boxShadow: isOpen
                    ? '0 10px 25px rgba(0, 0, 0, 0.06)'
                    : '0 2px 8px rgba(0, 0, 0, 0.02)',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '1.25rem clamp(1.25rem, 2.5vw, 1.75rem)',
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
                      fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
                      fontWeight: 600,
                      color: isOpen ? '#0F172A' : '#1E293B',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.45,
                    }}
                  >
                    {item.question}
                  </span>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? '#F1F5F9' : '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#475569',
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
                          padding: '0 clamp(1.25rem, 2.5vw, 1.75rem) 1.5rem clamp(1.25rem, 2.5vw, 1.75rem)',
                          borderTop: '1px solid #F1F5F9',
                          marginTop: '0.25rem',
                          paddingTop: '1rem',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.95rem',
                            lineHeight: 1.7,
                            color: '#475569',
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

        {/* Footer Question Line */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            color: '#475569',
          }}
        >
          <span>Still have questions about listing or renting? </span>
          <a
            href="#contact"
            onClick={handleContactClick}
            style={{
              color: '#0F172A',
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#B45309')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#0F172A')}
          >
            Speak with our advisory team →
          </a>
        </div>
      </div>
    </section>
  );
};
