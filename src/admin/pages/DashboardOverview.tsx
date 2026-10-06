import React, { useState, useEffect } from 'react';
import {
  Building2,
  CheckCircle2,
  Tag,
  Key,
  Inbox,
  Clock,
  Plus,
  ArrowRight,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { PropertyPreviewModal } from '../components/PropertyPreviewModal';
import { propertyService, PROPERTIES_UPDATED_EVENT } from '../services/propertyService';
import { enquiryService, ENQUIRIES_UPDATED_EVENT } from '../services/enquiryService';
import type { AdminProperty, Enquiry } from '../types';
import { useAdminRouter } from '../router/AdminRouter';

export const DashboardOverview: React.FC = () => {
  const { navigate } = useAdminRouter();
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [previewProperty, setPreviewProperty] = useState<AdminProperty | null>(null);

  const loadData = async () => {
    const propList = await propertyService.getAllProperties();
    const enqList = await enquiryService.getAllEnquiries();
    setProperties(propList);
    setEnquiries(enqList);
  };

  useEffect(() => {
    loadData();

    const handlePropUpdate = () => loadData();
    window.addEventListener(PROPERTIES_UPDATED_EVENT, handlePropUpdate);
    window.addEventListener(ENQUIRIES_UPDATED_EVENT, handlePropUpdate);
    return () => {
      window.removeEventListener(PROPERTIES_UPDATED_EVENT, handlePropUpdate);
      window.removeEventListener(ENQUIRIES_UPDATED_EVENT, handlePropUpdate);
    };
  }, []);

  // Compute Statistics
  const totalProperties = properties.length;
  const activeProperties = properties.filter((p) => p.status === 'Active').length;
  const forSaleProperties = properties.filter((p) => p.listingType === 'For Sale').length;
  const forRentProperties = properties.filter((p) => p.listingType === 'For Rent').length;
  const totalEnquiries = enquiries.length;
  const pendingEnquiries = enquiries.filter((e) => e.status === 'New' || e.status === 'Follow-up').length;

  const recentListings = properties.slice(0, 4);
  const recentEnquiries = enquiries.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome Banner & Quick Actions */}
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
              fontSize: '30px',
              color: '#F4F0E7',
              margin: '0 0 4px 0',
              fontWeight: 500,
            }}
          >
            Portfolio Overview &amp; Intelligence
          </h2>
          <p style={{ color: '#8F9E98', fontSize: '13px', margin: 0 }}>
            Real-time management for prime residential &amp; advisory assets across South India.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => loadData()}
            title="Refresh Data"
            style={{
              padding: '9px 14px',
              backgroundColor: '#10221D',
              border: '0.5px solid rgba(198, 166, 106, 0.25)',
              borderRadius: '6px',
              color: '#DCD7CB',
              fontSize: '12.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <RefreshCw size={14} color="#c9a77c" />
            <span>Refresh</span>
          </button>

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
            }}
          >
            <Plus size={16} />
            <span>Onboard Property</span>
          </button>
        </div>
      </div>

      {/* 6 Key Stat Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '18px',
        }}
      >
        <StatCard
          title="Total Properties"
          value={totalProperties}
          icon={Building2}
          badge="Catalog"
          badgeType="gold"
          onClick={() => navigate('properties')}
        />
        <StatCard
          title="Active Listings"
          value={activeProperties}
          icon={CheckCircle2}
          badge="Live on Site"
          badgeType="success"
          onClick={() => navigate('properties')}
        />
        <StatCard
          title="Properties for Sale"
          value={forSaleProperties}
          icon={Tag}
          badge="Ownership"
          badgeType="gold"
          onClick={() => navigate('properties')}
        />
        <StatCard
          title="Properties for Rent"
          value={forRentProperties}
          icon={Key}
          badge="Lease"
          badgeType="info"
          onClick={() => navigate('properties')}
        />
        <StatCard
          title="Total Enquiries"
          value={totalEnquiries}
          icon={Inbox}
          badge="All Time"
          badgeType="gold"
          onClick={() => navigate('enquiries')}
        />
        <StatCard
          title="Pending Enquiries"
          value={pendingEnquiries}
          icon={Clock}
          badge="Action Req."
          badgeType="warning"
          onClick={() => navigate('enquiries')}
        />
      </div>

      {/* Two Column Layout: Recent Listings & Recent Enquiries */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '24px',
          alignItems: 'start',
        }}
        className="dashboard-two-col-grid"
      >
        {/* Recent Property Listings */}
        <div
          style={{
            backgroundColor: '#10221D',
            border: '0.5px solid rgba(198, 166, 106, 0.22)',
            borderRadius: '10px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '22px',
                  color: '#F4F0E7',
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Recent Property Listings
              </h3>
              <span style={{ fontSize: '12px', color: '#8F9E98' }}>Latest added and updated residences</span>
            </div>

            <button
              type="button"
              onClick={() => navigate('properties')}
              style={{
                background: 'none',
                border: 'none',
                color: '#c9a77c',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentListings.map((prop) => (
              <div
                key={prop.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: '#0B1714',
                  border: '0.5px solid rgba(198, 166, 106, 0.15)',
                  borderRadius: '8px',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', overflow: 'hidden' }}>
                  <img
                    src={prop.coverImage}
                    alt={prop.title}
                    style={{
                      width: '56px',
                      height: '44px',
                      borderRadius: '4px',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      style={{
                        fontSize: '14px',
                        color: '#F4F0E7',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {prop.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#8F9E98' }}>
                      <span>{prop.locality || prop.city}</span>
                      <span>•</span>
                      <span style={{ color: '#c9a77c' }}>ID: {prop.propertyId}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{prop.price}</div>
                    <span
                      style={{
                        fontSize: '10.5px',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        backgroundColor: prop.status === 'Active' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(230, 126, 34, 0.15)',
                        color: prop.status === 'Active' ? '#2ecc71' : '#e67e22',
                      }}
                    >
                      {prop.status}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPreviewProperty(prop)}
                    title="Live Preview"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(198, 166, 106, 0.1)',
                      border: '0.5px solid rgba(198, 166, 106, 0.25)',
                      color: '#c9a77c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Client Enquiries */}
        <div
          style={{
            backgroundColor: '#10221D',
            border: '0.5px solid rgba(198, 166, 106, 0.22)',
            borderRadius: '10px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '22px',
                  color: '#F4F0E7',
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Recent Client Enquiries
              </h3>
              <span style={{ fontSize: '12px', color: '#8F9E98' }}>High-intent acquisitions &amp; stays</span>
            </div>

            <button
              type="button"
              onClick={() => navigate('enquiries')}
              style={{
                background: 'none',
                border: 'none',
                color: '#c9a77c',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>Manage</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentEnquiries.map((enq) => (
              <div
                key={enq.id}
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#0B1714',
                  border: '0.5px solid rgba(198, 166, 106, 0.15)',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#F4F0E7' }}>
                    {enq.customerName}
                  </div>
                  <span
                    style={{
                      fontSize: '10.5px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      backgroundColor:
                        enq.status === 'New'
                          ? 'rgba(198, 166, 106, 0.2)'
                          : enq.status === 'Contacted'
                          ? 'rgba(52, 152, 219, 0.15)'
                          : 'rgba(46, 204, 113, 0.15)',
                      color:
                        enq.status === 'New'
                          ? '#c9a77c'
                          : enq.status === 'Contacted'
                          ? '#3498db'
                          : '#2ecc71',
                      fontWeight: 600,
                    }}
                  >
                    {enq.status}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: '#8F9E98', marginBottom: '6px' }}>
                  Interest:{' '}
                  <span style={{ color: '#DCD7CB' }}>
                    {enq.interestedPropertyTitle || 'Direct Advisory Inquiry'}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '12px',
                    color: '#8F9E98',
                    margin: 0,
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  "{enq.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {previewProperty && (
        <PropertyPreviewModal
          isOpen={!!previewProperty}
          property={previewProperty}
          onClose={() => setPreviewProperty(null)}
        />
      )}

      <style>{`
        @media (max-width: 991px) {
          .dashboard-two-col-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
