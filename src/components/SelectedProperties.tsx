import React, { useState, useMemo } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { PROPERTIES_DATA } from '../data/propertiesData';
import { PropertyCard } from './PropertyCard';

export interface SelectedPropertiesProps {
  onSelectProperty?: (propertyId: string) => void;
}

type FilterKey =
  | 'all'
  | 'sale'
  | 'rent'
  | 'lease'
  | 'residential'
  | 'commercial'
  | 'land'
  | 'office-warehouse';

interface FilterOption {
  key: FilterKey;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'All Properties' },
  { key: 'sale', label: 'For Sale' },
  { key: 'rent', label: 'For Rent' },
  { key: 'lease', label: 'For Lease' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'land', label: 'Land / Plots' },
  { key: 'office-warehouse', label: 'Office, Shop / Showroom and Warehouse' },
];

export const SelectedProperties: React.FC<SelectedPropertiesProps> = ({ onSelectProperty }) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Enforce CRITICAL requirement: Only render verified properties (verified === true)
  const verifiedProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => p && p.verified === true);
  }, []);

  // Filter across ALL verified properties, not just visible ones
  const filteredProperties = useMemo(() => {
    return verifiedProperties.filter((p) => {
      switch (activeFilter) {
        case 'all':
          return true;

        case 'sale':
          return p.listingType === 'sale';

        case 'rent':
          return p.listingType === 'rent';

        case 'lease':
          return p.listingType === 'lease';

        case 'residential': {
          const cat = (p.category || '').toLowerCase();
          const t = (p.type || '').toLowerCase();
          return (
            cat === 'residential' ||
            t.includes('villa') ||
            t.includes('apartment') ||
            t.includes('residence') ||
            t.includes('penthouse') ||
            t.includes('duplex')
          );
        }

        case 'commercial': {
          const cat = (p.category || '').toLowerCase();
          const t = (p.type || '').toLowerCase();
          return (
            cat.includes('commercial') ||
            cat.includes('office') ||
            t.includes('office') ||
            t.includes('shop') ||
            t.includes('showroom') ||
            t.includes('warehouse') ||
            t.includes('commercial')
          );
        }

        case 'land': {
          const cat = (p.category || '').toLowerCase();
          const t = (p.type || '').toLowerCase();
          return (
            cat.includes('land') ||
            cat.includes('plot') ||
            t.includes('land') ||
            t.includes('plot')
          );
        }

        case 'office-warehouse': {
          const cat = (p.category || '').toLowerCase();
          const t = (p.type || '').toLowerCase();
          return (
            cat === 'office, shop / showroom and warehouse' ||
            t.includes('office') ||
            t.includes('shop') ||
            t.includes('showroom') ||
            t.includes('warehouse') ||
            t.includes('logistics')
          );
        }

        default:
          return true;
      }
    });
  }, [verifiedProperties, activeFilter]);

  // Show the first 6 matching properties in the Featured section
  const displayedProperties = useMemo(() => {
    return filteredProperties.slice(0, 6);
  }, [filteredProperties]);

  const totalMatching = filteredProperties.length;

  return (
    <section
      id="properties"
      className="properties-section section-05"
      style={{
        backgroundColor: '#0A0F0E',
        color: '#FFFFFF',
        padding: 'clamp(80px, 8vw, 120px) 0',
        position: 'relative',
        borderBottom: '1px solid #1F2B27',
      }}
      aria-labelledby="heading-featured-properties"
    >
      <div
        className="container"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 4vw, 3.5rem)',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          <div style={{ maxWidth: '780px' }}>
            <span
              className="section-eyebrow"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12.5px',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#DEB686',
                display: 'inline-block',
                marginBottom: '12px',
              }}
            >
              Featured & Available Properties
            </span>

            <h2
              id="heading-featured-properties"
              className="section-heading"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.4vw, 3.8rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                color: '#FFFFFF',
                letterSpacing: '-0.015em',
                margin: '0 0 16px 0',
              }}
            >
              Find Your <em className="accent-phrase" style={{ fontStyle: 'italic', color: '#E8DCC4' }}>Next Space.</em>
            </h2>

            <p
              className="section-lead"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15px, 1.1vw, 17px)',
                lineHeight: 1.7,
                color: '#A3AEA9',
                margin: 0,
              }}
            >
              Discover properties that match your lifestyle, business needs or investment objectives. Explore available homes, commercial spaces and other real estate opportunities through iGREY HOLDINGS.
            </p>
          </div>

          <div>
            <a
              href="./properties.html"
              className="btn-secondary-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                textDecoration: 'none',
                fontSize: '13.5px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                borderRadius: '8px',
              }}
              aria-label="View all properties catalogue page"
            >
              <span>View All Properties</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Filter Chips Bar (Single-Select) */}
        <div
          className="filter-chips-wrapper"
          role="toolbar"
          aria-label="Filter properties by category or transaction type"
          style={{ marginBottom: '28px' }}
        >
          <div className="filter-chips-scroll">
            {FILTER_OPTIONS.map((f) => {
              const isActive = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  className={`filter-chip ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f.key)}
                  aria-pressed={isActive}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary Info Bar: Count & Verified Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '28px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(31, 43, 39, 0.6)',
            fontSize: '13.5px',
            color: '#A3AEA9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>
              Showing <strong style={{ color: '#FFFFFF' }}>{displayedProperties.length}</strong> of{' '}
              <strong style={{ color: '#DEB686' }}>{totalMatching}</strong> matching properties
            </span>
            {totalMatching > 6 && (
              <span style={{ fontSize: '12px', color: '#DEB686', fontStyle: 'italic' }}>
                (Top 6 featured here)
              </span>
            )}
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(39, 141, 101, 0.12)',
              border: '1px solid rgba(39, 141, 101, 0.35)',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '12px',
              color: '#4cd984',
              fontWeight: 500,
            }}
          >
            <ShieldCheck size={14} color="#4cd984" />
            <span>100% Authorised &amp; Verified Listings</span>
          </div>
        </div>

        {/* Property Cards Grid (Shared PropertyCard) */}
        {displayedProperties.length === 0 ? (
          <div
            style={{
              padding: '64px 24px',
              textAlign: 'center',
              backgroundColor: '#0D1513',
              border: '1px solid #1F2B27',
              borderRadius: '16px',
              margin: '20px 0',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '28px',
                color: '#FAF8F4',
                margin: '0 0 12px',
                fontWeight: 400,
              }}
            >
              No properties match this filter
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                color: '#A3AEA9',
                maxWidth: '440px',
                margin: '0 auto 24px',
              }}
            >
              We are actively onboarding exclusive opportunities across this category. Reset filters to view all available listings.
            </p>
            <button
              type="button"
              className="btn-primary-gold"
              onClick={() => setActiveFilter('all')}
            >
              Reset to All Properties
            </button>
          </div>
        ) : (
          <div className="property-cards-grid">
            {displayedProperties.map((prop, idx) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                index={idx}
                onSelect={(selected) => {
                  if (onSelectProperty) {
                    onSelectProperty(selected.id);
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA to View All Properties */}
        <div
          style={{
            marginTop: '48px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <a
            href="./properties.html"
            className="btn-primary-gold"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 36px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '8px',
            }}
            aria-label="View all properties in the full portfolio"
          >
            <span>View All Properties ({verifiedProperties.length} Total Portfolio)</span>
            <ArrowRight size={16} />
          </a>
          <span style={{ fontSize: '12.5px', color: '#A3AEA9' }}>
            Browse full portfolio with advanced search, leasing criteria, and commercial occupancy tools.
          </span>
        </div>
      </div>
    </section>
  );
};
