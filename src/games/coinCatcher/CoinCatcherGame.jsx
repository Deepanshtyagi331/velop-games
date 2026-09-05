import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import COIN_CATCHER_CONFIG from './coinCatcherConfig';
import CoinCatcherHUD from './CoinCatcherHUD';
import CoinCatcherControls from './CoinCatcherControls';
import GameOverPanel from './GameOverPanel';
import GameBottomNav from '../../components/games/GameBottomNav';
import useEconomy from '../../hooks/useEconomy';
import { calculateCoinCatcherReward, generateRoundId } from '../rewards/rewardConfig';
import ReviveModal from '../rewards/ReviveModal';
import { ArrowLeft, Play, Sun, Gamepad2 } from 'lucide-react';

/**
 * CoinCatcherGame Component
 * Original HTML5 Canvas arcade game with 60fps RAF game loop,
 * smooth keyboard & touch controls, collision detection, and light-theme environment.
 */
export default function CoinCatcherGame() {
  const { addGameCoins, gameCoins } = useEconomy();

  // Game states: 'ready' | 'countdown' | 'playing' | 'gameover'
  const [gameState, setGameState] = useState('ready');
  const [countdown, setCountdown] = useState(3);

  // Discrete HUD states (updated on events / timer tick, NOT every RAF frame)
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(COIN_CATCHER_CONFIG.INITIAL_LIVES);
  const [timeRemaining, setTimeRemaining] = useState(COIN_CATCHER_CONFIG.GAME_DURATION);
  const [gameOverReason, setGameOverReason] = useState('completed');
  const [sessionStats, setSessionStats] = useState({ coins: 0, gems: 0, bombs: 0, time: 60 });

  // Phase 10: Rewards & Revive State
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [isRevivePromptOpen, setIsRevivePromptOpen] = useState(false);
  const isSettledRef = useRef(false);
  const hasRevivedRef = useRef(false);
  const roundIdRef = useRef(generateRoundId('coin-catcher'));

  // Canvas & Engine Refs
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const rafIdRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const lastTimeRef = useRef(0);
  const lastSpawnTimeRef = useRef(0);

  // Continuous Gameplay State Refs (avoids React re-renders in 60fps loop)
  const catcherXRef = useRef(COIN_CATCHER_CONFIG.VIRTUAL_WIDTH / 2);
  const activeKeysRef = useRef({ left: false, right: false });
  const objectsRef = useRef([]);
  const particlesRef = useRef([]);
  const floatingScoresRef = useRef([]);
  const damageFlashRef = useRef(0);
  const screenShakeRef = useRef({ intensity: 0 });

  // Mutable trackers for stats
  const scoreRef = useRef(0);
  const livesRef = useRef(COIN_CATCHER_CONFIG.INITIAL_LIVES);
  const timeRemainingRef = useRef(COIN_CATCHER_CONFIG.GAME_DURATION);
  const statsTrackerRef = useRef({ coins: 0, gems: 0, bombs: 0 });

  // Cleanup helper
  const stopAllLoops = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.code) || e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        activeKeysRef.current.left = true;
      }
      if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.code) || e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        activeKeysRef.current.right = true;
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.code) || e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        activeKeysRef.current.left = false;
      }
      if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.code) || e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        activeKeysRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      stopAllLoops();
    };
  }, [stopAllLoops]);

  // Touch Controls Handlers
  const handleTouchMoveStart = useCallback((direction) => {
    if (direction === 'left') activeKeysRef.current.left = true;
    if (direction === 'right') activeKeysRef.current.right = true;
  }, []);

  const handleTouchMoveEnd = useCallback((direction) => {
    if (direction === 'left') activeKeysRef.current.left = false;
    if (direction === 'right') activeKeysRef.current.right = false;
  }, []);

  // Settle Round & Credit Reward Exactly Once
  const settleRound = useCallback((reason) => {
    stopAllLoops();
    setGameOverReason(reason);
    const survivedTime = COIN_CATCHER_CONFIG.GAME_DURATION - timeRemainingRef.current;
    const finalStats = {
      coins: statsTrackerRef.current.coins,
      gems: statsTrackerRef.current.gems,
      bombs: statsTrackerRef.current.bombs,
      time: Math.max(1, survivedTime)
    };
    setSessionStats(finalStats);

    // Calculate deterministic reward based on score
    const reward = calculateCoinCatcherReward(scoreRef.current);
    setEarnedCoins(reward);

    // Single settlement guard per round
    if (!isSettledRef.current) {
      isSettledRef.current = true;
      addGameCoins(reward);
    }

    setGameState('gameover');
  }, [stopAllLoops, addGameCoins]);

  // End Game Transition or Prompt Revive
  const endGame = useCallback((reason) => {
    stopAllLoops();
    if (reason === 'out_of_lives' && !hasRevivedRef.current && timeRemainingRef.current > 0) {
      setIsRevivePromptOpen(true);
    } else {
      settleRound(reason);
    }
  }, [stopAllLoops, settleRound]);

  // Spawn New Falling Object
  const spawnObject = useCallback((elapsedProgress) => {
    const { DIFFICULTY, OBJECT_TYPES, VIRTUAL_WIDTH } = COIN_CATCHER_CONFIG;

    // Scale bomb chance deterministically over time
    const bombChance = DIFFICULTY.INITIAL_BOMB_CHANCE +
      (DIFFICULTY.FINAL_BOMB_CHANCE - DIFFICULTY.INITIAL_BOMB_CHANCE) * elapsedProgress;

    const roll = Math.random();
    let typeConfig;

    if (roll < bombChance) {
      typeConfig = OBJECT_TYPES.BOMB;
    } else if (Math.random() < DIFFICULTY.GEM_CHANCE) {
      typeConfig = OBJECT_TYPES.GEM;
    } else {
      typeConfig = OBJECT_TYPES.COIN;
    }

    // Scale fall speed
    const baseSpeed = DIFFICULTY.INITIAL_FALL_SPEED +
      (DIFFICULTY.FINAL_FALL_SPEED - DIFFICULTY.INITIAL_FALL_SPEED) * elapsedProgress;
    const speedVariation = (Math.random() * 40) - 20;
    const speed = baseSpeed + speedVariation;

    // Horizontal position safely inside boundaries
    const margin = 36;
    const x = margin + Math.random() * (VIRTUAL_WIDTH - (margin * 2));

    objectsRef.current.push({
      id: Math.random(),
      x,
      y: -typeConfig.radius,
      speed,
      config: typeConfig,
      rotation: 0,
      rotSpeed: (Math.random() - 0.5) * 4
    });
  }, []);

  // Main 60fps Game Loop
  const gameLoop = useCallback(function loop(timestamp) {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1); // Clamp delta
    lastTimeRef.current = timestamp;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { VIRTUAL_WIDTH, VIRTUAL_HEIGHT, CATCHER, DIFFICULTY } = COIN_CATCHER_CONFIG;
    const elapsedProgress = Math.max(0, Math.min(1, (COIN_CATCHER_CONFIG.GAME_DURATION - timeRemainingRef.current) / COIN_CATCHER_CONFIG.GAME_DURATION));

    // 1. Move Player Catcher
    const halfWidth = CATCHER.WIDTH / 2;
    if (activeKeysRef.current.left) {
      catcherXRef.current -= CATCHER.SPEED * deltaTime;
    }
    if (activeKeysRef.current.right) {
      catcherXRef.current += CATCHER.SPEED * deltaTime;
    }
    // Boundary clamp
    catcherXRef.current = Math.max(halfWidth + 12, Math.min(VIRTUAL_WIDTH - halfWidth - 12, catcherXRef.current));

    // 2. Object Spawning
    const currentSpawnInterval = DIFFICULTY.INITIAL_SPAWN_INTERVAL -
      (DIFFICULTY.INITIAL_SPAWN_INTERVAL - DIFFICULTY.FINAL_SPAWN_INTERVAL) * elapsedProgress;

    if (timestamp - lastSpawnTimeRef.current > currentSpawnInterval) {
      spawnObject(elapsedProgress);
      lastSpawnTimeRef.current = timestamp;
    }

    // 3. Collision Box Setup
    const catcherY = VIRTUAL_HEIGHT - CATCHER.BOTTOM_OFFSET - (CATCHER.HEIGHT / 2);
    const catcherBox = {
      x: catcherXRef.current - halfWidth,
      y: catcherY - (CATCHER.HEIGHT / 2),
      width: CATCHER.WIDTH,
      height: CATCHER.HEIGHT
    };

    // 4. Update & Collide Objects
    const remainingObjects = [];
    const currentObjects = objectsRef.current;

    for (let i = 0; i < currentObjects.length; i++) {
      const obj = currentObjects[i];
      obj.y += obj.speed * deltaTime;
      obj.rotation += obj.rotSpeed * deltaTime;

      // Circle to Box Collision
      const closestX = Math.max(catcherBox.x, Math.min(obj.x, catcherBox.x + catcherBox.width));
      const closestY = Math.max(catcherBox.y, Math.min(obj.y, catcherBox.y + catcherBox.height));
      const distX = obj.x - closestX;
      const distY = obj.y - closestY;
      const isColliding = (distX * distX + distY * distY) < (obj.config.radius * obj.config.radius);

      if (isColliding) {
        if (obj.config.type === 'bomb') {
          // Hazard Hit!
          livesRef.current = Math.max(0, livesRef.current - 1);
          statsTrackerRef.current.bombs += 1;
          setLives(livesRef.current);
          damageFlashRef.current = 0.8;
          screenShakeRef.current.intensity = 10;

          // Floating score feedback
          floatingScoresRef.current.push({
            text: '-1 LIFE',
            color: '#ef4444',
            x: obj.x,
            y: obj.y,
            alpha: 1.0,
            vy: -55
          });

          if (livesRef.current <= 0) {
            endGame('out_of_lives');
            return;
          }
        } else {
          // Collectible Hit!
          const pts = obj.config.score;
          scoreRef.current += pts;
          setScore(scoreRef.current);

          if (obj.config.type === 'coin') {
            statsTrackerRef.current.coins += 1;
          } else {
            statsTrackerRef.current.gems += 1;
          }

          // Floating score text
          floatingScoresRef.current.push({
            text: `+${pts}`,
            color: obj.config.color,
            x: obj.x,
            y: obj.y,
            alpha: 1.0,
            vy: -60
          });

          // Collection particles
          for (let p = 0; p < 8; p++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 60 + Math.random() * 120;
            particlesRef.current.push({
              x: obj.x,
              y: obj.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color: obj.config.color,
              radius: 2 + Math.random() * 3,
              alpha: 1.0,
              life: 0.45
            });
          }
        }
      } else if (obj.y - obj.config.radius < VIRTUAL_HEIGHT + 20) {
        // Still inside bounds
        remainingObjects.push(obj);
      }
    }
    objectsRef.current = remainingObjects;

    // 5. Update Particles
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx * deltaTime;
      p.y += p.vy * deltaTime;
      p.alpha -= deltaTime / p.life;
      return p.alpha > 0;
    });

    // 6. Update Floating Scores
    floatingScoresRef.current = floatingScoresRef.current.filter((f) => {
      f.y += f.vy * deltaTime;
      f.alpha -= deltaTime * 1.6;
      return f.alpha > 0;
    });

    // Screen Shake decay
    if (screenShakeRef.current.intensity > 0) {
      screenShakeRef.current.intensity = Math.max(0, screenShakeRef.current.intensity - (deltaTime * 30));
    }
    if (damageFlashRef.current > 0) {
      damageFlashRef.current = Math.max(0, damageFlashRef.current - (deltaTime * 2.5));
    }

    // 7. RENDER SCENE (Canvas 2D)
    ctx.save();
    ctx.clearRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

    // Apply Screen Shake
    if (screenShakeRef.current.intensity > 0) {
      const shakeX = (Math.random() - 0.5) * screenShakeRef.current.intensity;
      const shakeY = (Math.random() - 0.5) * screenShakeRef.current.intensity;
      ctx.translate(shakeX, shakeY);
    }

    // Light Theme Background & subtle grid
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

    // Soft lane guides
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let x = 100; x < VIRTUAL_WIDTH; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, VIRTUAL_HEIGHT);
      ctx.stroke();
    }

    // Bottom Catch Zone boundary baseline
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(16, VIRTUAL_HEIGHT - 12);
    ctx.lineTo(VIRTUAL_WIDTH - 16, VIRTUAL_HEIGHT - 12);
    ctx.stroke();

    // Render Falling Objects
    for (const obj of objectsRef.current) {
      ctx.save();
      ctx.translate(obj.x, obj.y);
      ctx.rotate(obj.rotation);

      if (obj.config.type === 'coin') {
        // Gold Coin
        ctx.beginPath();
        ctx.arc(0, 0, obj.config.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#d97706';
        ctx.stroke();

        // Inner Coin Rim
        ctx.beginPath();
        ctx.arc(0, 0, obj.config.radius * 0.65, 0, Math.PI * 2);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Dollar / Star symbol in center
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🪙', 0, 1);
      } else if (obj.config.type === 'gem') {
        // Star Gem (Diamond)
        ctx.beginPath();
        const r = obj.config.radius;
        ctx.moveTo(0, -r);
        ctx.lineTo(r, 0);
        ctx.lineTo(0, r);
        ctx.lineTo(-r, 0);
        ctx.closePath();
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0284c7';
        ctx.stroke();

        // Inner jewel facet
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.5);
        ctx.lineTo(r * 0.5, 0);
        ctx.lineTo(0, r * 0.5);
        ctx.lineTo(-r * 0.5, 0);
        ctx.closePath();
        ctx.fillStyle = '#e0f2fe';
        ctx.fill();
      } else {
        // Hazard Bomb
        ctx.beginPath();
        ctx.arc(0, 0, obj.config.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#334155';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#0f172a';
        ctx.stroke();

        // Fuse & Spark
        ctx.beginPath();
        ctx.moveTo(0, -obj.config.radius);
        ctx.quadraticCurveTo(4, -obj.config.radius - 8, 8, -obj.config.radius - 12);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(8, -obj.config.radius - 12, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();

        // Warning skull/cross mark
        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💣', 0, 1);
      }

      ctx.restore();
    }

    // Render Particles
    for (const p of particlesRef.current) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    }

    // Render Floating Scores
    for (const f of floatingScoresRef.current) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, f.alpha);
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillStyle = f.color;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = 4;
      ctx.fillText(f.text, f.x, f.y);
      ctx.restore();
    }

    // Render Player Catcher Basket
    const cx = catcherXRef.current;
    const cy = catcherY;
    const cw = CATCHER.WIDTH;
    const ch = CATCHER.HEIGHT;

    // Basket Shadow
    ctx.beginPath();
    ctx.ellipse(cx, cy + (ch / 2) + 6, cw * 0.45, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
    ctx.fill();

    // Basket Body (Rounded gold tray)
    ctx.beginPath();
    const cornerRadius = 10;
    ctx.roundRect(cx - halfWidth, cy - (ch / 2), cw, ch, [4, 4, cornerRadius, cornerRadius]);
    const basketGrad = ctx.createLinearGradient(cx, cy - (ch / 2), cx, cy + (ch / 2));
    basketGrad.addColorStop(0, '#fbbf24');
    basketGrad.addColorStop(1, '#d97706');
    ctx.fillStyle = basketGrad;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#b45309';
    ctx.stroke();

    // Basket Rim Highlight
    ctx.beginPath();
    ctx.roundRect(cx - halfWidth + 4, cy - (ch / 2) + 3, cw - 8, 4, 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fill();

    // Center Emblem
    ctx.beginPath();
    ctx.arc(cx, cy + 2, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#fef3c7';
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Damage Flash Overlay
    if (damageFlashRef.current > 0) {
      ctx.fillStyle = `rgba(239, 68, 68, ${damageFlashRef.current * 0.35})`;
      ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
    }

    ctx.restore();

    // Continue animation loop
    rafIdRef.current = requestAnimationFrame(loop);
  }, [endGame, spawnObject]);

  // Resume Gameplay After Revive
  const handleRevive = useCallback(() => {
    setIsRevivePromptOpen(false);
    hasRevivedRef.current = true;
    livesRef.current = 2;
    setLives(2);

    // Filter out active bombs near player catcher
    objectsRef.current = objectsRef.current.filter((o) => o.config.type !== 'bomb' || o.y < 350);

    // Resume 60fps loop
    lastTimeRef.current = 0;
    rafIdRef.current = requestAnimationFrame(gameLoop);

    // Resume interval timer
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      timeRemainingRef.current -= 1;
      setTimeRemaining(timeRemainingRef.current);

      if (timeRemainingRef.current <= 0) {
        endGame('timer_expired');
      }
    }, 1000);
  }, [gameLoop, endGame]);

  // Player Forfeits Revive -> Settle Immediately
  const handleNoThanks = useCallback(() => {
    setIsRevivePromptOpen(false);
    settleRound('out_of_lives');
  }, [settleRound]);

  // Start Active Game Flow
  const startActiveGame = useCallback(() => {
    // Reset round state & settlement guards
    roundIdRef.current = generateRoundId('coin-catcher');
    isSettledRef.current = false;
    hasRevivedRef.current = false;
    setIsRevivePromptOpen(false);
    setEarnedCoins(0);

    // Reset all mutable engine refs
    scoreRef.current = 0;
    livesRef.current = COIN_CATCHER_CONFIG.INITIAL_LIVES;
    timeRemainingRef.current = COIN_CATCHER_CONFIG.GAME_DURATION;
    statsTrackerRef.current = { coins: 0, gems: 0, bombs: 0 };
    catcherXRef.current = COIN_CATCHER_CONFIG.VIRTUAL_WIDTH / 2;
    activeKeysRef.current = { left: false, right: false };
    objectsRef.current = [];
    particlesRef.current = [];
    floatingScoresRef.current = [];
    damageFlashRef.current = 0;
    screenShakeRef.current.intensity = 0;
    lastTimeRef.current = 0;
    lastSpawnTimeRef.current = 0;

    // Reset React state
    setScore(0);
    setLives(COIN_CATCHER_CONFIG.INITIAL_LIVES);
    setTimeRemaining(COIN_CATCHER_CONFIG.GAME_DURATION);
    setGameState('playing');

    // Start 1-second interval timer
    timerIntervalRef.current = setInterval(() => {
      timeRemainingRef.current -= 1;
      setTimeRemaining(timeRemainingRef.current);

      if (timeRemainingRef.current <= 0) {
        endGame('timer_expired');
      }
    }, 1000);

    // Start RAF loop
    rafIdRef.current = requestAnimationFrame(gameLoop);
  }, [endGame, gameLoop]);

  // Handle Countdown Flow (3, 2, 1, GO)
  const initiateCountdown = useCallback(() => {
    setGameState('countdown');
    setCountdown(3);

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdown(current);
      } else if (current === 0) {
        setCountdown('GO!');
      } else {
        clearInterval(interval);
        startActiveGame();
      }
    }, 800);
  }, [startActiveGame]);

  return (
    <div
      className="coin-catcher-page-environment animate-fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f1f5f9', // Slate-100 Light Theme Environment
        color: '#0f172a',           // Slate-900 High Contrast Text
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-6) var(--space-4)'
      }}
    >
      <div
        ref={containerRef}
        style={{
          maxWidth: '680px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-4)'
        }}
      >
        {/* Top Light-Theme Navigation Bar */}
        <header
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
          <Link
            to="/games/coin-catcher"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#334155',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1'
            }}
          >
            <ArrowLeft size={16} />
            <span>Coin Catcher Home</span>
          </Link>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: '#fef3c7',
              border: '1px solid #fde68a',
              color: '#b45309',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <Sun size={14} />
            <span>Light Theme Arcade</span>
          </div>
        </header>

        {/* Live HUD (Only visible during active gameplay or countdown) */}
        <CoinCatcherHUD
          score={score}
          lives={lives}
          maxLives={COIN_CATCHER_CONFIG.INITIAL_LIVES}
          timeRemaining={timeRemaining}
        />

        {/* Main Canvas Arena Stage */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '600 / 700',
            maxHeight: '700px',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '2px solid #e2e8f0',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* HTML5 Canvas Surface */}
          <canvas
            ref={canvasRef}
            width={COIN_CATCHER_CONFIG.VIRTUAL_WIDTH}
            height={COIN_CATCHER_CONFIG.VIRTUAL_HEIGHT}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              touchAction: 'none'
            }}
          />

          {/* 1. Pre-Game Ready Screen */}
          {gameState === 'ready' && (
            <div
              className="animate-fade-in"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 'var(--space-6)',
                gap: 'var(--space-5)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '9999px',
                  backgroundColor: '#fef3c7',
                  border: '2px solid #fde68a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d97706',
                  boxShadow: '0 8px 20px rgba(245, 158, 11, 0.2)'
                }}
              >
                <Gamepad2 size={32} />
              </div>

              <div>
                <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#0f172a' }}>
                  Ready to Catch?
                </h1>
                <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: '15px', maxWidth: '380px' }}>
                  Catch coins (+10) and star gems (+25) as they fall. Avoid hazard bombs to protect your 3 lives!
                </p>
              </div>

              <button
                type="button"
                onClick={initiateCountdown}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 36px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '17px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(245, 158, 11, 0.4)'
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
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span
                key={countdown}
                className="animate-pop"
                style={{
                  fontSize: typeof countdown === 'number' ? '96px' : '72px',
                  fontWeight: 900,
                  color: '#d97706',
                  textShadow: '0 4px 20px rgba(217, 119, 6, 0.3)'
                }}
              >
                {countdown}
              </span>
            </div>
          )}

          {/* 3. Revive Prompt Dialog */}
          {isRevivePromptOpen && (
            <ReviveModal
              gameType="coin-catcher"
              score={score}
              onRevive={handleRevive}
              onNoThanks={handleNoThanks}
            />
          )}

          {/* 4. Game Over Results Overlay */}
          {gameState === 'gameover' && (
            <GameOverPanel
              score={score}
              reason={gameOverReason}
              stats={sessionStats}
              earnedCoins={earnedCoins}
              currentCoins={gameCoins}
              onPlayAgain={initiateCountdown}
            />
          )}
        </div>

        {/* On-Screen Touch Controls (Essential for mobile & tablet) */}
        <CoinCatcherControls
          onMoveStart={handleTouchMoveStart}
          onMoveEnd={handleTouchMoveEnd}
          disabled={gameState !== 'playing'}
        />
      </div>

      {/* Bottom Navigation */}
      <div style={{ marginTop: 'var(--space-6)' }}>
        <GameBottomNav gameSlug="coin-catcher" />
      </div>
    </div>
  );
}
