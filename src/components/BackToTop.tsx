import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollToTarget } from '../utils/scroll';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 550);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    scrollToTarget(0, { duration: 1.3 });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Scroll back to top"
          className="back-to-top-btn"
          style={{
            position: 'fixed',
            bottom: '2.25rem',
            right: '2.25rem',
            zIndex: 80,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(12, 13, 14, 0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(197, 168, 128, 0.35)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#E8D5B7',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#C5A880';
            e.currentTarget.style.color = '#0C0D0E';
            e.currentTarget.style.borderColor = '#DFC7A5';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(197, 168, 128, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(12, 13, 14, 0.88)';
            e.currentTarget.style.color = '#E8D5B7';
            e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.35)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.45)';
          }}
        >
          <ArrowUp size={18} strokeWidth={2} />
        </motion.button>
      )}

      <style>{`
        @media (max-width: 600px) {
          .back-to-top-btn {
            bottom: 1.25rem !important;
            right: 1.25rem !important;
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};
