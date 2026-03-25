import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary': return 'bg-white/10 hover:bg-white/20 text-white';
      case 'danger': return 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30';
      case 'ghost': return 'hover:bg-white/5 text-slate-400';
      default: return 'glass-button';
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${getVariantClass()} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
