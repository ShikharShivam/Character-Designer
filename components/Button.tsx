import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-none font-serif font-bold tracking-widest uppercase text-sm transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group";
  
  const variants = {
    primary: `
      bg-gradient-to-r from-master-gold-dim to-master-gold text-master-bg 
      hover:from-master-gold hover:to-master-gold-light 
      shadow-glow-gold hover:shadow-glow-gold-lg border border-transparent
    `,
    secondary: `
      bg-master-surface text-master-ivory border border-master-surface-light 
      hover:border-master-gold/50 hover:bg-master-surface-light hover:text-master-gold
    `,
    outline: `
      bg-transparent text-master-gold border border-master-gold 
      hover:bg-master-gold/10 hover:shadow-glow-gold
    `,
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Sheen effect on hover */}
      <div className="absolute inset-0 bg-gold-sheen opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {isLoading && (
        <svg className="animate-spin -ml-1 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default Button;