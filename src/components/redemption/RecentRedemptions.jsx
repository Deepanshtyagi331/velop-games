import React from 'react';
import { History, Coins, Clock } from 'lucide-react';

/**
 * RecentRedemptions Component
 * Compact list of recently claimed platform items.
 */
export default function RecentRedemptions({ history = [] }) {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        marginTop: '32px',
        backgroundColor: '#1a1d2e',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 24px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '14px',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 800
        }}
      >
        <History size={18} style={{ color: '#f59e0b' }} />
        <span>Recent Redemptions</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {history.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: '#121422',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                {item.title}
              </span>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  color: '#94a3b8'
                }}
              >
                <Clock size={12} />
                <span>{item.timestamp}</span>
              </div>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                fontWeight: 800,
                color: '#f59e0b'
              }}
            >
              <Coins size={13} />
              <span>{item.cost} Coins</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
