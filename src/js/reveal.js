/* ==========================================================================
   iGREY HOLDINGS — EDITORIAL WORD-SCRUB & SCROLL REVEALS
   ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveals() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Hero headline masked reveal
  const heroLines = document.querySelectorAll('.hero-headline .mask-line');
  if (heroLines.length > 0) {
    gsap.to(heroLines, {
      y: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out',
      delay: 0.3
    });
  }

  // 2. Progressive word-by-word scroll text illumination in Philosophy section
  const paragraph = document.querySelector('.philosophy-paragraph');
  if (paragraph) {
    // Split text into words if not already wrapped
    if (!paragraph.querySelector('.philosophy-word')) {
      const text = paragraph.textContent.trim();
      const words = text.split(/\s+/);
      paragraph.innerHTML = words
        .map((w) => `<span class="philosophy-word">${w}</span>`)
        .join(' ');
    }

    const wordSpans = paragraph.querySelectorAll('.philosophy-word');

    if (!prefersReduced) {
      ScrollTrigger.create({
        trigger: paragraph,
        start: 'top 75%',
        end: 'bottom 45%',
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalWords = wordSpans.length;
          const activeCount = Math.floor(progress * totalWords);

          wordSpans.forEach((word, index) => {
            if (index <= activeCount) {
              word.classList.add('is-active');
            } else {
              word.classList.remove('is-active');
            }
          });
        }
      });
    } else {
      wordSpans.forEach((w) => w.classList.add('is-active'));
    }
  }

  // 3. Animated counters for real figures
  const counters = document.querySelectorAll('[data-counter-target]');
  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute('data-counter-target') || '0');
    const prefix = counter.getAttribute('data-counter-prefix') || '';
    const suffix = counter.getAttribute('data-counter-suffix') || '';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = prefix + Math.floor(obj.val).toLocaleString() + suffix;
          }
        });
      }
    });
  });

  // 4. SVG Stroke Drawing in "The iGREY Approach" section
  const path = document.querySelector('.timeline-svg-path');
  if (path && !prefersReduced) {
    const length = path.getTotalLength ? path.getTotalLength() : 800;
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.approach-section',
        start: 'top 65%',
        end: 'bottom 75%',
        scrub: 1
      }
    });
  }
}
