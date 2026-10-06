import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenisInstance, scrollToTarget } from './utils/scroll';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { SelectedProperties } from './components/SelectedProperties';
import { PropertyDetails } from './components/PropertyDetails';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { IntroLoader } from './components/IntroLoader';
import { ScrollProgress } from './components/ScrollProgress';
import { BackToTop } from './components/BackToTop';
import { AdminApp } from './admin/AdminApp';
import { propertyService } from './admin/services/propertyService';
import type { AdminProperty } from './admin/types';

type AppRoute =
  | { type: 'admin' }
  | { type: 'property-details'; propertyId: string }
  | { type: 'public' };

function parseCurrentAppRoute(): AppRoute {
  if (typeof window === 'undefined') return { type: 'public' };
  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // Admin Portal Route Check
  if (pathname.includes('/admin') || hash.startsWith('#/admin') || hash.startsWith('#admin')) {
    return { type: 'admin' };
  }

  // Full-page property details route only if pathname explicitly matches
  const propMatch = pathname.match(/properties\/([a-zA-Z0-9_-]+)/i);
  if (propMatch && propMatch[1]) {
    return { type: 'property-details', propertyId: propMatch[1] };
  }

  return { type: 'public' };
}

export function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(parseCurrentAppRoute);
  const [modalProperty, setModalProperty] = useState<AdminProperty | null>(null);

  // Monitor URL changes (popstate & hashchange)
  useEffect(() => {
    const handleRouteCheck = () => {
      setCurrentRoute(parseCurrentAppRoute());
    };

    window.addEventListener('popstate', handleRouteCheck);
    window.addEventListener('hashchange', handleRouteCheck);
    return () => {
      window.removeEventListener('popstate', handleRouteCheck);
      window.removeEventListener('hashchange', handleRouteCheck);
    };
  }, []);

  // Sync URL hash with property popup modal on public view (#SS-MYS-02)
  useEffect(() => {
    if (currentRoute.type !== 'public') return;

    const syncHashToModal = async () => {
      if (typeof window === 'undefined') return;
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!rawHash) {
        setModalProperty(null);
        return;
      }

      const sectionAnchors = ['properties', 'about', 'services', 'contact', 'reviews', 'faq', 'top', 'admin'];
      if (sectionAnchors.includes(rawHash.toLowerCase())) {
        setModalProperty(null);
        return;
      }

      let code = rawHash;
      if (code.startsWith('properties/')) {
        code = code.replace('properties/', '');
      }

      const prop = await propertyService.getPropertyById(code);
      if (prop) {
        setModalProperty(prop);
      }
    };

    syncHashToModal();
    window.addEventListener('hashchange', syncHashToModal);
    window.addEventListener('popstate', syncHashToModal);
    return () => {
      window.removeEventListener('hashchange', syncHashToModal);
      window.removeEventListener('popstate', syncHashToModal);
    };
  }, [currentRoute.type]);

  // Initialize Lenis Smooth Inertia Momentum Scroll only on public & details views
  useEffect(() => {
    if (currentRoute.type === 'admin') return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [currentRoute.type]);

  // Card click: opens the Property Details popup modal and updates URL hash
  const handleSelectProperty = useCallback(async (propertyId: string) => {
    const prop = await propertyService.getPropertyById(propertyId);
    if (prop) {
      setModalProperty(prop);
      const code = prop.propertyId || prop.id;
      if (window.location.hash !== `#${code}`) {
        try {
          window.history.pushState(null, '', `#${code}`);
        } catch {
          window.location.hash = `#${code}`;
        }
      }
    }
  }, []);

  // Close modal: clears popup state and removes hash without page reload
  const handleCloseModal = useCallback(() => {
    setModalProperty(null);
    const currentHash = window.location.hash.toLowerCase();
    const sectionAnchors = ['#properties', '#about', '#services', '#contact', '#reviews', '#faq', '#top', '#admin'];
    if (currentHash && !sectionAnchors.includes(currentHash)) {
      try {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      } catch {
        window.location.hash = '';
      }
    }
  }, []);

  const handleBackToProperties = useCallback(() => {
    const basePath = import.meta.env.BASE_URL || '/';
    const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
    try {
      window.history.pushState({}, '', `${cleanBase}/#properties`);
    } catch {
      // ignore
    }
    window.location.hash = '#properties';
    setCurrentRoute({ type: 'public' });
    setTimeout(() => {
      scrollToTarget('#properties', { offset: -40, duration: 1.0 });
    }, 100);
  }, []);

  const handleEnquireProperty = useCallback((prop: AdminProperty) => {
    const basePath = import.meta.env.BASE_URL || '/';
    const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
    try {
      window.history.pushState({}, '', `${cleanBase}/#contact`);
    } catch {
      // ignore
    }
    window.location.hash = '#contact';
    setCurrentRoute({ type: 'public' });
    setTimeout(() => {
      scrollToTarget('#contact', { offset: -40, duration: 1.0 });
      setToastMessage(`Inquiry initiated for ${prop.title} (${prop.propertyId})`);
    }, 120);
  }, []);

  // 1. Admin Portal
  if (currentRoute.type === 'admin') {
    return <AdminApp />;
  }

  // 2. Dedicated Property Details View
  if (currentRoute.type === 'property-details') {
    return (
      <div style={{ backgroundColor: 'var(--ink, #090D0B)', minHeight: '100vh', position: 'relative' }}>
        <Header />
        <main style={{ paddingTop: '75px' }}>
          <PropertyDetails
            propertyId={currentRoute.propertyId}
            onBack={handleBackToProperties}
            onEnquire={handleEnquireProperty}
          />
        </main>
        <Footer />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        <BackToTop />
      </div>
    );
  }

  // 3. Main Public Website
  return (
    <div style={{ backgroundColor: 'var(--ink)', minHeight: '100vh', position: 'relative' }}>
      {/* Luxury Hairline Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Luxury Opening Reveal Animation */}
      <IntroLoader />

      {/* Header & Navigation */}
      <Header />

      <main>
        {/* Hero */}
        <Hero />

        {/* About: The iGrey Advantage */}
        <About />

        {/* Services: Interactive Animated Image Switching */}
        <Services />

        {/* Properties: Curated Architectural Portfolio */}
        <SelectedProperties onSelectProperty={handleSelectProperty} />

        {/* Reviews & Accolades: Institutional Accolades & Trusted Relationships */}
        <Reviews />

        {/* 9. FAQ */}
        <FAQ />

        {/* 10. Contact / Enquiry */}
        <Contact />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Action Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Floating Minimal Luxury Back to Top Button */}
      <BackToTop />

      {/* Property Details Popup Modal (syncs with URL hash #SS-MYS-02) */}
      <PropertyDetailsModal
        isOpen={Boolean(modalProperty)}
        property={modalProperty}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
