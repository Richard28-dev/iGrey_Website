import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminRouter } from '../router/AdminRouter';

export const AdminLogin: React.FC = () => {
  const { login, requestPasswordReset } = useAdminAuth();
  const { navigate, goToPublicSite } = useAdminRouter();

  const [email, setEmail] = useState('admin@igreyholdings.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await login(email, password, rememberMe);
      if (res.success) {
        navigate('dashboard');
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(null);
    const res = await requestPasswordReset(resetEmail || email);
    setResetMessage(res.message);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#090D0B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Subtle Luxury Architectural Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(198, 166, 106, 0.06) 0%, rgba(9, 13, 11, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Login Card */}
      <div
        style={{
          maxWidth: '440px',
          width: '100%',
          backgroundColor: '#0E1B17',
          border: '1px solid rgba(198, 166, 106, 0.28)',
          borderRadius: '14px',
          padding: '40px 36px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              backgroundColor: 'rgba(198, 166, 106, 0.15)',
              border: '1.5px solid #c9a77c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c9a77c',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: '24px',
              margin: '0 auto 16px auto',
            }}
          >
            iG
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '28px',
              color: '#F4F0E7',
              margin: '0 0 6px 0',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            iGREY HOLDINGS
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#c9a77c',
              fontWeight: 600,
              margin: 0,
            }}
          >
            Admin Management Portal
          </p>
        </div>

        {/* Prototype Demo Banner */}
        <div
          style={{
            backgroundColor: 'rgba(198, 166, 106, 0.08)',
            border: '0.5px solid rgba(198, 166, 106, 0.25)',
            borderRadius: '6px',
            padding: '10px 12px',
            marginBottom: '24px',
            fontSize: '12px',
            color: '#DCD7CB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="#c9a77c" style={{ flexShrink: 0 }} />
            <span>
              <strong>Demo Login:</strong> admin@igreyholdings.com / admin123
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail('admin@igreyholdings.com');
              setPassword('admin123');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#c9a77c',
              fontSize: '11px',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Fill
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              backgroundColor: 'rgba(224, 122, 111, 0.12)',
              border: '1px solid rgba(224, 122, 111, 0.4)',
              borderRadius: '6px',
              padding: '10px 14px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#e07a6f',
              fontSize: '12.5px',
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Address */}
          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                fontSize: '12.5px',
                color: '#DCD7CB',
                marginBottom: '6px',
                fontWeight: 500,
              }}
            >
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                color="#c9a77c"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@igreyholdings.com"
                style={{
                  width: '100%',
                  backgroundColor: '#090D0B',
                  border: '0.5px solid rgba(198, 166, 106, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 14px 12px 42px',
                  color: '#F4F0E7',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label
                style={{
                  fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                  fontSize: '12.5px',
                  color: '#DCD7CB',
                  fontWeight: 500,
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#c9a77c',
                  fontSize: '12px',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Forgot password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                color="#c9a77c"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: '100%',
                  backgroundColor: '#090D0B',
                  border: '0.5px solid rgba(198, 166, 106, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 42px 12px 42px',
                  color: '#F4F0E7',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#8F9E98',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '26px' }}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: '#c9a77c', cursor: 'pointer' }}
            />
            <label htmlFor="rememberMe" style={{ fontSize: '12.5px', color: '#DCD7CB', cursor: 'pointer' }}>
              Remember this device for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#c9a77c',
              border: 'none',
              borderRadius: '8px',
              color: '#090D0B',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color 200ms ease',
            }}
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Back to Public Site */}
        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(198, 166, 106, 0.15)' }}>
          <button
            type="button"
            onClick={goToPublicSite}
            style={{
              background: 'none',
              border: 'none',
              color: '#8F9E98',
              fontSize: '12.5px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            ← Return to Public Website
          </button>
        </div>
      </div>

      {/* Forgot Password Flow Modal */}
      {showForgotModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 10, 8, 0.85)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowForgotModal(false)}
        >
          <div
            style={{
              backgroundColor: '#0E1B17',
              border: '1px solid rgba(198, 166, 106, 0.35)',
              borderRadius: '12px',
              padding: '28px',
              maxWidth: '420px',
              width: '100%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#F4F0E7', margin: '0 0 8px 0' }}>
              Reset Admin Password
            </h3>
            <p style={{ fontSize: '13px', color: '#8F9E98', lineHeight: 1.5, marginBottom: '18px' }}>
              Enter your registered administration email address to receive reset instructions.
            </p>

            {resetMessage ? (
              <div>
                <div
                  style={{
                    backgroundColor: 'rgba(46, 204, 113, 0.12)',
                    border: '1px solid rgba(46, 204, 113, 0.3)',
                    borderRadius: '6px',
                    padding: '12px',
                    color: '#2ecc71',
                    fontSize: '12.5px',
                    marginBottom: '18px',
                    lineHeight: 1.5,
                  }}
                >
                  <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  {resetMessage}
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#c9a77c',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#090D0B',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword}>
                <input
                  type="email"
                  required
                  placeholder="admin@igreyholdings.com"
                  value={resetEmail || email}
                  onChange={(e) => setResetEmail(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#090D0B',
                    border: '0.5px solid rgba(198, 166, 106, 0.3)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#F4F0E7',
                    fontSize: '13.5px',
                    outline: 'none',
                    marginBottom: '18px',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      border: '0.5px solid rgba(198, 166, 106, 0.3)',
                      borderRadius: '6px',
                      color: '#DCD7CB',
                      cursor: 'pointer',
                      fontSize: '13px',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '8px 18px',
                      backgroundColor: '#c9a77c',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#090D0B',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '13px',
                    }}
                  >
                    Send Instructions
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
