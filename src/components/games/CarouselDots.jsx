/**
 * CarouselDots Component
 * Accessible pagination dot indicators for the VELOOP Games Carousel.
 * Supports keyboard navigation, screen reader announcements, and smooth slide jumping.
 */
export default function CarouselDots({
  total = 13,
  currentIndex = 0,
  onSelectDot,
  className = ''
}) {
  if (total <= 1) return null;

  return (
    <nav
      className={`carousel-dots-nav ${className}`.trim()}
      aria-label="Games Carousel Navigation"
    >
      <div
        role="tablist"
        aria-label="Carousel slides"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={index}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1} of ${total}`}
              tabIndex={0}
              onClick={() => onSelectDot && onSelectDot(index)}
              className={`carousel-dot ${isActive ? 'is-active' : ''}`}
            />
          );
        })}
      </div>
    </nav>
  );
}
