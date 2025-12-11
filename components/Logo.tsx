
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'color';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'color', showText = true, className = '' }) => {
  // Size mapping
  const sizes = {
    sm: { width: 24, height: 24, text: 'text-lg' },
    md: { width: 40, height: 40, text: 'text-2xl' },
    lg: { width: 64, height: 64, text: 'text-4xl' },
    xl: { width: 96, height: 96, text: 'text-5xl' }
  };
  const { width, height, text } = sizes[size];

  // Color mapping
  const colors = {
    dark: { text: 'text-gray-900', icon: 'text-gray-900', accent: 'text-gray-900' },
    light: { text: 'text-white', icon: 'text-white', accent: 'text-white' },
    color: { text: 'text-slate-900', icon: 'text-slate-900', accent: 'text-orange-500' }
  };
  const theme = colors[variant];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <svg
          width={width}
          height={height}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          {/* U Shield Shape */}
          <path
            d="M20 25V55C20 71.5685 33.4315 85 50 85C66.5685 85 80 71.5685 80 55V25"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            className={variant === 'color' ? 'text-slate-900' : theme.icon}
          />
          {/* Sound Wave Smile */}
          <path
            d="M38 50C38 50 42 58 50 58C58 58 62 50 62 50"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={variant === 'color' ? 'text-orange-500' : theme.accent}
          />
        </svg>
        {/* Status Dot (only show on color variant large sizes) */}
        {variant === 'color' && (size === 'lg' || size === 'xl') && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      
      {showText && (
        <span className={`font-bold tracking-tight ${text} ${theme.text}`}>
          hear<span className={variant === 'color' ? 'text-orange-500' : ''}>U</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
