import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Search,
  CheckCircle,
  Building2,
  Bed,
  Banknote,
  Sparkles,
  ArrowUpDown,
  X,
} from 'lucide-react';
import { PROPERTIES_DATA, CITIES_CONFIG, type PropertyListing } from '../data/propertiesData';
import { PropertiesHeader } from './PropertiesHeader';
import { PropertyCard } from './PropertyCard';
import { InquireDialog } from './InquireDialog';

export interface AllPropertiesPageProps {
  onSelectProperty?: (propertyId: string) => void;
}

export const AllPropertiesPage: React.FC<AllPropertiesPageProps> = ({ onSelectProperty }) => {
  // Read initial query params
  const parseParams = useCallback(() => {
    if (typeof window === 'undefined') {
      return {
        q: '',
        purpose: '',
        bhk: '',
        budget: '',
        feature: '',
        sort: 'featured',
        city: 'All',
        type: '',
      };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      q: params.get('q') || '',
      purpose: params.get('purpose') || '',
      bhk: params.get('bhk') || '',
      budget: params.get('budget') || '',
      feature: params.get('feature') || '',
      sort: params.get('sort') || 'featured',
      city: params.get('city') || 'All',
      type: params.get('type') || params.get('propertyType') || '',
    };
  }, []);

  const initial = parseParams();

  // State
  const [searchInput, setSearchInput] = useState(initial.q);
  const [debouncedSearch, setDebouncedSearch] = useState(initial.q);
  const [purpose, setPurpose] = useState(initial.purpose);
  const [bhk, setBhk] = useState(initial.bhk);
  const [budget, setBudget] = useState(initial.budget);
  const [feature, setFeature] = useState(initial.feature);
  const [sort, setSort] = useState(initial.sort);
  const [city, setCity] = useState(initial.city);
  const [propType, setPropType] = useState(initial.type);
  const [visibleCount, setVisibleCount] = useState(9);
  const [inquireProperty, setInquireProperty] = useState<PropertyListing | null>(null);

  // Debounce search input (200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Sync state to URL and tab title
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update document title
    document.title = 'All Properties | iGrey Holdings';

    const params = new URLSearchParams();
    if (debouncedSearch.trim()) params.set('q', debouncedSearch.trim());
    if (purpose) params.set('purpose', purpose);
    if (bhk) params.set('bhk', bhk);
    if (budget) params.set('budget', budget);
    if (feature) params.set('feature', feature);
    if (sort && sort !== 'featured') params.set('sort', sort);
    if (city && city !== 'All') params.set('city', city);
    if (propType) params.set('type', propType);

    const newQuery = params.toString() ? `?${params.toString()}` : '';
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}${newQuery}`;

    if (window.location.search !== newQuery) {
      window.history.replaceState(null, '', newUrl);
    }
  }, [debouncedSearch, purpose, bhk, budget, feature, sort, city, propType]);

  // Handle browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const p = parseParams();
      setSearchInput(p.q);
      setDebouncedSearch(p.q);
      setPurpose(p.purpose);
      setBhk(p.bhk);
      setBudget(p.budget);
      setFeature(p.feature);
      setSort(p.sort);
      setCity(p.city);
      setPropType(p.type);
      setVisibleCount(9);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseParams]);

  // Reset visibleCount on any filter change
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setVisibleCount(9);
  }, [debouncedSearch, purpose, bhk, budget, feature, sort, city, propType]);

  // When Listing Purpose changes to/from 'sale', reset budget
  const handlePurposeChange = (newPurpose: string) => {
    if (newPurpose !== purpose) {
      setPurpose(newPurpose);
      setBudget(''); // Reset selected budget
    }
  };

  // Check if any filter is currently active
  const hasActiveFilters = Boolean(
    searchInput.trim() ||
      purpose ||
      bhk ||
      budget ||
      feature ||
      (sort && sort !== 'featured') ||
      (city && city !== 'All') ||
      propType
  );

  const clearAllFilters = () => {
    setSearchInput('');
    setDebouncedSearch('');
    setPurpose('');
    setBhk('');
    setBudget('');
    setFeature('');
    setSort('featured');
    setCity('All');
    setPropType('');
    setVisibleCount(9);
  };

  // Only verified properties are shown
  const verifiedListings = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => p && p.verified !== false);
  }, []);

  // Compute live counts directly from available properties so filters reflect the catalog accurately
  const counts = useMemo(() => {
    const base = verifiedListings;
    return {
      all: base.length,
      // Purpose
      purposeSale: base.filter((p) => p.listingType === 'sale').length,
      purposeRent: base.filter((p) => p.listingType === 'rent').length,
      purposeLease: base.filter((p) => p.listingType === 'lease').length,
      // Configuration
      bhk1: base.filter((p) => p.bhk === 1).length,
      bhk2: base.filter((p) => p.bhk === 2).length,
      bhk3: base.filter((p) => p.bhk === 3).length,
      bhk4: base.filter((p) => p.bhk && p.bhk >= 4).length,
      office: base.filter((p) => p.propertyType === 'office').length,
      shop: base.filter((p) => p.propertyType === 'shop').length,
      warehouse: base.filter((p) => p.propertyType === 'warehouse').length,
      land: base.filter((p) => p.propertyType === 'land').length,
      // Sale Budgets
      saleUnder1Cr: base.filter((p) => p.listingType === 'sale' && (p.priceNumber || 0) < 10000000).length,
      sale1Cr5Cr: base.filter(
        (p) => p.listingType === 'sale' && (p.priceNumber || 0) >= 10000000 && (p.priceNumber || 0) <= 50000000
      ).length,
      saleAbove5Cr: base.filter((p) => p.listingType === 'sale' && (p.priceNumber || 0) > 50000000).length,
      // Monthly Budgets (rent and lease)
      rentTotal: base.filter((p) => p.listingType !== 'sale').length,
      rentUnder25k: base.filter((p) => p.listingType !== 'sale' && (p.priceNumber || 0) < 25000).length,
      rent25k50k: base.filter(
        (p) => p.listingType !== 'sale' && (p.priceNumber || 0) >= 25000 && (p.priceNumber || 0) <= 50000
      ).length,
      rent50k100k: base.filter(
        (p) => p.listingType !== 'sale' && (p.priceNumber || 0) >= 50000 && (p.priceNumber || 0) <= 100000
      ).length,
      rent100k250k: base.filter(
        (p) => p.listingType !== 'sale' && (p.priceNumber || 0) >= 100000 && (p.priceNumber || 0) <= 250000
      ).length,
      rentAbove250k: base.filter((p) => p.listingType !== 'sale' && (p.priceNumber || 0) > 250000).length,
      // Features
      featParking: base.filter((p) => p.features?.includes('Covered Parking')).length,
      featGated: base.filter((p) => p.features?.includes('Gated Society')).length,
      featPool: base.filter((p) => p.features?.includes('Swimming Pool')).length,
      featClubhouse: base.filter((p) => p.features?.includes('Clubhouse')).length,
      featFurnished: base.filter((p) => p.features?.includes('Fully Furnished')).length,
      featRooftop: base.filter((p) => p.features?.includes('Rooftop Deck')).length,
      // Cities
      cityBangalore: base.filter((p) => (p.city || '').toLowerCase() === 'bangalore').length,
      cityMysuru: base.filter((p) => (p.city || '').toLowerCase() === 'mysuru').length,
      cityHyderabad: base.filter((p) => (p.city || '').toLowerCase() === 'hyderabad').length,
      cityChennai: base.filter((p) => (p.city || '').toLowerCase() === 'chennai').length,
    };
  }, [verifiedListings]);

  // Filter logic
  const filteredListings = useMemo(() => {
    return verifiedListings.filter((p) => {
      // 1. Search Query (title, location, city, category, ID, bhk, features)
      if (debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase().trim();
        const titleMatch = (p.title || '').toLowerCase().includes(q);
        const locMatch = (p.location || '').toLowerCase().includes(q);
        const cityMatch = (p.city || '').toLowerCase().includes(q);
        const catMatch = (p.category || '').toLowerCase().includes(q);
        const idMatch = (p.id || '').toLowerCase().includes(q);
        const typeMatch = (p.propertyType || '').toLowerCase().includes(q);
        const purposeMatch = (p.listingType || '').toLowerCase().includes(q);
        const bhkMatch = p.bhk ? `${p.bhk} bhk`.includes(q) || `${p.bhk}bhk`.includes(q) : false;
        const featureMatch = p.features?.some((f) => f.toLowerCase().includes(q));

        if (
          !titleMatch &&
          !locMatch &&
          !cityMatch &&
          !catMatch &&
          !idMatch &&
          !typeMatch &&
          !purposeMatch &&
          !bhkMatch &&
          !featureMatch
        ) {
          return false;
        }
      }

      // 2. Listing Purpose (sale | rent | lease)
      if (purpose && p.listingType !== purpose) {
        return false;
      }

      // 3. BHK & Configuration (supports both residential BHKs and commercial space configurations)
      if (bhk) {
        if (bhk === '4+') {
          if (!p.bhk || p.bhk < 4) return false;
        } else if (bhk === 'office') {
          if (p.propertyType !== 'office') return false;
        } else if (bhk === 'shop') {
          if (p.propertyType !== 'shop') return false;
        } else if (bhk === 'warehouse') {
          if (p.propertyType !== 'warehouse') return false;
        } else if (bhk === 'land') {
          if (p.propertyType !== 'land') return false;
        } else {
          const reqBhk = parseInt(bhk, 10);
          if (!isNaN(reqBhk) && p.bhk !== reqBhk) return false;
        }
      }

      // 4. Budget Filter
      if (budget) {
        const priceNum = p.priceNumber || 0;
        if (purpose === 'sale') {
          // Purchase Budget
          if (budget === 'under-1cr' && priceNum >= 10000000) return false;
          if (budget === '1cr-5cr' && (priceNum < 10000000 || priceNum > 50000000)) return false;
          if (budget === 'above-5cr' && priceNum <= 50000000) return false;
        } else {
          // Monthly Budget applies to rent and lease.
          // If Purpose is 'All' (""), sale listings are excluded while a monthly budget is active!
          if (p.listingType === 'sale') return false;

          if (budget === 'under-25k' && priceNum >= 25000) return false;
          if (budget === '25k-50k' && (priceNum < 25000 || priceNum > 50000)) return false;
          if (budget === '50k-100k' && (priceNum < 50000 || priceNum > 100000)) return false;
          if (budget === '100k-250k' && (priceNum < 100000 || priceNum > 250000)) return false;
          if (budget === 'above-250k' && priceNum <= 250000) return false;
          if (budget === 'above-100k' && priceNum <= 100000) return false; // backwards compatibility
        }
      }

      // 5. Property Feature
      if (feature) {
        if (!p.features || !p.features.includes(feature)) {
          return false;
        }
      }

      // 6. City Chip
      if (city && city !== 'All') {
        if ((p.city || '').toLowerCase() !== city.toLowerCase()) {
          return false;
        }
      }

      // 7. Property Type (if navigated from home pills)
      if (propType) {
        const pt = propType.toLowerCase();
        if (pt === 'commercial') {
          if (
            p.propertyType !== 'commercial' &&
            p.propertyType !== 'office' &&
            p.propertyType !== 'shop' &&
            p.propertyType !== 'warehouse'
          ) {
            return false;
          }
        } else if (p.propertyType !== pt) {
          return false;
        }
      }

      return true;
    });
  }, [verifiedListings, debouncedSearch, purpose, bhk, budget, feature, city, propType]);

  // Sort logic (runs after filtering)
  const sortedListings = useMemo(() => {
    const list = [...filteredListings];
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => (a.priceNumber || 0) - (b.priceNumber || 0));
      case 'price-desc':
        return list.sort((a, b) => (b.priceNumber || 0) - (a.priceNumber || 0));
      case 'newest':
        return list.sort(
          (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
      case 'featured':
      default:
        // Featured properties first, then original order
        return list.sort((a, b) => {
          const aF = a.featured ? 1 : 0;
          const bF = b.featured ? 1 : 0;
          return bF - aF;
        });
    }
  }, [filteredListings, sort]);

  const totalMatching = sortedListings.length;
  const displayedListings = sortedListings.slice(0, visibleCount);

  return (
    <div className="properties-page-container">
      {/* 1. Shared Header (h1, ~100px below navbar) */}
      <div className="properties-page-header-wrap">
        <PropertiesHeader level="h1" />
      </div>

      {/* 2. Filter Panel (rounded 20px card, 1px border, 30px padding) */}
      <section className="prop-filter-panel" aria-label="Filter Properties">
        {/* Search Input, 52px, magnifier icon */}
        <div className="prop-search-field-wrap">
          <label htmlFor="prop-main-search" className="visually-hidden">
            Search by area, city or property name
          </label>
          <div className="prop-search-input-box">
            <Search size={18} className="prop-search-icon" aria-hidden="true" />
            <input
              id="prop-main-search"
              type="text"
              className="prop-search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by area, city or property name…"
              autoComplete="off"
            />
            {searchInput && (
              <button
                type="button"
                className="prop-search-clear-btn"
                onClick={() => setSearchInput('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Five Dropdowns in One Row */}
        <div className="prop-dropdowns-row">
          {/* 1. Listing Purpose */}
          <div className="prop-select-group">
            <label htmlFor="filter-purpose" className="prop-select-label">
              <Building2 size={13} className="label-icon" aria-hidden="true" />
              <span>LISTING PURPOSE</span>
            </label>
            <select
              id="filter-purpose"
              className="prop-select-input"
              value={purpose}
              onChange={(e) => handlePurposeChange(e.target.value)}
            >
              <option value="">All Purposes ({counts.all})</option>
              <option value="sale">For Sale ({counts.purposeSale})</option>
              <option value="rent">For Rent ({counts.purposeRent})</option>
              <option value="lease">For Lease ({counts.purposeLease})</option>
            </select>
          </div>

          {/* 2. BHK & Configuration */}
          <div className="prop-select-group">
            <label htmlFor="filter-bhk" className="prop-select-label">
              <Bed size={13} className="label-icon" aria-hidden="true" />
              <span>BHK &amp; CONFIGURATION</span>
            </label>
            <select
              id="filter-bhk"
              className="prop-select-input"
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
            >
              <option value="">All Configurations ({counts.all})</option>
              <option value="1">1 BHK ({counts.bhk1})</option>
              <option value="2">2 BHK ({counts.bhk2})</option>
              <option value="3">3 BHK ({counts.bhk3})</option>
              <option value="4+">4+ BHK ({counts.bhk4})</option>
              <option value="office">Commercial Office ({counts.office})</option>
              <option value="shop">Shop / Showroom ({counts.shop})</option>
              <option value="warehouse">Warehouse &amp; Logistics ({counts.warehouse})</option>
              <option value="land">Residential Plot / Land ({counts.land})</option>
            </select>
          </div>

          {/* 3. Budget Dropdown (Relabeled to PURCHASE BUDGET when purpose = 'sale') */}
          <div className="prop-select-group">
            <label htmlFor="filter-budget" className="prop-select-label">
              <Banknote size={13} className="label-icon" aria-hidden="true" />
              <span>{purpose === 'sale' ? 'PURCHASE BUDGET' : 'MONTHLY BUDGET'}</span>
            </label>
            <select
              id="filter-budget"
              className="prop-select-input"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              {purpose === 'sale' ? (
                <>
                  <option value="">Any Budget ({counts.purposeSale})</option>
                  <option value="under-1cr">Under ₹1 Cr ({counts.saleUnder1Cr})</option>
                  <option value="1cr-5cr">₹1 Cr - ₹5 Cr ({counts.sale1Cr5Cr})</option>
                  <option value="above-5cr">Above ₹5 Cr ({counts.saleAbove5Cr})</option>
                </>
              ) : (
                <>
                  <option value="">Any Budget ({counts.rentTotal})</option>
                  <option value="under-25k">Under ₹25,000 ({counts.rentUnder25k})</option>
                  <option value="25k-50k">₹25,000 - ₹50,000 ({counts.rent25k50k})</option>
                  <option value="50k-100k">₹50,000 - ₹1,00,000 ({counts.rent50k100k})</option>
                  <option value="100k-250k">₹1,00,000 - ₹2,50,000 ({counts.rent100k250k})</option>
                  <option value="above-250k">Above ₹2,50,000 ({counts.rentAbove250k})</option>
                </>
              )}
            </select>
          </div>

          {/* 4. Property Feature */}
          <div className="prop-select-group">
            <label htmlFor="filter-feature" className="prop-select-label">
              <Sparkles size={13} className="label-icon" aria-hidden="true" />
              <span>PROPERTY FEATURE</span>
            </label>
            <select
              id="filter-feature"
              className="prop-select-input"
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
            >
              <option value="">All Features ({counts.all})</option>
              <option value="Covered Parking">Covered Parking ({counts.featParking})</option>
              <option value="Gated Society">Gated Society ({counts.featGated})</option>
              <option value="Swimming Pool">Swimming Pool ({counts.featPool})</option>
              <option value="Clubhouse">Clubhouse ({counts.featClubhouse})</option>
              <option value="Fully Furnished">Fully Furnished ({counts.featFurnished})</option>
              <option value="Rooftop Deck">Rooftop Deck ({counts.featRooftop})</option>
            </select>
          </div>

          {/* 5. Sort By */}
          <div className="prop-select-group">
            <label htmlFor="filter-sort" className="prop-select-label">
              <ArrowUpDown size={13} className="label-icon" aria-hidden="true" />
              <span>SORT BY</span>
            </label>
            <select
              id="filter-sort"
              className="prop-select-input"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Divider inside panel */}
        <div className="prop-panel-divider" />

        {/* City Chips Row + Clear all filters Link */}
        <div className="prop-cities-row">
          <div className="prop-cities-left">
            <span className="prop-cities-label">CITY:</span>
            <div className="prop-cities-chips" role="group" aria-label="Filter properties by city">
              {CITIES_CONFIG.map((c) => {
                const isActive = city === c || (c === 'All' && (!city || city === 'All'));
                const count =
                  c === 'All'
                    ? counts.all
                    : c === 'Bangalore'
                    ? counts.cityBangalore
                    : c === 'Mysuru'
                    ? counts.cityMysuru
                    : c === 'Hyderabad'
                    ? counts.cityHyderabad
                    : c === 'Chennai'
                    ? counts.cityChennai
                    : 0;
                return (
                  <button
                    key={c}
                    type="button"
                    className={`prop-city-chip ${isActive ? 'active' : ''}`}
                    onClick={() => setCity(c)}
                    aria-pressed={isActive}
                  >
                    <span>{c}</span>
                    <span style={{ opacity: 0.75, fontSize: '11px', marginLeft: '3px' }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear all filters link appears only when something is active */}
          {hasActiveFilters && (
            <button
              type="button"
              className="prop-clear-all-link"
              onClick={clearAllFilters}
              aria-label="Clear all applied filters"
            >
              Clear all filters
            </button>
          )}
        </div>
      </section>

      {/* 3. Status Bar + Green Verified Badge */}
      <div className="prop-page-status-bar">
        <div className="prop-status-count" aria-live="polite">
          Showing <strong className="count-number">{totalMatching}</strong>{' '}
          {totalMatching === 1 ? 'property' : 'properties'}
        </div>

        <div className="prop-verified-badge" aria-label="100% Authorised and Verified Listings">
          <CheckCircle size={15} color="#6fd1a0" strokeWidth={2.4} aria-hidden="true" />
          <span>100% Authorised &amp; Verified Listings</span>
        </div>
      </div>

      {/* Thin Divider below status bar */}
      <div className="prop-status-divider" />

      {/* 4. Cards Grid with All Properties */}
      <section className="prop-grid-section" aria-label="Property Catalog">
        {totalMatching === 0 ? (
          <div className="prop-empty-state" role="status">
            <h3 className="empty-state-title">No properties match your filters</h3>
            <p className="empty-state-subtitle">
              Try changing your search or clearing some filters.
            </p>
            <button
              type="button"
              className="prop-empty-clear-btn"
              onClick={clearAllFilters}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="prop-cards-grid">
              {displayedListings.map((prop, idx) => (
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

            {/* Outlined Gold "Load more properties" Button (appears only when more matches exist) */}
            {totalMatching > visibleCount && (
              <div className="prop-load-more-wrap">
                <button
                  type="button"
                  className="prop-load-more-btn"
                  onClick={() => setVisibleCount((prev) => prev + 9)}
                >
                  Load more properties
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* 5. Inquire Modal Dialog */}
      <InquireDialog
        property={inquireProperty}
        isOpen={Boolean(inquireProperty)}
        onClose={() => setInquireProperty(null)}
      />
    </div>
  );
};
