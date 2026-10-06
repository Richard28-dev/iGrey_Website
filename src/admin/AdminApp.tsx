import React from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminRouterProvider, useAdminRouter } from './router/AdminRouter';
import { AdminLayout } from './layout/AdminLayout';
import { AdminLogin } from './pages/AdminLogin';
import { DashboardOverview } from './pages/DashboardOverview';
import { PropertiesManagement } from './pages/PropertiesManagement';
import { PropertyForm } from './pages/PropertyForm';
import { EnquiriesManagement } from './pages/EnquiriesManagement';
import { MediaLibrary } from './pages/MediaLibrary';
import { ReviewsManagement } from './pages/ReviewsManagement';
import { UsersManagement } from './pages/UsersManagement';
import { SettingsPage } from './pages/SettingsPage';

const AdminAppContent: React.FC = () => {
  const { currentRoute, params } = useAdminRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#090D0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c9a77c',
          fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
          fontSize: '14px',
        }}
      >
        Initializing iGrey Admin Console...
      </div>
    );
  }

  // If user requested login route, or is unauthenticated, show Login Screen
  if (currentRoute === 'login' || !isAuthenticated) {
    return <AdminLogin />;
  }

  // Authenticated Dashboard Views
  return (
    <AdminLayout>
      {currentRoute === 'dashboard' && <DashboardOverview />}
      {currentRoute === 'properties' && <PropertiesManagement />}
      {currentRoute === 'property-new' && <PropertyForm />}
      {currentRoute === 'property-edit' && <PropertyForm propertyIdToEdit={params.id} />}
      {currentRoute === 'enquiries' && <EnquiriesManagement />}
      {currentRoute === 'media' && <MediaLibrary />}
      {currentRoute === 'reviews' && <ReviewsManagement />}
      {currentRoute === 'users' && <UsersManagement />}
      {currentRoute === 'settings' && <SettingsPage />}
    </AdminLayout>
  );
};

export const AdminApp: React.FC = () => {
  return (
    <AdminAuthProvider>
      <AdminRouterProvider>
        <AdminAppContent />
      </AdminRouterProvider>
    </AdminAuthProvider>
  );
};

export default AdminApp;
