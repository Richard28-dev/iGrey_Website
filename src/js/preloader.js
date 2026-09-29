/* ==========================================================================
   iGREY HOLDINGS — PRELOADER (ARCHITECTURAL WIPE)
   ========================================================================== */

import { gsap } from 'gsap';

export function initPreloader(onCompleteCallback) {
  const preloader = document.querySelector('.preloader');
  const letters = document.querySelectorAll('.preloader-letter');
  const progressBar = document.querySelector('.preloader-progress-bar');
  if (!preloader) return;

  const tl = gsap.timeline({
    onComplete: () => {
      preloader.style.display = 'none';
      if (typeof onCompleteCallback === 'function') {
        onCompleteCallback();
      }
    }
  });

  // Stagger letter rise
  tl.to(letters, {
    y: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: 'power3.out',
    delay: 0.2
  })
  // Progress bar fills
  .to(progressBar, {
    width: '100%',
    duration: 0.8,
    ease: 'power2.inOut'
  }, '-=0.4')
  // Letters fade/shift slightly
  .to(letters, {
    y: -25,
    opacity: 0,
    duration: 0.5,
    stagger: 0.04,
    ease: 'power2.in'
  }, '+=0.2')
  .to(progressBar, {
    opacity: 0,
    duration: 0.3
  }, '-=0.3')
  // Soft vertical wipe reveals the sunlit hero
  .to(preloader, {
    yPercent: -100,
    duration: 1.1,
    ease: 'power4.inOut'
  }, '-=0.1');
}
