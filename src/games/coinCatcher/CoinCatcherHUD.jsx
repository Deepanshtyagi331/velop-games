import { Heart, Clock, Trophy } from 'lucide-react';
import BalanceDisplay from '../../components/economy/BalanceDisplay';

/**
 * CoinCatcherHUD Component
 * Light-theme gameplay status bar displaying live Score, remaining Lives, Timer countdown,
 * and centralized balance.
 */
export default function CoinCatcherHUD({
  score = 0,
  lives = 3,
  maxLives = 3,
  timeRemaining = 60
}) {
  const isTimeLow = timeRemaining <= 10;

  return (
    <div
      role="region"
      aria-label="Coin Catcher Status Heads-Up Display"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-3)',
        padding: '10px 16px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* 1. Score Counter */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          backgroundColor: '#fef3c7',
          border: '1px solid #fde68a',
          color: '#b45309',
          fontWeight: 800,
          fontSize: '15px'
        }}
        aria-live="polite"
        aria-label={`Current Score: ${score}`}
      >
        <Trophy size={17} style={{ color: '#f59e0b' }} aria-hidden="true" />
        <span>SCORE</span>
        <span style={{ color: '#92400e', fontSize: '16px' }}>{score}</span>
      </div>

      {/* 2. Lives Indicators */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '9999px',
          backgroundColor: '#fff1f2',
          border: '1px solid #fecdd3',
          color: '#be123c',
          fontWeight: 700,
          fontSize: '14px'
        }}
        aria-live="assertive"
        aria-label={`${lives} of ${maxLives} Lives Remaining`}
      >
        <span>LIVES</span>
        <div style={{ display: 'inline-flex', gap: '3px' }} aria-hidden="true">
          {Array.from({ length: maxLives }).map((_, index) => {
            const isAlive = index < lives;
            return (
              <Heart
                key={index}
                size={18}
                fill={isAlive ? '#f43f5e' : 'none'}
                color={isAlive ? '#f43f5e' : '#cbd5e1'}
                style={{
                  transition: 'transform 200ms ease',
                  transform: isAlive ? 'scale(1)' : 'scale(0.85)'
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 3. Timer Countdown */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          backgroundColor: isTimeLow ? '#fee2e2' : '#f8fafc',
          border: `1px solid ${isTimeLow ? '#fca5a5' : '#cbd5e1'}`,
          color: isTimeLow ? '#dc2626' : '#334155',
          fontWeight: 800,
          fontSize: '15px',
          transition: 'background-color 300ms ease, color 300ms ease'
        }}
        aria-label={`Time remaining: ${timeRemaining} seconds`}
      >
        <Clock size={16} style={{ color: isTimeLow ? '#dc2626' : '#64748b' }} aria-hidden="true" />
        <span>TIME</span>
        <span style={{ minWidth: '28px', textAlign: 'right' }}>{timeRemaining}s</span>
      </div>

      {/* 4. Live Centralized Balances */}
      <div>
        <BalanceDisplay variant="compact" />
      </div>
    </div>
  );
}
