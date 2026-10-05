import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TestimonialCard {
  quote: string;
  name: string;
  jobTitle: string;
  company: string;
  city: string;
  tag: string;
  initials: string;
  rating: number;
}

const testimonials: TestimonialCard[] = [
  {
    quote:
      'Their curation filtered out ninety percent of the noise. We found a trophy waterfront asset within three weeks that never even touched the open market.',
    name: 'Elena Rostova',
    jobTitle: 'Founder',
    company: 'Global Tech Ventures',
    city: 'Bengaluru',
    tag: 'Verified investor',
    initials: 'ER',
    rating: 5,
  },
  {
    quote:
      'Outstanding portfolio structuring and exceptional legal diligence. The onboarding had several compliance stages, but their discreet private banking execution was well worth it.',
    name: 'Harshvardhan Singhania',
    jobTitle: 'Principal Partner',
    company: 'Singhania Family Office',
    city: 'Bengaluru',
    tag: 'Verified investor',
    initials: 'HS',
    rating: 4,
  },
  {
    quote:
      'A true masterclass in architectural provenance and investment discipline. They treat luxury real estate as living sculpture and disciplined capital protection.',
    name: 'Madhavan Sridhar',
    jobTitle: 'Managing Director',
    company: 'Apex Capital Partners',
    city: 'Chennai',
    tag: 'Verified homeowner',
    initials: 'MS',
    rating: 5,
  },
  {
    quote:
      'Managing our duplex from Singapore involved a longer initial KYC cycle than anticipated, yet their property management and net 7.2% rental yield have been totally reliable.',
    name: 'Arun Venkatesh',
    jobTitle: 'Director of Cloud Engg.',
    company: 'Oracle Global',
    city: 'Bengaluru',
    tag: 'Verified investor',
    initials: 'AV',
    rating: 3,
  },
  {
    quote:
      'Their tenant verification and background checks are remarkably thorough. Disbursements are punctual on the 1st of every month, though monthly digital statements could arrive faster.',
    name: 'Dr. Priya Reddy',
    jobTitle: 'Consultant Cardiologist',
    company: 'Apollo Health City',
    city: 'Hyderabad',
    tag: 'Verified homeowner',
    initials: 'PR',
    rating: 4,
  },
  {
    quote:
      'Entrusting our luxury beachside villa on ECR to iGrey was our best financial decision. Complete transparency in maintenance audits, zero vacancy downtime, and exemplary professionalism.',
    name: 'K. S. Ramachandran',
    jobTitle: 'Managing Director',
    company: 'Southern Alloys Group',
    city: 'Chennai',
    tag: 'Verified investor',
    initials: 'KR',
    rating: 5,
  },
  {
    quote:
      'They handle our ancestral bungalow with genuine reverence. The initial tenant matching took slightly longer to meet their strict standards, but the peace of mind is priceless.',
    name: 'Col. Rajeshwar Rao (Retd.)',
    jobTitle: 'Trustee & Veteran',
    company: 'Heritage Preservation Trust',
    city: 'Mysuru',
    tag: 'Verified homeowner',
    initials: 'RR',
    rating: 4,
  },
  {
    quote:
      'Their data-backed yield modeling for prime Whitefield properties proved spot on. Professional lease agreements, regular quarterly inspections, and total peace of mind.',
    name: 'Sneha Kulkarni',
    jobTitle: 'VP of Engineering',
    company: 'Finovate Systems',
    city: 'Bengaluru',
    tag: 'Verified investor',
    initials: 'SK',
    rating: 5,
  },
  {
    quote:
      'The acquisition closing took extra time due to rigorous title deeds validation, but their post-purchase asset governance in Jubilee Hills has been transparent and dependable.',
    name: 'Vikramaditya Joshi',
    jobTitle: 'Founder & CEO',
    company: 'Altum Capital Ventures',
    city: 'Hyderabad',
    tag: 'Verified investor',
    initials: 'VJ',
    rating: 3,
  },
  {
    quote:
      'Living in Dubai, digital documentation and clear oversight were paramount. Payouts arrive like clockwork every quarter, backed by detailed photo maintenance audits.',
    name: 'Sundar & Meera Narayan',
    jobTitle: 'Managing Partners',
    company: 'Gulf Capital Advisory',
    city: 'Chennai',
    tag: 'Verified homeowner',
    initials: 'SN',
    rating: 4,
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
  const [isPaused, setIsPaused] = useState(false);

  // Multiply for seamless infinite horizontal loop
  const tickerItems = [...trustedRelationships, ...trustedRelationships, ...trustedRelationships];

  const renderCard = (t: TestimonialCard, keyPrefix: string, idx: number) => (
    <div key={`${keyPrefix}-${t.name}-${idx}`} className="review-card">
      <div>
        {/* Decorative Top Double-Quote */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '44px',
            lineHeight: '0.85',
            color: '#c9a77c',
            marginBottom: '0.85rem',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          “
        </div>

        {/* 5-Star Rating Row: Solid Gold (#d9b36a) for filled, Dim Outline (#5b4b32) for remaining */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '1.25rem',
          }}
          aria-label={`Rated ${t.rating} out of 5`}
        >
          {[1, 2, 3, 4, 5].map((starIndex) => {
            const isFilled = starIndex <= t.rating;
            return isFilled ? (
              <svg
                key={starIndex}
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="#d9b36a"
                aria-hidden="true"
                style={{ display: 'block' }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : (
              <svg
                key={starIndex}
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5b4b32"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ display: 'block' }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            );
          })}
          <span
            style={{
              marginLeft: '6px',
              fontFamily: "'Manrope', var(--font-sans)",
              fontSize: '13px',
              color: '#8e8677',
              fontWeight: 500,
            }}
          >
            {t.rating.toFixed(1)}
          </span>
        </div>

        {/* Master Quote: Cormorant Garamond Italic */}
        <p className="review-quote">
          {t.quote}
        </p>
      </div>

      <div>
        {/* Subtle Hairline Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(197, 168, 128, 0.18)',
            margin: '2rem 0 1.25rem 0',
          }}
        />

        {/* Professional Author Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minWidth: 0,
            width: '100%',
          }}
        >
          {/* Avatar: 46px circular, initials in Cormorant Garamond 19px, gold 0.5px border, dark background */}
          <div
            style={{
              width: '46px',
              height: '46px',
              minWidth: '46px',
              minHeight: '46px',
              borderRadius: '50%',
              border: '0.5px solid #c9a77c',
              backgroundColor: '#0c110e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', var(--font-serif)",
                fontSize: '19px',
                fontWeight: 500,
                color: '#c9a77c',
                lineHeight: 1,
                letterSpacing: '0.02em',
              }}
            >
              {t.initials}
            </span>
          </div>

          {/* Text Block: Name + Verified Check, Role, Location line */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              flex: 1,
              overflow: 'hidden',
            }}
          >
            {/* Name: Manrope 16px, weight 600, color #f7f2e8, letter-spacing 0.01em + 17px gold verified icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Manrope', var(--font-sans)",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#f7f2e8',
                  letterSpacing: '0.01em',
                  lineHeight: 1.25,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {t.name}
              </span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="#c9a77c"
                style={{ flexShrink: 0 }}
                aria-label="Verified"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2 2.7a2.5 2.5 0 0 1 3.6 0l.7.7a2.5 2.5 0 0 0 2.2.8l1-.1a2.5 2.5 0 0 1 2.7 2.7l-.1 1a2.5 2.5 0 0 0 .8 2.2l.7.7a2.5 2.5 0 0 1 0 3.6l-.7.7a2.5 2.5 0 0 0-.8 2.2l.1 1a2.5 2.5 0 0 1-2.7 2.7l-1-.1a2.5 2.5 0 0 0-2.2.8l-.7.7a2.5 2.5 0 0 1-3.6 0l-.7-.7a2.5 2.5 0 0 0-2.2-.8l-1 .1a2.5 2.5 0 0 1-2.7-2.7l.1-1a2.5 2.5 0 0 0-.8-2.2l-.7-.7a2.5 2.5 0 0 1 0-3.6l.7-.7a2.5 2.5 0 0 0 .8-2.2l-.1-1a2.5 2.5 0 0 1 2.7-2.7l1 .1a2.5 2.5 0 0 0 2.2-.8l.7-.7zm6.1 7.6a1 1 0 0 0-1.4-1.4L11 12.8 9.1 10.9a1 1 0 0 0-1.4 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6z"
                />
              </svg>
            </div>

            {/* Role: Job title, Company in Manrope 12.5px, color #cfc7b6, 3px below name */}
            <div
              style={{
                fontFamily: "'Manrope', var(--font-sans)",
                fontSize: '12.5px',
                color: '#cfc7b6',
                marginTop: '3px',
                lineHeight: 1.35,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {t.jobTitle}, {t.company}
            </div>

            {/* Location line: 11.5px gold #c9a77c with map-pin icon, city, dot separator, tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: "'Manrope', var(--font-sans)",
                fontSize: '11.5px',
                color: '#c9a77c',
                marginTop: '4px',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9a77c"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t.city} &middot; {t.tag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="reviews" style={{ position: 'relative', backgroundColor: '#090D0B', overflow: 'hidden' }}>
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
        </div>

        {/* Continuous Horizontal Floating Reviews Marquee with Soft Edge Fade */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="reviews-marquee-container"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className={`reviews-marquee-track ${isPaused ? 'is-paused' : ''}`}>
            {/* First Set of Cards */}
            <div className="reviews-marquee-group">
              {testimonials.map((t, idx) => renderCard(t, 'orig', idx))}
            </div>

            {/* Duplicated Set for Seamless Infinite Loop */}
            <div className="reviews-marquee-group" aria-hidden="true">
              {testimonials.map((t, idx) => renderCard(t, 'dup', idx))}
            </div>
          </div>
        </motion.div>
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
        /* Reviews Marquee Container */
        .reviews-marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black clamp(28px, 6vw, 90px),
            black calc(100% - clamp(28px, 6vw, 90px)),
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black clamp(28px, 6vw, 90px),
            black calc(100% - clamp(28px, 6vw, 90px)),
            transparent 100%
          );
          padding: 14px 0 26px 0;
          cursor: grab;
        }

        .reviews-marquee-container:active {
          cursor: grabbing;
        }

        .reviews-marquee-track {
          display: flex;
          width: max-content;
          animation: reviewsMarquee 50s linear infinite;
          will-change: transform;
        }

        .reviews-marquee-track.is-paused {
          animation-play-state: paused !important;
        }

        .reviews-marquee-container:hover .reviews-marquee-track {
          animation-play-state: paused;
        }

        .reviews-marquee-group {
          display: flex;
          gap: 24px;
          padding-right: 24px;
          align-items: stretch;
          flex-shrink: 0;
        }

        /* Review Card Master Styling matching Elena Rostova reference */
        .reviews-marquee-container .review-card {
          flex: 0 0 350px;
          width: 350px;
          min-width: 350px;
          max-width: 350px;
          background-color: #0F1613;
          border-radius: 16px;
          border: 1px solid rgba(197, 168, 128, 0.22);
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          box-sizing: border-box;
        }

        .reviews-marquee-container .review-card .review-quote {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          font-style: italic !important;
          font-size: 18px !important;
          line-height: 1.65 !important;
          color: #FAF8F4 !important;
          font-weight: 400 !important;
          letter-spacing: 0.005em !important;
          margin: 0 !important;
        }

        .reviews-marquee-container .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.65) !important;
          border-color: rgba(197, 168, 128, 0.5) !important;
        }

        @keyframes reviewsMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
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

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .reviews-marquee-container .review-card {
            flex: 0 0 290px !important;
            width: 290px !important;
            min-width: 290px !important;
            max-width: 290px !important;
            padding: 1.75rem 1.4rem !important;
            border-radius: 14px !important;
          }
          .reviews-marquee-container .review-card .review-quote {
            font-size: 16px !important;
            line-height: 1.6 !important;
          }
          .reviews-marquee-group {
            gap: 20px;
            padding-right: 20px;
          }
        }

        /* Accessibility: Prefers Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .reviews-marquee-track {
            animation: none !important;
          }
          .reviews-marquee-container {
            overflow-x: auto !important;
            mask-image: none !important;
            -webkit-mask-image: none !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: rgba(197, 168, 128, 0.3) transparent;
          }
          .reviews-marquee-group[aria-hidden="true"] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};


