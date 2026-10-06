import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'info' | 'gold';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeType = 'gold',
  onClick,
}) => {
  const getBadgeColors = () => {
    switch (badgeType) {
      case 'success':
        return { bg: 'rgba(46, 204, 113, 0.12)', text: '#2ecc71', border: 'rgba(46, 204, 113, 0.3)' };
      case 'warning':
        return { bg: 'rgba(230, 126, 34, 0.12)', text: '#e67e22', border: 'rgba(230, 126, 34, 0.3)' };
      case 'info':
        return { bg: 'rgba(52, 152, 219, 0.12)', text: '#3498db', border: 'rgba(52, 152, 219, 0.3)' };
      case 'gold':
      default:
        return { bg: 'rgba(198, 166, 106, 0.12)', text: '#c9a77c', border: 'rgba(198, 166, 106, 0.3)' };
    }
  };

  const badgeStyle = getBadgeColors();

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#10221D',
        border: '0.5px solid rgba(198, 166, 106, 0.22)',
        borderRadius: '10px',
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'all 240ms ease',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      }}
      className="admin-stat-card"
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: 'rgba(198, 166, 106, 0.1)',
              border: '0.5px solid rgba(198, 166, 106, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c9a77c',
            }}
          >
            <Icon size={19} />
          </div>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
              fontSize: '13px',
              color: '#8F9E98',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            {title}
          </span>
        </div>

        {badge && (
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '4px',
              backgroundColor: badgeStyle.bg,
              color: badgeStyle.text,
              border: `0.5px solid ${badgeStyle.border}`,
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '34px',
            lineHeight: 1,
            color: '#F4F0E7',
            fontWeight: 600,
          }}
        >
          {value}
        </div>

        {subtitle && (
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', var(--font-sans)",
              fontSize: '12px',
              color: '#8F9E98',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
