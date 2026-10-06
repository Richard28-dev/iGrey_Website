import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Plus,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAdminRouter } from '../router/AdminRouter';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminTopNavProps {
  onOpenMobileMenu: () => void;
  isSidebarCollapsed?: boolean;
}

export const AdminTopNav: React.FC<AdminTopNavProps> = ({
  onOpenMobileMenu,
}) => {
  const { currentRoute, navigate } = useAdminRouter();
  const { user } = useAdminAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getPageInfo = () => {
    switch (currentRoute) {
      case 'dashboard':
        return { title: 'Dashboard Overview', breadcrumb: 'Portfolio Insights' };
      case 'properties':
        return { title: 'Property Management', breadcrumb: 'Listings Directory' };
      case 'property-new':
        return { title: 'Add New Property', breadcrumb: 'Listings / Onboarding' };
      case 'property-edit':
        return { title: 'Edit Property Listing', breadcrumb: 'Listings / Update' };
      case 'enquiries':
        return { title: 'Enquiries & Advisory Leads', breadcrumb: 'Client Relations' };
      case 'reviews':
        return { title: 'Client Reviews & Accolades', breadcrumb: 'Reputation Management' };
      case 'users':
        return { title: 'Admin Team & Roles', breadcrumb: 'Permissions' };
      case 'media':
        return { title: 'Media & Asset Library', breadcrumb: 'High-Res Assets' };
      case 'settings':
        return { title: 'Platform Settings', breadcrumb: 'Configuration' };
      default:
        return { title: 'Admin Console', breadcrumb: 'Overview' };
    }
  };

  const info = getPageInfo();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('properties');
    }
  };

  return (
    <header
      style={{
        height: '74px',
        backgroundColor: '#0E1B17',
        borderBottom: '1px solid rgba(198, 166, 106, 0.18)',
        position: 'sticky',
        top: 0,
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
      }}
      className="admin-top-nav"
    >
      {/* Left: Mobile hamburger + Page Title & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="admin-mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#c9a77c',
            cursor: 'pointer',
            padding: '4px',
          }}
          aria-label="Open Navigation"
        >
          <Menu size={22} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#8F9E98' }}>
            <span>Admin</span>
            <ChevronRight size={10} color="#c9a77c" />
            <span style={{ color: '#c9a77c', fontWeight: 500 }}>{info.breadcrumb}</span>
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '22px',
              color: '#F4F0E7',
              fontWeight: 500,
              margin: '2px 0 0 0',
              lineHeight: 1.2,
            }}
          >
            {info.title}
          </h1>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div style={{ flex: '1', maxWidth: '380px', margin: '0 20px' }} className="admin-topnav-search-container">
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '100%' }}>
          <Search
            size={15}
            color="#8F9E98"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search properties, leads, IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#090D0B',
              border: '0.5px solid rgba(198, 166, 106, 0.25)',
              borderRadius: '20px',
              padding: '8px 14px 8px 36px',
              fontSize: '12.5px',
              color: '#F4F0E7',
              outline: 'none',
              fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
              transition: 'border-color 200ms ease',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a77c')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(198, 166, 106, 0.25)')}
          />
        </form>
      </div>

      {/* Right Actions: Notifications, "+ Add Property", Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* "+ Add New Property" Button */}
        {currentRoute !== 'property-new' && (
          <button
            type="button"
            onClick={() => navigate('property-new')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: '#c9a77c',
              border: 'none',
              borderRadius: '6px',
              color: '#090D0B',
              fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms ease',
              whiteSpace: 'nowrap',
            }}
            className="admin-add-prop-btn"
          >
            <Plus size={16} />
            <span>Add Property</span>
          </button>
        )}

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: 'rgba(198, 166, 106, 0.1)',
              border: '0.5px solid rgba(198, 166, 106, 0.25)',
              color: '#DCD7CB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <Bell size={17} />
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#c9a77c',
              }}
            />
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '46px',
                width: '320px',
                backgroundColor: '#0E1B17',
                border: '1px solid rgba(198, 166, 106, 0.3)',
                borderRadius: '10px',
                boxShadow: '0 14px 40px rgba(0, 0, 0, 0.7)',
                zIndex: 1000,
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#F4F0E7' }}>System Notifications</span>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  style={{ background: 'none', border: 'none', color: '#8F9E98', cursor: 'pointer' }}
                >
                  <X size={15} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div
                  style={{
                    padding: '10px',
                    backgroundColor: 'rgba(198, 166, 106, 0.08)',
                    borderRadius: '6px',
                    borderLeft: '3px solid #c9a77c',
                    fontSize: '12px',
                    color: '#DCD7CB',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#F4F0E7', marginBottom: '2px' }}>New High-Intent Enquiry</div>
                  Vikramaditya Singhania requested executive viewing for Gokulam estate.
                </div>

                <div
                  style={{
                    padding: '10px',
                    backgroundColor: 'rgba(46, 204, 113, 0.08)',
                    borderRadius: '6px',
                    borderLeft: '3px solid #2ecc71',
                    fontSize: '12px',
                    color: '#DCD7CB',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#2ecc71', marginBottom: '2px' }}>Listing Sync Active</div>
                  Local prototype property store successfully synced with public website.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div
          onClick={() => navigate('users')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '20px',
          }}
          title="Account Profile"
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(198, 166, 106, 0.2)',
              border: '1.5px solid #c9a77c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c9a77c',
              fontWeight: 700,
              fontSize: '13px',
            }}
            title={user ? `${user.name} (${user.role})` : 'Account Profile'}
          >
            {user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'AD'}
          </div>
        </div>
      </div>
    </header>
  );
};
