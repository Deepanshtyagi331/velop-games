import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';
import {
  MEMORY_MATCH_CONFIG,
  generateShuffledDeck
} from './memoryMatchConfig';
import MemoryCard from './MemoryCard';
import MemoryMatchHUD from './MemoryMatchHUD';
import MemoryMatchGameOver from './MemoryMatchGameOver';
import GameBottomNav from '../../components/games/GameBottomNav';
import useEconomy from '../../hooks/useEconomy';
import { calculateMemoryMatchReward, generateRoundId } from '../rewards/rewardConfig';
import ReviveModal from '../rewards/ReviveModal';
import './memoryMatch.css';

/**
 * MemoryMatchGame Component
 * Original 4x4 card matching puzzle game with 3D flip animations,
 * combo multipliers, countdown timer, and accessible keyboard navigation.
 */
export default function MemoryMatchGame() {
  const { addGameCoins, gameCoins } = useEconomy();

  // Game states: 'ready' | 'countdown' | 'playing' | 'resolving' | 'completed' | 'timeup'
  const [gameState, setGameState] = useState('ready');
  const [countdown, setCountdown] = useState(MEMORY_MATCH_CONFIG.COUNTDOWN_SECONDS);
  const [isResolving, setIsResolving] = useState(false);

  // Deck & Card state
  const [cards, setCards] = useState(() => generateShuffledDeck());

  // Gameplay metrics
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(MEMORY_MATCH_CONFIG.GAME_DURATION);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(1);

  // Phase 10: Rewards & Revive State
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [isRevivePromptOpen, setIsRevivePromptOpen] = useState(false);
  const isSettledRef = useRef(false);
  const hasRevivedRef = useRef(false);
  const matchedPairsRef = useRef(0);
  const roundIdRef = useRef(generateRoundId('memory-match'));

  // Sync ref guards to prevent rapid-click race conditions
  const isResolvingRef = useRef(false);
  const firstIndexRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const mismatchTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Stop active intervals & timeouts
  const clearAllTimers = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Settle round and add Game Coins with single settlement guard
  const settleRound = useCallback((finalState, pairsCount) => {
    clearAllTimers();
    isResolvingRef.current = false;
    setIsResolving(false);

    const isCompleted = finalState === 'completed';
    const reward = calculateMemoryMatchReward(pairsCount, isCompleted);
    setEarnedCoins(reward);

    if (!isSettledRef.current) {
      isSettledRef.current = true;
      addGameCoins(reward);
    }

    setGameState(finalState);
  }, [clearAllTimers, addGameCoins]);

  // Start 60-second puzzle countdown timer
  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          isResolvingRef.current = false;
          setIsResolving(false);

          // If revive hasn't been used yet, offer Revive modal
          if (!hasRevivedRef.current && matchedPairsRef.current < MEMORY_MATCH_CONFIG.TOTAL_PAIRS) {
            setIsRevivePromptOpen(true);
            return 0;
          } else {
            settleRound('timeup', matchedPairsRef.current);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);
  }, [settleRound]);

  // Resume after Revive (+20 seconds)
  const handleRevive = useCallback(() => {
    setIsRevivePromptOpen(false);
    hasRevivedRef.current = true;
    setTimeRemaining(20);
    startTimer();
  }, [startTimer]);

  // Player Forfeits Revive -> Settle Immediately
  const handleNoThanks = useCallback(() => {
    setIsRevivePromptOpen(false);
    settleRound('timeup', matchedPairsRef.current);
  }, [settleRound]);

  // Start countdown before active gameplay
  const startCountdown = useCallback(() => {
    clearAllTimers();
    roundIdRef.current = generateRoundId('memory-match');
    isSettledRef.current = false;
    hasRevivedRef.current = false;
    setIsRevivePromptOpen(false);
    setEarnedCoins(0);
    matchedPairsRef.current = 0;

    setCards(generateShuffledDeck());
    firstIndexRef.current = null;
    isResolvingRef.current = false;
    setIsResolving(false);

    setScore(0);
    setMoves(0);
    setMatchedPairs(0);
    setCombo(0);
    setMaxCombo(1);
    setTimeRemaining(MEMORY_MATCH_CONFIG.GAME_DURATION);

    setCountdown(3);
    setGameState('countdown');

    let current = 3;
    countdownIntervalRef.current = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdown(current);
      } else if (current === 0) {
        setCountdown('GO!');
      } else {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
        setGameState('playing');
        startTimer();
      }
    }, 850);
  }, [clearAllTimers, startTimer]);

  // Card Selection Handler with Concurrency Protection
  const handleCardSelect = (index) => {
    // 1. Guard against clicks in invalid game states
    if (gameState !== 'playing' || isResolvingRef.current) return;

    const selectedCard = cards[index];
    if (!selectedCard || selectedCard.isMatched || selectedCard.isFlipped) return;

    // 2. First card selection
    if (firstIndexRef.current === null) {
      firstIndexRef.current = index;
      setCards((prev) =>
        prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c))
      );
      return;
    }

    // 3. Prevent clicking the exact same card twice
    if (firstIndexRef.current === index) return;

    // 4. Second card selection
    const firstIdx = firstIndexRef.current;
    const firstCard = cards[firstIdx];
    isResolvingRef.current = true; // Lock further clicks synchronously
    setIsResolving(true);

    // Flip second card immediately
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c))
    );

    // Increment moves
    setMoves((prev) => prev + 1);

    // 5. Compare Cards
    if (firstCard.symbolId === selectedCard.symbolId) {
      // MATCH FOUND!
      const currentCombo = combo + 1;
      const pointsEarned =
        MEMORY_MATCH_CONFIG.MATCH_SCORE +
        (currentCombo > 1 ? (currentCombo - 1) * MEMORY_MATCH_CONFIG.COMBO_BONUS : 0);

      setScore((prev) => prev + pointsEarned);
      setCombo(currentCombo);
      setMaxCombo((prev) => Math.max(prev, currentCombo));

      // Mark matched after brief confirmation
      setCards((prev) =>
        prev.map((c, i) =>
          i === firstIdx || i === index
            ? { ...c, isFlipped: true, isMatched: true }
            : c
        )
      );

      const nextPairs = matchedPairs + 1;
      setMatchedPairs(nextPairs);
      matchedPairsRef.current = nextPairs;

      // Unlock for next turn
      firstIndexRef.current = null;
      isResolvingRef.current = false;
      setIsResolving(false);

      // Check if all pairs matched
      if (nextPairs === MEMORY_MATCH_CONFIG.TOTAL_PAIRS) {
        settleRound('completed', nextPairs);
      }
    } else {
      // MISMATCH
      setCombo(0); // Reset streak

      mismatchTimeoutRef.current = setTimeout(() => {
        setCards((prev) =>
          prev.map((c, i) =>
            i === firstIdx || i === index ? { ...c, isFlipped: false } : c
          )
        );

        firstIndexRef.current = null;
        isResolvingRef.current = false;
        setIsResolving(false);
      }, MEMORY_MATCH_CONFIG.MISMATCH_DELAY);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        backgroundColor: '#f1f5f9',
        padding: 'var(--space-4) var(--space-4) 80px var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}
      >
        <Link
          to="/games/memory-match"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '9999px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            color: '#334155',
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
            transition: 'background-color 150ms ease'
          }}
        >
          <ArrowLeft size={16} />
          <span>Game Home</span>
        </Link>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '9999px',
            backgroundColor: '#eef2ff',
            border: '1px solid #c7d2fe',
            color: '#4338ca',
            fontSize: '13px',
            fontWeight: 800
          }}
        >
          <Sparkles size={15} style={{ color: '#6366f1' }} />
          <span>Memory Match &bull; 4×4</span>
        </div>
      </div>

      {/* Main Game Container */}
      <div className="memory-match-container">
        {/* Heads-Up Display (HUD) */}
        <MemoryMatchHUD
          score={score}
          timeRemaining={timeRemaining}
          moves={moves}
          matchedPairs={matchedPairs}
          totalPairs={MEMORY_MATCH_CONFIG.TOTAL_PAIRS}
          combo={combo}
        />

        {/* Playfield Area */}
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Card Grid */}
          <div
            className="memory-grid"
            role="region"
            aria-label="Memory Match 4 by 4 Card Board"
          >
            {cards.map((card, idx) => (
              <MemoryCard
                key={card.id}
                card={card}
                index={idx}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                disabled={
                  gameState !== 'playing' ||
                  isResolving ||
                  card.isMatched ||
                  card.isFlipped
                }
                onSelect={handleCardSelect}
              />
            ))}
          </div>

          {/* 1. Ready Screen Overlay */}
          {gameState === 'ready' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(4px)',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                textAlign: 'center',
                gap: '16px',
                zIndex: 20
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#eef2ff',
                  border: '2px solid #c7d2fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4f46e5',
                  boxShadow: '0 8px 20px rgba(99, 102, 241, 0.2)'
                }}
              >
                <Sparkles size={32} />
              </div>

              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#0f172a'
                  }}
                >
                  Ready to Match?
                </h1>
                <p
                  style={{
                    margin: '8px 0 0 0',
                    color: '#64748b',
                    fontSize: '15px',
                    maxWidth: '380px',
                    lineHeight: 1.4
                  }}
                >
                  Find all 8 matching pairs before time runs out. Flip cards two at a time and maintain streaks for combo bonuses!
                </p>
              </div>

              <button
                type="button"
                onClick={startCountdown}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 36px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '17px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(79, 70, 229, 0.35)',
                  transition: 'transform 150ms ease, box-shadow 150ms ease'
                }}
              >
                <Play size={20} fill="currentColor" />
                <span>Start Game</span>
              </button>
            </div>
          )}

          {/* 2. Countdown 3-2-1-GO Overlay */}
          {gameState === 'countdown' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(3px)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20
              }}
            >
              <span
                key={countdown}
                style={{
                  fontSize: typeof countdown === 'number' ? '96px' : '72px',
                  fontWeight: 900,
                  color: '#4f46e5',
                  textShadow: '0 4px 20px rgba(79, 70, 229, 0.3)'
                }}
              >
                {countdown}
              </span>
            </div>
          )}

          {/* 3. Revive Prompt Dialog */}
          {isRevivePromptOpen && (
            <ReviveModal
              gameType="memory-match"
              score={score}
              onRevive={handleRevive}
              onNoThanks={handleNoThanks}
            />
          )}

          {/* 4. Game Over Results Overlay */}
          {(gameState === 'completed' || gameState === 'timeup') && (
            <MemoryMatchGameOver
              status={gameState}
              score={score}
              moves={moves}
              matchedPairs={matchedPairs}
              totalPairs={MEMORY_MATCH_CONFIG.TOTAL_PAIRS}
              timeRemaining={timeRemaining}
              timeUsed={MEMORY_MATCH_CONFIG.GAME_DURATION - timeRemaining}
              maxCombo={maxCombo}
              earnedCoins={earnedCoins}
              currentCoins={gameCoins}
              onPlayAgain={startCountdown}
            />
          )}
        </div>
      </div>

      {/* Persistent Bottom Navigation */}
      <div style={{ marginTop: 'var(--space-6)' }}>
        <GameBottomNav gameSlug="memory-match" />
      </div>
    </div>
  );
}
