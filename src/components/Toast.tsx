import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 120,
            maxWidth: '420px',
            backgroundColor: '#16191C',
            border: '1px solid rgba(197, 168, 128, 0.45)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <CheckCircle2 size={20} color="var(--color-bronze)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
          <div style={{ flexGrow: 1 }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-bronze)', display: 'block', marginBottom: '0.25rem' }}>
              TRANSMISSION RECEIVED
            </span>
            <p style={{ fontSize: '0.85rem', color: '#F5F5F7', lineHeight: 1.5 }}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Dismiss message"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
