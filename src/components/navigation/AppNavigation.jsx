import { NavLink } from 'react-router-dom';
import { Gamepad2, Gift, Home, Sparkles, Trophy } from 'lucide-react';
import BalanceDisplay from '../economy/BalanceDisplay';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Games Hub', path: '/games', icon: Gamepad2 },
  { label: 'Coin Catcher', path: '/games/coin-catcher', icon: Trophy },
  { label: 'Memory Match', path: '/games/memory-match', icon: Sparkles },
  { label: 'Redeem', path: '/redeem', icon: Gift }
];

export default function AppNavigation() {
  return (
    <header
      role="banner"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%'
      }}
    >
      <div
        style={{
          maxWidth: 'var(--layout-max-width)',
          margin: '0 auto',
          padding: 'var(--space-2) clamp(var(--space-3), 3vw, var(--space-8))',
          minHeight: 'var(--layout-header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          flexWrap: 'wrap'
        }}
      >
        {/* Brand Logo & Platform Title */}
        <NavLink
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'var(--font-size-card-title)',
            color: 'var(--color-text-primary)',
            letterSpacing: 'var(--tracking-snug)',
            padding: '4px 0'
          }}
          aria-label="VELOOP Rewards Home"
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--color-accent) 0%, #4338ca 100%)',
              color: '#ffffff',
              boxShadow: 'var(--shadow-sm)',
              flexShrink: 0
            }}
          >
            <Gamepad2 size={20} aria-hidden="true" />
          </span>
          <span style={{ whiteSpace: 'nowrap' }}>
            VELOOP <span style={{ color: 'var(--color-gold)' }}>REWARDS</span>
          </span>
        </NavLink>

        {/* Right Section: Primary Nav & Compact Balances */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            flexWrap: 'wrap'
          }}
        >
          {/* Primary Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
              padding: '4px 0'
            }}
          >
            {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                style={({ isActive }) => ({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-small)',
                  fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive ? 'var(--color-surface-elevated)' : 'transparent',
                  border: isActive ? '1px solid var(--color-border-strong)' : '1px solid transparent',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  transition: 'all var(--transition-fast)',
                  whiteSpace: 'nowrap'
                })}
              >
                <Icon size={15} aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Real-time Centralized Balance Pill */}
          <BalanceDisplay variant="compact" />
        </div>
      </div>
    </header>
  );
}
