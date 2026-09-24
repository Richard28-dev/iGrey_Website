import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface StorytellingBannerProps {
  onExploreClick: () => void;
}

export const StorytellingBanner: React.FC<StorytellingBannerProps> = ({ onExploreClick }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={bannerRef}
      style={{
        position: 'relative',
        height: '75vh',
        minHeight: '520px',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0C0D0E',
      }}
    >
      {/* Slow Parallax Architectural Background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-15%',
          y,
          scale,
          zIndex: 1,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2600&q=88"
          alt="Luxury Architectural Atmosphere"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.65) contrast(1.1)',
          }}
        />
        {/* Cinematic Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at center, rgba(12,13,14,0.3) 0%, rgba(12,13,14,0.85) 100%)',
          }}
        />
      </motion.div>

      {/* Atmospheric Typography Overlay */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <span className="micro-label" style={{ color: 'var(--color-bronze-light)' }}>
            ARCHITECTURAL VISION
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)',
            color: '#FFFFFF',
            lineHeight: 1.15,
            fontWeight: 300,
            maxWidth: '900px',
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em',
          }}
        >
          Spaces That Inspire.<br />
          <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--color-sand)' }}>
            Places That Belong.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button
            onClick={onExploreClick}
            className="btn-primary"
            style={{
              backgroundColor: 'transparent',
              borderColor: 'var(--color-bronze-light)',
              color: 'var(--color-bronze-light)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bronze-light)';
              e.currentTarget.style.color = '#0C0D0E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-bronze-light)';
            }}
          >
            Explore Our Properties
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
