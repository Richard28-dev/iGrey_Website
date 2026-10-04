import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoWhite from '../assets/logo-white.png';

interface IntroLoaderProps {
  onComplete?: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2.6 seconds duration for the luxury opening sequence
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 2600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#090D0B',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Radial Lighting */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at center, rgba(197, 168, 128, 0.16) 0%, rgba(9, 13, 11, 0) 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Center Brand Assembly */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 10,
              padding: '0 2rem',
            }}
          >
            {/* Animated Logo Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1.75rem',
              }}
            >
              <img
                src={logoWhite}
                alt="iGrey Holdings"
                style={{
                  height: 'clamp(52px, 6vw, 76px)',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.7))',
                }}
              />
            </motion.div>

            {/* Expanding Hairline Divider */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '190px', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, #C5A880 50%, transparent 100%)',
                marginBottom: '1.35rem',
              }}
            />

            {/* Clearly Visible Tagline Reveal with High-Contrast Luminous Ivory-Gold */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.14em', y: 8 }}
              animate={{ opacity: 1, letterSpacing: '0.22em', y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.82rem, 1.15vw, 0.95rem)',
                color: '#FAF4EC',
                textTransform: 'uppercase',
                fontWeight: 600,
                textAlign: 'center',
                letterSpacing: '0.22em',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)',
              }}
            >
              Architectural Real Estate &amp; Advisory
            </motion.div>
          </div>

          {/* Bottom Loading Progress Pulse - High Contrast and Legibility */}
          <div
            style={{
              position: 'absolute',
              bottom: '3.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.85rem',
              zIndex: 10,
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '90px' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
              style={{
                height: '2px',
                backgroundColor: '#C5A880',
                borderRadius: '1px',
                boxShadow: '0 0 14px rgba(197, 168, 128, 0.8)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.76rem',
                letterSpacing: '0.24em',
                color: '#E8D5B7',
                textTransform: 'uppercase',
                fontWeight: 600,
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)',
              }}
            >
              Entering Experience
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
