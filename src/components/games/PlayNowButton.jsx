import { useState } from 'react';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';

/**
 * PlayNowButton Component
 * Features a continuous, subtle, premium diagonal shimmer animation,
 * hover arrow shift, tactile active press, and accessible state management.
 */
export default function PlayNowButton({
  game,
  onClick,
  disabled = false,
  loading = false,
  insufficientTokens = false,
  className = '',
  style = {}
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isActionDisabled = disabled || loading || insufficientTokens;
  const gameTitle = game?.title || 'Game';

  // Construct accessible label
  const accessibleLabel = loading
    ? `Starting ${gameTitle}...`
    : disabled
      ? `${gameTitle} is currently unavailable`
      : insufficientTokens
        ? `Insufficient tokens to play ${gameTitle}. Requires ${game?.tokenCost || 20} tokens.`
        : `Play ${gameTitle}`;

  return (
    <button
      type="button"
      disabled={isActionDisabled}
      aria-busy={loading}
      aria-label={accessibleLabel}
      onClick={isActionDisabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`play-now-btn shimmer-container transition-button-press ${className}`.trim()}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        padding: '8px 16px',
        borderRadius: 'var(--radius-sm)',
        background: insufficientTokens
          ? 'rgba(239, 68, 68, 0.14)'
          : isActionDisabled
            ? 'var(--color-surface-elevated)'
            : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
        color: insufficientTokens
          ? 'var(--color-error)'
          : isActionDisabled
            ? 'var(--color-text-muted)'
            : '#ffffff',
        border: insufficientTokens
          ? '1px solid rgba(239, 68, 68, 0.35)'
          : isActionDisabled
            ? '1px solid var(--color-border)'
            : '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: isActionDisabled || insufficientTokens ? 'none' : 'var(--shadow-sm)',
        fontSize: 'var(--font-size-small)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 1,
        cursor: isActionDisabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all var(--transition-fast)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Infinite Subtle Shimmer Layer (Only active when enabled and sufficient tokens) */}
      {!isActionDisabled && !insufficientTokens && (
        <div className="shimmer-sweep" aria-hidden="true" />
      )}

      {/* Button Content */}
      {loading ? (
        <>
          <Loader2 size={15} className="animate-spin" aria-hidden="true" />
          <span>Starting...</span>
        </>
      ) : insufficientTokens ? (
        <>
          <AlertCircle size={14} aria-hidden="true" />
          <span>Need Tokens</span>
        </>
      ) : (
        <>
          <span>Play Now</span>
          <ArrowRight
            size={15}
            aria-hidden="true"
            style={{
              transition: 'transform var(--transition-fast)',
              transform: isHovered ? 'translateX(3px)' : 'translateX(0)'
            }}
          />
        </>
      )}
    </button>
  );
}
