import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Key, Building2, UserCheck, ArrowUpRight } from 'lucide-react';

interface AboutProps {
  onDiscoverStory: () => void;
}

const valueCards = [
  {
    icon: Handshake,
    title: 'Trust',
    subtitle: 'Ethical Advisory'
  },
  {
    icon: Key,
    title: 'Transparency',
    subtitle: 'Clear Transactions'
  },
  {
    icon: Building2,
    title: 'Quality',
    subtitle: 'Architectural Excellence'
  },
  {
    icon: UserCheck,
    title: 'Personalized Service',
    subtitle: 'Bespoke Solutions'
  }
];

export const About: React.FC<AboutProps> = ({ onDiscoverStory }) => {
  return (
    <section
      id="about"
      style={{
        backgroundColor: '#F7F5F0',
        color: '#121416',
        padding: '110px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1.2fr)',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center',
          }}
          className="about-split-grid"
        >
          {/* Left: Large Editorial Architectural Image with rounded corners */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '24px',
                aspectRatio: '1/1.05',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.12)',
              }}
            >
              <img
                src="/about-villa.png"
                alt="iGrey Holdings Luxury Architecture"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.02) brightness(0.99)',
                }}
              />
            </div>
          </motion.div>

          {/* Right: Narrative Content Matching Uploaded Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {/* Top Indicator Dash */}
            <div
              style={{
                width: '36px',
                height: '2px',
                backgroundColor: 'var(--color-bronze)',
                marginBottom: '1rem',
              }}
            />

            {/* Micro Label */}
            <div style={{ marginBottom: '0.85rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bronze-dark)',
                  fontWeight: 600,
                }}
              >
                ABOUT iGREY HOLDINGS
              </span>
            </div>

            {/* Heading with gold period accents */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.35rem, 4.2vw, 3.65rem)',
                lineHeight: 1.15,
                fontWeight: 500,
                color: '#111827',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              Built on Trust<span style={{ color: 'var(--color-bronze-dark)' }}>.</span> Driven by Value<span style={{ color: 'var(--color-bronze-dark)' }}>.</span>
            </h2>

            {/* Paragraph 1 */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#1F2937',
                fontWeight: 480,
                marginBottom: '1rem',
              }}
            >
              iGrey Holdings is a modern real-estate company dedicated to connecting people with quality properties and meaningful opportunities.
            </p>

            {/* Paragraph 2 */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.94rem',
                lineHeight: 1.7,
                color: '#374151',
                fontWeight: 480,
                marginBottom: '2.25rem',
              }}
            >
              With a focus on trust, transparency, quality, and personalized service, we make the property journey simpler, clearer, and more confident.
            </p>

            {/* 4 Rounded Cards Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '0.85rem',
                marginBottom: '2rem',
              }}
              className="about-value-cards"
            >
              {valueCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      padding: '1.25rem 0.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      border: '1px solid rgba(197, 168, 128, 0.35)',
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.04)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(197, 168, 128, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.04)';
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        color: 'var(--color-bronze-dark)',
                        marginBottom: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={24} strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: '#121416',
                        marginBottom: '0.25rem',
                        lineHeight: 1.25,
                      }}
                    >
                      {card.title}
                    </span>

                    {/* Subtitle */}
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.72rem',
                        color: '#656A72',
                        lineHeight: 1.3,
                        fontWeight: 400,
                      }}
                    >
                      {card.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Editorial Serif Quotation */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)',
                fontStyle: 'italic',
                color: 'var(--color-bronze-dark)',
                marginBottom: '1.75rem',
                fontWeight: 500,
              }}
            >
              “More than property. A better way to move forward.”
            </p>

            {/* Bronze Luxury CTA Button */}
            <div>
              <button
                onClick={onDiscoverStory}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6B4E2B 0%, #44321A 100%)',
                  border: '1px solid rgba(223, 199, 165, 0.4)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(68, 50, 26, 0.3)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(68, 50, 26, 0.4)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #7A5932 0%, #503B1F 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(68, 50, 26, 0.3)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6B4E2B 0%, #44321A 100%)';
                }}
              >
                <span>Explore Properties</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .about-split-grid {
            grid-template-columns: 1fr !important;
          }
          .about-value-cards {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};
