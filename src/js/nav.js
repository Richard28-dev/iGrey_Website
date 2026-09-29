/* ==========================================================================
   iGREY HOLDINGS — NAVIGATION CONTROLLER
   ========================================================================== */

import { gsap } from 'gsap';

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  if (!header) return;

  let lastScrollY = window.scrollY;
  const scrollThreshold = 100;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add frosted glass styling when scrolled past hero threshold
    if (currentScrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // Smart show / hide on scroll direction
    if (currentScrollY > scrollThreshold && currentScrollY > lastScrollY && !mobileDrawer?.classList.contains('is-open')) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  // Mobile drawer toggle
  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (isOpen) {
        gsap.fromTo(mobileLinks, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
        );
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
