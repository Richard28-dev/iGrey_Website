import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoWhite from '../assets/logo-white.png';

interface IntroLoaderProps {
  onComplete?: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2.2 seconds duration for the luxury cinematic opening sequence
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#0C0D0E',
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
                'radial-gradient(circle at center, rgba(197, 168, 128, 0.08) 0%, rgba(12, 13, 14, 0) 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Architectural Framing Gridlines */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              bottom: '10%',
              left: '15%',
              width: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '10%',
              bottom: '10%',
              right: '15%',
              width: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
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
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
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
                  height: 'clamp(44px, 5.5vw, 68px)',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.5))',
                }}
              />
            </motion.div>

            {/* Expanding Hairline Divider */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '160px', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, var(--color-bronze) 50%, transparent 100%)',
                marginBottom: '1.25rem',
              }}
            />

            {/* Micro Tagline Reveal */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.12em', y: 8 }}
              animate={{ opacity: 0.85, letterSpacing: '0.28em', y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                color: 'var(--color-bronze-light)',
                textTransform: 'uppercase',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              Architectural Real Estate &amp; Advisory
            </motion.div>
          </div>

          {/* Bottom Loading Progress Pulse */}
          <div
            style={{
              position: 'absolute',
              bottom: '3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60px' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              style={{
                height: '1px',
                backgroundColor: 'rgba(197, 168, 128, 0.6)',
              }}
            />
            <span
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                color: 'rgba(255, 255, 255, 0.3)',
                textTransform: 'uppercase',
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
