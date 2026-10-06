import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Shield,
  CheckCircle2,
  Share2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Building2,
} from 'lucide-react';
import { propertyService } from '../admin/services/propertyService';
import type { AdminProperty } from '../admin/types';

interface PropertyDetailsProps {
  propertyId: string;
  onBack: () => void;
  onEnquire: (property: AdminProperty) => void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  propertyId,
  onBack,
  onEnquire,
}) => {
  const [property, setProperty] = useState<AdminProperty | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const found = await propertyService.getPropertyById(propertyId);
        if (isMounted) {
          setProperty(found);
          setActiveImageIdx(0);
        }
      } catch (err) {
        console.error('Failed to load property details:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProperty();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, [propertyId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.title || 'iGREY Holdings Luxury Residence',
          text: `Explore ${property?.title} in ${property?.locality || property?.city}`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Ignore
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '80vh',
          backgroundColor: '#090D0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c9a77c',
          fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
          fontSize: '15px',
          letterSpacing: '0.05em',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              border: '2px solid rgba(201, 167, 124, 0.2)',
              borderTopColor: '#c9a77c',
              borderRadius: '50%',
              margin: '0 auto 16px auto',
              animation: 'spin 1s linear infinite',
            }}
          />
          Loading Architectural Residence...
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!property) {
    return (
      <div
        style={{
          minHeight: '80vh',
          backgroundColor: '#090D0B',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FAF8F4',
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        <Building2 size={48} color="#c9a77c" style={{ marginBottom: '16px' }} />
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '32px',
            color: '#F4F0E7',
            marginBottom: '10px',
          }}
        >
          Residence Listing Not Found
        </h2>
        <p
          style={{
            color: '#8F9E98',
            fontSize: '14px',
            maxWidth: '420px',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          The property identifier <code style={{ color: '#c9a77c' }}>{propertyId}</code> could not be located in our active private portfolio.
        </p>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: '12px 24px',
            backgroundColor: '#c9a77c',
            color: '#0B1714',
            border: 'none',
            borderRadius: '2px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ArrowLeft size={16} />
          <span>Return to Curated Portfolio</span>
        </button>
      </div>
    );
  }

  const gallery = property.galleryImages && property.galleryImages.length > 0
    ? property.galleryImages
    : [property.coverImage];

  const totalImages = gallery.length;
  const currentImage = gallery[activeImageIdx] || property.coverImage;

  return (
    <div
      style={{
        backgroundColor: '#090D0B',
        color: '#FAF8F4',
        minHeight: '100vh',
        position: 'relative',
        paddingBottom: '80px',
      }}
    >
      {/* Top Breadcrumb & Action Bar */}
      <div
        style={{
          borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
          backgroundColor: '#0D1411',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#c9a77c',
              fontSize: '13px',
              fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              padding: '6px 0',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <ArrowLeft size={16} />
            <span>Back to Curated Properties</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={handleShare}
              style={{
                backgroundColor: 'rgba(201, 167, 124, 0.1)',
                border: '1px solid rgba(201, 167, 124, 0.25)',
                color: '#c9a77c',
                padding: '8px 14px',
                borderRadius: '2px',
                fontSize: '12px',
                fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Share2 size={13} />
              <span>{copiedLink ? 'Link Copied!' : 'Share Residence'}</span>
            </button>

            <button
              type="button"
              onClick={() => onEnquire(property)}
              style={{
                backgroundColor: '#c9a77c',
                border: 'none',
                color: '#0B1714',
                padding: '8px 18px',
                borderRadius: '2px',
                fontSize: '12px',
                fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <span>Enquire Now</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(24px, 4vw, 44px) 24px' }}>
        {/* Header Block: Title, Location, ID & Price */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          <div style={{ flex: '1 1 540px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  backgroundColor: 'rgba(201, 167, 124, 0.15)',
                  border: '1px solid rgba(201, 167, 124, 0.35)',
                  color: '#c9a77c',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '2px',
                }}
              >
                {property.propertyType}
              </span>

              <span
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#090D0B',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '2px',
                }}
              >
                {property.listingType === 'For Sale' ? 'Property for Sale' : 'Property for Rent'}
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#b9b2a2',
                  fontSize: '12px',
                  fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                }}
              >
                <span style={{ color: '#c9a77c' }}>✦</span>
                <span>ID: <strong>{property.propertyId}</strong></span>
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                lineHeight: 1.15,
                color: '#FAF8F4',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                margin: '0 0 12px 0',
              }}
            >
              {property.title}
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#DCD7CB',
                fontSize: '14px',
              }}
            >
              <MapPin size={16} color="#c9a77c" style={{ flexShrink: 0 }} />
              <span>
                {property.address ? `${property.address}, ` : ''}
                {property.locality ? `${property.locality}, ` : ''}
                {property.city}, {property.state}
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div
            style={{
              backgroundColor: '#0F1613',
              border: '1px solid rgba(197, 168, 128, 0.25)',
              padding: '16px 24px',
              borderRadius: '2px',
              textAlign: 'right',
            }}
            className="property-details-price-card"
          >
            <span
              style={{
                display: 'block',
                fontSize: '11.5px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#8F9E98',
                marginBottom: '4px',
              }}
            >
              Offered Price
            </span>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                fontSize: 'clamp(26px, 3.2vw, 34px)',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              {property.price}
            </div>
            <span style={{ fontSize: '11.5px', color: '#c9a77c' }}>
              {property.possession || 'Ready to Move'}
            </span>
          </div>
        </div>

        {/* Media & Key Specs Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.1fr)',
            gap: '32px',
            alignItems: 'start',
            marginBottom: '40px',
          }}
          className="property-details-main-grid"
        >
          {/* Left Column: Gallery & Visual Showcase */}
          <div>
            {/* Primary Featured Image Viewer */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(320px, 45vw, 520px)',
                backgroundColor: '#121816',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(197, 168, 128, 0.2)',
                marginBottom: '14px',
              }}
            >
              <img
                src={currentImage}
                alt={property.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />

              {/* Status Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: '#FFFFFF',
                  color: '#9a7432',
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                {property.status === 'Active' ? 'AVAILABLE' : property.status.toUpperCase()}
              </div>

              {/* Photo Counter Pill */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(10, 16, 13, 0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FAF8F4',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{activeImageIdx + 1}</span>
                <span style={{ opacity: 0.6 }}>/</span>
                <span>{totalImages}</span>
              </div>

              {/* Previous / Next Arrow Controls */}
              {totalImages > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIdx((prev) => (prev - 1 + totalImages) % totalImages)
                    }
                    aria-label="Previous image"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '12px',
                      transform: 'translateY(-50%)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.85)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)')}
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIdx((prev) => (prev + 1) % totalImages)
                    }
                    aria-label="Next image"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '12px',
                      transform: 'translateY(-50%)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.85)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)')}
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {totalImages > 1 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(totalImages, 6)}, 1fr)`,
                  gap: '10px',
                }}
              >
                {gallery.map((imgUrl, idx) => {
                  const isActive = idx === activeImageIdx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      style={{
                        position: 'relative',
                        height: '75px',
                        border: isActive
                          ? '2px solid #c9a77c'
                          : '1px solid rgba(197, 168, 128, 0.2)',
                        padding: 0,
                        backgroundColor: '#121816',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        opacity: isActive ? 1 : 0.65,
                        transition: 'opacity 0.2s ease, border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => !isActive && (e.currentTarget.style.opacity = '0.65')}
                    >
                      <img
                        src={imgUrl}
                        alt={`${property.title} thumbnail ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Advisory Action Card & Essential Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Quick Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#0F1613',
                  border: '1px solid rgba(197, 168, 128, 0.18)',
                  padding: '16px 14px',
                  borderRadius: '2px',
                  textAlign: 'center',
                }}
              >
                <Bed size={20} color="#c9a77c" style={{ margin: '0 auto 6px auto' }} />
                <span style={{ display: 'block', fontSize: '11px', color: '#8F9E98', textTransform: 'uppercase' }}>
                  Bedrooms
                </span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#FAF8F4' }}>
                  {property.bedrooms} BHK
                </span>
              </div>

              <div
                style={{
                  backgroundColor: '#0F1613',
                  border: '1px solid rgba(197, 168, 128, 0.18)',
                  padding: '16px 14px',
                  borderRadius: '2px',
                  textAlign: 'center',
                }}
              >
                <Bath size={20} color="#c9a77c" style={{ margin: '0 auto 6px auto' }} />
                <span style={{ display: 'block', fontSize: '11px', color: '#8F9E98', textTransform: 'uppercase' }}>
                  Bathrooms
                </span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#FAF8F4' }}>
                  {property.bathrooms} Baths
                </span>
              </div>

              <div
                style={{
                  backgroundColor: '#0F1613',
                  border: '1px solid rgba(197, 168, 128, 0.18)',
                  padding: '16px 14px',
                  borderRadius: '2px',
                  textAlign: 'center',
                }}
              >
                <Maximize2 size={20} color="#c9a77c" style={{ margin: '0 auto 6px auto' }} />
                <span style={{ display: 'block', fontSize: '11px', color: '#8F9E98', textTransform: 'uppercase' }}>
                  Area
                </span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FAF8F4' }}>
                  {property.builtUpArea || '1,850 sq.ft'}
                </span>
              </div>
            </div>

            {/* Direct Enquiry Card */}
            <div
              style={{
                backgroundColor: '#0E1714',
                border: '1px solid rgba(197, 168, 128, 0.3)',
                padding: '28px 24px',
                borderRadius: '2px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#c9a77c',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}
              >
                <Shield size={14} />
                <span>Verified iGREY Advisory</span>
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '24px',
                  color: '#FAF8F4',
                  margin: '0 0 10px 0',
                  fontWeight: 500,
                }}
              >
                Schedule an In-Person Viewing
              </h3>

              <p
                style={{
                  fontSize: '13.5px',
                  color: '#cfc7b6',
                  lineHeight: 1.55,
                  margin: '0 0 22px 0',
                }}
              >
                Connect directly with our dedicated client partner for title deeds, private inspection dates, and contract terms.
              </p>

              <button
                type="button"
                onClick={() => onEnquire(property)}
                style={{
                  width: '100%',
                  padding: '15px 24px',
                  backgroundColor: '#c9a77c',
                  border: 'none',
                  borderRadius: '2px',
                  color: '#0B1714',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'background-color 0.2s ease',
                  marginBottom: '16px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d8b990')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c9a77c')}
              >
                <span>Enquire About This Property</span>
                <ArrowRight size={16} />
              </button>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  borderTop: '1px solid rgba(197, 168, 128, 0.15)',
                  paddingTop: '16px',
                  fontSize: '12.5px',
                  color: '#b9b2a2',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} color="#c9a77c" />
                  <span>Direct Advisory Desk: <strong>+91 (0) 80 4920 8800</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="#c9a77c" />
                  <span>advisory@igreyholdings.com</span>
                </div>
              </div>
            </div>

            {/* Architectural Highlights / Summary Box */}
            <div
              style={{
                backgroundColor: '#0F1613',
                border: '1px solid rgba(197, 168, 128, 0.18)',
                padding: '22px 20px',
                borderRadius: '2px',
              }}
            >
              <h4
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '18px',
                  color: '#F4F0E7',
                  margin: '0 0 12px 0',
                }}
              >
                Quick Facts &amp; Status
              </h4>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '9px',
                  fontSize: '13px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '7px' }}>
                  <span style={{ color: '#8F9E98' }}>Furnishing</span>
                  <span style={{ color: '#FAF8F4', fontWeight: 600 }}>{property.furnishing || 'Furnished'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '7px' }}>
                  <span style={{ color: '#8F9E98' }}>Possession</span>
                  <span style={{ color: '#FAF8F4', fontWeight: 600 }}>{property.possession || 'Ready to Move'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '7px' }}>
                  <span style={{ color: '#8F9E98' }}>Parking</span>
                  <span style={{ color: '#FAF8F4', fontWeight: 600 }}>{property.parking ? `${property.parking} Reserved Bays` : '2 Covered Bays'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8F9E98' }}>Floor</span>
                  <span style={{ color: '#FAF8F4', fontWeight: 600 }}>
                    {property.floorNumber ? `Floor ${property.floorNumber} of ${property.totalFloors || property.floorNumber}` : 'Prime Residence'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Description, Features Grid, Amenities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* Section 1: Comprehensive Description */}
          <div
            style={{
              backgroundColor: '#0F1613',
              border: '1px solid rgba(197, 168, 128, 0.18)',
              padding: 'clamp(24px, 4vw, 36px)',
              borderRadius: '2px',
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a77c',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              ARCHITECTURAL NARRATIVE
            </span>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(24px, 3vw, 30px)',
                color: '#FAF8F4',
                margin: '0 0 16px 0',
                fontWeight: 400,
              }}
            >
              About the Residence
            </h2>

            <div
              style={{
                fontFamily: "'Manrope', var(--font-sans)",
                fontSize: '15px',
                lineHeight: 1.75,
                color: '#cfc7b6',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <p style={{ margin: 0 }}>
                {property.fullDescription || property.shortDescription}
              </p>
              {property.shortDescription && property.fullDescription && property.shortDescription !== property.fullDescription && (
                <p style={{ margin: 0, fontStyle: 'italic', color: '#b9b2a2' }}>
                  "{property.shortDescription}"
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Property Specifications Grid */}
          <div
            style={{
              backgroundColor: '#0F1613',
              border: '1px solid rgba(197, 168, 128, 0.18)',
              padding: 'clamp(24px, 4vw, 36px)',
              borderRadius: '2px',
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a77c',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              SPECIFICATIONS &amp; CONFIGURATION
            </span>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(24px, 3vw, 30px)',
                color: '#FAF8F4',
                margin: '0 0 24px 0',
                fontWeight: 400,
              }}
            >
              Detailed Specifications
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '18px',
              }}
            >
              <div style={{ backgroundColor: '#121816', padding: '16px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <span style={{ fontSize: '12px', color: '#8F9E98', display: 'block', marginBottom: '4px' }}>Property ID</span>
                <span style={{ fontSize: '15px', color: '#FAF8F4', fontWeight: 600 }}>{property.propertyId}</span>
              </div>

              <div style={{ backgroundColor: '#121816', padding: '16px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <span style={{ fontSize: '12px', color: '#8F9E98', display: 'block', marginBottom: '4px' }}>Built-Up Area</span>
                <span style={{ fontSize: '15px', color: '#FAF8F4', fontWeight: 600 }}>{property.builtUpArea || '1,850 sq.ft'}</span>
              </div>

              {property.carpetArea && (
                <div style={{ backgroundColor: '#121816', padding: '16px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                  <span style={{ fontSize: '12px', color: '#8F9E98', display: 'block', marginBottom: '4px' }}>Carpet Area</span>
                  <span style={{ fontSize: '15px', color: '#FAF8F4', fontWeight: 600 }}>{property.carpetArea}</span>
                </div>
              )}

              <div style={{ backgroundColor: '#121816', padding: '16px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <span style={{ fontSize: '12px', color: '#8F9E98', display: 'block', marginBottom: '4px' }}>Bedrooms &amp; Baths</span>
                <span style={{ fontSize: '15px', color: '#FAF8F4', fontWeight: 600 }}>{property.bedrooms} Beds • {property.bathrooms} Baths</span>
              </div>

              {property.balconies !== undefined && (
                <div style={{ backgroundColor: '#121816', padding: '16px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                  <span style={{ fontSize: '12px', color: '#8F9E98', display: 'block', marginBottom: '4px' }}>Private Balconies</span>
                  <span style={{ fontSize: '15px', color: '#FAF8F4', fontWeight: 600 }}>{property.balconies} Attached</span>
                </div>
              )}

              <div style={{ backgroundColor: '#121816', padding: '16px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <span style={{ fontSize: '12px', color: '#8F9E98', display: 'block', marginBottom: '4px' }}>Furnishing Status</span>
                <span style={{ fontSize: '15px', color: '#FAF8F4', fontWeight: 600 }}>{property.furnishing || 'Furnished'}</span>
              </div>

              <div style={{ backgroundColor: '#121816', padding: '16px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <span style={{ fontSize: '12px', color: '#8F9E98', display: 'block', marginBottom: '4px' }}>Listing Type</span>
                <span style={{ fontSize: '15px', color: '#FAF8F4', fontWeight: 600 }}>{property.listingType}</span>
              </div>

              <div style={{ backgroundColor: '#121816', padding: '16px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <span style={{ fontSize: '12px', color: '#8F9E98', display: 'block', marginBottom: '4px' }}>Possession</span>
                <span style={{ fontSize: '15px', color: '#FAF8F4', fontWeight: 600 }}>{property.possession || 'Ready to Move'}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Curated Amenities & Features */}
          <div
            style={{
              backgroundColor: '#0F1613',
              border: '1px solid rgba(197, 168, 128, 0.18)',
              padding: 'clamp(24px, 4vw, 36px)',
              borderRadius: '2px',
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a77c',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              SERVICES &amp; CONCIERGE
            </span>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(24px, 3vw, 30px)',
                color: '#FAF8F4',
                margin: '0 0 24px 0',
                fontWeight: 400,
              }}
            >
              Amenities &amp; Features
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '14px',
              }}
            >
              {(property.amenities && property.amenities.length > 0
                ? property.amenities
                : ['Swimming Pool', 'Security', 'CCTV', 'Power Backup', 'Gated Community', 'Balcony', 'Furnished']
              ).map((amenity, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#121816',
                    padding: '12px 16px',
                    borderRadius: '2px',
                    border: '1px solid rgba(197, 168, 128, 0.15)',
                    fontSize: '13.5px',
                    color: '#FAF8F4',
                  }}
                >
                  <CheckCircle2 size={16} color="#c9a77c" style={{ flexShrink: 0 }} />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call to Action Card */}
          <div
            style={{
              backgroundColor: '#101B17',
              border: '1px solid rgba(197, 168, 128, 0.3)',
              padding: 'clamp(32px, 5vw, 48px) 32px',
              borderRadius: '2px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                maxWidth: '620px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#c9a77c',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                BESPOKE PRIVATE INQUIRY
              </span>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(28px, 4vw, 38px)',
                  color: '#FAF8F4',
                  margin: '0 0 14px 0',
                  fontWeight: 400,
                }}
              >
                Inquire Regarding {property.title}
              </h2>

              <p
                style={{
                  color: '#cfc7b6',
                  fontSize: '14.5px',
                  lineHeight: 1.6,
                  marginBottom: '28px',
                }}
              >
                Our residential partners are at your service for contract terms, verified inspection schedules, and comprehensive property documentation.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  type="button"
                  onClick={() => onEnquire(property)}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#c9a77c',
                    color: '#0B1714',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span>Enquire About This Property</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={onBack}
                  style={{
                    padding: '16px 28px',
                    backgroundColor: 'transparent',
                    color: '#c9a77c',
                    border: '1px solid #c9a77c',
                    borderRadius: '2px',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to All Properties</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .property-details-main-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .property-details-price-card {
            text-align: left !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};
