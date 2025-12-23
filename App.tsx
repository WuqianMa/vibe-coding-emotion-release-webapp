import React, { useState } from 'react';
import { WelcomeView } from './views/WelcomeView';
import { SessionView } from './views/SessionView';
import { Layout } from './components/Layout';
import { Language } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'session'>('welcome');
  const [language, setLanguage] = useState<Language>('zh');

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      {currentView === 'welcome' ? (
        <WelcomeView 
          lang={language} 
          onStart={() => setCurrentView('session')} 
        />
      ) : (
        <SessionView 
          lang={language}
          onExit={() => setCurrentView('welcome')} 
        />
      )}
    </Layout>
  );
};

export default App;