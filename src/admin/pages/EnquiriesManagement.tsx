import React, { useState, useEffect } from 'react';
import {
  Search,
  Phone,
  Mail,
  Trash2,
  X,
  FileText,
} from 'lucide-react';
import { enquiryService, ENQUIRIES_UPDATED_EVENT } from '../services/enquiryService';
import type { Enquiry, EnquiryStatus } from '../types';

export const EnquiriesManagement: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newNoteInput, setNewNoteInput] = useState('');

  const loadEnquiries = async () => {
    const list = await enquiryService.getAllEnquiries(statusFilter);
    setEnquiries(list);
  };

  useEffect(() => {
    loadEnquiries();

    const handleSync = () => loadEnquiries();
    window.addEventListener(ENQUIRIES_UPDATED_EVENT, handleSync);
    return () => window.removeEventListener(ENQUIRIES_UPDATED_EVENT, handleSync);
  }, [statusFilter]);

  const filteredEnquiries = enquiries.filter((e) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.customerName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      (e.interestedPropertyTitle && e.interestedPropertyTitle.toLowerCase().includes(q))
    );
  });

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    await enquiryService.updateStatus(enquiryId, newStatus);
    loadEnquiries();
    if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleAddNote = async (enquiryId: string) => {
    if (!newNoteInput.trim()) return;
    await enquiryService.addNote(enquiryId, newNoteInput.trim());
    setNewNoteInput('');
    loadEnquiries();
    if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
      const existing = selectedEnquiry.internalNotes || [];
      setSelectedEnquiry({
        ...selectedEnquiry,
        internalNotes: [newNoteInput.trim(), ...existing],
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry record?')) {
      await enquiryService.deleteEnquiry(id);
      loadEnquiries();
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    }
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return { bg: 'rgba(198, 166, 106, 0.2)', text: '#c9a77c', border: 'rgba(198, 166, 106, 0.4)' };
      case 'Contacted':
        return { bg: 'rgba(52, 152, 219, 0.15)', text: '#3498db', border: 'rgba(52, 152, 219, 0.35)' };
      case 'Follow-up':
        return { bg: 'rgba(230, 126, 34, 0.15)', text: '#e67e22', border: 'rgba(230, 126, 34, 0.35)' };
      case 'Closed':
      default:
        return { bg: 'rgba(46, 204, 113, 0.15)', text: '#2ecc71', border: 'rgba(46, 204, 113, 0.35)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', color: '#F4F0E7', margin: '0 0 4px 0', fontWeight: 500 }}>
            Client Enquiries &amp; Advisory Leads
          </h2>
          <span style={{ fontSize: '13px', color: '#8F9E98' }}>
            Manage client requests submitted via the public contact desk and property detail pages.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: '#10221D',
          border: '0.5px solid rgba(198, 166, 106, 0.22)',
          borderRadius: '10px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '420px' }}>
          <Search size={15} color="#8F9E98" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by name, email, phone, property..."
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12.5px', color: '#8F9E98' }}>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              backgroundColor: '#0B1714',
              border: '0.5px solid rgba(198, 166, 106, 0.25)',
              borderRadius: '6px',
              padding: '8px 14px',
              color: '#DCD7CB',
              fontSize: '12.5px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Enquiries</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div
        style={{
          backgroundColor: '#10221D',
          border: '0.5px solid rgba(198, 166, 106, 0.22)',
          borderRadius: '10px',
          overflowX: 'auto',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(198, 166, 106, 0.2)', backgroundColor: '#0B1714' }}>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>CLIENT NAME</th>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>CONTACT</th>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>INTERESTED PROPERTY</th>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>DATE</th>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>STATUS</th>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600, textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: '#8F9E98', fontSize: '13px' }}>
                  No enquiries found matching your search.
                </td>
              </tr>
            ) : (
              filteredEnquiries.map((enq) => {
                const badge = getStatusBadge(enq.status);
                return (
                  <tr
                    key={enq.id}
                    style={{ borderBottom: '1px solid rgba(198, 166, 106, 0.1)' }}
                    className="admin-table-row"
                  >
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: '13.5px', color: '#F4F0E7', fontWeight: 600 }}>{enq.customerName}</div>
                      {enq.role && <span style={{ fontSize: '11px', color: '#c9a77c' }}>{enq.role}</span>}
                    </td>

                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: '12.5px', color: '#DCD7CB' }}>{enq.email}</div>
                      <div style={{ fontSize: '11.5px', color: '#8F9E98' }}>+91 {enq.phone}</div>
                    </td>

                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: '13px', color: '#DCD7CB', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {enq.interestedPropertyTitle || 'Direct Advisory'}
                      </div>
                      {enq.city && <span style={{ fontSize: '11px', color: '#8F9E98' }}>{enq.city}</span>}
                    </td>

                    <td style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98' }}>
                      {enq.date}
                    </td>

                    <td style={{ padding: '14px 18px' }}>
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                        style={{
                          backgroundColor: badge.bg,
                          color: badge.text,
                          border: `0.5px solid ${badge.border}`,
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {/* Quick Call */}
                        <a
                          href={`tel:+91${enq.phone}`}
                          title={`Call ${enq.customerName}`}
                          style={{
                            padding: '6px',
                            backgroundColor: 'rgba(198, 166, 106, 0.1)',
                            borderRadius: '4px',
                            color: '#c9a77c',
                            display: 'flex',
                          }}
                        >
                          <Phone size={14} />
                        </a>

                        {/* Quick Mail */}
                        <a
                          href={`mailto:${enq.email}?subject=iGrey Holdings Advisory Enquiry`}
                          title={`Email ${enq.customerName}`}
                          style={{
                            padding: '6px',
                            backgroundColor: 'rgba(198, 166, 106, 0.1)',
                            borderRadius: '4px',
                            color: '#c9a77c',
                            display: 'flex',
                          }}
                        >
                          <Mail size={14} />
                        </a>

                        {/* View & Notes */}
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enq)}
                          title="View Details & Notes"
                          style={{
                            padding: '6px',
                            backgroundColor: 'rgba(198, 166, 106, 0.1)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#DCD7CB',
                            cursor: 'pointer',
                            display: 'flex',
                          }}
                        >
                          <FileText size={14} />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(enq.id)}
                          title="Delete Enquiry"
                          style={{
                            padding: '6px',
                            backgroundColor: 'rgba(224, 122, 111, 0.12)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#e07a6f',
                            cursor: 'pointer',
                            display: 'flex',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Details & Internal Notes Modal */}
      {selectedEnquiry && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 10, 8, 0.85)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            style={{
              backgroundColor: '#0E1B17',
              border: '1px solid rgba(198, 166, 106, 0.35)',
              borderRadius: '12px',
              padding: '28px',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', color: '#F4F0E7', margin: 0 }}>
                  {selectedEnquiry.customerName}
                </h3>
                <span style={{ fontSize: '12px', color: '#c9a77c' }}>{selectedEnquiry.role || 'Client'}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                style={{ background: 'none', border: 'none', color: '#8F9E98', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#8F9E98', display: 'block' }}>Email:</span>
                <span style={{ color: '#F4F0E7' }}>{selectedEnquiry.email}</span>
              </div>
              <div>
                <span style={{ color: '#8F9E98', display: 'block' }}>Phone:</span>
                <span style={{ color: '#F4F0E7' }}>+91 {selectedEnquiry.phone}</span>
              </div>
              <div>
                <span style={{ color: '#8F9E98', display: 'block' }}>Property / Requirement:</span>
                <span style={{ color: '#F4F0E7' }}>{selectedEnquiry.interestedPropertyTitle || 'Direct Advisory'}</span>
              </div>
              <div>
                <span style={{ color: '#8F9E98', display: 'block' }}>Received Date:</span>
                <span style={{ color: '#F4F0E7' }}>{selectedEnquiry.date}</span>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <span style={{ color: '#8F9E98', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Message:</span>
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#0B1714',
                  borderRadius: '6px',
                  border: '0.5px solid rgba(198, 166, 106, 0.2)',
                  fontSize: '13px',
                  color: '#DCD7CB',
                  lineHeight: 1.6,
                }}
              >
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Internal Advisory Notes */}
            <div>
              <span style={{ color: '#c9a77c', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                Internal Advisory Notes
              </span>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <input
                  type="text"
                  placeholder="Add advisory note or action item..."
                  value={newNoteInput}
                  onChange={(e) => setNewNoteInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNote(selectedEnquiry.id);
                    }
                  }}
                  style={{
                    flexGrow: 1,
                    backgroundColor: '#0B1714',
                    border: '0.5px solid rgba(198, 166, 106, 0.3)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    color: '#F4F0E7',
                    fontSize: '12.5px',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleAddNote(selectedEnquiry.id)}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#c9a77c',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#090D0B',
                    fontWeight: 600,
                    fontSize: '12.5px',
                    cursor: 'pointer',
                  }}
                >
                  Add Note
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedEnquiry.internalNotes && selectedEnquiry.internalNotes.length > 0 ? (
                  selectedEnquiry.internalNotes.map((note, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'rgba(198, 166, 106, 0.08)',
                        borderRadius: '6px',
                        borderLeft: '2px solid #c9a77c',
                        fontSize: '12px',
                        color: '#DCD7CB',
                      }}
                    >
                      {note}
                    </div>
                  ))
                ) : (
                  <span style={{ fontSize: '12px', color: '#8F9E98', fontStyle: 'italic' }}>
                    No internal notes recorded yet.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
