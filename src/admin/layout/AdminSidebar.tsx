import React from 'react';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Inbox,
  Star,
  Users,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAdminRouter, type AdminRoute } from '../router/AdminRouter';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { currentRoute, navigate, goToPublicSite } = useAdminRouter();
  const { user, logout } = useAdminAuth();

  const navItems: { label: string; route: AdminRoute; icon: React.ElementType; badge?: string }[] = [
    { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
    { label: 'Properties', route: 'properties', icon: Building2 },
    { label: 'Add New Property', route: 'property-new', icon: PlusCircle },
    { label: 'Enquiries', route: 'enquiries', icon: Inbox },
    { label: 'Reviews', route: 'reviews', icon: Star },
    { label: 'Users', route: 'users', icon: Users },
    { label: 'Media Library', route: 'media', icon: ImageIcon },
    { label: 'Settings', route: 'settings', icon: Settings },
  ];

  const handleNav = (route: AdminRoute) => {
    navigate(route);
    if (isMobileOpen) onCloseMobile();
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of the Admin Dashboard?')) {
      logout();
      navigate('login');
      if (isMobileOpen) onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 10, 8, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 990,
          }}
          className="admin-sidebar-mobile-backdrop"
        />
      )}

      {/* Sidebar Container */}
      <aside
        style={{
          width: isCollapsed ? '78px' : '260px',
          backgroundColor: '#0E1B17',
          borderRight: '1px solid rgba(198, 166, 106, 0.18)',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 995,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 260ms cubic-bezier(0.16, 1, 0.3, 1), transform 260ms ease',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.35)',
        }}
        className={`admin-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: isCollapsed ? '20px 14px' : '22px 20px',
            borderBottom: '1px solid rgba(198, 166, 106, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            height: '74px',
            boxSizing: 'border-box',
          }}
        >
          {!isCollapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(198, 166, 106, 0.18)',
                  border: '1px solid #c9a77c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#c9a77c',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700,
                  fontSize: '18px',
                  flexShrink: 0,
                }}
              >
                iG
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#F4F0E7',
                    lineHeight: 1.1,
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  iGREY HOLDINGS
                </span>
                <span
                  style={{
                    fontSize: '9.5px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#c9a77c',
                    fontWeight: 600,
                  }}
                >
                  ADMIN CONSOLE
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: 'rgba(198, 166, 106, 0.18)',
                border: '1px solid #c9a77c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c9a77c',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700,
                fontSize: '18px',
              }}
            >
              iG
            </div>
          )}

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="admin-mobile-close-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#8F9E98',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <div style={{ flexGrow: 1, padding: '16px 10px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentRoute === item.route ||
                (item.route === 'properties' && currentRoute === 'property-edit');

              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNav(item.route)}
                  title={isCollapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: isCollapsed ? '11px 0' : '11px 14px',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'rgba(198, 166, 106, 0.14)' : 'transparent',
                    border: isActive
                      ? '1px solid rgba(198, 166, 106, 0.35)'
                      : '1px solid transparent',
                    color: isActive ? '#c9a77c' : '#DCD7CB',
                    fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                    fontSize: '13.5px',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'all 180ms ease',
                    boxSizing: 'border-box',
                  }}
                  className="admin-nav-item"
                >
                  <Icon size={18} color={isActive ? '#c9a77c' : '#8F9E98'} style={{ flexShrink: 0 }} />
                  {!isCollapsed && (
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick link to public site */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(198, 166, 106, 0.12)' }}>
            <button
              type="button"
              onClick={goToPublicSite}
              title={isCollapsed ? 'View Website' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: isCollapsed ? '10px 0' : '10px 14px',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                borderRadius: '8px',
                backgroundColor: 'rgba(11, 23, 20, 0.6)',
                border: '1px dashed rgba(198, 166, 106, 0.25)',
                color: '#8F9E98',
                fontSize: '12.5px',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 180ms ease',
              }}
              className="admin-view-site-link"
            >
              <ExternalLink size={16} color="#c9a77c" style={{ flexShrink: 0 }} />
              {!isCollapsed && <span>View Public Site</span>}
            </button>
          </div>
        </div>

        {/* Bottom Profile & Collapse Section */}
        <div
          style={{
            padding: isCollapsed ? '14px 8px' : '14px 16px',
            borderTop: '1px solid rgba(198, 166, 106, 0.15)',
            backgroundColor: '#0B1714',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Admin User Chip */}
          {!isCollapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(198, 166, 106, 0.2)',
                    border: '1px solid rgba(198, 166, 106, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#c9a77c',
                    fontWeight: 600,
                    fontSize: '13px',
                    flexShrink: 0,
                  }}
                >
                  RR
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#F4F0E7',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {user?.name || 'Administrator'}
                  </span>
                  <span style={{ fontSize: '11px', color: '#c9a77c' }}>
                    {user?.role || 'Super Admin'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e07a6f',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '4px',
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(198, 166, 106, 0.2)',
                  border: '1px solid rgba(198, 166, 106, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#c9a77c',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
                title={user?.name || 'Administrator'}
              >
                RR
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e07a6f',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="admin-collapse-toggle-btn"
            style={{
              width: '100%',
              padding: '6px 0',
              backgroundColor: 'rgba(198, 166, 106, 0.08)',
              border: '0.5px solid rgba(198, 166, 106, 0.2)',
              borderRadius: '6px',
              color: '#DCD7CB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '12px',
            }}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>
      </aside>
    </>
  );
};
