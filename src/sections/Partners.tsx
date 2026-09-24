import React from 'react';
import { partnersData } from '../data/partners';

export const Partners: React.FC = () => {
  // Multiply partners array so there is plenty of content for a seamless infinite loop
  const marqueeList = [
    ...partnersData,
    ...partnersData,
    ...partnersData,
    ...partnersData,
  ];

  return (
    <section
      id="partners"
      style={{
        backgroundColor: '#0A0B0C',
        color: 'var(--color-text-primary)',
        padding: '70px 0 75px',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Label */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 3 }}>
        <span className="micro-label" style={{ justifyContent: 'center' }}>
          TRUSTED RELATIONSHIPS
        </span>
      </div>

      {/* Side Vignette Fades for seamless floating illusion */}
      <div className="partners-fade-left" />
      <div className="partners-fade-right" />

      {/* Floating Marquee Container */}
      <div className="partners-marquee-container">
        <div className="partners-marquee-track">
          {marqueeList.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="partner-floating-badge"
              style={{
                animationDelay: `${(idx % 5) * -1.2}s`,
              }}
            >
              <span className="partner-name">
                {partner.name}
              </span>
              <span className="partner-category">
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .partners-fade-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 140px;
          height: 100%;
          background: linear-gradient(to right, #0A0B0C 0%, rgba(10, 11, 12, 0) 100%);
          z-index: 4;
          pointer-events: none;
        }

        .partners-fade-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 140px;
          height: 100%;
          background: linear-gradient(to left, #0A0B0C 0%, rgba(10, 11, 12, 0) 100%);
          z-index: 4;
          pointer-events: none;
        }

        .partners-marquee-container {
          width: 100%;
          overflow: hidden;
          display: flex;
          position: relative;
          cursor: default;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .partners-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: partnersHorizontalGlide 32s linear infinite;
          will-change: transform;
        }

        .partners-marquee-container:hover .partners-marquee-track {
          animation-play-state: paused;
        }

        /* Seamless 50% loop for the 4x replicated array (2 sets of 10 items) */
        @keyframes partnersHorizontalGlide {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .partner-floating-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1.2rem 3rem;
          min-width: 250px;
          position: relative;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          opacity: 0.78;
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease;
          animation: partnersVerticalFloat 6s ease-in-out infinite alternate;
        }

        @keyframes partnersVerticalFloat {
          0% {
            transform: translateY(3px);
          }
          50% {
            transform: translateY(-4px);
          }
          100% {
            transform: translateY(2px);
          }
        }

        .partner-floating-badge:hover {
          opacity: 1 !important;
          transform: translateY(-7px) scale(1.04) !important;
          filter: drop-shadow(0 8px 16px rgba(197, 168, 128, 0.15));
        }

        .partner-floating-badge .partner-name {
          font-family: var(--font-serif);
          font-size: 1.08rem;
          letter-spacing: 0.07em;
          color: var(--color-text-primary);
          font-weight: 500;
          margin-bottom: 0.35rem;
          white-space: nowrap;
          transition: color 0.3s ease;
        }

        .partner-floating-badge:hover .partner-name {
          color: #FFFFFF;
        }

        .partner-floating-badge .partner-category {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-bronze);
          font-weight: 500;
          white-space: nowrap;
          transition: color 0.3s ease;
        }

        .partner-floating-badge:hover .partner-category {
          color: #DFBA73;
        }

        @media (max-width: 768px) {
          .partners-fade-left, .partners-fade-right {
            width: 60px;
          }
          .partner-floating-badge {
            padding: 1rem 1.8rem;
            min-width: 200px;
          }
          .partner-floating-badge .partner-name {
            font-size: 0.95rem;
          }
          .partner-floating-badge .partner-category {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </section>
  );
};
