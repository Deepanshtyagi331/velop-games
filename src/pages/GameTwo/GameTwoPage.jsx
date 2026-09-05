import { useLocation, Link } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';
import BalanceDisplay from '../../components/economy/BalanceDisplay';
import useEconomy from '../../hooks/useEconomy';
import GAMES_DATA from '../../data/gamesData';
import { ArrowLeft, PlusCircle, RotateCcw } from 'lucide-react';

export default function GameTwoPage() {
  const location = useLocation();
  const { addGameCoins, resetEconomy } = useEconomy();
  const game = GAMES_DATA.find((g) => g.slug === 'memory-match') || GAMES_DATA[1];

  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Top Navigation & Live Balance Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)'
          }}
        >
          <Link
            to="/games"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontSize: 'var(--font-size-small)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            <ArrowLeft size={16} />
            Back to Games Hub
          </Link>

          <BalanceDisplay variant="full" />
        </div>

        <section
          className="surface-elevated animate-fade-in"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 'var(--space-12) var(--space-6)',
            gap: 'var(--space-4)'
          }}
        >
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-gold-light)',
                border: '1px solid var(--color-gold-border)',
                color: 'var(--color-gold)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-bold)'
              }}
            >
              {game.tokenCost} Tokens Entry
            </span>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-accent-light)',
                border: '1px solid var(--color-accent-border)',
                color: 'var(--color-accent-hover)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              {game.category} &bull; Playable Game
            </span>
          </div>

          <h1 className="text-display" style={{ margin: 0 }}>
            {game.title}
          </h1>
          <p className="text-body" style={{ maxWidth: '540px', margin: 0 }}>
            {game.description}
          </p>

          <div
            style={{
              marginTop: 'var(--space-2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '6px 12px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-family-mono)',
              fontSize: 'var(--font-size-small)',
              color: 'var(--color-text-secondary)'
            }}
          >
            <span>Current route:</span>
            <code style={{ color: 'var(--color-gold)' }}>{location.pathname}</code>
          </div>

          {/* Economy State Test Controls */}
          <div
            style={{
              marginTop: 'var(--space-6)',
              display: 'flex',
              gap: 'var(--space-3)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <button
              type="button"
              onClick={() => addGameCoins(5)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-accent-light)',
                border: '1px solid var(--color-accent-border)',
                color: 'var(--color-accent-hover)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: 'pointer'
              }}
            >
              <PlusCircle size={15} />
              Simulate Earn +5 Coins
            </button>

            <button
              type="button"
              onClick={resetEconomy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={15} />
              Reset to 100 T / 20 GC
            </button>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
