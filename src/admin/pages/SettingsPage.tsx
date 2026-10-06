import React, { useState } from 'react';
import {
  Database,
  Server,
  Key,
  CheckCircle2,
  RefreshCw,
  Code,
  Lock,
} from 'lucide-react';
import { propertyService } from '../services/propertyService';

export const SettingsPage: React.FC = () => {
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);

  const handleResetData = () => {
    if (window.confirm('Reset all property data to default iGrey curated catalog?')) {
      propertyService.resetToDefaultSeed();
      setResetFeedback('Properties reset to curated default portfolio.');
      setTimeout(() => setResetFeedback(null), 3000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', color: '#F4F0E7', margin: '0 0 4px 0', fontWeight: 500 }}>
          Platform Settings &amp; Production Architecture
        </h2>
        <span style={{ fontSize: '13px', color: '#8F9E98' }}>
          System configuration and production database integration blueprint for iGREY Holdings.
        </span>
      </div>

      {resetFeedback && (
        <div
          style={{
            backgroundColor: 'rgba(46, 204, 113, 0.12)',
            border: '1px solid rgba(46, 204, 113, 0.3)',
            borderRadius: '8px',
            padding: '12px 18px',
            color: '#2ecc71',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle2 size={16} />
          <span>{resetFeedback}</span>
        </div>
      )}

      {/* Prototype Status & Reset Card */}
      <div
        style={{
          backgroundColor: '#10221D',
          border: '0.5px solid rgba(198, 166, 106, 0.25)',
          borderRadius: '10px',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#F4F0E7', margin: '0 0 4px 0' }}>
              Prototype Data Store (Active)
            </h3>
            <span style={{ fontSize: '12.5px', color: '#8F9E98' }}>
              Local storage engine with live sync to the public website via <code>propertyService</code>.
            </span>
          </div>

          <button
            type="button"
            onClick={handleResetData}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(198, 166, 106, 0.12)',
              border: '0.5px solid rgba(198, 166, 106, 0.3)',
              borderRadius: '6px',
              color: '#c9a77c',
              fontSize: '12.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <RefreshCw size={14} />
            <span>Restore Default Seed Data</span>
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#DCD7CB', lineHeight: 1.6, margin: 0 }}>
          This deployment uses an isolated client-side repository layer (<code>src/admin/services/propertyService.ts</code>).
          When you create, edit, or publish properties in this dashboard, the public website's "Selected Residences" carousel immediately reflects your changes in this browser session.
        </p>
      </div>

      {/* Production Backend Roadmap */}
      <div
        style={{
          backgroundColor: '#10221D',
          border: '0.5px solid rgba(198, 166, 106, 0.25)',
          borderRadius: '10px',
          padding: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Server size={22} color="#c9a77c" />
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', color: '#F4F0E7', margin: 0 }}>
            Production Database &amp; Auth Integration Guide
          </h3>
        </div>

        <p style={{ fontSize: '13.5px', color: '#DCD7CB', lineHeight: 1.65, marginBottom: '22px' }}>
          For real multi-user production where multiple clients and administrators share the same persistent database across devices, connect one of the following production backend providers:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '24px' }}>
          {/* Option 1: Supabase */}
          <div
            style={{
              padding: '18px',
              backgroundColor: '#0B1714',
              borderRadius: '8px',
              border: '0.5px solid rgba(198, 166, 106, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Database size={16} color="#c9a77c" />
              <strong style={{ color: '#F4F0E7', fontSize: '14px' }}>Supabase (Recommended)</strong>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8F9E98', lineHeight: 1.5, marginBottom: '10px' }}>
              PostgreSQL database with Row Level Security (RLS), instant REST API, and built-in Auth + S3 image bucket storage.
            </p>
            <div style={{ fontSize: '11px', color: '#c9a77c', fontFamily: 'monospace' }}>
              npm install @supabase/supabase-js
            </div>
          </div>

          {/* Option 2: Firebase */}
          <div
            style={{
              padding: '18px',
              backgroundColor: '#0B1714',
              borderRadius: '8px',
              border: '0.5px solid rgba(198, 166, 106, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Key size={16} color="#c9a77c" />
              <strong style={{ color: '#F4F0E7', fontSize: '14px' }}>Firebase Firestore</strong>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8F9E98', lineHeight: 1.5, marginBottom: '10px' }}>
              NoSQL document store with Firebase Authentication and Cloud Storage for high-resolution property galleries.
            </p>
            <div style={{ fontSize: '11px', color: '#c9a77c', fontFamily: 'monospace' }}>
              npm install firebase
            </div>
          </div>

          {/* Option 3: Node.js / Express */}
          <div
            style={{
              padding: '18px',
              backgroundColor: '#0B1714',
              borderRadius: '8px',
              border: '0.5px solid rgba(198, 166, 106, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Code size={16} color="#c9a77c" />
              <strong style={{ color: '#F4F0E7', fontSize: '14px' }}>Custom Node.js / Express</strong>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8F9E98', lineHeight: 1.5, marginBottom: '10px' }}>
              REST or GraphQL endpoints with PostgreSQL / Prisma ORM, JWT HttpOnly authentication cookies, and AWS S3 uploads.
            </p>
            <div style={{ fontSize: '11px', color: '#c9a77c', fontFamily: 'monospace' }}>
              GET /api/properties &amp; POST /api/properties
            </div>
          </div>
        </div>

        {/* Security Checklist */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: 'rgba(198, 166, 106, 0.08)',
            borderRadius: '8px',
            border: '0.5px solid rgba(198, 166, 106, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Lock size={15} color="#c9a77c" />
            <strong style={{ fontSize: '13px', color: '#F4F0E7' }}>Production Security Requirements:</strong>
          </div>
          <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '12.5px', color: '#DCD7CB', lineHeight: 1.7 }}>
            <li>Store secrets and API keys strictly in environment variables (<code>.env</code>), never commit to Git.</li>
            <li>Enforce Role-Based Access Control (RBAC) on backend routes using verified JWT signatures.</li>
            <li>Validate all incoming image files for MIME type and virus scanning before storage.</li>
            <li>Enforce database indexes on <code>status</code>, <code>city</code>, and <code>priceNumeric</code> for fast filtering.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
