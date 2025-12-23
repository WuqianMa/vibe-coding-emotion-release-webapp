import React from 'react';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, language, onLanguageChange }) => {
  return (
    <div className="min-h-screen bg-[#fcfbf7] flex flex-col items-center justify-center text-slate-900 p-4 relative font-medium">
      {/* Background Texture Overlay (Paper grain effect) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Language Switcher */}
      <div className="absolute top-8 right-8 flex gap-4 z-20">
        {(['fr', 'zh', 'en'] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`px-5 py-2 rounded-lg text-lg font-heading font-bold transition-all duration-300 border-2 ${
              language === lang
                ? 'bg-amber-600 text-white border-amber-600 shadow-lg'
                : 'bg-transparent text-slate-400 border-transparent hover:border-slate-200 hover:text-amber-600'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Content Container - Fixed Size */}
      <div className="w-full max-w-3xl h-[800px] relative z-10 flex flex-col transition-all duration-300 shadow-2xl shadow-slate-200 bg-white border border-slate-200 rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};