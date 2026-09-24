import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onExpertClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onExpertClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle scroll parallax
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 800], [1, 1.08]);
  const imageY = useTransform(scrollY, [0, 800], [0, 100]);
  const contentY = useTransform(scrollY, [0, 600], [0, -40]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Very gentle mouse parallax (max 12px shift)
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '5rem',
        paddingTop: '8rem',
        overflow: 'hidden',
        backgroundColor: '#0C0D0E',
      }}
    >
      {/* Background Architectural Canvas */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-20px',
          scale: imageScale,
          y: imageY,
          x: mouseOffset.x,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2600&q=88"
          alt="iGrey Holdings Luxury Architecture"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 45%',
            filter: 'brightness(0.72) contrast(1.08)',
          }}
        />

        {/* Sophisticated Dark Luxury Gradients */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(12,13,14,0.65) 0%, rgba(12,13,14,0.2) 35%, rgba(12,13,14,0.55) 70%, #0C0D0E 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 75% 30%, rgba(197, 168, 128, 0.08) 0%, rgba(12,13,14,0) 60%)',
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          y: contentY,
          opacity: contentOpacity,
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '880px' }}>
          {/* Main Display Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.75rem, 6.2vw, 5.25rem)',
              lineHeight: 1.05,
              fontWeight: 480,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '1.75rem',
            }}
          >
            Redefining the Way You Experience Real Estate.
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '640px',
              fontWeight: 480,
              marginBottom: '2.75rem',
            }}
          >
            Discover exceptional properties, trusted expertise and a more thoughtful approach to real estate.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <button onClick={onExploreClick} className="btn-primary">
              Explore Properties
              <ArrowUpRight size={16} />
            </button>
            <button onClick={onExpertClick} className="btn-secondary">
              Talk to an Expert
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Restrained Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
        }}
        onClick={() => {
          const aboutSection = document.getElementById('about');
          aboutSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
            fontWeight: 500,
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} color="var(--color-bronze)" />
        </motion.div>
      </motion.div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-property-badge {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};
