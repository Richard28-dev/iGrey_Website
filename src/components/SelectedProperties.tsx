import React, { useState, useMemo } from 'react';
import { CheckCircle } from 'lucide-react';
import { PROPERTIES_DATA, type PropertyListing } from '../data/propertiesData';
import { PropertiesHeader } from './PropertiesHeader';
import { PropertyCard } from './PropertyCard';
import { InquireDialog } from './InquireDialog';

export interface SelectedPropertiesProps {
  onSelectProperty?: (propertyId: string) => void;
}

export type HomeFilterKey =
  | 'all'
  | 'sale'
  | 'rent'
  | 'lease'
  | 'residential'
  | 'commercial'
  | 'land'
  | 'office'
  | 'shop'
  | 'warehouse';

export interface FilterTabItem {
  key: HomeFilterKey;
  label: string;
}

export const HOME_FILTER_PILLS: FilterTabItem[] = [
  { key: 'all', label: 'All Properties' },
  { key: 'sale', label: 'For Sale' },
  { key: 'rent', label: 'For Rent' },
  { key: 'lease', label: 'For Lease' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'land', label: 'Land / Plots' },
  { key: 'office', label: 'Office' },
  { key: 'shop', label: 'Shop / Showroom' },
  { key: 'warehouse', label: 'Warehouse' },
];

export const SelectedProperties: React.FC<SelectedPropertiesProps> = ({ onSelectProperty }) => {
  const [activeFilter, setActiveFilter] = useState<HomeFilterKey>('all');
  const [inquireProperty, setInquireProperty] = useState<PropertyListing | null>(null);

  // Only verified properties are shown (verified !== false)
  const verifiedListings = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => p && p.verified !== false);
  }, []);

  // Filter properties based on active pill
  const filteredProperties = useMemo(() => {
    return verifiedListings.filter((p) => {
      switch (activeFilter) {
        case 'all':
          return true;
        case 'sale':
          return p.listingType === 'sale';
        case 'rent':
          return p.listingType === 'rent';
        case 'lease':
          return p.listingType === 'lease';
        case 'residential':
          return p.propertyType === 'residential';
        case 'commercial':
          return (
            p.propertyType === 'commercial' ||
            p.propertyType === 'office' ||
            p.propertyType === 'shop' ||
            p.propertyType === 'warehouse'
          );
        case 'land':
          return p.propertyType === 'land';
        case 'office':
          return p.propertyType === 'office';
        case 'shop':
          return p.propertyType === 'shop';
        case 'warehouse':
          return p.propertyType === 'warehouse';
        default:
          return true;
      }
    });
  }, [verifiedListings, activeFilter]);

  // Featured first, then original order in data array
  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
      const aF = a.featured ? 1 : 0;
      const bF = b.featured ? 1 : 0;
      return bF - aF;
    });
  }, [filteredProperties]);

  // Cards grid showing AT MOST 3 matching cards (featured first)
  const displayedCards = useMemo(() => {
    return sortedProperties.slice(0, 3);
  }, [sortedProperties]);

  const matchingCount = sortedProperties.length;

  // Status text formatting:
  // "Showing 3 of N properties" when matchingCount > 3
  // "Showing N properties" (or "1 property", "0 properties") when matchingCount <= 3
  const statusCountNode = useMemo(() => {
    if (matchingCount === 0) {
      return (
        <>
          Showing <strong className="count-number">0</strong> properties
        </>
      );
    }
    if (matchingCount <= 3) {
      const label = matchingCount === 1 ? 'property' : 'properties';
      return (
        <>
          Showing <strong className="count-number">{matchingCount}</strong> {label}
        </>
      );
    }
    return (
      <>
        Showing <strong className="count-number">3</strong> of{' '}
        <strong className="count-number">{matchingCount}</strong> properties
      </>
    );
  }, [matchingCount]);

  // Build link URL to /properties carrying over active filter
  const targetPropertiesUrl = useMemo(() => {
    const isRepo = typeof window !== 'undefined' && window.location.pathname.startsWith('/iGrey_Website');
    const base = isRepo ? '/iGrey_Website' : '';
    const prefix = `${base}/properties`;
    if (activeFilter === 'all') return prefix;
    if (activeFilter === 'sale' || activeFilter === 'rent' || activeFilter === 'lease') {
      return `${prefix}?purpose=${activeFilter}`;
    }
    return `${prefix}?type=${activeFilter}`;
  }, [activeFilter]);

  const handleViewAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      window.history.pushState({}, '', targetPropertiesUrl);
    } catch {
      window.location.href = targetPropertiesUrl;
      return;
    }
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="properties"
      className="properties-home-section"
      aria-labelledby="properties-heading"
    >
      <div className="properties-container">
        {/* a) Shared Header (h2, centered, no outlined button in header) */}
        <PropertiesHeader level="h2" />

        {/* b) Category filter pills in one row (42px high, rounded, horizontal scroll) */}
        <div
          className="prop-filter-scroll-wrap"
          role="toolbar"
          aria-label="Filter properties by category or transaction type"
        >
          <div className="prop-filter-pills-row">
            {HOME_FILTER_PILLS.map((pill) => {
              const isActive = activeFilter === pill.key;
              return (
                <button
                  key={pill.key}
                  type="button"
                  className={`prop-filter-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFilter(pill.key)}
                  aria-pressed={isActive}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* c) Status bar: left count, right green verified badge + thin divider below */}
        <div className="prop-home-status-bar">
          <div className="prop-status-count" aria-live="polite">
            {statusCountNode}
          </div>

          <div className="prop-verified-badge" aria-label="100% Authorised and Verified Listings">
            <CheckCircle size={15} color="#6fd1a0" strokeWidth={2.4} aria-hidden="true" />
            <span>100% Authorised &amp; Verified Listings</span>
          </div>
        </div>

        {/* Thin divider directly below status bar */}
        <div className="prop-status-divider" />

        {/* d) Cards grid showing AT MOST 3 matching cards */}
        <div className="prop-home-grid-wrap">
          {matchingCount === 0 ? (
            <div className="prop-empty-state" role="status">
              <h3 className="empty-state-title">No properties match your filter</h3>
              <p className="empty-state-subtitle">
                New listings are added regularly. Try selecting another category.
              </p>
              <button
                type="button"
                className="prop-empty-clear-btn"
                onClick={() => setActiveFilter('all')}
              >
                View all properties
              </button>
            </div>
          ) : (
            <div className="prop-cards-grid">
              {displayedCards.map((prop, idx) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  index={idx}
                  onSelect={(selected) => {
                    if (onSelectProperty) {
                      onSelectProperty(selected.id);
                    }
                  }}
                  onEnquire={(selected) => setInquireProperty(selected)}
                />
              ))}
            </div>
          )}
        </div>

        {/* e) Centered tan button "View All Properties →" linking to /properties */}
        <div className="prop-home-cta-wrap">
          <a
            href={targetPropertiesUrl}
            className="prop-view-all-cta-btn"
            onClick={handleViewAllClick}
            aria-label="View all properties on dedicated page"
          >
            <span>View All Properties</span>
            <span className="cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Shared Inquire Dialog */}
      <InquireDialog
        property={inquireProperty}
        isOpen={Boolean(inquireProperty)}
        onClose={() => setInquireProperty(null)}
      />
    </section>
  );
};
