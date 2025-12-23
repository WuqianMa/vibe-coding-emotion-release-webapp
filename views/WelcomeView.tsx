import React, { useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { KeyHint } from '../components/KeyHint';
import { STEPS_INFO, TRANSLATIONS } from '../constants';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface WelcomeViewProps {
  onStart: () => void;
  lang: Language;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart, lang }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-12 pb-6 border-b border-slate-100 text-center">
        <h6 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">The Release Technique</h6>
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-4 tracking-tight">{t.title}</h1>
        <div className="h-1 w-24 bg-amber-600 mx-auto my-6"></div>
        <p className="text-xl md:text-2xl text-slate-600 font-serif italic">{t.subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-thin scrollbar-thumb-slate-200">
        <div className="space-y-10 max-w-2xl mx-auto">
          <p className="text-slate-700 text-lg md:text-xl leading-relaxed text-center font-serif">
            {t.welcome_intro}
          </p>

          <div className="grid gap-0 md:grid-cols-2 border-t border-slate-200">
            {STEPS_INFO[lang].map((step, idx) => (
              <div key={idx} className="p-6 border-b border-slate-200 md:odd:border-r hover:bg-slate-50 transition-colors group">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-slate-300 font-heading font-bold text-2xl group-hover:text-amber-500 transition-colors">
                    0{idx + 1}.
                  </span>
                  <h3 className="font-heading font-bold text-slate-900 text-lg">{step.title}</h3>
                </div>
                <p className="text-slate-600 font-serif text-sm leading-relaxed pl-10">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 bg-slate-50 border-t border-slate-100">
        <Button 
          ref={buttonRef} 
          onClick={onStart} 
          fullWidth 
          className="flex items-center justify-center gap-3 text-lg"
        >
          {t.start} <ArrowRight size={24} /> <KeyHint />
        </Button>
      </div>
    </div>
  );
};