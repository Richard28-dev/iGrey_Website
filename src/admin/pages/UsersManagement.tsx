import React from 'react';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import type { AdminUser } from '../types';

export const UsersManagement: React.FC = () => {
  const users: AdminUser[] = [
    {
      id: 'usr-001',
      name: 'Richard Rodrigues',
      email: 'admin@igreyholdings.com',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: 'Just now',
    },
    {
      id: 'usr-002',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@igreyholdings.com',
      role: 'Property Manager',
      status: 'Active',
      lastLogin: 'Yesterday, 18:40',
    },
    {
      id: 'usr-003',
      name: 'Priya Venkatesh',
      email: 'priya.v@igreyholdings.com',
      role: 'Advisory Lead',
      status: 'Active',
      lastLogin: '3 days ago',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', color: '#F4F0E7', margin: '0 0 4px 0', fontWeight: 500 }}>
            Admin Team &amp; Authorization
          </h2>
          <span style={{ fontSize: '13px', color: '#8F9E98' }}>
            Authorized team members with access to portfolio onboarding and client inquiries.
          </span>
        </div>

        <button
          type="button"
          onClick={() => alert('User invitation flow ready. Connect Supabase/Firebase Auth to send invite emails.')}
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
          <UserPlus size={15} />
          <span>Invite Admin User</span>
        </button>
      </div>

      <div
        style={{
          backgroundColor: '#10221D',
          border: '0.5px solid rgba(198, 166, 106, 0.22)',
          borderRadius: '10px',
          overflowX: 'auto',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(198, 166, 106, 0.2)', backgroundColor: '#0B1714' }}>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>TEAM MEMBER</th>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>EMAIL</th>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>ROLE</th>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>STATUS</th>
              <th style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98', fontWeight: 600 }}>LAST LOGIN</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(198, 166, 106, 0.1)' }}>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(198, 166, 106, 0.15)',
                        border: '1px solid #c9a77c',
                        color: '#c9a77c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      {u.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span style={{ fontSize: '13.5px', color: '#F4F0E7', fontWeight: 600 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 18px', fontSize: '12.5px', color: '#DCD7CB' }}>{u.email}</td>
                <td style={{ padding: '14px 18px' }}>
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: 'rgba(198, 166, 106, 0.12)',
                      color: '#c9a77c',
                      border: '0.5px solid rgba(198, 166, 106, 0.25)',
                    }}
                  >
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ color: '#2ecc71', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} />
                    <span>{u.status}</span>
                  </span>
                </td>
                <td style={{ padding: '14px 18px', fontSize: '12px', color: '#8F9E98' }}>{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
