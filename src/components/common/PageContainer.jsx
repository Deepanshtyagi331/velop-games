/**
 * PageContainer Component
 * Provides fluid responsive horizontal padding and max-width boundaries across viewports (320px to 1920px+).
 */
export default function PageContainer({ children, className = '', style = {} }) {
  return (
    <main
      role="main"
      className={`page-container ${className}`.trim()}
      style={{
        width: '100%',
        maxWidth: 'var(--layout-max-width)',
        margin: '0 auto',
        padding: 'var(--space-8) clamp(var(--space-4), 3.5vw, var(--space-8))',
        minHeight: 'calc(100vh - var(--layout-header-height) - 70px)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        ...style
      }}
    >
      {children}
    </main>
  );
}
