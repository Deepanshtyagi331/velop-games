import { useState, useRef, useEffect, useCallback } from 'react';
import GameCard from './GameCard';
import CarouselDots from './CarouselDots';
import GAMES_DATA from '../../data/gamesData';
import { AlertCircle, RotateCcw } from 'lucide-react';

/**
 * GamesCarousel Component
 * Premium horizontal continuous auto-scrolling carousel with infinite looping,
 * hover pause, touch swipe, desktop mouse drag, and accessible dot indicators.
 * Strictly avoids navigation arrows per assignment specifications.
 */
export default function GamesCarousel({
  games = GAMES_DATA,
  userTokens,
  onPlay,
  loading = false,
  error = false,
  onRetry,
  className = ''
}) {
  const viewportRef = useRef(null);
  const animationFrameId = useRef(null);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  // Mouse Drag state tracking
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [isDraggingState, setIsDraggingState] = useState(false);

  // Duplicate items for seamless continuous looping (26 items total)
  const duplicatedGames = [...games, ...games];

  // Auto-scroll loop using requestAnimationFrame
  const startAutoScroll = useCallback(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const scrollStep = () => {
      const el = viewportRef.current;
      if (el && !isPausedRef.current) {
        const halfWidth = el.scrollWidth / 2;

        // Reset scroll position seamlessly when reaching midpoint
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        } else {
          // Smooth continuous speed (~0.7px per frame)
          el.scrollLeft += 0.7;
        }

        // Calculate active card index for pagination dots
        const cardEl = el.querySelector('.carousel-card-item');
        if (cardEl) {
          const cardWidth = cardEl.offsetWidth;
          const gap = 20; // Matches var(--space-5)
          const active = Math.round(el.scrollLeft / (cardWidth + gap)) % games.length;
          setCurrentIndex(active);
        }

        setShowLeftFade(el.scrollLeft > 24);
      }

      animationFrameId.current = requestAnimationFrame(scrollStep);
    };

    animationFrameId.current = requestAnimationFrame(scrollStep);
  }, [games.length]);

  useEffect(() => {
    if (!loading && !error) {
      startAutoScroll();
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [loading, error, startAutoScroll]);

  // Pause and resume helpers
  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    if (!isMouseDownRef.current) {
      isPausedRef.current = false;
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = () => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 2000);
  };

  // Mouse drag handlers for desktop panning
  const handleMouseDown = (e) => {
    const el = viewportRef.current;
    if (!el) return;

    isMouseDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
    isPausedRef.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current) return;
    const el = viewportRef.current;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;

    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
      setIsDraggingState(true);
    }

    el.scrollLeft = scrollLeftStartRef.current - walk;

    // Boundary wrap check during manual drag
    const halfWidth = el.scrollWidth / 2;
    if (el.scrollLeft >= halfWidth) {
      el.scrollLeft -= halfWidth;
      scrollLeftStartRef.current -= halfWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += halfWidth;
      scrollLeftStartRef.current += halfWidth;
    }

    // Update active dot
    const cardEl = el.querySelector('.carousel-card-item');
    if (cardEl) {
      const cardWidth = cardEl.offsetWidth;
      const gap = 20;
      const active = Math.round(el.scrollLeft / (cardWidth + gap)) % games.length;
      setCurrentIndex(active);
    }
    setShowLeftFade(el.scrollLeft > 24);
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    setIsDraggingState(false);

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1500);
  };

  // Dot navigation handler
  const handleSelectDot = (targetIndex) => {
    const el = viewportRef.current;
    if (!el) return;

    isPausedRef.current = true;
    const cardEl = el.querySelector('.carousel-card-item');
    if (cardEl) {
      const cardWidth = cardEl.offsetWidth;
      const gap = 20;
      const targetScroll = targetIndex * (cardWidth + gap);

      el.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setCurrentIndex(targetIndex);
    }

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 3500);
  };

  // Intercept click if drag gesture took place
  const handleCaptureClick = (e) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDraggedRef.current = false;
    }
  };

  // 1. Loading Skeleton State
  if (loading) {
    return (
      <div className={`carousel-root ${className}`.trim()} aria-label="Loading games carousel">
        <div className="carousel-container">
          <div className="carousel-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="carousel-card-item surface-elevated shimmer-container"
                style={{
                  borderRadius: 'var(--radius-card)',
                  height: '260px',
                  backgroundColor: 'var(--color-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="shimmer-sweep" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. Error Fallback State
  if (error) {
    return (
      <div
        className={`surface-base ${className}`.trim()}
        role="alert"
        style={{
          padding: 'var(--space-8)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-4)',
          borderRadius: 'var(--radius-card)'
        }}
      >
        <AlertCircle size={36} style={{ color: 'var(--color-error)' }} />
        <div>
          <h3 className="text-section-title" style={{ margin: 0, marginBottom: 'var(--space-1)' }}>
            Something went wrong
          </h3>
          <p className="text-small" style={{ margin: 0 }}>
            Unable to load the games catalog. Please try again.
          </p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="velop-btn"
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-accent)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--font-size-small)'
            }}
          >
            <RotateCcw size={15} />
            Try Again
          </button>
        )}
      </div>
    );
  }

  // 3. Full Production Carousel
  return (
    <div
      className={`carousel-root ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-roledescription="carousel"
      aria-label="VELOOP Games Carousel"
    >
      <div className="carousel-container">
        {/* Left & Right Subtle Atmospheric Edge Gradient Overlays */}
        <div
          className="carousel-edge-fade-left"
          style={{ opacity: showLeftFade ? 1 : 0 }}
          aria-hidden="true"
        />
        <div className="carousel-edge-fade-right" aria-hidden="true" />

        {/* Scrollable Viewport */}
        <div
          ref={viewportRef}
          className={`carousel-viewport ${isDraggingState ? 'is-dragging' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClickCapture={handleCaptureClick}
          tabIndex={0}
          role="region"
          aria-label="Scrollable game cards track"
        >
          {/* Duplicated Track (13 + 13 games) for Seamless Looping */}
          <div className="carousel-track">
            {duplicatedGames.map((game, index) => {
              const uniqueKey = `${game.id}-${index >= games.length ? 'dup' : 'orig'}`;

              return (
                <div key={uniqueKey} className="carousel-card-item">
                  <GameCard
                    game={game}
                    userTokens={userTokens}
                    onPlay={onPlay}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination Dot Indicators (No Previous/Next Arrows) */}
      <CarouselDots
        total={games.length}
        currentIndex={currentIndex}
        onSelectDot={handleSelectDot}
      />
    </div>
  );
}
