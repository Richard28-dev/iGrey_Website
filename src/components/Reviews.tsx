import React, { useState, useRef, useEffect, useCallback } from 'react';

interface TestimonialCard {
  quote: string;
  name: string;
  jobTitle: string;
  company: string;
  city: string;
  tag: string;
  initials: string;
  rating: number;
}

const testimonials: TestimonialCard[] = [
  {
    quote:
      'Their curation filtered out ninety percent of the noise. We found a trophy waterfront asset within three weeks that never even touched the open market.',
    name: 'Elena Rostova',
    jobTitle: 'Founder',
    company: 'Global Tech Ventures',
    city: 'Bengaluru',
    tag: 'Verified investor',
    initials: 'ER',
    rating: 5,
  },
  {
    quote:
      'Outstanding portfolio structuring and exceptional legal diligence. The onboarding had several compliance stages, but their discreet private banking execution was well worth it.',
    name: 'Harshvardhan Singhania',
    jobTitle: 'Principal Partner',
    company: 'Singhania Family Office',
    city: 'Bengaluru',
    tag: 'Verified investor',
    initials: 'HS',
    rating: 5,
  },
  {
    quote:
      'A true masterclass in architectural provenance and investment discipline. They treat luxury real estate as living sculpture and disciplined capital protection.',
    name: 'Madhavan Sridhar',
    jobTitle: 'Managing Director',
    company: 'Apex Capital Partners',
    city: 'Chennai',
    tag: 'Verified homeowner',
    initials: 'MS',
    rating: 5,
  },
  {
    quote:
      'Managing our duplex from Singapore involved a longer initial KYC cycle than anticipated, yet their property management and net 7.2% rental yield have been totally reliable.',
    name: 'Arun Venkatesh',
    jobTitle: 'Director of Cloud Engg.',
    company: 'Oracle Global',
    city: 'Bengaluru',
    tag: 'Verified investor',
    initials: 'AV',
    rating: 5,
  },
  {
    quote:
      'Their tenant verification and background checks are remarkably thorough. Disbursements are punctual on the 1st of every month, though monthly digital statements could arrive faster.',
    name: 'Dr. Priya Reddy',
    jobTitle: 'Consultant Cardiologist',
    company: 'Apollo Health City',
    city: 'Hyderabad',
    tag: 'Verified homeowner',
    initials: 'PR',
    rating: 5,
  },
  {
    quote:
      'Entrusting our luxury beachside villa on ECR to iGrey was our best financial decision. Complete transparency in maintenance audits, zero vacancy downtime, and exemplary professionalism.',
    name: 'K. S. Ramachandran',
    jobTitle: 'Managing Director',
    company: 'Southern Alloys Group',
    city: 'Chennai',
    tag: 'Verified investor',
    initials: 'KR',
    rating: 5,
  },
  {
    quote:
      'They handle our ancestral bungalow with genuine reverence. The initial tenant matching took slightly longer to meet their strict standards, but the peace of mind is priceless.',
    name: 'Col. Rajeshwar Rao (Retd.)',
    jobTitle: 'Trustee & Veteran',
    company: 'Heritage Preservation Trust',
    city: 'Mysuru',
    tag: 'Verified homeowner',
    initials: 'RR',
    rating: 5,
  },
  {
    quote:
      'Their data-backed yield modeling for prime Whitefield properties proved spot on. Professional lease agreements, regular quarterly inspections, and total peace of mind.',
    name: 'Sneha Kulkarni',
    jobTitle: 'VP of Engineering',
    company: 'Finovate Systems',
    city: 'Bengaluru',
    tag: 'Verified investor',
    initials: 'SK',
    rating: 5,
  },
  {
    quote:
      'The acquisition closing took extra time due to rigorous title deeds validation, but their post-purchase asset governance in Jubilee Hills has been transparent and dependable.',
    name: 'Vikramaditya Joshi',
    jobTitle: 'Founder & CEO',
    company: 'Altum Capital Ventures',
    city: 'Hyderabad',
    tag: 'Verified investor',
    initials: 'VJ',
    rating: 5,
  },
  {
    quote:
      'Living in Dubai, digital documentation and clear oversight were paramount. Payouts arrive like clockwork every quarter, backed by detailed photo maintenance audits.',
    name: 'Sundar & Meera Narayan',
    jobTitle: 'Managing Partners',
    company: 'Gulf Capital Advisory',
    city: 'Chennai',
    tag: 'Verified homeowner',
    initials: 'SN',
    rating: 5,
  },
];

const trustedRelationships = [
  {
    title: 'RIBA CHARTERED',
    subtitle: 'ARCHITECTURE & DESIGN',
  },
  {
    title: 'GLOBAL ALLIANCE',
    subtitle: 'PRIVATE SYNDICATION',
  },
  {
    title: 'RICS ACCREDITED',
    subtitle: 'VALUATION STANDARDS',
  },
  {
    title: 'CHAMBERS GLOBAL',
    subtitle: 'PRIVATE WEALTH COUNSEL',
  },
  {
    title: 'SUSTAINABILITY GUILD',
    subtitle: 'NET-ZERO STANDARDS',
  },
];

export const Reviews: React.FC = () => {
  // Multiply for seamless infinite horizontal loop
  const tickerItems = [...trustedRelationships, ...trustedRelationships, ...trustedRelationships];

  const [activeReview, setActiveReview] = useState<TestimonialCard | null>(null);
  const activeReviewRef = useRef<TestimonialCard | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [isModalAnimating, setIsModalAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstGroupRef = useRef<HTMLDivElement | null>(null);

  const isInteractingRef = useRef(false);
  const isPausedRef = useRef(false);
  const isTabHiddenRef = useRef(false);
  const isVisibleRef = useRef(false);
  const isReducedMotionRef = useRef(false);

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTouchEndTimeRef = useRef<number>(0);
  const resumeTimerRef = useRef<number | null>(null);
  const pressTimerRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const firstGroupWidthRef = useRef<number>(0);
  const scrollPosRef = useRef<number>(0);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
      if (containerRef.current && window.innerWidth < 768) {
        containerRef.current.style.scrollSnapType = 'none';
      }
    }, 2500);
  }, []);

  const openReviewModal = useCallback((card: TestimonialCard) => {
    activeReviewRef.current = card;
    setActiveReview(card);
    setIsModalAnimating(true);
    isPausedRef.current = true;
    document.body.style.overflow = 'hidden';
  }, []);

  const closeReviewModal = useCallback(() => {
    activeReviewRef.current = null;
    setActiveReview(null);
    document.body.style.overflow = '';
    isPausedRef.current = false;
    scheduleResume();
  }, [scheduleResume]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeReview) {
        closeReviewModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeReview, closeReviewModal]);

  useEffect(() => {
    const container = containerRef.current;
    const firstGroup = firstGroupRef.current;
    if (!container || !firstGroup) return;

    // Cache first group width
    const updateGroupWidth = () => {
      if (firstGroup) {
        firstGroupWidthRef.current = firstGroup.offsetWidth;
      }
    };
    updateGroupWidth();
    window.addEventListener('resize', updateGroupWidth);

    if (window.innerWidth < 768) {
      container.style.scrollSnapType = 'none';
    }

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // IntersectionObserver to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Tab visibility (visibilitychange)
    const handleVisibilityChange = () => {
      isTabHiddenRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Manual scroll wrap handler
    const handleScroll = () => {
      if (window.innerWidth >= 768) return;
      const fgWidth = firstGroupWidthRef.current || firstGroup.offsetWidth;
      if (fgWidth > 0) {
        if (container.scrollLeft >= fgWidth * 1.95) {
          container.scrollLeft -= fgWidth;
        }
      }
      scrollPosRef.current = container.scrollLeft;
    };
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Auto-scroll loop
    const SPEED_PX_PER_SEC = 24; // ~0.4px per frame at 60fps

    const step = (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }
      const deltaMs = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      const isMobile = window.innerWidth < 768;

      if (
        isMobile &&
        !isReducedMotionRef.current &&
        isVisibleRef.current &&
        !isTabHiddenRef.current &&
        !isInteractingRef.current &&
        !isPausedRef.current &&
        !activeReviewRef.current
      ) {
        const fgWidth = firstGroupWidthRef.current || firstGroup.offsetWidth;
        if (fgWidth > 0) {
          const deltaSec = Math.min(deltaMs / 1000, 0.1);
          const move = SPEED_PX_PER_SEC * deltaSec;

          scrollPosRef.current += move;
          if (scrollPosRef.current >= fgWidth) {
            scrollPosRef.current -= fgWidth;
          }
          container.scrollLeft = scrollPosRef.current;
        }
      }

      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
      observer.disconnect();
      window.removeEventListener('resize', updateGroupWidth);
      container.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    isInteractingRef.current = true;
    if (containerRef.current && window.innerWidth < 768) {
      containerRef.current.style.scrollSnapType = 'x proximity';
    }
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent, card: TestimonialCard, cardIdx: number) => {
    lastTouchEndTimeRef.current = Date.now();
    if (touchStartRef.current) {
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const dt = Date.now() - touchStartRef.current.time;
      const dist = Math.hypot(dx, dy);

      // Tap threshold: moved < 8px and lasted < 300ms
      if (dist < 8 && dt < 300) {
        setPressedIndex(cardIdx);
        if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
        pressTimerRef.current = window.setTimeout(() => {
          setPressedIndex(null);
        }, 120);

        openReviewModal(card);
      }
    }
    touchStartRef.current = null;
    scheduleResume();
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
    scheduleResume();
  };

  const handleCardClick = (card: TestimonialCard) => {
    if (Date.now() - lastTouchEndTimeRef.current < 500) {
      return;
    }
    openReviewModal(card);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, card: TestimonialCard) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openReviewModal(card);
    }
  };

  const handleContainerTouchStart = () => {
    isInteractingRef.current = true;
    if (containerRef.current && window.innerWidth < 768) {
      containerRef.current.style.scrollSnapType = 'x proximity';
    }
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const renderCard = (t: TestimonialCard, keyPrefix: string, idx: number) => {
    const globalCardIdx = keyPrefix === 'orig' ? idx : idx + testimonials.length;
    const isPressed = pressedIndex === globalCardIdx;

    return (
      <div
        key={`${keyPrefix}-${t.name}-${idx}`}
        data-index={globalCardIdx}
        className={`review-card ${isPressed ? 'is-pressed' : ''}`}
        tabIndex={0}
        role="button"
        aria-label={`Read full review from ${t.name}`}
        onClick={() => handleCardClick(t)}
        onTouchStart={handleTouchStart}
        onTouchEnd={(e) => handleTouchEnd(e, t, globalCardIdx)}
        onTouchCancel={handleTouchCancel}
        onKeyDown={(e) => handleCardKeyDown(e, t)}
      >
      <div className="review-card-top">
        {/* Decorative Top Double-Quote */}
        <div
          className="review-quote-mark"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '44px',
            lineHeight: '0.85',
            color: '#c9a77c',
            marginBottom: '0.85rem',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          “
        </div>

        {/* 5-Star Rating Row: Solid Gold (#d9b36a) for filled, Dim Outline (#5b4b32) for remaining */}
        <div
          className="review-stars-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '1.25rem',
          }}
          aria-label={`Rated ${t.rating} out of 5`}
        >
          {[1, 2, 3, 4, 5].map((starIndex) => {
            const isFilled = starIndex <= t.rating;
            return isFilled ? (
              <svg
                key={starIndex}
                className="review-star-svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="#d9b36a"
                aria-hidden="true"
                style={{ display: 'block' }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : (
              <svg
                key={starIndex}
                className="review-star-svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5b4b32"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ display: 'block' }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            );
          })}
          <span
            className="review-rating-num"
            style={{
              marginLeft: '6px',
              fontFamily: "'Manrope', var(--font-sans)",
              fontSize: '13px',
              color: '#8e8677',
              fontWeight: 500,
            }}
          >
            {t.rating.toFixed(1)}
          </span>
        </div>

        {/* Master Quote: Cormorant Garamond Italic */}
        <p className="review-quote">
          {t.quote}
        </p>
      </div>

      <div className="review-card-bottom">
        {/* Subtle Hairline Divider */}
        <div
          className="review-inner-divider"
          style={{
            height: '1px',
            backgroundColor: 'rgba(197, 168, 128, 0.18)',
            margin: '2rem 0 1.25rem 0',
          }}
        />

        {/* Professional Author Section */}
        <div
          className="review-author-section"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minWidth: 0,
            width: '100%',
          }}
        >
          {/* Avatar: 46px circular, initials in Cormorant Garamond 19px, gold 0.5px border, dark background */}
          <div
            className="review-author-avatar"
            style={{
              width: '46px',
              height: '46px',
              minWidth: '46px',
              minHeight: '46px',
              borderRadius: '50%',
              border: '0.5px solid #c9a77c',
              backgroundColor: '#0c110e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <span
              className="review-avatar-initials"
              style={{
                fontFamily: "'Cormorant Garamond', var(--font-serif)",
                fontSize: '19px',
                fontWeight: 500,
                color: '#c9a77c',
                lineHeight: 1,
                letterSpacing: '0.02em',
              }}
            >
              {t.initials}
            </span>
          </div>

          {/* Text Block: Name + Verified Check, Role, Location line */}
          <div
            className="review-author-text"
            style={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              flex: 1,
              overflow: 'hidden',
            }}
          >
            {/* Name: Manrope 16px, weight 600, color #f7f2e8, letter-spacing 0.01em + 17px gold verified icon */}
            <div
              className="review-author-name-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minWidth: 0,
              }}
            >
              <span
                className="review-author-name"
                style={{
                  fontFamily: "'Manrope', var(--font-sans)",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#f7f2e8',
                  letterSpacing: '0.01em',
                  lineHeight: 1.25,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {t.name}
              </span>
              <svg
                className="review-verified-icon"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="#c9a77c"
                style={{ flexShrink: 0 }}
                aria-label="Verified"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2 2.7a2.5 2.5 0 0 1 3.6 0l.7.7a2.5 2.5 0 0 0 2.2.8l1-.1a2.5 2.5 0 0 1 2.7 2.7l-.1 1a2.5 2.5 0 0 0 .8 2.2l.7.7a2.5 2.5 0 0 1 0 3.6l-.7.7a2.5 2.5 0 0 0-.8 2.2l.1 1a2.5 2.5 0 0 1-2.7 2.7l-1-.1a2.5 2.5 0 0 0-2.2.8l-.7.7a2.5 2.5 0 0 1-3.6 0l-.7-.7a2.5 2.5 0 0 0-2.2-.8l-1 .1a2.5 2.5 0 0 1-2.7-2.7l.1-1a2.5 2.5 0 0 0-.8-2.2l-.7-.7a2.5 2.5 0 0 1 0-3.6l.7-.7a2.5 2.5 0 0 0 .8-2.2l-.1-1a2.5 2.5 0 0 1 2.7-2.7l1 .1a2.5 2.5 0 0 0 2.2-.8l.7-.7zm6.1 7.6a1 1 0 0 0-1.4-1.4L11 12.8 9.1 10.9a1 1 0 0 0-1.4 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6z"
                />
              </svg>
            </div>

            {/* Role: Job title, Company in Manrope 12.5px, color #cfc7b6, 3px below name */}
            <div
              className="review-author-role"
              style={{
                fontFamily: "'Manrope', var(--font-sans)",
                fontSize: '12.5px',
                color: '#cfc7b6',
                marginTop: '3px',
                lineHeight: 1.35,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {t.jobTitle}, {t.company}
            </div>

            {/* Location line: 11.5px gold #c9a77c with map-pin icon, city, dot separator, tag */}
            <div
              className="review-author-location"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: "'Manrope', var(--font-sans)",
                fontSize: '11.5px',
                color: '#c9a77c',
                marginTop: '4px',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <svg
                className="review-location-pin"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9a77c"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="review-location-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t.city} &middot; {t.tag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <section id="reviews" style={{ position: 'relative', backgroundColor: '#090D0B', overflow: 'hidden' }}>
      {/* Top Part: Institutional Accolades / Private Client Reflections */}
      <div
        className="reviews-top-wrapper"
        style={{
          backgroundColor: '#090D0B',
          color: '#FFFFFF',
          padding: 'clamp(5.5rem, 8vw, 7.5rem) 0 clamp(4.5rem, 6vw, 6rem) 0',
          borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
        }}
      >
        <div className="container" style={{ maxWidth: '1280px' }}>
          {/* Centered Section Header */}
          <div className="reviews-header-block" style={{ textAlign: 'center', marginBottom: 'clamp(2.25rem, 3.5vw, 3rem)' }}>
            <span
              className="reviews-eyebrow"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--bronze)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.85rem',
              }}
            >
              VERIFIED REVIEWS
            </span>

            <h2
              className="reviews-heading"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
                lineHeight: 1.15,
                color: '#FAF8F4',
                fontWeight: 400,
                letterSpacing: '-0.015em',
                margin: '0 0 1rem 0',
              }}
            >
              Loved by Proud Customers
            </h2>

            {/* Small Gold Divider Bar */}
            <div
              className="reviews-divider-bar"
              style={{
                width: '36px',
                height: '2px',
                backgroundColor: 'var(--bronze)',
                margin: '0 auto',
              }}
            />
          </div>
        </div>

        {/* Continuous Horizontal Floating Reviews Stream with Soft Edge Fade */}
        <div
          className="reviews-marquee-container"
          ref={containerRef}
          onTouchStart={handleContainerTouchStart}
          onTouchEnd={scheduleResume}
          onTouchCancel={scheduleResume}
        >
          <div className="reviews-marquee-track">
            {/* First Set of Cards */}
            <div className="reviews-marquee-group" ref={firstGroupRef}>
              {testimonials.map((t, idx) => renderCard(t, 'orig', idx))}
            </div>

            {/* Duplicated Set for Seamless Infinite Loop */}
            <div className="reviews-marquee-group" aria-hidden="true">
              {testimonials.map((t, idx) => renderCard(t, 'dup', idx))}
            </div>
          </div>
        </div>

        {/* Review Details Modal Popup (Full Review without line-clamp) */}
        {activeReview && (
          <div
            className={`review-modal-backdrop ${isModalAnimating ? 'is-animating' : ''}`}
            onClick={closeReviewModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
          >
            <div
              className={`review-modal-content ${isModalAnimating ? 'is-animating' : ''}`}
              onClick={(e) => e.stopPropagation()}
              onAnimationEnd={() => setIsModalAnimating(false)}
            >
              {/* Close Button (X) */}
              <button
                type="button"
                onClick={closeReviewModal}
                aria-label="Close review"
                autoFocus
                className="review-modal-close-btn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Decorative Top Quote Mark */}
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '48px',
                  lineHeight: '0.85',
                  color: '#c9a77c',
                  marginBottom: '1rem',
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                “
              </div>

              {/* 5-Star Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginBottom: '1.25rem',
                }}
                aria-label={`Rated ${activeReview.rating} out of 5`}
              >
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <svg
                    key={starIndex}
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="#d9b36a"
                    aria-hidden="true"
                    style={{ display: 'block' }}
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span
                  style={{
                    marginLeft: '8px',
                    fontFamily: "'Manrope', var(--font-sans)",
                    fontSize: '14px',
                    color: '#c9a77c',
                    fontWeight: 600,
                  }}
                >
                  {activeReview.rating.toFixed(1)}
                </span>
              </div>

              {/* Full Quote without Line Clamp */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(18px, 4.2vw, 22px)',
                  lineHeight: 1.6,
                  color: '#FAF8F4',
                  fontWeight: 400,
                  margin: 0,
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              >
                {activeReview.quote}
              </p>

              {/* Hairline Divider */}
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(197, 168, 128, 0.22)',
                  margin: '1.75rem 0 1.25rem 0',
                }}
              />

              {/* Author Section */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    minHeight: '48px',
                    borderRadius: '50%',
                    border: '0.5px solid #c9a77c',
                    backgroundColor: '#0c110e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', var(--font-serif)",
                      fontSize: '20px',
                      fontWeight: 500,
                      color: '#c9a77c',
                      lineHeight: 1,
                    }}
                  >
                    {activeReview.initials}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span
                      id="review-modal-title"
                      style={{
                        fontFamily: "'Manrope', var(--font-sans)",
                        fontSize: '16.5px',
                        fontWeight: 600,
                        color: '#f7f2e8',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {activeReview.name}
                    </span>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="#c9a77c"
                      style={{ flexShrink: 0 }}
                      aria-label="Verified"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.2 2.7a2.5 2.5 0 0 1 3.6 0l.7.7a2.5 2.5 0 0 0 2.2.8l1-.1a2.5 2.5 0 0 1 2.7 2.7l-.1 1a2.5 2.5 0 0 0 .8 2.2l.7.7a2.5 2.5 0 0 1 0 3.6l-.7.7a2.5 2.5 0 0 0-.8 2.2l.1 1a2.5 2.5 0 0 1-2.7 2.7l-1-.1a2.5 2.5 0 0 0-2.2.8l-.7.7a2.5 2.5 0 0 1-3.6 0l-.7-.7a2.5 2.5 0 0 0-2.2-.8l-1 .1a2.5 2.5 0 0 1-2.7-2.7l.1-1a2.5 2.5 0 0 0-.8-2.2l-.7-.7a2.5 2.5 0 0 1 0-3.6l.7-.7a2.5 2.5 0 0 0 .8-2.2l-.1-1a2.5 2.5 0 0 1 2.7-2.7l1 .1a2.5 2.5 0 0 0 2.2-.8l.7-.7zm6.1 7.6a1 1 0 0 0-1.4-1.4L11 12.8 9.1 10.9a1 1 0 0 0-1.4 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6z"
                      />
                    </svg>
                  </div>

                  <div
                    style={{
                      fontFamily: "'Manrope', var(--font-sans)",
                      fontSize: '13px',
                      color: '#cfc7b6',
                      marginTop: '3px',
                      lineHeight: 1.35,
                    }}
                  >
                    {activeReview.jobTitle}, {activeReview.company}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: "'Manrope', var(--font-sans)",
                      fontSize: '12px',
                      color: '#c9a77c',
                      marginTop: '4px',
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#c9a77c"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>
                      {activeReview.city} &middot; {activeReview.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Part: Dark Banner "— TRUSTED RELATIONSHIPS" with Horizontal Floating Marquee Animation */}
      <div
        style={{
          backgroundColor: '#070B09',
          padding: 'clamp(2.75rem, 4.5vw, 4rem) 0',
          borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ maxWidth: '1440px' }}>
          {/* Centered Eyebrow */}
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--bronze)',
              fontWeight: 600,
              marginBottom: '2.5rem',
            }}
          >
            — TRUSTED RELATIONSHIPS —
          </div>
        </div>

        {/* Horizontal Floating Marquee with Edge Fade Masks */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
          className="marquee-container"
        >
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'floatMarquee 32s linear infinite',
            }}
            className="marquee-track"
          >
            {tickerItems.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    textAlign: 'center',
                    padding: '0.75rem clamp(2.5rem, 4vw, 4.5rem)',
                    minWidth: '240px',
                  }}
                  className="trusted-rel-item"
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(0.95rem, 1.1vw, 1.08rem)',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                      lineHeight: 1.25,
                      marginBottom: '0.45rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--bronze)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>

                {/* Vertical Divider Hairline between Items */}
                <div
                  style={{
                    width: '1px',
                    height: '32px',
                    backgroundColor: 'rgba(197, 168, 128, 0.2)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Reviews Marquee Container */
        .reviews-marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 14px 0 26px 0;
          -webkit-user-select: none;
          user-select: none;
        }

        /* Edge fades via pseudo-elements: hardware accelerated, 0 CPU re-rasterization on mobile */
        .reviews-marquee-container::before,
        .reviews-marquee-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: clamp(24px, 5vw, 80px);
          z-index: 2;
          pointer-events: none;
        }
        .reviews-marquee-container::before {
          left: 0;
          background: linear-gradient(to right, #090D0B, transparent);
        }
        .reviews-marquee-container::after {
          right: 0;
          background: linear-gradient(to left, #090D0B, transparent);
        }

        .reviews-marquee-track {
          display: flex;
          width: max-content;
          animation: reviewFloat 38s linear infinite;
          -webkit-animation: reviewFloat 38s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .reviews-marquee-group {
          display: flex;
          gap: 24px;
          padding-right: 24px;
          align-items: stretch;
          flex-shrink: 0;
        }

        /* Review Card Master Styling matching Elena Rostova reference */
        .reviews-marquee-container .review-card {
          flex: 0 0 350px;
          width: 350px;
          min-width: 350px;
          max-width: 350px;
          background-color: #0F1613;
          border-radius: 16px;
          border: 1px solid rgba(197, 168, 128, 0.22);
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          -webkit-user-select: none;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .reviews-marquee-container .review-card .review-quote {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          font-style: italic !important;
          font-size: 18px !important;
          line-height: 1.65 !important;
          color: #FAF8F4 !important;
          font-weight: 400 !important;
          letter-spacing: 0.005em !important;
          margin: 0 !important;
        }

        /* Desktop Hover: Only applies on large screens (>=768px) with fine pointer (mouse), NEVER on phones */
        @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
          .reviews-marquee-container:hover .reviews-marquee-track {
            animation-play-state: paused;
          }

          .reviews-marquee-container .review-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.65) !important;
            border-color: rgba(197, 168, 128, 0.5) !important;
          }

          .marquee-container:hover .marquee-track {
            animation-play-state: paused;
          }
        }

        @keyframes reviewFloat {
          0% {
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
            -webkit-transform: translate3d(-50%, 0, 0);
          }
        }

        @-webkit-keyframes reviewFloat {
          0% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          100% {
            -webkit-transform: translate3d(-50%, 0, 0);
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes floatMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        /* Mobile Optimization (under 768px) - Non-Sticking, 60fps/120fps Smooth Floating */
        @media (max-width: 767px) {
          #reviews {
            overflow: hidden !important;
          }

          .reviews-top-wrapper {
            padding: 44px 0 32px 0 !important;
            overflow: hidden !important;
          }

          .reviews-top-wrapper .container {
            padding-left: 14px !important;
            padding-right: 14px !important;
            overflow: visible !important;
          }

          /* Section Header & Spacing */
          .reviews-header-block {
            margin-bottom: 24px !important;
            text-align: center !important;
          }

          .reviews-eyebrow {
            font-size: 0.72rem !important;
            letter-spacing: 0.2em !important;
            margin-bottom: 10px !important;
          }

          .reviews-heading {
            font-family: var(--font-serif) !important;
            font-size: clamp(22px, 7vw, 30px) !important;
            line-height: 1.15 !important;
            white-space: nowrap !important;
            text-align: center !important;
            letter-spacing: -0.02em !important;
            margin: 0 0 10px 0 !important;
            width: 100% !important;
          }

          .reviews-divider-bar {
            width: 32px !important;
            height: 1.5px !important;
            margin: 0 auto !important;
          }

          /* Mobile Touch-Friendly Smooth Scrolling (under 768px) */
          .reviews-marquee-container {
            overflow-x: auto !important;
            scroll-snap-type: x proximity;
            -webkit-overflow-scrolling: touch !important;
            overscroll-behavior-x: contain;
            touch-action: pan-x pan-y !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            padding: 0 0 20px 0 !important;
            pointer-events: auto !important;
            cursor: grab;
          }

          .reviews-marquee-container:active {
            cursor: grabbing;
          }

          .reviews-marquee-container::before,
          .reviews-marquee-container::after {
            width: 20px !important;
            pointer-events: none !important;
          }

          .reviews-marquee-container::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }

          /* Disable CSS animation on mobile: gentle RAF delta-time auto-scroll controls scrolling */
          .reviews-marquee-track {
            display: flex !important;
            width: max-content !important;
            animation: none !important;
            -webkit-animation: none !important;
            transform: none !important;
            -webkit-transform: none !important;
            will-change: auto !important;
            pointer-events: auto !important;
          }

          .reviews-marquee-group {
            display: flex !important;
            gap: 16px !important;
            padding-right: 16px !important;
            align-items: stretch !important;
            flex-shrink: 0 !important;
          }

          .reviews-marquee-container .review-card {
            flex: 0 0 clamp(250px, 78vw, 290px) !important;
            width: clamp(250px, 78vw, 290px) !important;
            min-width: 250px !important;
            max-width: 290px !important;
            height: auto !important;
            min-height: 0 !important;
            padding: 18px 18px 16px !important;
            border-radius: 16px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            box-sizing: border-box !important;
            scroll-snap-align: center !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            pointer-events: auto !important;
            cursor: pointer !important;
            transition: transform 0.12s ease, box-shadow 0.12s ease !important;
            box-shadow: 0 8px 22px rgba(0, 0, 0, 0.42) !important;
            outline: none !important;
          }

          /* Tapped Card Press Effect: Scale 0.98 for 120ms */
          .reviews-marquee-container .review-card.is-pressed,
          .reviews-marquee-container .review-card:active {
            transform: scale(0.98) !important;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5) !important;
          }

          /* Prevent sticky hover on mobile touch devices */
          @media (hover: none) {
            .reviews-marquee-container .review-card:hover {
              transform: none !important;
              box-shadow: 0 8px 22px rgba(0, 0, 0, 0.42) !important;
              border-color: rgba(197, 168, 128, 0.22) !important;
            }
          }

          .review-card-top {
            flex: 1 0 auto !important;
            display: flex !important;
            flex-direction: column !important;
          }

          .review-card-bottom {
            margin-top: auto !important;
            flex-shrink: 0 !important;
          }

          /* Inside the card: Opening quote mark */
          .review-quote-mark {
            font-size: 40px !important;
            line-height: 0.6 !important;
            margin-bottom: 4px !important;
          }

          /* Inside the card: Stars */
          .review-stars-row {
            margin-top: 6px !important;
            margin-bottom: 12px !important;
            gap: 3px !important;
          }

          .review-star-svg {
            width: 13px !important;
            height: 13px !important;
          }

          .review-rating-num {
            font-size: 12px !important;
            margin-left: 5px !important;
          }

          /* Inside the card: Quote text */
          .reviews-marquee-container .review-card .review-quote {
            font-family: 'Cormorant Garamond', Georgia, serif !important;
            font-style: italic !important;
            font-size: 16.5px !important;
            line-height: 1.45 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 5 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            margin: 0 !important;
          }

          /* Inside the card: Divider */
          .review-inner-divider {
            margin: 14px 0 !important;
          }

          /* Inside the card: Author section */
          .review-author-section {
            gap: 10px !important;
          }

          /* Inside the card: Avatar */
          .review-author-avatar {
            width: 38px !important;
            height: 38px !important;
            min-width: 38px !important;
            min-height: 38px !important;
          }

          .review-avatar-initials {
            font-size: 15px !important;
          }

          /* Inside the card: Name */
          .review-author-name {
            font-family: 'Manrope', var(--font-sans) !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            line-height: 1.25 !important;
          }

          .review-verified-icon {
            width: 15px !important;
            height: 15px !important;
          }

          /* Inside the card: Role */
          .review-author-role {
            font-family: 'Manrope', var(--font-sans) !important;
            font-size: 12px !important;
            color: #cfc7b6 !important;
            margin-top: 2px !important;
            line-height: 1.35 !important;
            white-space: normal !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
          }

          /* Inside the card: Location line */
          .review-author-location {
            font-family: 'Manrope', var(--font-sans) !important;
            font-size: 11px !important;
            margin-top: 3px !important;
            line-height: 1.3 !important;
            gap: 3px !important;
          }

          .review-location-pin {
            width: 10px !important;
            height: 10px !important;
          }

          .review-location-text {
            font-size: 11px !important;
          }
        }

        /* Review Details Modal Popup Styles & Animations */
        @keyframes reviewModalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes reviewModalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(14px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .review-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(5, 8, 7, 0.84);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
          animation: reviewModalFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .review-modal-backdrop.is-animating {
          will-change: opacity;
        }

        .review-modal-content {
          position: relative;
          background-color: #0F1613;
          border: 1px solid rgba(197, 168, 128, 0.35);
          border-radius: 20px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.75), 0 0 1px 1px rgba(197, 168, 128, 0.15);
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: clamp(24px, 5vw, 36px);
          box-sizing: border-box;
          animation: reviewModalScaleIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .review-modal-content.is-animating {
          will-change: transform, opacity;
        }

        .review-modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(197, 168, 128, 0.08);
          border: 1px solid rgba(197, 168, 128, 0.25);
          color: #c9a77c;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
          z-index: 2;
        }

        .review-modal-close-btn:hover,
        .review-modal-close-btn:focus-visible {
          background-color: rgba(197, 168, 128, 0.15) !important;
          color: #FAF8F4 !important;
          border-color: rgba(197, 168, 128, 0.5) !important;
          outline: none !important;
        }

        /* Accessibility: Prefers Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .reviews-marquee-track {
            animation: none !important;
          }
          .reviews-marquee-container {
            overflow-x: auto !important;
            scroll-snap-type: x proximity;
          }
          .review-modal-backdrop,
          .review-modal-content {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};


