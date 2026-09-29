/* ==========================================================================
   iGREY HOLDINGS — BESPOKE ARCHITECTURAL CURSOR
   ========================================================================== */

import { gsap } from 'gsap';

export function initCustomCursor() {
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouch) return;

  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant snap for small center dot
    gsap.set(dot, { x: mouseX, y: mouseY });
  }, { passive: true });

  // Smooth lag for outer trailing ring
  gsap.ticker.add(() => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  // Hover triggers for interactive elements
  const interactiveSelector = 'a, button, input, select, textarea, .nav-link, .advisory-row';
  document.querySelectorAll(interactiveSelector).forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // "View" contextual trigger for property cards
  document.querySelectorAll('.residence-card').forEach((card) => {
    card.addEventListener('mouseenter', () => document.body.classList.add('cursor-view'));
    card.addEventListener('mouseleave', () => document.body.classList.remove('cursor-view'));
  });
}
