import { ArrowLeft, ArrowRight, Keyboard } from 'lucide-react';

/**
 * CoinCatcherControls Component
 * Accessible on-screen touch buttons for mobile/tablet players with press-and-hold continuous movement.
 * Includes desktop keyboard prompt.
 */
export default function CoinCatcherControls({
  onMoveStart,
  onMoveEnd,
  disabled = false
}) {
  const handleLeftDown = (e) => {
    e.preventDefault();
    if (!disabled) onMoveStart('left');
  };

  const handleLeftUp = (e) => {
    e.preventDefault();
    onMoveEnd('left');
  };

  const handleRightDown = (e) => {
    e.preventDefault();
    if (!disabled) onMoveStart('right');
  };

  const handleRightUp = (e) => {
    e.preventDefault();
    onMoveEnd('right');
  };

  return (
    <div
      role="region"
      aria-label="Game Movement Controls"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-2)'
      }}
    >
      {/* Touch Buttons Deck */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          width: '100%',
          maxWidth: '440px',
          justifyContent: 'center'
        }}
      >
        <button
          type="button"
          aria-label="Move catcher left"
          disabled={disabled}
          onPointerDown={handleLeftDown}
          onPointerUp={handleLeftUp}
          onPointerLeave={handleLeftUp}
          onPointerCancel={handleLeftUp}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minHeight: '56px',
            padding: '12px 20px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '2px solid #cbd5e1',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: 700,
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'manipulation'
          }}
        >
          <ArrowLeft size={22} style={{ color: '#d97706' }} />
          <span>LEFT</span>
        </button>

        <button
          type="button"
          aria-label="Move catcher right"
          disabled={disabled}
          onPointerDown={handleRightDown}
          onPointerUp={handleRightUp}
          onPointerLeave={handleRightUp}
          onPointerCancel={handleRightUp}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minHeight: '56px',
            padding: '12px 20px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '2px solid #cbd5e1',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: 700,
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'manipulation'
          }}
        >
          <span>RIGHT</span>
          <ArrowRight size={22} style={{ color: '#d97706' }} />
        </button>
      </div>

      {/* Desktop Keyboard Helper */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#64748b',
          fontSize: '13px',
          fontWeight: 500
        }}
      >
        <Keyboard size={14} aria-hidden="true" />
        <span>Desktop: Use <strong>← / →</strong> or <strong>A / D</strong> keys</span>
      </div>
    </div>
  );
}
