import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { FeaturedProperties } from './sections/FeaturedProperties';
import { Difference } from './sections/Difference';
import { WhyChooseUs } from './sections/WhyChooseUs';
import { StorytellingBanner } from './sections/StorytellingBanner';
import { Testimonials } from './sections/Testimonials';
import { Partners } from './sections/Partners';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { PropertyModal } from './components/PropertyModal';
import { Toast } from './components/Toast';
import { IntroLoader } from './components/IntroLoader';
import { propertiesData } from './data/properties';
import type { Property } from './types';

export function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [prefilledServiceOrProperty, setPrefilledServiceOrProperty] = useState<string>('Luxury Residential Acquisition');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  const scrollToContact = (context?: string) => {
    if (context) {
      setPrefilledServiceOrProperty(context);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProperties = () => {
    const propSection = document.getElementById('properties');
    if (propSection) {
      propSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    scrollToContact(`Inquiry regarding: ${serviceTitle}`);
  };

  const handleEnquireProperty = (prop: Property) => {
    setSelectedProperty(null);
    scrollToContact(`${prop.name} (${prop.price})`);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', position: 'relative' }}>
      {/* Luxury Opening Reveal Animation */}
      <IntroLoader />

      {/* Sticky High-End Navigation */}
      <Navbar onEnquireClick={() => scrollToContact()} />

      <main>
        {/* Cinematic Architectural Hero */}
        <Hero
          onExploreClick={scrollToProperties}
          onExpertClick={() => scrollToContact('Private Consultation with an Expert')}
        />

        {/* Editorial Split About Section (Warm White / Ivory) */}
        <About onDiscoverStory={() => scrollToContact('Private Portfolio & Brand Dossier')} />

        {/* Numbered Editorial Services Grid */}
        <Services onSelectService={handleSelectService} />

        {/* Asymmetric Selected Properties Showcase */}
        <FeaturedProperties
          properties={propertiesData}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onViewAllClick={() => scrollToContact('Full Global Property Catalogue Request')}
        />

        {/* The iGrey Difference */}
        <Difference />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Large Cinematic Breathing Banner */}
        <StorytellingBanner onExploreClick={scrollToProperties} />

        {/* Refined Testimonials Slider */}
        <Testimonials />

        {/* Monochrome Trusted Relationships */}
        <Partners />

        {/* Minimal Numbered FAQ Accordion */}
        <FAQ />

        {/* Dramatic Final Split Contact & Enquiry */}
        <Contact
          prefilledProperty={prefilledServiceOrProperty}
          onSuccessNotification={showToast}
        />
      </main>

      {/* Sophisticated Architectural Footer */}
      <Footer />

      {/* Property Experience Catalogue Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onEnquire={handleEnquireProperty}
      />

      {/* Action Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
