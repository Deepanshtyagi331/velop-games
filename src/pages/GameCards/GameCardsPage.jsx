import { useState } from 'react';
import PageContainer from '../../components/common/PageContainer';
import GameCard from '../../components/games/GameCard';
import GAMES_DATA from '../../data/gamesData';
import { Coins, Sparkles, Ban, RefreshCw } from 'lucide-react';

export default function GameCardsPage() {
  const [userTokens, setUserTokens] = useState(100);
  const [simLoading, setSimLoading] = useState(false);
  const [simDisabled, setSimDisabled] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handlePlay = (game) => {
    setFeedbackMessage(`Initiated launch for "${game.title}" (Cost: ${game.tokenCost} Tokens)`);
    setTimeout(() => setFeedbackMessage(''), 3500);
  };

  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {/* Header & Controls Toolbar */}
        <header
          className="surface-base"
          style={{
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)'
          }}
        >
          <div>
            <span className="text-caption" style={{ color: 'var(--color-accent)' }}>
              Component Test Bench &bull; Phase 4
            </span>
            <h1 className="text-display" style={{ marginTop: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
              13-GameCard Showcase
            </h1>
            <p className="text-body" style={{ margin: 0 }}>
              Testing the single, reusable <code>GameCard</code> component rendered dynamically across all 13 games with active token validation, hover zoom, and infinite shimmer.
            </p>
          </div>

          {/* Testing Controls Panel */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--color-border)'
            }}
          >
            {/* Token Balance Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span className="text-small" style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)' }}>
                Simulated Balance:
              </span>
              <button
                type="button"
                onClick={() => setUserTokens(100)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: userTokens === 100 ? 'var(--color-accent)' : 'var(--color-surface-elevated)',
                  color: userTokens === 100 ? '#ffffff' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--font-size-small)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Coins size={14} />
                100 Tokens (Sufficient)
              </button>
              <button
                type="button"
                onClick={() => setUserTokens(10)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: userTokens === 10 ? 'rgba(239, 68, 68, 0.2)' : 'var(--color-surface-elevated)',
                  color: userTokens === 10 ? 'var(--color-error)' : 'var(--color-text-secondary)',
                  border: userTokens === 10 ? '1px solid var(--color-error)' : '1px solid var(--color-border)',
                  fontSize: 'var(--font-size-small)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Coins size={14} />
                10 Tokens (Insufficient Test)
              </button>
            </div>

            {/* State Toggles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSimLoading(!simLoading)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: simLoading ? 'var(--color-surface-elevated)' : 'transparent',
                  color: simLoading ? 'var(--color-accent-hover)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--font-size-small)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RefreshCw size={14} className={simLoading ? 'animate-spin' : ''} />
                Toggle Loading
              </button>

              <button
                type="button"
                onClick={() => setSimDisabled(!simDisabled)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: simDisabled ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                  color: simDisabled ? 'var(--color-error)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--font-size-small)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Ban size={14} />
                Toggle Disabled
              </button>
            </div>
          </div>

          {/* Interactive Play Feedback Banner */}
          {feedbackMessage && (
            <div
              className="animate-fade-in"
              style={{
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-accent-light)',
                border: '1px solid var(--color-accent-border)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-small)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}
            >
              <Sparkles size={16} style={{ color: 'var(--color-gold)' }} />
              <span>{feedbackMessage}</span>
            </div>
          )}
        </header>

        {/* 13 GameCards Dynamic Grid */}
        <section aria-labelledby="cards-grid-heading">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            {GAMES_DATA.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                userTokens={userTokens}
                disabled={simDisabled}
                loading={simLoading}
                onPlay={handlePlay}
              />
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
