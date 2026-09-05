import React from 'react';
import { Heart, Clock, Play, X, ShieldAlert } from 'lucide-react';

/**
 * ReviveModal Component
 * Accessible, light-theme dialog offering a single chance to continue the round.
 */
export default function ReviveModal({
  gameType = 'coin-catcher', // 'coin-catcher' | 'memory-match'
  score = 0,
  onRevive,
  onNoThanks
}) {
  const isCoinCatcher = gameType === 'coin-catcher';

  const title = isCoinCatcher ? 'Keep Playing?' : "Time's Up!";
  const subtitle = isCoinCatcher
    ? 'You lost your 3 lives. Revive now to continue with 2 extra lives and keep your current score!'
    : 'Your 60 seconds expired. Revive now to add +20 extra seconds and finish matching the board!';

  const benefitLabel = isCoinCatcher ? '+2 Lives Restored' : '+20 Seconds Added';
  const accentGradient = isCoinCatcher
    ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
    : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)';
  const shadowColor = isCoinCatcher ? 'rgba(245, 158, 11, 0.35)' : 'rgba(79, 70, 229, 0.35)';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="revive-modal-title"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 60,
        animation: 'fadeIn 200ms ease-out'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '28px 24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {/* Emblem Icon */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: isCoinCatcher ? '#fef3c7' : '#eef2ff',
            border: `2px solid ${isCoinCatcher ? '#fde68a' : '#c7d2fe'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isCoinCatcher ? '#d97706' : '#4f46e5',
            boxShadow: `0 8px 16px ${shadowColor}`
          }}
          aria-hidden="true"
        >
          {isCoinCatcher ? <Heart size={30} fill="#f59e0b" /> : <Clock size={30} />}
        </div>

        {/* Title & Subtitle */}
        <div>
          <h2
            id="revive-modal-title"
            style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 900,
              color: '#0f172a'
            }}
          >
            {title}
          </h2>
          <p
            style={{
              margin: '8px 0 0 0',
              fontSize: '14px',
              color: '#64748b',
              lineHeight: 1.45
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Highlight Benefit Pill */}
        <div
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '14px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Current Score
            </span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
              {score}
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '9999px',
              backgroundColor: isCoinCatcher ? '#fef3c7' : '#eef2ff',
              border: `1px solid ${isCoinCatcher ? '#fde68a' : '#c7d2fe'}`,
              color: isCoinCatcher ? '#b45309' : '#4338ca',
              fontSize: '12px',
              fontWeight: 800
            }}
          >
            <ShieldAlert size={14} />
            <span>{benefitLabel}</span>
          </div>
        </div>

        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
          1 free revive per session &bull; 0 Tokens
        </span>

        {/* Action Buttons */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <button
            type="button"
            onClick={onRevive}
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px',
              borderRadius: '14px',
              background: accentGradient,
              color: '#ffffff',
              border: 'none',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: `0 4px 14px ${shadowColor}`,
              transition: 'transform 150ms ease'
            }}
          >
            <Play size={18} fill="currentColor" />
            <span>Revive</span>
          </button>

          <button
            type="button"
            onClick={onNoThanks}
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '11px',
              borderRadius: '14px',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              border: '1px solid #e2e8f0',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 150ms ease'
            }}
          >
            <X size={16} />
            <span>No Thanks, Finish Round</span>
          </button>
        </div>
      </div>
    </div>
  );
}
