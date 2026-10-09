import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Home,
  ArrowRight,
  Play,
} from 'lucide-react';
import type { AdminProperty } from '../admin/types';

interface PropertyDetailsModalProps {
  isOpen: boolean;
  property: AdminProperty | null;
  onClose: () => void;
  onEnquire?: (property: AdminProperty) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  isOpen,
  property,
  onClose,
  onEnquire,
}) => {
  const [activeItem, setActiveItem] = useState<{ type: 'photo' | 'video'; index: number }>({ type: 'photo', index: 0 });
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Gallery array (up to 8 photos)
  const photos = React.useMemo(() => {
    if (!property) return [];
    const list = property.galleryImages && property.galleryImages.length > 0
      ? property.galleryImages
      : [property.coverImage];
    return list.slice(0, 8).filter(Boolean);
  }, [property]);

  const videos = React.useMemo(() => {
    if (!property || !Array.isArray(property.videos)) return [];
    return property.videos.slice(0, 2);
  }, [property]);

  const totalPhotos = photos.length;
  const currentPhoto = activeItem.type === 'photo' ? (photos[activeItem.index] || property?.coverImage || '') : '';

  // Reset media when property changes or opens
  useEffect(() => {
    if (isOpen) {
      setActiveItem({ type: 'photo', index: 0 });
      setIsPlayingVideo(false);
      setPhotoLoaded(false);
    } else {
      setIsPlayingVideo(false);
    }
  }, [isOpen, property?.id]);

  // Preload next image
  useEffect(() => {
    if (totalPhotos > 1 && activeItem.type === 'photo') {
      const nextIdx = (activeItem.index + 1) % totalPhotos;
      const img = new Image();
      img.src = photos[nextIdx];
    }
  }, [activeItem, photos, totalPhotos]);

  // Handle scroll lock & focus trap
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus inside dialog
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowLeft' && totalPhotos > 1) {
        e.preventDefault();
        setIsPlayingVideo(false);
        setActiveItem((prev) => ({
          type: 'photo',
          index: (prev.index - 1 + totalPhotos) % totalPhotos,
        }));
        return;
      }

      if (e.key === 'ArrowRight' && totalPhotos > 1) {
        e.preventDefault();
        setIsPlayingVideo(false);
        setActiveItem((prev) => ({
          type: 'photo',
          index: (prev.index + 1) % totalPhotos,
        }));
        return;
      }

      // Trap Tab & Shift+Tab
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      if (previouslyFocusedElement.current && typeof previouslyFocusedElement.current.focus === 'function') {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, onClose, totalPhotos]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || totalPhotos <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = (touchStartY.current || 0) - touchEndY;

    // Only swipe if horizontal motion is significantly larger than vertical motion
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (activeItem.type === 'photo' && totalPhotos > 1) {
        setIsPlayingVideo(false);
        if (diffX > 0) {
          setActiveItem((prev) => ({
            type: 'photo',
            index: (prev.index + 1) % totalPhotos,
          }));
        } else {
          setActiveItem((prev) => ({
            type: 'photo',
            index: (prev.index - 1 + totalPhotos) % totalPhotos,
          }));
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleEnquireClick = useCallback(() => {
    if (!property) return;

    // Pre-fill message format: "I'm interested in {title} ({property code}) in {locality}, {city}."
    const loc = property.locality || property.address || '';
    const city = property.city || '';
    const locString = loc && city ? `${loc}, ${city}` : loc || city || 'Mysuru';
    const prefillMsg = `I'm interested in ${property.title} (${property.propertyId}) in ${locString}.`;

    // Dispatch global custom event for the contact form
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('igrey_prefill_contact', {
          detail: {
            message: prefillMsg,
            role: 'Looking for Buy',
            propertyId: property.propertyId,
            propertyTitle: property.title,
          },
        })
      );
    }

    if (onEnquire) {
      onEnquire(property);
    }

    onClose();

    // Smoothly scroll to contact section
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  }, [property, onEnquire, onClose]);

  if (!isOpen || !property) return null;

  // Category badge formatting (e.g. "GATED SOCIETY · 2 BHK")
  const propertyCategory = `${property.propertyType.toUpperCase()} · ${property.bedrooms} BHK`;

  // Highlights list
  const highlights = property.highlights && property.highlights.length > 0 ? property.highlights : [];

  // Amenities list
  const amenities = property.amenities && property.amenities.length > 0 ? property.amenities : [];

  // Description text
  const description = property.fullDescription || property.shortDescription || '';

  // Area text formatting: ensure "1,200 sq ft" style
  const areaText = property.builtUpArea || property.carpetArea || '1,200 sq ft';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-popup-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        animation: 'igreyModalFadeIn 200ms ease-out',
      }}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="igrey-popup-card"
        style={{
          width: '900px',
          maxWidth: '94vw',
          maxHeight: '90vh',
          backgroundColor: '#0f1513',
          border: '0.5px solid #5b4b32',
          borderRadius: '18px',
          padding: '20px',
          boxSizing: 'border-box',
          color: '#FAF8F4',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1.15fr)',
          gap: '18px',
          overflow: 'hidden',
          animation: 'igreyModalScaleIn 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT COLUMN: Gallery */}
        <div
          className="igrey-popup-gallery-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
          }}
        >
          {/* Main Media Box (16:10 aspect ratio) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 10',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#121816',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {activeItem.type === 'photo' ? (
              <>
                {/* Skeleton Loading State */}
                {!photoLoaded && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: '#141d1a',
                      animation: 'igreySkeletonShimmer 1.5s infinite linear',
                    }}
                  />
                )}

                <img
                  src={currentPhoto}
                  alt={`${property.title} - Photo ${activeItem.index + 1}`}
                  onLoad={() => setPhotoLoaded(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    opacity: photoLoaded ? 1 : 0,
                    transition: 'opacity 200ms ease',
                  }}
                />

                {/* Left and Right Edge Navigation Arrows */}
                {totalPhotos > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPlayingVideo(false);
                        setActiveItem((prev) => ({
                          type: 'photo',
                          index: (prev.index - 1 + totalPhotos) % totalPhotos,
                        }));
                      }}
                      aria-label="Previous photo"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '10px',
                        transform: 'translateY(-50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        border: 'none',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                        zIndex: 2,
                        transition: 'background-color 150ms ease, transform 150ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      <ChevronLeft size={16} strokeWidth={2.4} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsPlayingVideo(false);
                        setActiveItem((prev) => ({
                          type: 'photo',
                          index: (prev.index + 1) % totalPhotos,
                        }));
                      }}
                      aria-label="Next photo"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        border: 'none',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                        zIndex: 2,
                        transition: 'background-color 150ms ease, transform 150ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      <ChevronRight size={16} strokeWidth={2.4} />
                    </button>
                  </>
                )}

                {/* Photo Counter Pill at Bottom Right */}
                {totalPhotos > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontFamily: "'Manrope', var(--font-sans)",
                      color: '#FAF8F4',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      zIndex: 2,
                      pointerEvents: 'none',
                    }}
                  >
                    {activeItem.index + 1} / {totalPhotos}
                  </div>
                )}
              </>
            ) : (
              /* Active item is Video */
              (() => {
                const activeVid = videos[activeItem.index];
                if (!activeVid) {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#e07a6f', fontSize: '13px' }}>
                      This video isn't available right now
                    </div>
                  );
                }

                if (activeVid.type === 'file') {
                  return (
                    <video
                      controls
                      playsInline
                      preload="none"
                      poster={activeVid.poster || ''}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        backgroundColor: '#000',
                      }}
                    >
                      <source src={activeVid.url} type="video/mp4" />
                      This video isn't available right now
                    </video>
                  );
                }

                // YouTube or Vimeo
                const posterUrl = activeVid.poster || (activeVid.type === 'youtube' ? `https://img.youtube.com/vi/${activeVid.id}/hqdefault.jpg` : '');
                const embedUrl = activeVid.type === 'youtube'
                  ? `https://www.youtube-nocookie.com/embed/${activeVid.id}?autoplay=1&rel=0`
                  : `https://player.vimeo.com/video/${activeVid.id}?autoplay=1`;

                if (isPlayingVideo) {
                  return (
                    <iframe
                      src={embedUrl}
                      title={`${property.title} Video`}
                      loading="lazy"
                      allow="fullscreen; picture-in-picture; autoplay"
                      allowFullScreen
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: 'block',
                      }}
                    />
                  );
                }

                return (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      backgroundColor: '#000',
                    }}
                    onClick={() => setIsPlayingVideo(true)}
                  >
                    {posterUrl && (
                      <img
                        src={posterUrl}
                        alt="Video preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    )}
                    <button
                      type="button"
                      aria-label="Play video"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlayingVideo(true);
                      }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: '#c9a77c',
                        border: 'none',
                        color: '#0a0f0e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                        cursor: 'pointer',
                        transition: 'transform 150ms ease, background-color 150ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.08)';
                        e.currentTarget.style.backgroundColor = '#d8b991';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                        e.currentTarget.style.backgroundColor = '#c9a77c';
                      }}
                    >
                      <Play size={24} fill="#0a0f0e" style={{ marginLeft: '3px' }} />
                    </button>
                  </div>
                );
              })()
            )}
          </div>

          {/* Row of Small Thumbnails: photos first, videos after (up to 4:3 ratio, 6px gap) */}
          {(totalPhotos + videos.length) > 1 && (
            <div
              className="igrey-popup-thumbs-row"
              style={{
                display: 'flex',
                gap: '6px',
                marginTop: '10px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                paddingBottom: '2px',
              }}
            >
              {photos.map((src, idx) => {
                const isActive = activeItem.type === 'photo' && activeItem.index === idx;
                return (
                  <button
                    key={`photo-${idx}`}
                    type="button"
                    onClick={() => {
                      setIsPlayingVideo(false);
                      setActiveItem({ type: 'photo', index: idx });
                    }}
                    aria-label={`View photo ${idx + 1}`}
                    style={{
                      flex: '0 0 calc(20% - 5px)',
                      minWidth: '58px',
                      maxWidth: '75px',
                      aspectRatio: '4 / 3',
                      padding: 0,
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: isActive ? '1.5px solid #c9a77c' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: '#121816',
                      cursor: 'pointer',
                      opacity: isActive ? 1 : 0.65,
                      transition: 'opacity 150ms ease, border-color 150ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => !isActive && (e.currentTarget.style.opacity = '0.65')}
                  >
                    <img
                      src={src}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </button>
                );
              })}

              {videos.map((vid, vIdx) => {
                const isActive = activeItem.type === 'video' && activeItem.index === vIdx;
                const poster = vid.poster || (vid.type === 'youtube' ? `https://img.youtube.com/vi/${vid.id}/hqdefault.jpg` : '');
                return (
                  <button
                    key={`video-${vIdx}`}
                    type="button"
                    onClick={() => {
                      setIsPlayingVideo(false);
                      setActiveItem({ type: 'video', index: vIdx });
                    }}
                    aria-label={`Play video ${vIdx + 1}`}
                    style={{
                      position: 'relative',
                      flex: '0 0 calc(20% - 5px)',
                      minWidth: '58px',
                      maxWidth: '75px',
                      aspectRatio: '4 / 3',
                      padding: 0,
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: isActive ? '1.5px solid #c9a77c' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: '#121816',
                      cursor: 'pointer',
                      opacity: isActive ? 1 : 0.65,
                      transition: 'opacity 150ms ease, border-color 150ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => !isActive && (e.currentTarget.style.opacity = '0.65')}
                  >
                    {poster ? (
                      <img
                        src={poster}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: '#18221e' }} />
                    )}
                    <span
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      }}
                      aria-hidden="true"
                    >
                      <Play size={13} fill="#c9a77c" color="#c9a77c" />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Details (Scrolls inside popup if content is taller than screen) */}
        <div
          className="igrey-popup-details-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            maxHeight: 'calc(90vh - 40px)',
            paddingRight: '6px',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Row: Small Gold Label & 30px Round Close (X) Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span
              style={{
                fontFamily: "'Manrope', var(--font-sans)",
                fontSize: '11.5px',
                letterSpacing: '0.12em',
                fontWeight: 700,
                color: '#c9a77c',
                textTransform: 'uppercase',
              }}
            >
              {propertyCategory}
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="igrey-popup-close-btn"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '0.5px solid #3a3225',
                color: '#FAF8F4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 150ms ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(201, 167, 124, 0.15)';
                e.currentTarget.style.color = '#c9a77c';
                e.currentTarget.style.borderColor = '#c9a77c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.color = '#FAF8F4';
                e.currentTarget.style.borderColor = '#3a3225';
              }}
            >
              <X size={15} strokeWidth={2.2} />
            </button>
          </div>

          {/* Title in Cormorant Garamond 26px */}
          <h2
            id="property-popup-title"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '26px',
              fontWeight: 500,
              color: '#F4F0E7',
              lineHeight: 1.2,
              margin: '2px 0 6px 0',
              letterSpacing: '-0.01em',
            }}
          >
            {property.title}
          </h2>

          {/* Location line with gold map-pin icon and ID chip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: "'Manrope', var(--font-sans)",
                fontSize: '13px',
                color: '#cfc7b6',
              }}
            >
              <MapPin size={14} color="#c9a77c" style={{ flexShrink: 0 }} />
              <span>
                {property.locality ? `${property.locality}, ` : ''}
                {property.city || 'Mysuru'}
              </span>
            </div>

            <span
              style={{
                backgroundColor: '#121816',
                border: '0.5px solid #3a3225',
                padding: '2px 8px',
                borderRadius: '6px',
                fontFamily: "'Manrope', var(--font-sans)",
                fontSize: '11.5px',
                color: '#b9b2a2',
                fontWeight: 500,
              }}
            >
              ID: {property.propertyId}
            </span>
          </div>

          {/* Price Box (background #121816, border 0.5px solid #3a3225, radius 10px) */}
          <div
            style={{
              backgroundColor: '#121816',
              border: '0.5px solid #3a3225',
              borderRadius: '10px',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
            }}
          >
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Manrope', var(--font-sans)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8F9E98',
                  marginBottom: '2px',
                }}
              >
                SALE PRICE
              </span>
              <span
                style={{
                  fontFamily: "'Manrope', var(--font-sans)",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                {property.price}
              </span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Manrope', var(--font-sans)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8F9E98',
                  marginBottom: '2px',
                }}
              >
                AREA
              </span>
              <span
                style={{
                  fontFamily: "'Manrope', var(--font-sans)",
                  fontSize: '19px',
                  fontWeight: 600,
                  color: '#FAF8F4',
                }}
              >
                {areaText}
              </span>
            </div>
          </div>

          {/* "About this property" box (Hide if no description) */}
          {description && (
            <div style={{ marginBottom: '14px' }}>
              <h3
                style={{
                  fontFamily: "'Manrope', var(--font-sans)",
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FAF8F4',
                  margin: '0 0 5px 0',
                }}
              >
                About this property
              </h3>
              <p
                style={{
                  fontFamily: "'Manrope', var(--font-sans)",
                  fontSize: '13px',
                  lineHeight: 1.55,
                  color: '#cfc7b6',
                  margin: 0,
                }}
              >
                {description}
              </p>
            </div>
          )}

          {/* Highlight chips (Hide if no highlights) */}
          {highlights.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '14px',
              }}
            >
              {highlights.map((chip, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#121816',
                    border: '0.5px solid #3a3225',
                    borderRadius: '999px',
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontFamily: "'Manrope', var(--font-sans)",
                    color: '#DCD7CB',
                  }}
                >
                  <Home size={13} color="#c9a77c" style={{ flexShrink: 0 }} />
                  <span>{chip}</span>
                </div>
              ))}
            </div>
          )}

          {/* "Included amenities and features" (Hide if no amenities) */}
          {amenities.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h3
                style={{
                  fontFamily: "'Manrope', var(--font-sans)",
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FAF8F4',
                  margin: '0 0 10px 0',
                }}
              >
                Included amenities and features
              </h3>

              <div
                className="igrey-popup-amenities-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px 14px',
                }}
              >
                {amenities.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      fontFamily: "'Manrope', var(--font-sans)",
                      fontSize: '13px',
                      color: '#DCD7CB',
                    }}
                  >
                    <CheckCircle2 size={14} color="#c9a77c" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full-width gold button "Enquire about this property →" */}
          <div className="igrey-popup-cta-container" style={{ marginTop: 'auto', paddingTop: '4px' }}>
            <button
              type="button"
              onClick={handleEnquireClick}
              style={{
                width: '100%',
                height: '42px',
                backgroundColor: '#c9a77c',
                color: '#0f1513',
                border: 'none',
                borderRadius: '8px',
                fontFamily: "'Manrope', var(--font-sans)",
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 150ms ease, transform 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d8b990';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#c9a77c';
              }}
            >
              <span>Enquire about this property</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes igreyModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes igreyModalScaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes igreyModalSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        @keyframes igreySkeletonShimmer {
          0% { opacity: 0.5; }
          50% { opacity: 0.85; }
          100% { opacity: 0.5; }
        }

        /* Subtle scrollbar for details column */
        .igrey-popup-details-col::-webkit-scrollbar {
          width: 5px;
        }
        .igrey-popup-details-col::-webkit-scrollbar-track {
          background: transparent;
        }
        .igrey-popup-details-col::-webkit-scrollbar-thumb {
          background: rgba(201, 167, 124, 0.25);
          border-radius: 4px;
        }
        .igrey-popup-details-col::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 167, 124, 0.5);
        }

        /* Mobile Layout (< 768px): Near full-screen bottom sheet */
        @media (max-width: 767px) {
          .igrey-popup-card {
            width: 100vw !important;
            max-width: 100vw !important;
            max-height: 94vh !important;
            height: 94vh !important;
            border-radius: 18px 18px 0 0 !important;
            padding: 16px 16px 0 16px !important;
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            grid-template-columns: 1fr !important;
            gap: 14px !important;
            overflow-y: auto !important;
            animation: igreyModalSlideUp 250ms cubic-bezier(0.16, 1, 0.3, 1) !important;
            box-sizing: border-box !important;
          }

          .igrey-popup-gallery-col {
            width: 100% !important;
          }

          .igrey-popup-details-col {
            max-height: none !important;
            overflow-y: visible !important;
            padding-right: 0 !important;
            padding-bottom: 74px !important; /* space for sticky button */
          }

          .igrey-popup-cta-container {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            background-color: #0f1513 !important;
            border-top: 0.5px solid #3a3225 !important;
            padding: 12px 16px !important;
            z-index: 10 !important;
            box-sizing: border-box !important;
          }

          .igrey-popup-close-btn {
            position: absolute !important;
            top: 14px !important;
            right: 14px !important;
            z-index: 15 !important;
            background-color: rgba(15, 21, 19, 0.85) !important;
            backdrop-filter: blur(6px) !important;
          }
        }

        /* Very narrow screens (< 360px) */
        @media (max-width: 359px) {
          .igrey-popup-amenities-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .igrey-popup-card,
          div[role="dialog"] {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PropertyDetailsModal;
