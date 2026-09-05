import React from 'react';
import { Link } from 'react-router-dom';
import {
  RotateCcw,
  Home,
  Clock,
  Layers,
  CheckCircle2,
  Flame,
  Award,
  AlertCircle
} from 'lucide-react';
import { getStoredBestScore, saveBestScore } from './memoryMatchConfig';

/**
 * MemoryMatchGameOver Component
 * Results modal presenting round completion or time up summary with comprehensive puzzle statistics.
 */
export default function MemoryMatchGameOver({
  status = 'completed', // 'completed' | 'timeup'
  score = 0,
  moves = 0,
  matchedPairs = 0,
  totalPairs = 8,
  timeRemaining = 0,
  timeUsed = 60,
  maxCombo = 1,
  earnedCoins = 0,
  currentCoins = 0,
  onPlayAgain
}) {
  const isCompleted = status === 'completed';
  const previousBest = getStoredBestScore();
  const isNewHighScore = score > previousBest;

  // Persist high score if beaten
  if (isNewHighScore) {
    saveBestScore(score);
  }
  const displayBest = Math.max(score, previousBest);

  // Performance appraisal
  let appraisal = 'Good Attempt!';
  let appraisalColor = '#64748b';
  let appraisalBg = '#f1f5f9';

  if (isCompleted) {
    if (moves <= 12) {
      appraisal = 'Grandmaster Puzzler';
      appraisalColor = '#d97706';
      appraisalBg = '#fef3c7';
    } else if (moves <= 16) {
      appraisal = 'Expert Solver';
      appraisalColor = '#4338ca';
      appraisalBg = '#eef2ff';
    } else {
      appraisal = 'Puzzle Solved!';
      appraisalColor = '#047857';
      appraisalBg = '#ecfdf5';
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-over-title"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 50,
        animation: 'fadeIn 250ms ease-out'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '28px 24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px'
        }}
      >
        {/* Status Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: isCompleted ? '#eef2ff' : '#fee2e2',
            border: `2px solid ${isCompleted ? '#c7d2fe' : '#fca5a5'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isCompleted ? '#4f46e5' : '#dc2626',
            boxShadow: `0 8px 20px ${isCompleted ? 'rgba(99, 102, 241, 0.2)' : 'rgba(220, 38, 38, 0.2)'}`
          }}
          aria-hidden="true"
        >
          {isCompleted ? <Award size={36} /> : <AlertCircle size={36} />}
        </div>

        {/* Title & Appraisal */}
        <div>
          <h2
            id="game-over-title"
            style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: 900,
              color: '#0f172a'
            }}
          >
            {isCompleted ? 'BOARD COMPLETE' : 'TIME UP'}
          </h2>
          <div
            style={{
              display: 'inline-block',
              marginTop: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: appraisalBg,
              color: appraisalColor,
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            {appraisal}
          </div>
        </div>

        {/* Main Score & Reward Banners */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px'
          }}
        >
          {/* Final Score */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#f8fafc',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>
              FINAL SCORE
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 900,
                color: '#4338ca',
                lineHeight: 1.1
              }}
            >
              {score}
            </div>
            {isNewHighScore && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#d97706',
                  backgroundColor: '#fef3c7',
                  padding: '2px 6px',
                  borderRadius: '9999px'
                }}
              >
                ★ Best!
              </span>
            )}
          </div>

          {/* Reward Earned */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#ecfdf5',
              borderRadius: '14px',
              border: '1px solid #a7f3d0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#047857' }}>
              REWARD EARNED
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 900,
                color: '#059669',
                lineHeight: 1.1
              }}
            >
              +{earnedCoins}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#065f46' }}>
              Game Coins
            </div>
          </div>
        </div>

        {/* Centralized Balance Pill */}
        <div
          style={{
            width: '100%',
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: '#eef2ff',
            border: '1px solid #c7d2fe',
            color: '#4338ca',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>Total Game Coin Balance:</span>
          <strong style={{ fontSize: '15px', color: '#312e81' }}>{currentCoins} Coins</strong>
        </div>

        {/* Best Score Indicator */}
        <div
          style={{
            fontSize: '12px',
            color: '#64748b',
            fontWeight: 700
          }}
        >
          All-Time Best Score: <strong style={{ color: '#0f172a' }}>{displayBest}</strong>
        </div>

        {/* Detailed Round Statistics */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px'
          }}
        >
          {/* Moves Taken */}
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textAlign: 'left'
            }}
          >
            <Layers size={18} color="#64748b" aria-hidden="true" />
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>MOVES</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{moves}</div>
            </div>
          </div>

          {/* Pairs Matched */}
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textAlign: 'left'
            }}
          >
            <CheckCircle2 size={18} color="#10b981" aria-hidden="true" />
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>PAIRS</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                {matchedPairs} / {totalPairs}
              </div>
            </div>
          </div>

          {/* Time Survived / Used */}
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textAlign: 'left'
            }}
          >
            <Clock size={18} color="#3b82f6" aria-hidden="true" />
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>
                {isCompleted ? 'TIME REMAINING' : 'TIME USED'}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                {isCompleted ? `${timeRemaining}s` : `${timeUsed}s`}
              </div>
            </div>
          </div>

          {/* Best Streak / Combo */}
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textAlign: 'left'
            }}
          >
            <Flame size={18} color="#ea580c" aria-hidden="true" />
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>BEST COMBO</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                {maxCombo > 1 ? `×${maxCombo}` : '1'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '8px'
          }}
        >
          <button
            type="button"
            onClick={onPlayAgain}
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              color: '#ffffff',
              border: 'none',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
              transition: 'transform 150ms ease, box-shadow 150ms ease'
            }}
          >
            <RotateCcw size={18} />
            <span>Play Again</span>
          </button>

          <Link
            to="/games/memory-match"
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: '14px',
              backgroundColor: '#f1f5f9',
              color: '#334155',
              border: '1px solid #e2e8f0',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'background-color 150ms ease'
            }}
          >
            <Home size={16} />
            <span>Back to Game Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
