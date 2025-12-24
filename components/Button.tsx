import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}, ref) => {
  const baseStyles = "py-4 px-8 rounded-lg text-xl font-heading font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide active:scale-98";
  
  const variants = {
    // Primary remains Gold for action. Secondary/Ghost use neutral dark colors.
    primary: "bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg focus:ring-amber-600 border border-amber-600",
    secondary: "bg-transparent border-2 border-slate-300 text-slate-700 hover:border-amber-600 hover:text-amber-700 focus:ring-slate-300",
    ghost: "bg-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900"
  };

  return (
    <button 
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';