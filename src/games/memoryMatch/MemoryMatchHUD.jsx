import React from 'react';
import { Trophy, Clock, CheckCircle2, Flame, Layers } from 'lucide-react';
import BalanceDisplay from '../../components/economy/BalanceDisplay';

/**
 * MemoryMatchHUD Component
 * Light-theme status bar displaying live Score, Timer, Moves, Matched Pairs, and Combos.
 */
export default function MemoryMatchHUD({
  score = 0,
  timeRemaining = 60,
  moves = 0,
  matchedPairs = 0,
  totalPairs = 8,
  combo = 0
}) {
  const isTimeCritical = timeRemaining <= 10;
  const isTimeWarning = timeRemaining <= 15 && timeRemaining > 10;

  let timerBg = '#f8fafc';
  let timerBorder = '#cbd5e1';
  let timerColor = '#334155';

  if (isTimeCritical) {
    timerBg = '#fee2e2';
    timerBorder = '#fca5a5';
    timerColor = '#dc2626';
  } else if (isTimeWarning) {
    timerBg = '#fef3c7';
    timerBorder = '#fde68a';
    timerColor = '#b45309';
  }

  return (
    <div
      role="region"
      aria-label="Memory Match Status Heads-Up Display"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '10px 14px',
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
          gap: '6px',
          padding: '5px 12px',
          borderRadius: '9999px',
          backgroundColor: '#eef2ff',
          border: '1px solid #c7d2fe',
          color: '#4338ca',
          fontWeight: 800,
          fontSize: '14px'
        }}
        aria-live="polite"
        aria-label={`Score: ${score}`}
      >
        <Trophy size={16} style={{ color: '#6366f1' }} aria-hidden="true" />
        <span>SCORE</span>
        <span style={{ color: '#312e81', fontSize: '15px' }}>{score}</span>
      </div>

      {/* 2. Timer Countdown */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 12px',
          borderRadius: '9999px',
          backgroundColor: timerBg,
          border: `1px solid ${timerBorder}`,
          color: timerColor,
          fontWeight: 800,
          fontSize: '14px',
          transition: 'background-color 300ms ease, color 300ms ease'
        }}
        aria-label={`Time remaining: ${timeRemaining} seconds`}
      >
        <Clock size={16} aria-hidden="true" />
        <span>TIME</span>
        <span style={{ minWidth: '28px', textAlign: 'right' }}>{timeRemaining}s</span>
      </div>

      {/* 3. Moves Counter */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 12px',
          borderRadius: '9999px',
          backgroundColor: '#f1f5f9',
          border: '1px solid #e2e8f0',
          color: '#475569',
          fontWeight: 700,
          fontSize: '13px'
        }}
        aria-label={`Moves taken: ${moves}`}
      >
        <Layers size={15} style={{ color: '#64748b' }} aria-hidden="true" />
        <span>MOVES</span>
        <span style={{ color: '#1e293b', fontWeight: 800 }}>{moves}</span>
      </div>

      {/* 4. Matched Pairs Progress */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 12px',
          borderRadius: '9999px',
          backgroundColor: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#047857',
          fontWeight: 800,
          fontSize: '13px'
        }}
        aria-live="polite"
        aria-label={`Pairs matched: ${matchedPairs} of ${totalPairs}`}
      >
        <CheckCircle2 size={15} style={{ color: '#10b981' }} aria-hidden="true" />
        <span>PAIRS</span>
        <span style={{ color: '#065f46' }}>{matchedPairs} / {totalPairs}</span>
      </div>

      {/* 5. Combo Streak Indicator (if combo > 1) */}
      {combo > 1 && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '5px 11px',
            borderRadius: '9999px',
            backgroundColor: '#fff7ed',
            border: '1px solid #fed7aa',
            color: '#c2410c',
            fontWeight: 800,
            fontSize: '13px',
            animation: 'pulse 1s infinite'
          }}
          aria-live="polite"
          aria-label={`Combo: ${combo} times streak`}
        >
          <Flame size={15} style={{ color: '#ea580c' }} aria-hidden="true" />
          <span>COMBO</span>
          <span>×{combo}</span>
        </div>
      )}

      {/* 6. Centralized Balances */}
      <div>
        <BalanceDisplay variant="compact" />
      </div>
    </div>
  );
}
