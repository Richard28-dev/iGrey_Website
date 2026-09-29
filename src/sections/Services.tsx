import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/services';
import { ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section
      id="services"
      style={{
        backgroundColor: '#F7F5F0',
        color: '#111827',
        padding: '120px 0',
        position: 'relative',
        borderTop: '1px solid #E8E4DC',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '4.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#A67C38',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              WHAT WE DO
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)',
              lineHeight: 1.15,
              fontWeight: 350,
              color: '#111827',
              letterSpacing: '-0.01em',
              marginBottom: '1rem',
            }}
          >
            Comprehensive Real Estate Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: '#4B5563',
              maxWidth: '680px',
              fontWeight: 400,
            }}
          >
            From quiet acquisitions to generational development and private advisory, our multidisciplinary practice ensures every property movement is executed with precision.
          </motion.p>
        </div>

        {/* Dynamic Dual-Column Interactive Editorial Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.95fr)',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="services-grid"
        >
          {/* Left: Numbered Editorial Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {servicesData.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={service.number}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => onSelectService(service.title)}
                  style={{
                    position: 'relative',
                    padding: '1.75rem 1.5rem',
                    borderRadius: isActive ? '12px' : '0px',
                    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                    boxShadow: isActive ? '0 6px 20px rgba(0, 0, 0, 0.04)' : 'none',
                    borderBottom: isActive ? '1px solid transparent' : '1px solid #E5E0D5',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* Gold active vertical bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceBar"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '15%',
                        bottom: '15%',
                        width: '3px',
                        backgroundColor: '#B38E46',
                        borderRadius: '0 2px 2px 0',
                      }}
                    />
                  )}

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.75rem' }}>
                      {/* Number with shift on hover */}
                      <motion.span
                        animate={{
                          x: isActive ? 4 : 0,
                          color: isActive ? '#B38E46' : '#9CA3AF',
                        }}
                        transition={{ duration: 0.25 }}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          minWidth: '2.5rem',
                          paddingTop: '0.35rem',
                        }}
                      >
                        {service.number}
                      </motion.span>

                      {/* Service Details */}
                      <div>
                        <motion.h3
                          animate={{ x: isActive ? 4 : 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)',
                            fontWeight: 400,
                            color: isActive ? '#111827' : '#374151',
                            marginBottom: '0.45rem',
                          }}
                        >
                          {service.title}
                        </motion.h3>

                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.92rem',
                            lineHeight: 1.65,
                            color: isActive ? '#4B5563' : '#6B7280',
                            maxWidth: '560px',
                            fontWeight: 400,
                            transition: 'color 0.25s ease',
                          }}
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow action button */}
                    <div style={{ paddingTop: '0.5rem' }}>
                      <motion.div
                        animate={{
                          rotate: isActive ? 45 : 0,
                          scale: isActive ? 1.15 : 1,
                          color: isActive ? '#B38E46' : '#9CA3AF',
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <ArrowUpRight size={20} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Contextual Architectural Frame */}
          <div
            style={{
              position: 'sticky',
              top: '120px',
              display: 'flex',
              flexDirection: 'column',
            }}
            className="services-preview-panel"
          >
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                overflow: 'hidden',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.08)',
                backgroundColor: '#E5E7EB',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={servicesData[activeIdx].number}
                  src={servicesData[activeIdx].image}
                  alt={servicesData[activeIdx].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </AnimatePresence>

              {/* Dynamic Overlay Text */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(12,13,14,0.05) 0%, rgba(12,13,14,0.75) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#c9a468',
                    marginBottom: '0.4rem',
                    fontWeight: 600,
                  }}
                >
                  SERVICE {servicesData[activeIdx].number}
                </span>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', lineHeight: 1.3 }}>
                  "{servicesData[activeIdx].tagline}"
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                fontSize: '0.75rem',
                color: '#6B7280',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              <span>iGrey Methodology</span>
              <span>Discreet Execution</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .services-preview-panel {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
