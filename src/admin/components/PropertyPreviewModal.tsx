import React, { useState } from 'react';
import { X, Tag, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Car } from 'lucide-react';
import type { AdminProperty } from '../types';

interface PropertyPreviewModalProps {
  isOpen: boolean;
  property: AdminProperty;
  onClose: () => void;
  onPublish?: () => void;
}

export const PropertyPreviewModal: React.FC<PropertyPreviewModalProps> = ({
  isOpen,
  property,
  onClose,
  onPublish,
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'page'>('card');
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!isOpen) return null;

  const images = property.galleryImages && property.galleryImages.length > 0
    ? property.galleryImages
    : [property.coverImage];

  const currentImg = images[activeImgIdx] || property.coverImage;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 10, 8, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#090D0B',
          border: '1px solid rgba(197, 168, 128, 0.35)',
          borderRadius: '14px',
          maxWidth: '920px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(198, 166, 106, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0E1B17',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '20px',
                color: '#F4F0E7',
                fontWeight: 500,
              }}
            >
              Public Website Live Preview
            </span>
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'rgba(11, 23, 20, 0.8)',
                padding: '3px',
                borderRadius: '6px',
                border: '0.5px solid rgba(198, 166, 106, 0.2)',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'card' ? 'rgba(198, 166, 106, 0.25)' : 'transparent',
                  color: activeTab === 'card' ? '#c9a77c' : '#8F9E98',
                  fontWeight: activeTab === 'card' ? 600 : 400,
                }}
              >
                Card View
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('page')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'page' ? 'rgba(198, 166, 106, 0.25)' : 'transparent',
                  color: activeTab === 'page' ? '#c9a77c' : '#8F9E98',
                  fontWeight: activeTab === 'page' ? 600 : 400,
                }}
              >
                Detail Showcase
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {onPublish && property.status !== 'Active' && (
              <button
                type="button"
                onClick={() => {
                  onPublish();
                  onClose();
                }}
                style={{
                  padding: '7px 16px',
                  backgroundColor: '#c9a77c',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#090D0B',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <CheckCircle2 size={14} />
                Publish Listing
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#8F9E98',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div style={{ padding: '30px 24px', overflowY: 'auto', flexGrow: 1 }}>
          {activeTab === 'card' ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  maxWidth: '380px',
                  width: '100%',
                  backgroundColor: '#0F1613',
                  border: '1px solid rgba(197, 168, 128, 0.25)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* Image Area with Carousel */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/11', backgroundColor: '#090D0B' }}>
                  <img
                    src={currentImg}
                    alt={property.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Status Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--bronze, #C5A880)',
                      fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '1px',
                    }}
                  >
                    {property.status === 'Active' ? 'AVAILABLE' : property.status.toUpperCase()}
                  </span>

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveImgIdx((p) => (p - 1 + images.length) % images.length)}
                        style={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(9, 13, 11, 0.75)',
                          border: 'none',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveImgIdx((p) => (p + 1) % images.length)}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(9, 13, 11, 0.75)',
                          border: 'none',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}
                </div>

                {/* Card Body */}
                <div style={{ padding: '22px 24px', backgroundColor: '#0F1613' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                        fontSize: '11px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#c9a77c',
                        fontWeight: 600,
                      }}
                    >
                      {property.propertyType.toUpperCase()} • {property.bedrooms} BHK
                    </span>
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                      }}
                    >
                      {property.price}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '22px',
                      lineHeight: 1.25,
                      color: '#FAF8F4',
                      fontWeight: 400,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {property.title}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'rgba(237, 232, 223, 0.65)',
                      fontSize: '13px',
                      marginBottom: '18px',
                    }}
                  >
                    <span style={{ color: '#c9a77c', fontSize: '11px' }}>✦</span>
                    <span>
                      {property.locality || property.city} • ID: {property.propertyId}
                    </span>
                  </div>

                  {/* Row 4: Property for Sale + Inquire */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '6px',
                      borderTop: '0.5px solid rgba(197, 168, 128, 0.12)',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#b9b2a2',
                        fontFamily: "'Manrope', var(--font-sans)",
                        fontSize: '12.5px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Tag size={14} color="#c9a77c" />
                      <span>{property.listingType === 'For Sale' ? 'Property for Sale' : 'Property for Rent'}</span>
                    </span>

                    <span
                      style={{
                        color: '#FAF8F4',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <span>Inquire</span>
                      <ArrowRight size={14} color="#c9a77c" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Detail Showcase View */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }} className="preview-detail-grid">
                <div>
                  <div style={{ width: '100%', height: '340px', borderRadius: '8px', overflow: 'hidden', marginBottom: '14px' }}>
                    <img src={currentImg} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  {images.length > 1 && (
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
                      {images.map((img, i) => (
                        <div
                          key={i}
                          onClick={() => setActiveImgIdx(i)}
                          style={{
                            width: '70px',
                            height: '52px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: i === activeImgIdx ? '2px solid #c9a77c' : '1px solid rgba(198, 166, 106, 0.2)',
                            opacity: i === activeImgIdx ? 1 : 0.65,
                            flexShrink: 0,
                          }}
                        >
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ marginTop: '24px' }}>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', color: '#F4F0E7', marginBottom: '10px' }}>
                      Architectural Overview
                    </h4>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', var(--font-sans)", fontSize: '13.5px', lineHeight: 1.7, color: '#DCD7CB' }}>
                      {property.fullDescription || property.shortDescription}
                    </p>
                  </div>
                </div>

                <div>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                      fontSize: '11px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#c9a77c',
                      fontWeight: 600,
                    }}
                  >
                    {property.propertyType} • {property.listingType}
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '32px',
                      color: '#F4F0E7',
                      margin: '6px 0 12px 0',
                    }}
                  >
                    {property.title}
                  </h2>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px' }}>
                    {property.price}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cfc7b6', fontSize: '13px', marginBottom: '22px' }}>
                    <MapPin size={15} color="#c9a77c" />
                    <span>
                      {property.address ? `${property.address}, ` : ''}{property.locality}, {property.city}
                    </span>
                  </div>

                  {/* Highlights Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px',
                      padding: '16px',
                      backgroundColor: '#10221D',
                      border: '0.5px solid rgba(198, 166, 106, 0.22)',
                      borderRadius: '8px',
                      marginBottom: '24px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DCD7CB', fontSize: '13px' }}>
                      <Bed size={16} color="#c9a77c" />
                      <span>{property.bedrooms} Bedrooms</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DCD7CB', fontSize: '13px' }}>
                      <Bath size={16} color="#c9a77c" />
                      <span>{property.bathrooms} Bathrooms</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DCD7CB', fontSize: '13px' }}>
                      <Square size={16} color="#c9a77c" />
                      <span>{property.builtUpArea}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DCD7CB', fontSize: '13px' }}>
                      <Car size={16} color="#c9a77c" />
                      <span>{property.parking} Parking</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  {property.amenities && property.amenities.length > 0 && (
                    <div>
                      <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', color: '#F4F0E7', marginBottom: '10px' }}>
                        Features &amp; Amenities
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {property.amenities.map((a, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '4px 10px',
                              backgroundColor: 'rgba(198, 166, 106, 0.12)',
                              border: '0.5px solid rgba(198, 166, 106, 0.25)',
                              borderRadius: '4px',
                              fontSize: '12px',
                              color: '#c9a77c',
                            }}
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid rgba(198, 166, 106, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0E1B17',
          }}
        >
          <span style={{ fontSize: '12px', color: '#8F9E98' }}>
            ID: <strong style={{ color: '#c9a77c' }}>{property.propertyId}</strong> • Status: {property.status}
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 18px',
              backgroundColor: 'transparent',
              border: '0.5px solid rgba(198, 166, 106, 0.3)',
              borderRadius: '6px',
              color: '#DCD7CB',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Back to Edit
          </button>
        </div>
      </div>
    </div>
  );
};
