import React, { useState } from 'react';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Edit3,
  ExternalLink,
  Trash2,
  MoreVertical,
  Check,
} from 'lucide-react';
import type { AdminProperty, PropertyStatus } from '../types';

interface PropertyCardAdminProps {
  property: AdminProperty;
  onEdit: (property: AdminProperty) => void;
  onPreview: (property: AdminProperty) => void;
  onDelete: (property: AdminProperty) => void;
  onStatusChange: (property: AdminProperty, newStatus: PropertyStatus) => void;
}

export const PropertyCardAdmin: React.FC<PropertyCardAdminProps> = ({
  property,
  onEdit,
  onPreview,
  onDelete,
  onStatusChange,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getStatusBadge = (status: PropertyStatus) => {
    switch (status) {
      case 'Active':
        return { bg: 'rgba(46, 204, 113, 0.15)', text: '#2ecc71', border: 'rgba(46, 204, 113, 0.35)' };
      case 'Draft':
        return { bg: 'rgba(230, 126, 34, 0.15)', text: '#e67e22', border: 'rgba(230, 126, 34, 0.35)' };
      case 'Sold':
        return { bg: 'rgba(155, 89, 182, 0.15)', text: '#9b59b6', border: 'rgba(155, 89, 182, 0.35)' };
      case 'Rented':
        return { bg: 'rgba(52, 152, 219, 0.15)', text: '#3498db', border: 'rgba(52, 152, 219, 0.35)' };
      case 'Archived':
      default:
        return { bg: 'rgba(149, 165, 166, 0.15)', text: '#95a5a6', border: 'rgba(149, 165, 166, 0.35)' };
    }
  };

  const badge = getStatusBadge(property.status);
  const formattedDate = new Date(property.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      style={{
        backgroundColor: '#10221D',
        border: '0.5px solid rgba(198, 166, 106, 0.22)',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'all 240ms ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      }}
      className="admin-property-card"
    >
      {/* Top Image Section */}
      <div style={{ position: 'relative', width: '100%', height: '190px', backgroundColor: '#0B1714' }}>
        <img
          src={property.coverImage}
          alt={property.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              padding: '4px 9px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              backgroundColor: badge.bg,
              color: badge.text,
              border: `0.5px solid ${badge.border}`,
              backdropFilter: 'blur(6px)',
              pointerEvents: 'auto',
            }}
          >
            {property.status}
          </span>

          <span
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 600,
              backgroundColor: 'rgba(11, 23, 20, 0.85)',
              color: '#c9a77c',
              border: '0.5px solid rgba(198, 166, 106, 0.3)',
              backdropFilter: 'blur(6px)',
            }}
          >
            {property.listingType}
          </span>
        </div>

        {/* ID Pill on Bottom of Image */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            backgroundColor: 'rgba(11, 23, 20, 0.85)',
            border: '0.5px solid rgba(198, 166, 106, 0.25)',
            borderRadius: '4px',
            padding: '2px 7px',
            fontSize: '11px',
            color: '#DCD7CB',
            fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
          }}
        >
          ID: {property.propertyId}
        </div>
      </div>

      {/* Body Information */}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#c9a77c',
                fontWeight: 600,
                display: 'block',
                marginBottom: '2px',
              }}
            >
              {property.propertyType}
            </span>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '20px',
                color: '#F4F0E7',
                fontWeight: 500,
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              {property.title}
            </h3>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
                fontSize: '18px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              {property.price}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#8F9E98', fontSize: '12.5px', marginBottom: '16px' }}>
          <MapPin size={13} color="#c9a77c" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {property.locality}, {property.city}
          </span>
        </div>

        {/* Specs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            padding: '10px 12px',
            backgroundColor: '#0B1714',
            borderRadius: '6px',
            border: '0.5px solid rgba(198, 166, 106, 0.12)',
            marginBottom: '16px',
            fontSize: '12px',
            color: '#DCD7CB',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Bed size={13} color="#c9a77c" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Bath size={13} color="#c9a77c" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Square size={13} color="#c9a77c" />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {property.builtUpArea}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px', borderTop: '0.5px solid rgba(198, 166, 106, 0.12)' }}>
          <span style={{ fontSize: '11px', color: '#8F9E98' }}>Updated {formattedDate}</span>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
            <button
              type="button"
              onClick={() => onPreview(property)}
              title="Preview on Public Website"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: 'rgba(198, 166, 106, 0.08)',
                border: '0.5px solid rgba(198, 166, 106, 0.25)',
                color: '#c9a77c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ExternalLink size={14} />
            </button>

            <button
              type="button"
              onClick={() => onEdit(property)}
              title="Edit Property"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: 'rgba(198, 166, 106, 0.08)',
                border: '0.5px solid rgba(198, 166, 106, 0.25)',
                color: '#c9a77c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Edit3 size={14} />
            </button>

            {/* Status Change Dropdown Menu */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Change Status & Actions"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: 'rgba(198, 166, 106, 0.08)',
                border: '0.5px solid rgba(198, 166, 106, 0.25)',
                color: '#DCD7CB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <MoreVertical size={14} />
            </button>

            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: '38px',
                  backgroundColor: '#0E1B17',
                  border: '1px solid rgba(198, 166, 106, 0.3)',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65)',
                  minWidth: '150px',
                  zIndex: 20,
                  padding: '6px',
                }}
              >
                <div style={{ fontSize: '10.5px', color: '#8F9E98', padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Set Status
                </div>
                {(['Active', 'Draft', 'Sold', 'Rented', 'Archived'] as PropertyStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      onStatusChange(property, st);
                      setMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      backgroundColor: property.status === st ? 'rgba(198, 166, 106, 0.15)' : 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      color: property.status === st ? '#c9a77c' : '#DCD7CB',
                      fontSize: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{st}</span>
                    {property.status === st && <Check size={12} color="#c9a77c" />}
                  </button>
                ))}

                <div style={{ height: '1px', backgroundColor: 'rgba(198, 166, 106, 0.15)', margin: '4px 0' }} />

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(property);
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#e07a6f',
                    fontSize: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Trash2 size={12} />
                  <span>Delete Listing</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
