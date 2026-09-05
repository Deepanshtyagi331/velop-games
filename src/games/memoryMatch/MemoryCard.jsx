import React from 'react';
import {
  Star,
  Gem,
  Crown,
  Zap,
  Flame,
  Moon,
  Trophy,
  Heart,
  HelpCircle,
  Check
} from 'lucide-react';

// Icon registry for reliable lookup
const ICON_MAP = {
  Star,
  Gem,
  Crown,
  Zap,
  Flame,
  Moon,
  Trophy,
  Heart
};

/**
 * MemoryCard Component
 * Renders an accessible 3D-flipping card.
 */
export default function MemoryCard({
  card,
  index,
  isFlipped,
  isMatched,
  disabled,
  onSelect
}) {
  const IconComponent = ICON_MAP[card.iconName] || Star;

  // Build accessible label
  let accessibilityLabel = `Card ${index + 1}: Hidden`;
  if (isMatched) {
    accessibilityLabel = `Card ${index + 1}: ${card.name}, Matched`;
  } else if (isFlipped) {
    accessibilityLabel = `Card ${index + 1}: ${card.name}, Face Up`;
  }

  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onSelect(index);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      className={`memory-card-wrapper ${isFlipped || isMatched ? 'flipped' : ''} ${
        isMatched ? 'matched' : ''
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || isMatched || isFlipped}
      aria-label={accessibilityLabel}
      aria-pressed={isFlipped || isMatched}
      tabIndex={isMatched ? -1 : 0}
    >
      <div className="memory-card-inner">
        {/* Face Down (Card Back) */}
        <div className="memory-card-face memory-card-back">
          <div className="card-back-emblem" aria-hidden="true">
            <HelpCircle size={20} strokeWidth={2.5} />
          </div>
        </div>

        {/* Face Up (Card Front) */}
        <div
          className="memory-card-face memory-card-front"
          style={{
            backgroundColor: isMatched ? '#f0fdf4' : '#ffffff',
            borderColor: isMatched ? '#10b981' : card.borderColor
          }}
        >
          {isMatched && (
            <div className="matched-badge" aria-hidden="true">
              <Check size={11} strokeWidth={3} />
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: isMatched ? '#dcfce7' : card.bgColor,
              color: isMatched ? '#15803d' : card.color,
              transition: 'background-color 200ms ease, color 200ms ease'
            }}
            aria-hidden="true"
          >
            <IconComponent size={24} strokeWidth={2.4} />
          </div>

          <span
            className="memory-card-label"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: isMatched ? '#166534' : '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            {card.name}
          </span>
        </div>
      </div>
    </button>
  );
}
