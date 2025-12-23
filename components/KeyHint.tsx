import React from 'react';

export const KeyHint: React.FC<{ label?: string, icon?: string }> = ({ label, icon }) => {
  return (
    <span className="hidden sm:inline-flex items-center ml-2 opacity-50 text-xs uppercase tracking-wider scale-90 origin-left">
      <kbd className="font-sans px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-600 text-[10px] min-w-[20px] text-center shadow-sm">
        {icon || label || '↵'}
      </kbd>
    </span>
  );
};