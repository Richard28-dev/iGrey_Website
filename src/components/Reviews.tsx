import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCard {
  quote: string;
  author: string;
  role: string;
}

const testimonials: TestimonialCard[] = [
  {
    quote:
      "\"The diligence iGrey brought to our Côte d'Azur acquisition surpassed any private banking group we have partnered with. Total discretion and flawless execution.\"",
    author: 'LORD HARRISON V.',
    role: 'London Family Office Principal',
  },
  {
    quote:
      '"Their curation filtered out ninety percent of the noise in Miami. We found a trophy waterfront asset within three weeks that never even touched the open market."',
    author: 'ELENA ROSTOVA',
    role: 'Global Tech Founder & Collector',
  },
  {
    quote:
      '"A true masterclass in architectural provenance and investment discipline. They treat real estate as living sculpture and capital protection."',
    author: 'MARCUS STERLING',
    role: 'Private Equity Managing Partner',
  },
];

const trustedRelationships = [
  {
    title: 'RIBA CHARTERED',
    subtitle: 'ARCHITECTURE & DESIGN',
  },
  {
    title: 'GLOBAL ALLIANCE',
    subtitle: 'PRIVATE SYNDICATION',
  },
  {
    title: 'RICS ACCREDITED',
    subtitle: 'VALUATION STANDARDS',
  },
  {
    title: 'CHAMBERS GLOBAL',
    subtitle: 'PRIVATE WEALTH COUNSEL',
  },
  {
    title: 'SUSTAINABILITY GUILD',
    subtitle: 'NET-ZERO STANDARDS',
  },
];

export const Reviews: React.FC = () => {
  // Multiply for seamless infinite horizontal loop
  const tickerItems = [...trustedRelationships, ...trustedRelationships, ...trustedRelationships];

  return (
    <section id="reviews" style={{ position: 'relative', backgroundColor: '#090D0B' }}>
      {/* Top Part: Institutional Accolades / Private Client Reflections */}
      <div
        style={{
          backgroundColor: '#090D0B',
          color: '#FFFFFF',
          padding: 'clamp(5.5rem, 8vw, 7.5rem) 0 clamp(4.5rem, 6vw, 6rem) 0',
          borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
        }}
      >
        <div className="container" style={{ maxWidth: '1280px' }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--bronze)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.85rem',
              }}
            >
              VERIFIED REVIEWS
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
                lineHeight: 1.15,
                color: '#FAF8F4',
                fontWeight: 400,
                letterSpacing: '-0.015em',
                margin: '0 0 1rem 0',
              }}
            >
              Loved by Proud Customers
            </h2>

            {/* Small Gold Divider Bar */}
            <div
              style={{
                width: '36px',
                height: '2px',
                backgroundColor: 'var(--bronze)',
                margin: '0 auto 1.15rem auto',
              }}
            />

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
                lineHeight: 1.6,
                color: 'rgba(237, 232, 223, 0.75)',
                maxWidth: '640px',
                margin: '0 auto',
                fontWeight: 400,
              }}
            >
              Rated 5/5 by 100+ happy customers across Bangalore, Mysuru, Hyderabad &amp; Chennai.
            </p>
          </div>

          {/* 3 Dark Review Cards Grid matching Hero/Properties palette */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '28px',
              alignItems: 'stretch',
            }}
            className="reviews-three-grid"
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: '#0F1613',
                  borderRadius: '6px',
                  border: '1px solid rgba(197, 168, 128, 0.2)',
                  padding: 'clamp(2rem, 3.5vw, 2.75rem) clamp(1.75rem, 2.5vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 14px 34px rgba(0, 0, 0, 0.45)',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                }}
                className="review-card"
              >
                {/* Quote in Cormorant Garamond serif italic */}
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
                    lineHeight: 1.7,
                    color: 'rgba(250, 248, 244, 0.92)',
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {t.quote}
                </p>

                <div>
                  {/* Subtle Hairline Divider */}
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: 'rgba(197, 168, 128, 0.18)',
                      margin: '2rem 0 1.25rem 0',
                    }}
                  />

                  {/* Author Name */}
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#FAF8F4',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {t.author}
                  </div>

                  {/* Role */}
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: 'var(--bronze)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Part: Dark Banner "— TRUSTED RELATIONSHIPS" with Horizontal Floating Marquee Animation */}
      <div
        style={{
          backgroundColor: '#070B09',
          padding: 'clamp(2.75rem, 4.5vw, 4rem) 0',
          borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ maxWidth: '1440px' }}>
          {/* Centered Eyebrow */}
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--bronze)',
              fontWeight: 600,
              marginBottom: '2.5rem',
            }}
          >
            — TRUSTED RELATIONSHIPS —
          </div>
        </div>

        {/* Horizontal Floating Marquee with Edge Fade Masks */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
          className="marquee-container"
        >
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'floatMarquee 32s linear infinite',
            }}
            className="marquee-track"
          >
            {tickerItems.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    textAlign: 'center',
                    padding: '0.75rem clamp(2.5rem, 4vw, 4.5rem)',
                    minWidth: '240px',
                  }}
                  className="trusted-rel-item"
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(0.95rem, 1.1vw, 1.08rem)',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                      lineHeight: 1.25,
                      marginBottom: '0.45rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--bronze)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>

                {/* Vertical Divider Hairline between Items */}
                <div
                  style={{
                    width: '1px',
                    height: '32px',
                    backgroundColor: 'rgba(197, 168, 128, 0.2)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.65) !important;
          border-color: rgba(197, 168, 128, 0.5) !important;
        }

        @keyframes floatMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        @media (max-width: 991px) {
          .reviews-three-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};
