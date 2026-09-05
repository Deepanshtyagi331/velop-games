import { Loader2 } from 'lucide-react';

/**
 * Reusable Button component for VELOOP Rewards ecosystem.
 * Supports variants: 'primary' | 'secondary' | 'ghost' | 'danger' | 'reward'
 * Supports sizes: 'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  className = '',
  onClick,
  style = {},
  ...rest
}) {
  const isActionDisabled = disabled || loading;

  // Variant styling map
  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-accent)',
      color: '#ffffff',
      border: '1px solid var(--color-accent)',
      boxShadow: 'var(--shadow-sm)'
    },
    secondary: {
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
      border: '1px solid transparent'
    },
    danger: {
      backgroundColor: 'rgba(239, 68, 68, 0.12)',
      color: 'var(--color-error)',
      border: '1px solid rgba(239, 68, 68, 0.35)'
    },
    reward: {
      backgroundColor: 'var(--color-gold)',
      color: '#0f172a',
      border: '1px solid var(--color-gold)',
      fontWeight: 'var(--font-weight-bold)',
      boxShadow: 'var(--shadow-gold-subtle)'
    }
  };

  // Size styling map
  const sizeStyles = {
    sm: {
      padding: '6px 12px',
      fontSize: 'var(--font-size-small)',
      borderRadius: 'var(--radius-sm)',
      gap: 'var(--space-1)'
    },
    md: {
      padding: '10px 18px',
      fontSize: 'var(--font-size-button)',
      borderRadius: 'var(--radius-md)',
      gap: 'var(--space-2)'
    },
    lg: {
      padding: '14px 24px',
      fontSize: 'var(--font-size-body)',
      borderRadius: 'var(--radius-md)',
      gap: 'var(--space-2)'
    }
  };

  const selectedVariantStyle = variantStyles[variant] || variantStyles.primary;
  const selectedSizeStyle = sizeStyles[size] || sizeStyles.md;

  return (
    <button
      type={type}
      disabled={isActionDisabled}
      aria-busy={loading}
      aria-disabled={isActionDisabled}
      onClick={isActionDisabled ? undefined : onClick}
      className={`velop-btn transition-button-press ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isActionDisabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'all var(--transition-fast)',
        fontFamily: 'inherit',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 1,
        ...selectedVariantStyle,
        ...selectedSizeStyle,
        ...style
      }}
      {...rest}
    >
      {loading ? (
        <>
          <Loader2
            size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
            className="animate-spin"
            aria-hidden="true"
          />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon
              size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
              aria-hidden="true"
            />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon
              size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </button>
  );
}
