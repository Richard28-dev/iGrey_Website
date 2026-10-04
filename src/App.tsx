import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenisInstance } from './utils/scroll';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { SelectedProperties } from './components/SelectedProperties';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { IntroLoader } from './components/IntroLoader';
import { ScrollProgress } from './components/ScrollProgress';
import { BackToTop } from './components/BackToTop';

export function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Lenis Smooth Inertia Momentum Scroll
  useEffect(() => {
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
  }, []);

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
        <SelectedProperties />

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
    </div>
  );
}

export default App;
