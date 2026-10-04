import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteContent } from '../data/content';
import { siteImages } from '../data/images';

export const Services: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { eyebrow, heading, subtitle, items } = siteContent.services;

  const activeService = items[activeIdx] || items[0];
  const activeImage = siteImages[activeService.imageKey] || siteImages.serviceSales;

  return (
    <section
      id="services"
      style={{
        backgroundColor: '#090D0B',
        color: '#FFFFFF',
        padding: 'clamp(5rem, 8vw, 8.5rem) 0',
        position: 'relative',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="container">
        {/* Section Header: Split Title and Subtitle matching reference */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.1fr)',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'end',
            marginBottom: 'clamp(3.5rem, 6vw, 5rem)',
          }}
          className="services-header-split"
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--bronze-hi)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              {eyebrow}
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                lineHeight: 1.15,
                color: '#FBF9F4',
                letterSpacing: '-0.015em',
                fontWeight: 400,
              }}
            >
              {heading}
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'rgba(255, 255, 255, 0.72)',
              fontWeight: 300,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Content Grid: Left Vertical Animated Photo + Right 4 Service Rows matching reference */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.35fr)',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'center',
          }}
          className="services-content-grid"
        >
          {/* Left: Tall Architectural Photograph with Animated Switching */}
          <div
            style={{
              width: '100%',
              aspectRatio: '3/4',
              overflow: 'hidden',
              backgroundColor: '#121815',
              border: '1px solid rgba(197, 168, 128, 0.25)',
              borderRadius: '12px',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeService.id}
                src={activeImage.src}
                alt={activeService.title}
                width={activeImage.width}
                height={activeImage.height}
                loading="eager"
                decoding="async"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.92) contrast(1.06)',
                }}
              />
            </AnimatePresence>

            {/* Subtle Overlay Badge indicating current service */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                padding: '0.45rem 1rem',
                background: 'rgba(9, 13, 11, 0.82)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(197, 168, 128, 0.35)',
                borderRadius: '6px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--bronze-hi)',
                fontWeight: 600,
              }}
            >
              {activeService.number} — {activeService.title}
            </div>
          </div>

          {/* Right: 4 Interactive Numbered Rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onClick={() => setActiveIdx(idx)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50px 1fr 40px',
                    alignItems: 'baseline',
                    gap: '1.75rem',
                    padding: '2.25rem 1.25rem',
                    borderTop: idx === 0 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'rgba(197, 168, 128, 0.07)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--bronze-hi)' : '3px solid transparent',
                    transition: 'all 0.3s ease',
                  }}
                  className="service-editorial-row"
                >
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: isActive ? 'var(--bronze-hi)' : 'rgba(255, 255, 255, 0.45)',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {service.number}
                  </span>

                  {/* Title & Description */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.65rem',
                        lineHeight: 1.25,
                        color: isActive ? 'var(--bronze-hi)' : '#FFFFFF',
                        marginBottom: '0.65rem',
                        fontWeight: 500,
                        transition: 'color 0.25s ease',
                      }}
                      className="service-title-text"
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.925rem',
                        lineHeight: 1.65,
                        color: isActive ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.65)',
                        maxWidth: '540px',
                        transition: 'color 0.25s ease',
                      }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'center' }}>
                    <div
                      style={{
                        color: isActive ? 'var(--bronze-hi)' : 'rgba(255, 255, 255, 0.45)',
                        transform: isActive ? 'translateX(6px)' : 'none',
                        transition: 'transform 0.25s ease, color 0.25s ease',
                      }}
                      className="service-row-arrow"
                    >
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .service-editorial-row:hover {
          background-color: rgba(255, 255, 255, 0.035);
          padding-left: 0.75rem !important;
        }
        .service-editorial-row:hover .service-title-text {
          color: var(--bronze-hi) !important;
        }
        .service-editorial-row:hover .service-row-arrow {
          transform: translateX(6px);
          color: var(--bronze-hi) !important;
        }
        @media (max-width: 900px) {
          .services-header-split {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .services-content-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
};
