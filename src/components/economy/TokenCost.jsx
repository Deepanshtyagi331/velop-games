import { Coins } from 'lucide-react';

/**
 * TokenCost Component
 * Reusable token entry requirement badge.
 * Displays the numeric cost dynamically without hardcoding.
 */
export default function TokenCost({
  amount,
  size = 'md',
  className = '',
  style = {}
}) {
  const isSmall = size === 'sm';

  return (
    <div
      className={`token-cost-badge ${className}`.trim()}
      role="status"
      aria-label={`${amount} Game Tokens`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? 'var(--space-1)' : '6px',
        padding: isSmall ? '2px 8px' : '4px 10px',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: 'var(--color-gold-light)',
        border: '1px solid var(--color-gold-border)',
        color: 'var(--color-gold-highlight)',
        fontSize: isSmall ? 'var(--font-size-xs)' : 'var(--font-size-small)',
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 1,
        letterSpacing: 'var(--tracking-wide)',
        boxShadow: 'var(--shadow-sm)',
        whiteSpace: 'nowrap',
        ...style
      }}
    >
      {/* Polished Token Icon */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-gold)'
        }}
        aria-hidden="true"
      >
        <Coins size={isSmall ? 13 : 15} />
      </span>

      {/* Dynamic Token Amount */}
      <span>{amount} Tokens</span>
    </div>
  );
}
