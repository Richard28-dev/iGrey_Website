/**
 * iGREY HOLDINGS — Admin Router
 * 
 * Provides robust client-side routing supporting both HTML5 pushState
 * and Hash routing for GitHub Pages compatibility.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AdminRoute =
  | 'dashboard'
  | 'properties'
  | 'property-new'
  | 'property-edit'
  | 'enquiries'
  | 'media'
  | 'reviews'
  | 'users'
  | 'settings'
  | 'login';

interface AdminRouterContextType {
  currentRoute: AdminRoute;
  params: Record<string, string>;
  navigate: (route: AdminRoute, params?: Record<string, string>) => void;
  goToPublicSite: () => void;
}

const AdminRouterContext = createContext<AdminRouterContextType | undefined>(undefined);

// Helper to parse current path or hash
function parseCurrentLocation(): { route: AdminRoute; params: Record<string, string> } {
  if (typeof window === 'undefined') return { route: 'dashboard', params: {} };

  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // Check login route first
  if (pathname.includes('/admin/login') || hash.includes('/admin/login') || hash.includes('#admin/login')) {
    return { route: 'login', params: {} };
  }

  // Check for specific sub-routes in hash or pathname
  const fullLoc = `${pathname}${hash}`;

  if (fullLoc.includes('property-new') || fullLoc.includes('/properties/new')) {
    return { route: 'property-new', params: {} };
  }

  const editMatch = fullLoc.match(/properties\/edit\/([a-zA-Z0-9_-]+)/);
  if (editMatch) {
    return { route: 'property-edit', params: { id: editMatch[1] } };
  }

  if (fullLoc.includes('/enquiries')) return { route: 'enquiries', params: {} };
  if (fullLoc.includes('/media')) return { route: 'media', params: {} };
  if (fullLoc.includes('/reviews')) return { route: 'reviews', params: {} };
  if (fullLoc.includes('/users')) return { route: 'users', params: {} };
  if (fullLoc.includes('/settings')) return { route: 'settings', params: {} };
  if (fullLoc.includes('/properties')) return { route: 'properties', params: {} };

  return { route: 'dashboard', params: {} };
}

export const AdminRouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routeState, setRouteState] = useState<{ route: AdminRoute; params: Record<string, string> }>(
    parseCurrentLocation()
  );

  useEffect(() => {
    const handlePopState = () => {
      setRouteState(parseCurrentLocation());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = useCallback((route: AdminRoute, params: Record<string, string> = {}) => {
    setRouteState({ route, params });

    // Sync browser URL cleanly with base path support
    const basePath = import.meta.env.BASE_URL || '/';
    const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

    let subPath = '/admin';
    if (route === 'login') subPath = '/admin/login';
    else if (route === 'properties') subPath = '/admin/properties';
    else if (route === 'property-new') subPath = '/admin/properties/new';
    else if (route === 'property-edit') subPath = `/admin/properties/edit/${params.id || ''}`;
    else if (route === 'enquiries') subPath = '/admin/enquiries';
    else if (route === 'media') subPath = '/admin/media';
    else if (route === 'reviews') subPath = '/admin/reviews';
    else if (route === 'users') subPath = '/admin/users';
    else if (route === 'settings') subPath = '/admin/settings';

    const isHashMode = window.location.hash.toLowerCase().includes('admin');
    if (isHashMode) {
      window.location.hash = `#${subPath}`;
    } else {
      try {
        const fullPath = `${cleanBase}${subPath}`;
        window.history.pushState({}, '', fullPath);
      } catch {
        window.location.hash = `#${subPath}`;
      }
    }
  }, []);

  const goToPublicSite = useCallback(() => {
    const basePath = import.meta.env.BASE_URL || '/';
    if (window.location.hash.toLowerCase().includes('admin')) {
      window.location.hash = '';
    }
    try {
      window.history.pushState({}, '', basePath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch {
      window.location.href = basePath;
    }
  }, []);

  return (
    <AdminRouterContext.Provider
      value={{
        currentRoute: routeState.route,
        params: routeState.params,
        navigate,
        goToPublicSite,
      }}
    >
      {children}
    </AdminRouterContext.Provider>
  );
};

export const useAdminRouter = () => {
  const ctx = useContext(AdminRouterContext);
  if (!ctx) throw new Error('useAdminRouter must be used within AdminRouterProvider');
  return ctx;
};
