import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BalanceDisplay from '../economy/BalanceDisplay';
import GameGuideModal from './GameGuideModal';
import GameBottomNav from './GameBottomNav';
import {
  ArrowLeft,
  Play,
  HelpCircle,
  Award,
  Sparkles,
  Gamepad2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

/**
 * GameHome Component
 * Reusable pre-game entry experience for playable VELOOP games.
 * Dynamically adapts visual theme, hero presentation, and guide mechanics.
 * Strictly avoids double-charging tokens.
 */
export default function GameHome({ game }) {
  const navigate = useNavigate();

  // State
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Lazy initializer to read persisted guide status directly without cascading effect
  const [isGuideCompleted, setIsGuideCompleted] = useState(() => {
    if (typeof window === 'undefined' || !game?.slug) return false;
    try {
      return localStorage.getItem(`velop-guide-${game.slug}`) === 'true';
    } catch {
      return false;
    }
  });

  // Error boundary state
  if (!game) {
    return (
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
        <AlertTriangle size={36} style={{ color: 'var(--color-error)', margin: '0 auto var(--space-4)' }} />
        <h2 className="text-display" style={{ fontSize: 'var(--font-size-h2)', margin: 0 }}>
          Game Not Found
        </h2>
        <p className="text-body" style={{ margin: 'var(--space-2) 0 var(--space-6)' }}>
          The requested game configuration could not be loaded.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={15} />
            Try Again
          </button>
          <Link
            to="/games"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-accent)',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 'var(--font-weight-semibold)'
            }}
          >
            Back to Games
          </Link>
        </div>
      </div>
    );
  }

  const isCoinCatcher = game.slug === 'coin-catcher';
  const theme = game.visualIdentity || {};
  const guide = game.guide || {};
  const storageKey = `velop-guide-${game.slug}`;

  // Handlers
  const handlePlayClick = () => {
    // If player has not completed the tutorial, guide them first
    if (!isGuideCompleted) {
      setIsGuideOpen(true);
    } else {
      // Returning player: navigate directly to gameplay route
      navigate(`${game.route}/play`);
    }
  };

  const handleStartGameFromGuide = () => {
    // Persist completion per-game
    try {
      if (storageKey) {
        localStorage.setItem(storageKey, 'true');
      }
    } catch {
      // Storage unavailable
    }
    setIsGuideCompleted(true);
    setIsGuideOpen(false);
    navigate(`${game.route}/play`);
  };

  return (
    <div
      className="game-home-container animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        paddingBottom: 'var(--space-12)'
      }}
    >
      {/* 1. Top Navigation & Live Centralized Balances */}
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
          Back to Games Hub
        </Link>

        <BalanceDisplay variant="full" />
      </div>

      {/* 2. Thematic Game Hero Card */}
      <article
        className="surface-elevated"
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-card)',
          border: `1px solid ${isCoinCatcher ? 'rgba(245, 158, 11, 0.35)' : 'rgba(129, 140, 248, 0.35)'}`,
          backgroundColor: 'var(--color-surface)',
          overflow: 'hidden',
          boxShadow: isCoinCatcher
            ? '0 12px 36px -10px rgba(245, 158, 11, 0.15)'
            : '0 12px 36px -10px rgba(99, 102, 241, 0.15)'
        }}
      >
        {/* Visual Identity Atmosphere Glow Banner */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            maxHeight: '420px',
            backgroundColor: 'var(--color-bg-alt)',
            overflow: 'hidden'
          }}
        >
          {/* Skeleton Loading Placeholder */}
          {!isImageLoaded && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'var(--color-surface-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)'
              }}
            >
              <Gamepad2 size={32} className="animate-pulse" />
            </div>
          )}

          <img
            src={game.image}
            alt={game.title}
            onLoad={() => setIsImageLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              opacity: isImageLoaded ? 1 : 0,
              transition: 'opacity 300ms ease'
            }}
          />

          {/* Scrim Gradient for Legibility */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(22, 24, 39, 0.98) 0%, rgba(22, 24, 39, 0.55) 45%, rgba(22, 24, 39, 0.15) 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Top Badges */}
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
                  backgroundColor: isCoinCatcher ? 'rgba(245, 158, 11, 0.18)' : 'rgba(129, 140, 248, 0.18)',
                  border: `1px solid ${isCoinCatcher ? 'var(--color-gold-border)' : 'var(--color-accent-border)'}`,
                  color: isCoinCatcher ? 'var(--color-gold-highlight)' : 'var(--color-accent-hover)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  letterSpacing: 'var(--tracking-wide)',
                  backdropFilter: 'blur(6px)'
                }}
              >
                {theme.mood || 'Playable Game'}
              </span>
            </div>

            {/* Guide Completed Status Badge */}
            {isGuideCompleted && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#34d399',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  backdropFilter: 'blur(6px)'
                }}
              >
                <CheckCircle2 size={12} />
                Tutorial Completed
              </span>
            )}
          </div>

          {/* Hero Title & Subtitle in Scrim */}
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
                color: isCoinCatcher ? 'var(--color-gold-highlight)' : '#c7d2fe',
                fontSize: 'var(--font-size-body)',
                fontWeight: 'var(--font-weight-medium)',
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.75)'
              }}
            >
              {guide.headline || game.description}
            </p>
          </div>
        </div>

        {/* Content & Action Deck */}
        <div
          style={{
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)'
          }}
        >
          {/* Metadata Specs Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-3)'
            }}
          >
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)'
              }}
            >
              <Gamepad2 size={18} style={{ color: isCoinCatcher ? 'var(--color-gold)' : 'var(--color-accent-hover)' }} />
              <div>
                <span className="text-caption" style={{ color: 'var(--color-text-secondary)', display: 'block' }}>
                  Control Scheme
                </span>
                <strong style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-primary)' }}>
                  {game.playableMetadata?.controls || 'Keyboard + Touch'}
                </strong>
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)'
              }}
            >
              <Award size={18} style={{ color: 'var(--color-gold)' }} />
              <div>
                <span className="text-caption" style={{ color: 'var(--color-text-secondary)', display: 'block' }}>
                  Reward Potential
                </span>
                <strong style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-gold-highlight)' }}>
                  {guide.rewardPotential || 'Earn Game Coins'}
                </strong>
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)'
              }}
            >
              <Sparkles size={18} style={{ color: 'var(--color-accent-hover)' }} />
              <div>
                <span className="text-caption" style={{ color: 'var(--color-text-secondary)', display: 'block' }}>
                  Game Mode
                </span>
                <strong style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-primary)' }}>
                  {game.playableMetadata?.gameplay || 'Score-based Arcade'}
                </strong>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              flexWrap: 'wrap'
            }}
          >
            {/* Play Now CTA (Initiates pre-game flow / guide) */}
            <button
              type="button"
              onClick={handlePlayClick}
              className="shimmer-container transition-button-press"
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                padding: '12px 28px',
                borderRadius: 'var(--radius-sm)',
                background: isCoinCatcher
                  ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
                  : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: isCoinCatcher
                  ? '0 4px 14px rgba(245, 158, 11, 0.4)'
                  : '0 4px 14px rgba(99, 102, 241, 0.4)',
                fontSize: 'var(--font-size-button)',
                fontWeight: 'var(--font-weight-bold)',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
            >
              <div className="shimmer-sweep" aria-hidden="true" />
              <Play size={18} fill="currentColor" />
              <span>{isGuideCompleted ? 'Play Now' : 'Play & View Guide'}</span>
            </button>

            {/* How to Play CTA (Always reopens guide anytime) */}
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: '12px 20px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-button)',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.borderColor = 'var(--color-border-strong)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <HelpCircle size={17} />
              <span>How to Play</span>
            </button>
          </div>

          {/* Reward Earning Explanation Banner */}
          <div
            style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: isCoinCatcher ? 'var(--color-gold-light)' : 'var(--color-accent-light)',
              border: `1px solid ${isCoinCatcher ? 'var(--color-gold-border)' : 'var(--color-accent-border)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)'
            }}
          >
            <Award
              size={20}
              style={{
                color: isCoinCatcher ? 'var(--color-gold)' : 'var(--color-accent-hover)',
                flexShrink: 0
              }}
            />
            <p className="text-small" style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
              <strong style={{ color: isCoinCatcher ? 'var(--color-gold-highlight)' : 'var(--color-accent-hover)' }}>
                Game Coin Rewards:
              </strong>{' '}
              Skillful gameplay translates into real Game Coins added directly to your centralized VELOOP balance. Collect coins or complete boards with minimal errors to maximize your rewards!
            </p>
          </div>
        </div>
      </article>

      {/* 3. Reusable Game Bottom Navigation */}
      <div style={{ marginTop: 'var(--space-4)' }}>
        <GameBottomNav gameSlug={game.slug} />
      </div>

      {/* 4. Interactive First-Time / Tutorial Modal */}
      <GameGuideModal
        game={game}
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onStartGame={handleStartGameFromGuide}
      />
    </div>
  );
}
