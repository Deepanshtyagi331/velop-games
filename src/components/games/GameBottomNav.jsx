import { Link, useLocation } from 'react-router-dom';
import { Home, Gift } from 'lucide-react';

/**
 * GameBottomNav Component
 * Provides clean bottom navigation between the game home page and the VELOOP Rewards Redemption Center.
 * Reusable across Game Home pages and the in-game environment.
 */
export default function GameBottomNav({ gameSlug, className = '', style = {} }) {
  const location = useLocation();
  const gameHomeRoute = gameSlug ? `/games/${gameSlug}` : '/games';
  const isHomeActive = location.pathname === gameHomeRoute;
  const isRedeemActive = location.pathname === '/redeem';

  return (
    <nav
      aria-label="Game Navigation"
      className={`game-bottom-nav ${className}`.trim()}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-3) var(--space-4)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--shadow-md)',
        maxWidth: '360px',
        margin: '0 auto',
        ...style
      }}
    >
      {/* 1. Game Home Link */}
      <Link
        to={gameHomeRoute}
        aria-current={isHomeActive ? 'page' : undefined}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: '8px 18px',
          borderRadius: 'var(--radius-pill)',
          textDecoration: 'none',
          fontSize: 'var(--font-size-small)',
          fontWeight: isHomeActive ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
          backgroundColor: isHomeActive ? 'var(--color-surface-elevated)' : 'transparent',
          color: isHomeActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          border: isHomeActive ? '1px solid var(--color-border-strong)' : '1px solid transparent',
          transition: 'all var(--transition-fast)'
        }}
      >
        <Home size={16} style={{ color: isHomeActive ? 'var(--color-gold)' : 'inherit' }} />
        <span>Game Home</span>
      </Link>

      {/* 2. Redemption Center Link */}
      <Link
        to="/redeem"
        aria-current={isRedeemActive ? 'page' : undefined}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: '8px 18px',
          borderRadius: 'var(--radius-pill)',
          textDecoration: 'none',
          fontSize: 'var(--font-size-small)',
          fontWeight: isRedeemActive ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
          backgroundColor: isRedeemActive ? 'var(--color-accent-light)' : 'transparent',
          color: isRedeemActive ? 'var(--color-accent-hover)' : 'var(--color-text-secondary)',
          border: isRedeemActive ? '1px solid var(--color-accent-border)' : '1px solid transparent',
          transition: 'all var(--transition-fast)'
        }}
      >
        <Gift size={16} style={{ color: isRedeemActive ? 'var(--color-accent-hover)' : 'inherit' }} />
        <span>Redeem</span>
      </Link>
    </nav>
  );
}
