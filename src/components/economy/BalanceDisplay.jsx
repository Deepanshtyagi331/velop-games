import { Coins, Trophy } from 'lucide-react';
import useEconomy from '../../hooks/useEconomy';

/**
 * BalanceDisplay Component
 * Displays live synchronized Token and Game Coin balances.
 * Supports variants: 'compact' (for navigation header) and 'full' (for Games Hub & Game Home).
 */
export default function BalanceDisplay({
  variant = 'compact',
  showCoins = true,
  showTokens = true,
  className = '',
  style = {}
}) {
  const { tokens, gameCoins } = useEconomy();
  const isCompact = variant === 'compact';

  return (
    <div
      className={`balance-display-container ${className}`.trim()}
      role="region"
      aria-label="User Balance Summary"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isCompact ? 'var(--space-2)' : 'var(--space-3)',
        flexWrap: 'wrap',
        ...style
      }}
    >
      {/* 1. Tokens Balance Pill */}
      {showTokens && (
        <div
          role="status"
          aria-label={`${tokens} Tokens Available`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: isCompact ? '6px' : 'var(--space-2)',
            padding: isCompact ? '4px 10px' : '6px 14px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--color-gold-light)',
            border: '1px solid var(--color-gold-border)',
            color: 'var(--color-gold-highlight)',
            fontSize: isCompact ? 'var(--font-size-small)' : 'var(--font-size-button)',
            fontWeight: 'var(--font-weight-bold)',
            boxShadow: 'var(--shadow-sm)',
            whiteSpace: 'nowrap'
          }}
        >
          <span style={{ color: 'var(--color-gold)', display: 'inline-flex' }} aria-hidden="true">
            <Coins size={isCompact ? 14 : 16} />
          </span>
          <span>{tokens} <span style={{ fontSize: '0.85em', opacity: 0.85, fontWeight: 'var(--font-weight-medium)' }}>Tokens</span></span>
        </div>
      )}

      {/* 2. Game Coins Balance Pill */}
      {showCoins && (
        <div
          role="status"
          aria-label={`${gameCoins} Game Coins Earned`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: isCompact ? '6px' : 'var(--space-2)',
            padding: isCompact ? '4px 10px' : '6px 14px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--color-accent-light)',
            border: '1px solid var(--color-accent-border)',
            color: 'var(--color-accent-hover)',
            fontSize: isCompact ? 'var(--font-size-small)' : 'var(--font-size-button)',
            fontWeight: 'var(--font-weight-bold)',
            boxShadow: 'var(--shadow-sm)',
            whiteSpace: 'nowrap'
          }}
        >
          <span style={{ color: 'var(--color-accent-hover)', display: 'inline-flex' }} aria-hidden="true">
            <Trophy size={isCompact ? 14 : 16} />
          </span>
          <span>{gameCoins} <span style={{ fontSize: '0.85em', opacity: 0.85, fontWeight: 'var(--font-weight-medium)' }}>Coins</span></span>
        </div>
      )}
    </div>
  );
}
