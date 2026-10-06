import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutGrid,
  List,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { PropertyCardAdmin } from '../components/PropertyCardAdmin';
import { PropertyPreviewModal } from '../components/PropertyPreviewModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { propertyService, PROPERTIES_UPDATED_EVENT } from '../services/propertyService';
import type { AdminProperty, PropertyStatus } from '../types';
import { useAdminRouter } from '../router/AdminRouter';

export const PropertiesManagement: React.FC = () => {
  const { navigate } = useAdminRouter();
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // View state: grid vs table
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedListingType, setSelectedListingType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-asc' | 'price-desc'>('newest');

  // Modals
  const [previewProperty, setPreviewProperty] = useState<AdminProperty | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminProperty | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProperties = async () => {
    setIsLoading(true);
    try {
      const data = await propertyService.getAllProperties({
        search: searchQuery,
        location: selectedLocation,
        propertyType: selectedType,
        listingType: selectedListingType,
        status: selectedStatus,
        sortBy,
      });
      setProperties(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();

    const handleSync = () => loadProperties();
    window.addEventListener(PROPERTIES_UPDATED_EVENT, handleSync);
    return () => window.removeEventListener(PROPERTIES_UPDATED_EVENT, handleSync);
  }, [searchQuery, selectedLocation, selectedType, selectedListingType, selectedStatus, sortBy]);

  // Unique locations from data
  const locations = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (p.city) set.add(p.city);
    });
    return Array.from(set);
  }, [properties]);

  const handleStatusChange = async (property: AdminProperty, newStatus: PropertyStatus) => {
    await propertyService.updateStatus(property.id, newStatus);
    loadProperties();
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await propertyService.deleteProperty(deleteTarget.id);
      setDeleteTarget(null);
      loadProperties();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '28px',
              color: '#F4F0E7',
              margin: '0 0 4px 0',
              fontWeight: 500,
            }}
          >
            Property Listings Directory
          </h2>
          <span style={{ fontSize: '13px', color: '#8F9E98' }}>
            Showing <strong>{properties.length}</strong> managed residences across all portfolios
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* View Mode Toggle */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#10221D',
              border: '0.5px solid rgba(198, 166, 106, 0.25)',
              borderRadius: '8px',
              padding: '3px',
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Grid View"
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'grid' ? 'rgba(198, 166, 106, 0.25)' : 'transparent',
                color: viewMode === 'grid' ? '#c9a77c' : '#8F9E98',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              title="Table View"
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'table' ? 'rgba(198, 166, 106, 0.25)' : 'transparent',
                color: viewMode === 'table' ? '#c9a77c' : '#8F9E98',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <List size={16} />
            </button>
          </div>

          {/* Add New Property Button */}
          <button
            type="button"
            onClick={() => navigate('property-new')}
            style={{
              padding: '9px 18px',
              backgroundColor: '#c9a77c',
              border: 'none',
              borderRadius: '6px',
              color: '#090D0B',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <Plus size={16} />
            <span>Add New Property</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls Card */}
      <div
        style={{
          backgroundColor: '#10221D',
          border: '0.5px solid rgba(198, 166, 106, 0.22)',
          borderRadius: '10px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search
              size={15}
              color="#8F9E98"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search title, ID, locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0B1714',
                border: '0.5px solid rgba(198, 166, 106, 0.25)',
                borderRadius: '6px',
                padding: '9px 12px 9px 34px',
                color: '#F4F0E7',
                fontSize: '12.5px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Location Filter */}
          <div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0B1714',
                border: '0.5px solid rgba(198, 166, 106, 0.25)',
                borderRadius: '6px',
                padding: '9px 12px',
                color: '#DCD7CB',
                fontSize: '12.5px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Locations (Mysuru, BLR...)</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0B1714',
                border: '0.5px solid rgba(198, 166, 106, 0.25)',
                borderRadius: '6px',
                padding: '9px 12px',
                color: '#DCD7CB',
                fontSize: '12.5px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Property Types</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Architectural Estate">Architectural Estate</option>
              <option value="Gated Residence">Gated Residence</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>

          {/* Listing Type Filter */}
          <div>
            <select
              value={selectedListingType}
              onChange={(e) => setSelectedListingType(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0B1714',
                border: '0.5px solid rgba(198, 166, 106, 0.25)',
                borderRadius: '6px',
                padding: '9px 12px',
                color: '#DCD7CB',
                fontSize: '12.5px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Listing Types</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0B1714',
                border: '0.5px solid rgba(198, 166, 106, 0.25)',
                borderRadius: '6px',
                padding: '9px 12px',
                color: '#DCD7CB',
                fontSize: '12.5px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active / Available</option>
              <option value="Draft">Draft</option>
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                width: '100%',
                backgroundColor: '#0B1714',
                border: '0.5px solid rgba(198, 166, 106, 0.25)',
                borderRadius: '6px',
                padding: '9px 12px',
                color: '#DCD7CB',
                fontSize: '12.5px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Display: Grid vs Table */}
      {isLoading ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: '#c9a77c', fontSize: '13px' }}>
          Loading property portfolio...
        </div>
      ) : properties.length === 0 ? (
        <div
          style={{
            backgroundColor: '#10221D',
            border: '0.5px solid rgba(198, 166, 106, 0.22)',
            borderRadius: '10px',
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <Building2 size={36} color="#c9a77c" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#F4F0E7', margin: '0 0 6px 0' }}>
            No Property Listings Found
          </h3>
          <p style={{ fontSize: '13px', color: '#8F9E98', maxWidth: '380px', margin: '0 auto 18px auto' }}>
            No listings match your search criteria. Try modifying your filters or onboard a new property.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedLocation('all');
              setSelectedType('all');
              setSelectedListingType('all');
              setSelectedStatus('all');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '0.5px solid #c9a77c',
              borderRadius: '6px',
              color: '#c9a77c',
              fontSize: '12.5px',
              cursor: 'pointer',
            }}
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {properties.map((prop) => (
            <PropertyCardAdmin
              key={prop.id}
              property={prop}
              onEdit={(p) => navigate('property-edit', { id: p.id })}
              onPreview={(p) => setPreviewProperty(p)}
              onDelete={(p) => setDeleteTarget(p)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div
          style={{
            backgroundColor: '#10221D',
            border: '0.5px solid rgba(198, 166, 106, 0.22)',
            borderRadius: '10px',
            overflowX: 'auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(198, 166, 106, 0.2)', backgroundColor: '#0B1714' }}>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>PROPERTY</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>ID</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>TYPE</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>LOCATION</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>PRICE</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>STATUS</th>
                <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600, textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr
                  key={prop.id}
                  style={{
                    borderBottom: '1px solid rgba(198, 166, 106, 0.1)',
                    transition: 'background-color 150ms ease',
                  }}
                  className="admin-table-row"
                >
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={prop.coverImage}
                        alt=""
                        style={{ width: '48px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '13.5px', color: '#F4F0E7', fontWeight: 600 }}>{prop.title}</div>
                        <span style={{ fontSize: '11.5px', color: '#8F9E98' }}>
                          {prop.bedrooms} BHK • {prop.builtUpArea}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '12.5px', color: '#c9a77c', fontWeight: 600 }}>
                    {prop.propertyId}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '12.5px', color: '#DCD7CB' }}>
                    {prop.propertyType}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '12.5px', color: '#DCD7CB' }}>
                    {prop.locality}, {prop.city}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '13.5px', color: '#FFFFFF', fontWeight: 700 }}>
                    {prop.price}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor:
                          prop.status === 'Active'
                            ? 'rgba(46, 204, 113, 0.15)'
                            : prop.status === 'Draft'
                            ? 'rgba(230, 126, 34, 0.15)'
                            : 'rgba(155, 89, 182, 0.15)',
                        color:
                          prop.status === 'Active'
                            ? '#2ecc71'
                            : prop.status === 'Draft'
                            ? '#e67e22'
                            : '#9b59b6',
                      }}
                    >
                      {prop.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => setPreviewProperty(prop)}
                        title="Preview Listing"
                        style={{
                          padding: '6px',
                          backgroundColor: 'rgba(198, 166, 106, 0.1)',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#c9a77c',
                          cursor: 'pointer',
                        }}
                      >
                        <ExternalLink size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('property-edit', { id: prop.id })}
                        title="Edit Listing"
                        style={{
                          padding: '6px',
                          backgroundColor: 'rgba(198, 166, 106, 0.1)',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#c9a77c',
                          cursor: 'pointer',
                        }}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(prop)}
                        title="Delete Listing"
                        style={{
                          padding: '6px',
                          backgroundColor: 'rgba(224, 122, 111, 0.12)',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#e07a6f',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Live Preview Modal */}
      {previewProperty && (
        <PropertyPreviewModal
          isOpen={!!previewProperty}
          property={previewProperty}
          onClose={() => setPreviewProperty(null)}
          onPublish={async () => {
            await propertyService.updateStatus(previewProperty.id, 'Active');
            loadProperties();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          isOpen={!!deleteTarget}
          title="Delete Property Listing"
          message={`Are you sure you want to permanently delete "${deleteTarget.title}" (ID: ${deleteTarget.propertyId})? This action will remove it from both the admin directory and the public website.`}
          confirmLabel="Permanently Delete"
          isDeleting={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <style>{`
        .admin-table-row:hover {
          background-color: rgba(198, 166, 106, 0.05) !important;
        }
      `}</style>
    </div>
  );
};
