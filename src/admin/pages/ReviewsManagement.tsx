import React from 'react';
import { Star } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';

export const ReviewsManagement: React.FC = () => {
  const reviews = testimonialsData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', color: '#F4F0E7', margin: '0 0 4px 0', fontWeight: 500 }}>
          Client Reviews &amp; Accolades
        </h2>
        <span style={{ fontSize: '13px', color: '#8F9E98' }}>
          Verified client testimonials displayed in the public accolades marquee.
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#10221D',
              border: '0.5px solid rgba(198, 166, 106, 0.22)',
              borderRadius: '10px',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#c9a77c" color="#c9a77c" />
                ))}
              </div>

              <p style={{ fontSize: '13px', color: '#DCD7CB', lineHeight: 1.6, marginBottom: '16px' }}>
                "{rev.quote}"
              </p>
            </div>

            <div style={{ paddingTop: '14px', borderTop: '0.5px solid rgba(198, 166, 106, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#F4F0E7' }}>{rev.client}</div>
                <span style={{ fontSize: '11.5px', color: '#c9a77c' }}>{rev.role}</span>
              </div>
              <span style={{ fontSize: '11px', color: '#8F9E98' }}>{rev.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
