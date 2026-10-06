import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Delete Listing',
  isDeleting = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 10, 8, 0.78)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: '#10221D',
          border: '1px solid rgba(224, 122, 111, 0.45)',
          borderRadius: '12px',
          padding: '28px',
          maxWidth: '460px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#8F9E98',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(224, 122, 111, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e07a6f',
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '22px',
                color: '#F4F0E7',
                fontWeight: 500,
                margin: 0,
              }}
            >
              {title}
            </h3>
            <span style={{ fontSize: '12px', color: '#8F9E98' }}>Destructive Action</span>
          </div>
        </div>

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
            fontSize: '13.5px',
            lineHeight: 1.6,
            color: '#DCD7CB',
            marginBottom: '24px',
          }}
        >
          {message}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            style={{
              padding: '9px 18px',
              backgroundColor: 'transparent',
              border: '0.5px solid rgba(198, 166, 106, 0.3)',
              borderRadius: '6px',
              color: '#DCD7CB',
              fontSize: '13px',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            style={{
              padding: '9px 20px',
              backgroundColor: '#e07a6f',
              border: 'none',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isDeleting ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
