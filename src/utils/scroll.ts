import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const setLenisInstance = (instance: Lenis | null) => {
  lenisInstance = instance;
  if (typeof window !== 'undefined') {
    (window as unknown as { __lenis: Lenis | null }).__lenis = instance;
  }
};

export const getLenisInstance = (): Lenis | null => {
  return lenisInstance;
};

export const scrollToTarget = (
  target: string | HTMLElement | number,
  options?: { offset?: number; duration?: number }
) => {
  const offset = options?.offset ?? -30;
  const duration = options?.duration ?? 1.2;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (typeof target === 'string') {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};
