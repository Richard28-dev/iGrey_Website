import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopNav } from './AdminTopNav';
import { Info, X } from 'lucide-react';
import { useAdminRouter } from '../router/AdminRouter';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPrototypeNotice, setShowPrototypeNotice] = useState(true);
  const { navigate } = useAdminRouter();

  return (
    <div
      style={{
        backgroundColor: '#0B1714',
        minHeight: '100vh',
        color: '#F4F0E7',
        fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
        display: 'flex',
      }}
      className="admin-dashboard-root"
    >
      {/* Fixed / Collapsible Left Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Page Area */}
      <div
        style={{
          marginLeft: isSidebarCollapsed ? '78px' : '260px',
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 260ms cubic-bezier(0.16, 1, 0.3, 1)',
          minWidth: 0,
        }}
        className="admin-main-wrapper"
      >
        {/* Sticky Top Navigation */}
        <AdminTopNav
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Prototype Notice Banner */}
        {showPrototypeNotice && (
          <div
            style={{
              backgroundColor: 'rgba(198, 166, 106, 0.1)',
              borderBottom: '1px solid rgba(198, 166, 106, 0.25)',
              padding: '10px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#DCD7CB',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={15} color="#c9a77c" style={{ flexShrink: 0 }} />
              <span>
                <strong>PROTOTYPE ARCHITECTURE:</strong> Operating in client-side prototype storage mode. Changes sync with the public website locally.{' '}
                <button
                  type="button"
                  onClick={() => navigate('settings')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#c9a77c',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '12px',
                    padding: 0,
                    fontWeight: 500,
                  }}
                >
                  View Backend Setup Guide (Supabase / Firebase / Node.js)
                </button>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowPrototypeNotice(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#8F9E98',
                cursor: 'pointer',
                padding: '2px',
              }}
              title="Dismiss Notice"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Dynamic Route Content */}
        <main
          style={{
            flexGrow: 1,
            padding: '28px 28px 48px 28px',
            maxWidth: '1440px',
            width: '100%',
            boxSizing: 'border-box',
          }}
          className="admin-content-container"
        >
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 260px !important;
          }
          .admin-sidebar.mobile-open {
            transform: translateX(0);
          }
          .admin-main-wrapper {
            margin-left: 0 !important;
          }
          .admin-mobile-menu-btn {
            display: block !important;
          }
          .admin-mobile-close-btn {
            display: block !important;
          }
          .admin-collapse-toggle-btn {
            display: none !important;
          }
          .admin-topnav-search-container {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .admin-content-container {
            padding: 18px 16px 36px 16px !important;
          }
          .admin-add-prop-btn span {
            display: none;
          }
          .admin-top-nav {
            padding: 0 16px !important;
          }
        }
        .admin-stat-card:hover {
          transform: translateY(-2px);
          border-color: rgba(198, 166, 106, 0.45) !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35) !important;
        }
        .admin-nav-item:hover {
          background-color: rgba(198, 166, 106, 0.1) !important;
          color: #F4F0E7 !important;
        }
        .admin-property-card:hover {
          transform: translateY(-3px);
          border-color: rgba(198, 166, 106, 0.45) !important;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4) !important;
        }
      `}</style>
    </div>
  );
};
