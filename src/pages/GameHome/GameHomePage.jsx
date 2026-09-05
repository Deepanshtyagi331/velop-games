import { useParams, Link, Navigate } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';
import BalanceDisplay from '../../components/economy/BalanceDisplay';
import GAMES_DATA from '../../data/gamesData';
import { ArrowLeft, Sparkles, Trophy, Info } from 'lucide-react';

/**
 * GameHomePage Component
 * Route: /games/:gameSlug
 * Renders a dedicated showcase home for the 11 banner-only arcade games.
 * Clearly informs players of the game's theme, metadata, and status,
 * while directing them to the 2 fully playable titles (Coin Catcher & Memory Match).
 * Strictly avoids deducting tokens for banner showcase views.
 */
export default function GameHomePage() {
  const { gameSlug } = useParams();

  // If visiting coin-catcher or memory-match via generic param, redirect to their dedicated routes
  if (gameSlug === 'coin-catcher') {
    return <Navigate to="/games/coin-catcher" replace />;
  }
  if (gameSlug === 'memory-match') {
    return <Navigate to="/games/memory-match" replace />;
  }

  const game = GAMES_DATA.find((g) => g.slug === gameSlug);

  if (!game) {
    return (
      <PageContainer>
        <div
          className="surface-elevated animate-fade-in"
          style={{
            padding: 'var(--space-12) var(--space-6)',
            textAlign: 'center',
            maxWidth: '540px',
            margin: 'var(--space-12) auto',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)'
          }}
        >
          <Info size={40} style={{ color: 'var(--color-accent)', margin: '0 auto var(--space-4)' }} />
          <h1 className="text-display" style={{ fontSize: 'var(--font-size-h2)', margin: 0 }}>
            Game Not Found
          </h1>
          <p className="text-body" style={{ margin: 'var(--space-2) 0 var(--space-6)' }}>
            The requested game could not be found in the VELOOP catalog.
          </p>
          <Link
            to="/games"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-accent)',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 'var(--font-weight-semibold)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Games Hub</span>
          </Link>
        </div>
      </PageContainer>
    );
  }

  const visual = game.visualIdentity || {};

  return (
    <PageContainer>
      <div
        className="game-banner-home animate-fade-in"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          paddingBottom: 'var(--space-12)'
        }}
      >
        {/* 1. Header Navigation & Balances */}
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
              fontWeight: 'var(--font-weight-medium)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
          >
            <ArrowLeft size={16} />
            <span>Back to Games Hub</span>
          </Link>

          <BalanceDisplay variant="full" />
        </div>

        {/* 2. Hero Presentation Card */}
        <article
          className="surface-elevated"
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              maxHeight: '400px',
              backgroundColor: 'var(--color-bg-alt)',
              overflow: 'hidden'
            }}
          >
            <img
              src={game.image}
              alt={game.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block'
              }}
            />

            {/* Atmosphere Scrim */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(22, 24, 39, 0.98) 0%, rgba(22, 24, 39, 0.5) 50%, rgba(22, 24, 39, 0.15) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Badges */}
            <div
              style={{
                position: 'absolute',
                top: 'var(--space-4)',
                left: 'var(--space-4)',
                right: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-2)'
              }}
            >
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'rgba(22, 24, 39, 0.85)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-bold)',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(6px)'
                  }}
                >
                  {game.category}
                </span>

                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'rgba(99, 102, 241, 0.18)',
                    border: '1px solid var(--color-accent-border)',
                    color: 'var(--color-accent-hover)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-bold)',
                    backdropFilter: 'blur(6px)'
                  }}
                >
                  {visual.theme || 'Arcade Showcase'}
                </span>
              </div>

              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid var(--color-gold-border)',
                  color: 'var(--color-gold)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  backdropFilter: 'blur(6px)'
                }}
              >
                Catalog Title
              </span>
            </div>

            {/* Hero Title & Description */}
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-5)',
                left: 'var(--space-6)',
                right: 'var(--space-6)'
              }}
            >
              <h1
                className="text-display"
                style={{
                  margin: 0,
                  color: '#ffffff',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)'
                }}
              >
                {game.title}
              </h1>
              <p
                style={{
                  margin: 'var(--space-1) 0 0 0',
                  color: '#cbd5e1',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.75)',
                  maxWidth: '600px'
                }}
              >
                {game.description}
              </p>
            </div>
          </div>

          {/* Details & Playable Callout Deck */}
          <div
            style={{
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)'
            }}
          >
            {/* Honest Prototype Status Notice */}
            <div
              style={{
                padding: 'var(--space-4) var(--space-5)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid var(--color-accent-border)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)'
              }}
            >
              <Info size={20} style={{ color: 'var(--color-accent-hover)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-body)', display: 'block' }}>
                  13-Game Catalog Showcase Title
                </strong>
                <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-small)', lineHeight: 1.5 }}>
                  <strong>{game.title}</strong> is part of the 13-game VELOOP Rewards arcade catalog. In this prototype, active interactive gameplay, Game Coin rewards, and the Revive system are live for our two featured games: <strong>Coin Catcher</strong> and <strong>Memory Match</strong>. No tokens were deducted for viewing this showcase title.
                </p>
              </div>
            </div>

            {/* Quick Links to the 2 Playable Games */}
            <div>
              <h2
                className="text-section-title"
                style={{
                  margin: 0,
                  marginBottom: 'var(--space-3)',
                  fontSize: 'var(--font-size-h3)'
                }}
              >
                Featured Playable Games
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 'var(--space-4)'
                }}
              >
                {/* Playable Game 1: Coin Catcher */}
                <Link
                  to="/games/coin-catcher"
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-card)',
                    backgroundColor: 'var(--color-surface-elevated)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-3)',
                    transition: 'border-color var(--transition-fast), transform var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-gold)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        border: '1px solid var(--color-gold-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-gold)'
                      }}
                    >
                      <Trophy size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-body)', display: 'block' }}>
                        Coin Catcher
                      </strong>
                      <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)' }}>
                        60fps Arcade Canvas &bull; 20 Tokens
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-gold)',
                      color: '#0f172a',
                      fontWeight: 'var(--font-weight-bold)',
                      fontSize: 'var(--font-size-small)'
                    }}
                  >
                    Play
                  </span>
                </Link>

                {/* Playable Game 2: Memory Match */}
                <Link
                  to="/games/memory-match"
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-card)',
                    backgroundColor: 'var(--color-surface-elevated)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-3)',
                    transition: 'border-color var(--transition-fast), transform var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent-hover)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(99, 102, 241, 0.15)',
                        border: '1px solid var(--color-accent-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-accent-hover)'
                      }}
                    >
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-body)', display: 'block' }}>
                        Memory Match
                      </strong>
                      <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)' }}>
                        4×4 3D Flip Puzzle &bull; 20 Tokens
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-accent)',
                      color: '#ffffff',
                      fontWeight: 'var(--font-weight-bold)',
                      fontSize: 'var(--font-size-small)'
                    }}
                  >
                    Play
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </PageContainer>
  );
}
