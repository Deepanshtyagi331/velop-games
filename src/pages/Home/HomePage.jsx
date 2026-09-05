import { Link } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';
import GamesCarousel from '../../components/games/GamesCarousel';
import BalanceDisplay from '../../components/economy/BalanceDisplay';
import {
  Gamepad2,
  Sparkles,
  Trophy,
  Gift,
  Coins,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

/**
 * HomePage Component
 * Route: /
 * Premium VELOOP Rewards platform portal showcasing the 13-game carousel,
 * the 2 playable game arenas, live centralized balances, and reward redemption flow.
 */
export default function HomePage() {
  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
        {/* 1. Hero Portal Header */}
        <section
          className="surface-elevated animate-fade-in"
          style={{
            position: 'relative',
            padding: 'clamp(var(--space-6), 4vw, var(--space-10))',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            background: 'linear-gradient(135deg, rgba(30, 34, 56, 0.95) 0%, rgba(22, 24, 39, 0.95) 100%)',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Radial Glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 'var(--space-6)',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {/* Category Badges */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--color-accent-light)',
                    border: '1px solid var(--color-accent-border)',
                    color: 'var(--color-accent-hover)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-bold)',
                    letterSpacing: 'var(--tracking-wide)',
                    textTransform: 'uppercase'
                  }}
                >
                  <Sparkles size={13} />
                  VELOOP Arcade Ecosystem
                </span>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--color-gold-light)',
                    border: '1px solid var(--color-gold-border)',
                    color: 'var(--color-gold)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}
                >
                  <Coins size={13} />
                  20 Tokens / Play
                </span>
              </div>

              <h1 className="text-display" style={{ margin: 0 }}>
                Play Games. Earn Coins. <span style={{ color: 'var(--color-gold)' }}>Redeem Rewards.</span>
              </h1>

              <p className="text-body" style={{ margin: 0, fontSize: 'var(--font-size-body)', maxWidth: '580px' }}>
                Enter fast-paced arcade challenges with tokens, master precision mechanics, earn centralized Game Coins, and redeem them for ecosystem points, gems, and spins.
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  flexWrap: 'wrap',
                  marginTop: 'var(--space-2)'
                }}
              >
                <Link
                  to="/games"
                  className="shimmer-container transition-button-press"
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(135deg, var(--color-accent) 0%, #4338ca 100%)',
                    color: '#ffffff',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--font-size-button)',
                    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                    overflow: 'hidden'
                  }}
                >
                  <div className="shimmer-sweep" aria-hidden="true" />
                  <Gamepad2 size={18} />
                  <span>Browse 13 Games</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/redeem"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-surface-elevated)',
                    border: '1px solid var(--color-border-strong)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-button)',
                    transition: 'border-color var(--transition-fast)'
                  }}
                >
                  <Gift size={18} style={{ color: 'var(--color-gold)' }} />
                  <span>Redemption Center</span>
                </Link>
              </div>
            </div>

            {/* Live Synchronized Balances */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 'var(--space-2)'
              }}
            >
              <span
                className="text-caption"
                style={{
                  color: 'var(--color-text-secondary)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: 'var(--tracking-wide)',
                  textTransform: 'uppercase'
                }}
              >
                Your Balance
              </span>
              <BalanceDisplay variant="full" />
            </div>
          </div>
        </section>

        {/* 2. Featured Games Carousel Section */}
        <section aria-label="Featured 13-Game Catalog">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-4)',
              flexWrap: 'wrap',
              gap: 'var(--space-2)'
            }}
          >
            <div>
              <h2 className="text-section-title" style={{ margin: 0 }}>
                13-Game Arcade Carousel
              </h2>
              <p className="text-small" style={{ margin: 0 }}>
                Auto-scrolling catalog with original 16:9 artwork &bull; 2 playable titles &bull; 20 Tokens per run
              </p>
            </div>

            <Link
              to="/games"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--color-accent-hover)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <GamesCarousel />
        </section>

        {/* 3. The 2 Playable Game Spotlights */}
        <section aria-label="Playable Games Spotlight">
          <h2 className="text-section-title" style={{ margin: 0, marginBottom: 'var(--space-4)' }}>
            Playable Mini-Games
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            {/* Playable Game 1: Coin Catcher */}
            <div
              className="surface-elevated"
              style={{
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                boxShadow: '0 8px 24px -6px rgba(245, 158, 11, 0.12)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      border: '1px solid var(--color-gold-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)'
                    }}
                  >
                    <Trophy size={24} />
                  </div>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      color: 'var(--color-gold)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-bold)'
                    }}
                  >
                    Arcade &bull; 60fps Canvas
                  </span>
                </div>

                <h3 className="text-card-title" style={{ margin: 0, fontSize: '1.25rem' }}>
                  Coin Catcher
                </h3>
                <p className="text-small" style={{ margin: 0, lineHeight: 1.5 }}>
                  Control your basket smoothly with arrow keys or touch. Catch falling coins and multiplier star gems while avoiding hazard bombs. 3 strikes and you&apos;re out!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)' }}>
                <span className="text-small" style={{ color: 'var(--color-gold)' }}>
                  Earn up to 15 Game Coins
                </span>
                <Link
                  to="/games/coin-catcher"
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                    color: '#ffffff',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--font-size-small)',
                    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                  }}
                >
                  Play Coin Catcher
                </Link>
              </div>
            </div>

            {/* Playable Game 2: Memory Match */}
            <div
              className="surface-elevated"
              style={{
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                boxShadow: '0 8px 24px -6px rgba(99, 102, 241, 0.12)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(99, 102, 241, 0.15)',
                      border: '1px solid var(--color-accent-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-accent-hover)'
                    }}
                  >
                    <Sparkles size={24} />
                  </div>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'rgba(99, 102, 241, 0.15)',
                      color: 'var(--color-accent-hover)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-bold)'
                    }}
                  >
                    Puzzle &bull; 4×4 Grid
                  </span>
                </div>

                <h3 className="text-card-title" style={{ margin: 0, fontSize: '1.25rem' }}>
                  Memory Match
                </h3>
                <p className="text-small" style={{ margin: 0, lineHeight: 1.5 }}>
                  Flip 3D cards two by two to match 8 pairs against the 60-second countdown clock. Chain consecutive matches together to build huge combo multipliers!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)' }}>
                <span className="text-small" style={{ color: 'var(--color-accent-hover)' }}>
                  Earn up to 20 Game Coins
                </span>
                <Link
                  to="/games/memory-match"
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                    color: '#ffffff',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--font-size-small)',
                    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  Play Memory Match
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How the Economy Works Infographic */}
        <section
          className="surface-base"
          style={{
            padding: 'var(--space-8) var(--space-6)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto var(--space-8) auto' }}>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-accent-hover)'
              }}
            >
              Centralized Economy
            </span>
            <h2 className="text-section-title" style={{ margin: 'var(--space-1) 0 var(--space-2) 0' }}>
              How VELOOP Rewards Works
            </h2>
            <p className="text-small" style={{ margin: 0 }}>
              A seamless, transparent closed-loop arcade token economy.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            {/* Step 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', textAlign: 'center', alignItems: 'center' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid var(--color-accent-border)',
                  color: 'var(--color-accent-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Coins size={22} />
              </div>
              <strong style={{ color: 'var(--color-text-primary)' }}>1. Spend 20 Tokens</strong>
              <p className="text-small" style={{ margin: 0 }}>
                Tokens represent your game passes. Launch either playable game from the Games Hub to unlock your arcade run.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', textAlign: 'center', alignItems: 'center' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid var(--color-gold-border)',
                  color: 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Zap size={22} />
              </div>
              <strong style={{ color: 'var(--color-text-primary)' }}>2. Earn Game Coins</strong>
              <p className="text-small" style={{ margin: 0 }}>
                Score points, evade bombs, match card pairs, and use 1 Revive per game to maximize your earned Game Coins.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', textAlign: 'center', alignItems: 'center' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.35)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <strong style={{ color: 'var(--color-text-primary)' }}>3. Redeem Platform Rewards</strong>
              <p className="text-small" style={{ margin: 0 }}>
                Spend your earned Game Coins at the Redemption Center for VE points, SVE multipliers, Gems, or refill your Tokens!
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
