import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { luxuryThemes } from '../data/themes';
import type { LuxuryTheme } from '../data/themes';
import { Copy, Check, ChevronDown, ChevronUp, Code2, X } from 'lucide-react';

interface TemplateDirectorProps {
  currentTheme: LuxuryTheme;
  onSelectTheme: (theme: LuxuryTheme) => void;
}

export const TemplateDirector: React.FC<TemplateDirectorProps> = ({ currentTheme, onSelectTheme }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getExportCss = () => {
    return `:root {
  /* ${currentTheme.name} Palette (${currentTheme.locationVibe}) */
  --color-bg: ${currentTheme.colors.bg};
  --color-bg-alt: ${currentTheme.colors.bgAlt};
  --color-surface: ${currentTheme.colors.surface};
  --color-surface-elevated: ${currentTheme.colors.surfaceElevated};
  --color-text-primary: ${currentTheme.colors.textPrimary};
  --color-text-secondary: ${currentTheme.colors.textSecondary};
  --color-text-muted: ${currentTheme.colors.textMuted};
  --color-bronze: ${currentTheme.colors.accent};
  --color-bronze-light: ${currentTheme.colors.accentLight};
  --border-subtle: ${currentTheme.colors.borderSubtle};
  --border-bronze: ${currentTheme.colors.borderAccent};
}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportCss());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 110,
          backgroundColor: '#070809',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.55rem',
            paddingBottom: '0.55rem',
          }}
        >
          {/* Left: Indicator & Theme Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: currentTheme.colors.accent,
                boxShadow: `0 0 10px ${currentTheme.colors.accent}`,
              }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bronze-light)',
                  fontWeight: 600,
                }}
              >
                PALETTE DIRECTOR:
              </span>
              <span style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 500 }}>
                {currentTheme.name}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-text-muted)',
                  display: 'none',
                }}
                className="director-location"
              >
                ({currentTheme.locationVibe})
              </span>
            </div>
          </div>

          {/* Center: 4 Palette Preset Switchers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            {luxuryThemes.map((theme) => {
              const isActive = currentTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme)}
                  title={`${theme.name} — ${theme.tagline}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.35rem 0.65rem',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    border: isActive ? `1px solid ${theme.colors.accent}` : '1px solid rgba(255, 255, 255, 0.07)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Swatches preview dots */}
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        backgroundColor: theme.colors.bg,
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    />
                    <div
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        backgroundColor: theme.colors.accent,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.04em',
                      color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {theme.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Export Tokens Button & Collapse */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.65rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                color: 'var(--color-text-primary)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <Code2 size={13} />
              Tokens
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                padding: '0.2rem',
                display: 'flex',
                alignItems: 'center',
              }}
              title={collapsed ? 'Show theme details' : 'Hide theme details'}
            >
              {collapsed ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
            </button>
          </div>
        </div>

        {/* Expandable context banner */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{
                overflow: 'hidden',
                backgroundColor: '#0B0D0F',
                borderTop: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              <div
                className="container"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.45rem',
                  paddingBottom: '0.45rem',
                  fontSize: '0.76rem',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <span>
                  <strong>Atmosphere:</strong> {currentTheme.tagline}
                </span>
                <span style={{ color: currentTheme.colors.accentLight }}>
                  100% harmonious across all sections • Zero layout shift
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Export Tokens Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(10px)',
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '680px',
                backgroundColor: '#121416',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.75rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>
                    {currentTheme.name} Tokens
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-bronze)' }}>
                    Production-ready CSS Variables
                  </span>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Code display */}
              <div style={{ padding: '1.5rem 1.75rem' }}>
                <pre
                  style={{
                    backgroundColor: '#08090A',
                    padding: '1.25rem',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    color: '#C5A880',
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    lineHeight: 1.6,
                    overflowX: 'auto',
                  }}
                >
                  {getExportCss()}
                </pre>
              </div>

              {/* Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: '#0D0E10',
                }}
              >
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Click to copy tokens for your stylesheet
                </span>
                <button
                  onClick={handleCopy}
                  className="btn-primary"
                  style={{ padding: '0.55rem 1.25rem', fontSize: '0.78rem' }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied to Clipboard' : 'Copy CSS Variables'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          .director-location {
            display: inline !important;
          }
        }
      `}</style>
    </>
  );
};
