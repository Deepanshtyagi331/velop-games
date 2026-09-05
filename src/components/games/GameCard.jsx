import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenCost from '../economy/TokenCost';
import PlayNowButton from './PlayNowButton';
import useEconomy from '../../hooks/useEconomy';

/**
 * GameCard Component
 * Reusable banner card for the VELOOP Games ecosystem.
 * Renders all 13 games with dynamic metadata, responsive 16:9 artwork,
 * contrast gradient scrim, and accessible action buttons.
 */
export default function GameCard({
  game,
  userTokens,
  onPlay,
  disabled = false,
  loading = false,
  className = '',
  style = {}
}) {
  const navigate = useNavigate();
  const { canAffordGame } = useEconomy();
  const [isCardHovered, setIsCardHovered] = useState(false);

  if (!game) return null;

  // Determine if user has insufficient tokens:
  // If userTokens prop is explicitly provided (e.g. showcase page), check that.
  // Otherwise use the centralized canAffordGame helper.
  const isInsufficientTokens = typeof userTokens === 'number'
    ? userTokens < game.tokenCost
    : !canAffordGame(game);

  const isPlayable = game.gameType === 'playable';

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (disabled || loading || isInsufficientTokens) return;

    if (onPlay) {
      onPlay(game);
    } else if (game.route) {
      // Navigates to game-specific Home page where token validation and entry deduction occur
      navigate(game.route);
    }
  };

  return (
    <article
      className={`velop-game-card surface-elevated ${className}`.trim()}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      aria-labelledby={`game-title-${game.id}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-card)',
        border: isCardHovered
          ? '1px solid var(--color-border-strong)'
          : '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        overflow: 'hidden',
        boxShadow: isCardHovered ? 'var(--shadow-lg)' : 'var(--shadow-card)',
        transform: isCardHovered ? 'translateY(-4px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'transform var(--transition-smooth), box-shadow var(--transition-smooth), border-color var(--transition-fast)',
        opacity: disabled ? 0.7 : 1,
        ...style
      }}
    >
      {/* 1. Artwork Banner Container (16:9) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: 'var(--color-bg-alt)',
          overflow: 'hidden'
        }}
      >
        <img
          src={game.image}
          alt={game.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            transform: isCardHovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* Contrast Scrim / Atmosphere Gradient Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(22, 24, 39, 0.95) 0%, rgba(22, 24, 39, 0.45) 45%, rgba(22, 24, 39, 0.1) 80%, transparent 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Top Badges: Category & Playable Status */}
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-3)',
            left: 'var(--space-3)',
            right: 'var(--space-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none'
          }}
        >
          {/* Category Tag */}
          <span
            style={{
              padding: '3px 9px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'rgba(22, 24, 39, 0.85)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              backdropFilter: 'blur(4px)'
            }}
          >
            {game.category}
          </span>

          {/* Playable Indicator */}
          {isPlayable && (
            <span
              style={{
                padding: '3px 9px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid var(--color-gold-border)',
                color: 'var(--color-gold-highlight)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-bold)',
                letterSpacing: 'var(--tracking-wide)',
                backdropFilter: 'blur(4px)'
              }}
            >
              Playable
            </span>
          )}
        </div>

        {/* Title Overlay in Artwork Scrim */}
        <div
          style={{
            position: 'absolute',
            bottom: 'var(--space-3)',
            left: 'var(--space-4)',
            right: 'var(--space-4)',
            pointerEvents: 'none'
          }}
        >
          <h3
            id={`game-title-${game.id}`}
            className="text-card-title"
            style={{
              margin: 0,
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.75)'
            }}
          >
            {game.title}
          </h3>
        </div>
      </div>

      {/* 2. Action Bar & Economy Footer */}
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          padding: 'var(--space-3) var(--space-4)',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border-subtle)'
        }}
      >
        {/* Token Cost Requirement */}
        <TokenCost amount={game.tokenCost} />

        {/* Play Now CTA Button */}
        <PlayNowButton
          game={game}
          disabled={disabled}
          loading={loading}
          insufficientTokens={isInsufficientTokens}
          onClick={handlePlayClick}
        />
      </footer>
    </article>
  );
}
