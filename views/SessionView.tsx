import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { KeyHint } from '../components/KeyHint';
import { ReleaseStep, CoreWant, Language } from '../types';
import { getGeminiCoaching, suggestCoreWant } from '../services/geminiService';
import { Check, RefreshCw, Sparkles, X, BookOpen, Infinity } from 'lucide-react';
import { GOAL_TEMPLATES, EMOTION_LIST, TRANSLATIONS } from '../constants';

// --- Lotus Component ---
const LotusBackground: React.FC<{ intensity: number, isComplete: boolean }> = ({ intensity, isComplete }) => {
  if (isComplete) return null;

  const totalPetals = 10;
  const visiblePetals = Math.min(totalPetals, Math.max(0, intensity));

  const petals = Array.from({ length: totalPetals }).map((_, i) => {
    const rotation = i * (360 / totalPetals);
    const isVisible = i < visiblePetals;
    
    return (
      <g key={i} transform={`rotate(${rotation} 100 100)`} className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <path 
          d="M100 100 Q 130 50 100 10 Q 70 50 100 100" 
          fill="none" 
          stroke="#d97706"
          strokeWidth="1.2"
          className="drop-shadow-sm"
        />
      </g>
    );
  });

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
       <svg width="600" height="600" viewBox="0 0 200 200" className="animate-spin-slow">
          <style>{`
            .animate-spin-slow { animation: spin 120s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
          {petals}
          <circle cx="100" cy="100" r="4" fill="none" stroke="#d97706" strokeWidth="2" />
          <circle cx="100" cy="100" r="2" fill="#d97706" />
       </svg>
    </div>
  );
};

interface SessionViewProps {
  onExit: () => void;
  lang: Language;
}

export const SessionView: React.FC<SessionViewProps> = ({ onExit, lang }) => {
  const [step, setStep] = useState<ReleaseStep>(ReleaseStep.DEFINE_GOAL);
  const [goal, setGoal] = useState('');
  const [feeling, setFeeling] = useState('');
  const [coreWant, setCoreWant] = useState<CoreWant>(CoreWant.UNKNOWN);
  const [intensity, setIntensity] = useState(10);
  const [isInfiniteMode, setIsInfiniteMode] = useState(false);
  const [infiniteStep, setInfiniteStep] = useState(0); // 0: Could, 1: Would, 2: When
  
  const [aiTip, setAiTip] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    setAiTip(''); 
    setShowTemplates(false);
  }, [step]);

  const handleNext = () => {
    if (isInfiniteMode) {
      setInfiniteStep((prev) => (prev + 1) % 3);
      return;
    }

    switch (step) {
      case ReleaseStep.DEFINE_GOAL:
        if (goal.trim()) setStep(ReleaseStep.IDENTIFY_FEELING);
        break;
      case ReleaseStep.IDENTIFY_FEELING:
        if (feeling.trim()) setStep(ReleaseStep.IDENTIFY_WANT);
        break;
      case ReleaseStep.IDENTIFY_WANT:
        setStep(ReleaseStep.ALLOW_FEELING);
        break;
      case ReleaseStep.ALLOW_FEELING:
        setStep(ReleaseStep.RELEASE_COULD);
        break;
      case ReleaseStep.RELEASE_COULD:
        setStep(ReleaseStep.RELEASE_WOULD);
        break;
      case ReleaseStep.RELEASE_WOULD:
        setStep(ReleaseStep.RELEASE_WHEN);
        break;
      case ReleaseStep.RELEASE_WHEN:
        // Automatically decrement intensity by 1 on each successful loop completion
        setIntensity(prev => Math.max(0, prev - 1));
        setStep(ReleaseStep.CHECK_STATUS);
        break;
      case ReleaseStep.CHECK_STATUS:
        if (intensity <= 0) { 
          setStep(ReleaseStep.COMPLETION);
        } else {
          setStep(ReleaseStep.ALLOW_FEELING); 
        }
        break;
      case ReleaseStep.COMPLETION:
        onExit();
        break;
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const enterSteps = [
            ReleaseStep.ALLOW_FEELING,
            ReleaseStep.RELEASE_COULD, 
            ReleaseStep.RELEASE_WOULD, 
            ReleaseStep.RELEASE_WHEN,
            ReleaseStep.CHECK_STATUS 
        ];
        if (enterSteps.includes(step) || isInfiniteMode) {
            e.preventDefault();
            handleNext();
        }
      }
      if (e.key === 'Backspace') {
          const backspaceSteps = [ReleaseStep.RELEASE_COULD, ReleaseStep.RELEASE_WOULD];
          if (backspaceSteps.includes(step) || isInfiniteMode) {
              e.preventDefault();
              handleNext(); 
          }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [step, isInfiniteMode, intensity]);


  const handleManualAiHelp = async () => {
    setLoadingAi(true);
    if (step === ReleaseStep.IDENTIFY_FEELING) {
        const tip = await getGeminiCoaching(goal, feeling, 'Identifying Feeling');
        setAiTip(tip);
    } else if (step === ReleaseStep.IDENTIFY_WANT) {
        const suggestion = await suggestCoreWant(feeling, goal);
        setAiTip(suggestion ? `${t.ai_insight}${suggestion}` : '');
    }
    setLoadingAi(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleNext();
    }
  };

  const toggleInfiniteMode = () => {
    setIsInfiniteMode(!isInfiniteMode);
    if (!isInfiniteMode) {
      setInfiniteStep(0);
    }
  };
  
  const renderInfiniteMode = () => {
    const questions = [
      { title: t.s5_could_title, desc: t.s5_could_desc },
      { title: t.s5_would_title, desc: t.s5_would_desc },
      { title: t.s5_when_title, desc: t.s5_when_desc }
    ];
    const current = questions[infiniteStep];

    return (
      <div className="flex flex-col items-center justify-center space-y-20 animate-in fade-in zoom-in-95 duration-700 text-center py-12 relative z-10 h-full">
        {/* Goal only: Purely user input, font size 20 as requested, dark color */}
        <h3 className="text-[20px] font-heading font-black text-slate-950 uppercase tracking-[0.2em] leading-tight max-w-2xl mx-auto">
          {goal}
        </h3>

        <div className="space-y-6">
          <h2 className="text-6xl md:text-7xl font-heading font-bold text-slate-900 drop-shadow-sm">{current.title}</h2>
          <p className="text-3xl text-slate-500 font-serif italic">{current.desc}</p>
        </div>
        
        <div className="flex gap-8 justify-center mt-8">
            <Button onClick={handleNext} className="min-w-[160px]">
              {infiniteStep === 2 ? t.btn_now : t.btn_yes} <KeyHint />
            </Button>
            {infiniteStep !== 2 && (
              <Button onClick={handleNext} variant="secondary" className="min-w-[160px]">
                {t.btn_no} <KeyHint label="←" />
              </Button>
            )}
        </div>
        
        <button 
          onClick={toggleInfiniteMode}
          className="absolute bottom-12 text-[10px] font-bold text-slate-200 hover:text-slate-500 uppercase tracking-widest transition-all"
        >
          Exit
        </button>
      </div>
    );
  };
  
  const renderContent = () => {
    if (isInfiniteMode) return renderInfiniteMode();

    switch (step) {
      case ReleaseStep.DEFINE_GOAL:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div>
                <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">{t.s1_title}</h2>
                <p className="text-xl text-slate-600 font-serif leading-relaxed italic">{t.s1_desc}</p>
            </div>
            
            <div className="relative">
                <input
                    ref={inputRef}
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    className="w-full text-3xl font-heading p-4 border-b-2 border-slate-300 focus:border-amber-600 bg-transparent outline-none transition-colors placeholder:text-slate-300 text-slate-900"
                    placeholder={t.s1_placeholder}
                    autoFocus
                />
            </div>

            <div className="pt-4">
                <button 
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest transition-colors"
                >
                    <BookOpen size={18} /> {showTemplates ? t.btn_templates_hide : t.btn_templates_show}
                </button>
                
                {showTemplates && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95">
                        {Object.entries(GOAL_TEMPLATES[lang]).map(([key, category]) => {
                          const cat = category as { label: string; templates: string[] };
                          return (
                            <div key={key} className="bg-slate-50 p-6 border border-slate-200">
                                <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-[0.2em]">{cat.label}</h4>
                                <ul className="space-y-3">
                                    {cat.templates.map((tpl, idx) => (
                                        <li key={idx}>
                                            <button 
                                                onClick={() => { setGoal(tpl); setShowTemplates(false); }}
                                                className="text-left text-base font-serif text-slate-700 hover:text-slate-900 hover:underline decoration-1 underline-offset-4 transition-all w-full"
                                            >
                                                {tpl}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )})}
                    </div>
                )}
            </div>
          </div>
        );

      case ReleaseStep.IDENTIFY_FEELING:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-200 pb-2 mb-4">
               Target: {goal}
             </div>
             <div>
                <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">{t.s2_title}</h2>
                <p className="text-xl text-slate-600 font-serif leading-relaxed italic">{t.s2_desc}</p>
             </div>
            
            <div className="relative">
                <input
                    ref={inputRef}
                    value={feeling}
                    onChange={(e) => setFeeling(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    className="w-full text-3xl font-heading p-4 border-b-2 border-slate-300 focus:border-amber-600 bg-transparent outline-none transition-colors placeholder:text-slate-300 text-slate-900"
                    placeholder={t.s2_placeholder}
                    autoFocus
                />
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
                {EMOTION_LIST[lang].map((emo) => (
                    <button
                        key={emo}
                        onClick={() => setFeeling(emo)}
                        className="px-4 py-2 bg-transparent border border-slate-300 rounded-none text-base text-slate-700 font-serif hover:border-amber-600 hover:text-amber-700 transition-all"
                    >
                        {emo}
                    </button>
                ))}
            </div>

             {aiTip ? (
                <div className="bg-slate-50 p-6 border-l-4 border-amber-500 flex gap-4 items-start text-base font-serif text-slate-700 leading-relaxed italic">
                    <Sparkles className="w-5 h-5 flex-shrink-0 text-amber-500 mt-1" />
                    <p>{aiTip}</p>
                </div>
            ) : (
                feeling.length > 1 && (
                    <button 
                        onClick={handleManualAiHelp}
                        disabled={loadingAi}
                        className="flex items-center gap-3 text-sm text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest disabled:opacity-50 mt-6"
                    >
                        <Sparkles size={18} /> {loadingAi ? t.ai_thinking : t.ai_help}
                    </button>
                )
            )}
          </div>
        );

      case ReleaseStep.IDENTIFY_WANT:
        const wants = [
            { id: CoreWant.APPROVAL, label: t.want_approval },
            { id: CoreWant.CONTROL, label: t.want_control },
            { id: CoreWant.SECURITY, label: t.want_security }
        ];
        
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div>
                <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">{t.s3_title}</h2>
                <p className="text-xl text-slate-600 font-serif leading-relaxed italic">{t.s3_desc}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {wants.map((w) => (
                <button
                  key={w.id}
                  onClick={() => { setCoreWant(w.id); setTimeout(handleNext, 100); }} 
                  className={`p-6 text-left border-2 transition-all hover:pl-8 ${
                    coreWant === w.id 
                    ? 'border-amber-600 bg-amber-50' 
                    : 'border-slate-200 hover:border-slate-400 bg-transparent'
                  }`}
                >
                  <span className="font-heading font-bold text-2xl text-slate-900 block">{w.label}</span>
                </button>
              ))}
            </div>
             {aiTip ? (
                <div className="mt-6 bg-slate-50 p-5 border-l-4 border-slate-400 text-base font-serif text-slate-600 flex items-center gap-3">
                    <Sparkles size={20} /> {aiTip}
                </div>
             ) : (
                 <button 
                    onClick={handleManualAiHelp}
                    disabled={loadingAi}
                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest disabled:opacity-50 mt-6"
                >
                    <Sparkles size={18} /> {loadingAi ? t.ai_thinking : t.ai_ask}
                </button>
             )}
          </div>
        );

      case ReleaseStep.ALLOW_FEELING:
        const wantLabel = t[`want_${coreWant.toLowerCase()}`] || coreWant;
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-12 relative z-10">
            <h2 className="text-5xl font-heading font-bold text-slate-900">{t.s4_title}</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto"></div>
            <p className="text-3xl font-heading text-slate-800 max-w-lg mx-auto leading-normal">
              {t.s4_desc.replace('{{want}}', wantLabel)}
            </p>
            <div className="text-slate-400 text-sm flex items-center justify-center gap-2 font-bold uppercase tracking-widest mt-12">
                Press <span className="border border-slate-300 px-2 py-0.5 rounded text-slate-600">Enter</span> to continue
            </div>
          </div>
        );

      case ReleaseStep.RELEASE_COULD:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-12 relative z-10">
            <h2 className="text-6xl font-heading font-bold text-slate-900">{t.s5_could_title}</h2>
            <p className="text-3xl text-slate-600 font-serif italic">{t.s5_could_desc}</p>
            <div className="w-24 h-px bg-slate-300 mx-auto"></div>
            <p className="text-slate-500 text-lg font-serif">{t.s5_note}</p>
            <div className="flex gap-8 justify-center mt-12">
                 <Button onClick={handleNext} className="min-w-[160px]">{t.btn_yes} <KeyHint /></Button>
                 <Button onClick={handleNext} variant="secondary" className="min-w-[160px]">{t.btn_no} <KeyHint label="←" /></Button>
            </div>
            <button 
                onClick={toggleInfiniteMode}
                className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-slate-300 hover:text-amber-600 uppercase tracking-widest transition-colors mx-auto"
            >
                <Infinity size={14} /> Infinite Release Mode
            </button>
          </div>
        );

      case ReleaseStep.RELEASE_WOULD:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-12 relative z-10">
            <h2 className="text-6xl font-heading font-bold text-slate-900">{t.s5_would_title}</h2>
            <p className="text-3xl text-slate-600 font-serif italic">{t.s5_would_desc}</p>
             <div className="w-24 h-px bg-slate-300 mx-auto"></div>
            <p className="text-slate-500 text-lg font-serif">{t.s5_would_note}</p>
            <div className="flex gap-8 justify-center mt-12">
                 <Button onClick={handleNext} className="min-w-[160px]">{t.btn_willing} <KeyHint /></Button>
                 <Button onClick={handleNext} variant="secondary" className="min-w-[160px]">{t.btn_unwilling} <KeyHint label="←" /></Button>
            </div>
          </div>
        );

      case ReleaseStep.RELEASE_WHEN:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-12 relative z-10">
            <h2 className="text-6xl font-heading font-bold text-slate-900">{t.s5_when_title}</h2>
            <p className="text-3xl text-slate-600 font-serif italic">{t.s5_when_desc}</p>
            <div className="flex gap-8 justify-center mt-12">
                 <Button onClick={handleNext} className="min-w-[200px] text-2xl py-6">{t.btn_now} <KeyHint /></Button>
            </div>
          </div>
        );

      case ReleaseStep.CHECK_STATUS:
        return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-8 relative z-10">
                 <h2 className="text-4xl font-heading font-bold text-slate-900">{t.s6_title}</h2>
                 <p className="text-xl text-slate-600 font-serif italic max-w-2xl mx-auto">{t.s6_desc.replace('{{goal}}', goal).replace('{{feeling}}', feeling)}</p>
                 
                 <div className="relative pt-10 pb-4 max-w-xl mx-auto">
                    <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        step="1"
                        value={intensity}
                        onChange={(e) => setIntensity(Number(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-none appearance-none cursor-pointer accent-amber-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-4 font-bold uppercase tracking-[0.2em]">
                        <span>{t.s6_low}</span>
                        <span>{t.s6_high}</span>
                    </div>
                 </div>
                 
                 <div className="text-9xl font-heading font-bold text-slate-900 tracking-tighter transition-all duration-300">{intensity}</div>

                 <p className="text-xl text-slate-500 font-serif italic">
                    {intensity > 0 ? t.s6_result_continue : t.s6_result_done}
                 </p>
                 
                 <div className="mt-8">
                    {intensity > 0 ? (
                        <Button onClick={handleNext} className="text-xl">{t.continue_release} <KeyHint /></Button>
                    ) : (
                        <Button onClick={handleNext} className="text-xl">{t.next} <KeyHint /></Button>
                    )}
                 </div>
            </div>
        );
      
      case ReleaseStep.COMPLETION:
         return (
             <div className="space-y-12 animate-in fade-in zoom-in duration-500 text-center py-12 relative z-10">
                <div className="w-24 h-24 border-2 border-amber-600 rounded-full flex items-center justify-center mx-auto text-amber-600">
                    <Check size={48} />
                </div>
                <h2 className="text-6xl font-heading font-bold text-slate-900">{t.complete_title}</h2>
                <div className="w-16 h-1 bg-amber-600 mx-auto"></div>
                <p className="text-2xl text-slate-700 font-serif italic leading-relaxed max-w-md mx-auto whitespace-pre-line">
                    {t.complete_desc.replace('{{goal}}', goal)}
                </p>
                <div className="flex gap-6 justify-center pt-8">
                    <Button onClick={onExit} variant="secondary">{t.finish_session}</Button>
                    <Button onClick={() => {
                        setStep(ReleaseStep.DEFINE_GOAL);
                        setGoal('');
                        setFeeling('');
                        setIntensity(10);
                        setCoreWant(CoreWant.UNKNOWN);
                        setIsInfiniteMode(false);
                    }}>{t.new_goal}</Button>
                </div>
             </div>
         )
    }
  };

  const progress = isInfiniteMode 
    ? 100 
    : Math.max(5, (Object.values(ReleaseStep).indexOf(step) / (Object.values(ReleaseStep).length - 1)) * 100);

  return (
    <div className="flex flex-col h-full relative">
        <LotusBackground intensity={intensity} isComplete={step === ReleaseStep.COMPLETION} />
        
        <div className="h-1 bg-slate-50 w-full relative z-20">
            <div 
                className="h-full bg-amber-600 transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
            />
        </div>

        <button onClick={onExit} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors z-30">
            <X size={24} />
        </button>

        <div className="flex-1 flex flex-col justify-center px-10 md:px-20 overflow-y-auto relative z-10 scrollbar-hide">
            {renderContent()}
        </div>

        {!isInfiniteMode && (
          <div className="p-8 border-t border-slate-100 bg-white/90 backdrop-blur-sm flex justify-between items-center relative z-20">
              <div className="text-xs text-slate-400 font-bold tracking-[0.2em] uppercase">
                  {t.step.replace('{{current}}', (Object.values(ReleaseStep).indexOf(step) + 1).toString()).replace('{{total}}', '6')}
              </div>
              {step !== ReleaseStep.COMPLETION && step !== ReleaseStep.IDENTIFY_WANT && step !== ReleaseStep.RELEASE_COULD && step !== ReleaseStep.RELEASE_WOULD && step !== ReleaseStep.RELEASE_WHEN && step !== ReleaseStep.ALLOW_FEELING && step !== ReleaseStep.CHECK_STATUS && (
                  <Button 
                      onClick={handleNext} 
                      disabled={
                          (step === ReleaseStep.DEFINE_GOAL && !goal.trim()) ||
                          (step === ReleaseStep.IDENTIFY_FEELING && !feeling.trim())
                      }
                      className="shadow-lg"
                  >
                      {t.next} <KeyHint />
                  </Button>
              )}
              
              {step === ReleaseStep.ALLOW_FEELING && (
                  <Button onClick={handleNext} variant="ghost" className="ml-auto text-xl font-bold">
                      {t.enter} <KeyHint />
                  </Button>
              )}
          </div>
        )}
    </div>
  );
};