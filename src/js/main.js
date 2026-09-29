/* ==========================================================================
   iGREY HOLDINGS — MASTER APPLICATION ENTRYPOINT
   ========================================================================== */

// Import Core CSS Bundle
import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/animations.css';

// Import Feature Modules
import { initSmoothScroll } from './scroll.js';
import { initCustomCursor } from './cursor.js';
import { initPreloader } from './preloader.js';
import { initNavigation } from './nav.js';
import { initScrollReveals } from './reveal.js';
import { initPropertiesGallery } from './properties.js';
import { initEnquiryForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Smooth Scrolling (Lenis)
  initSmoothScroll();

  // Initialize Custom Cursor
  initCustomCursor();

  // Initialize Navigation Controls
  initNavigation();

  // Initialize Form Handlers
  initEnquiryForm();

  // Initialize Properties Interactive Gallery
  initPropertiesGallery();

  // Run Preloader then initialize ScrollTrigger animations
  initPreloader(() => {
    initScrollReveals();
  });
});
