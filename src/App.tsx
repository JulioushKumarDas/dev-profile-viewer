import React from 'react';
import { DeveloperProvider } from './context/DeveloperContext';
import AppRouter from './router/AppRouter';

const App: React.FC = () => {
  return (
    <DeveloperProvider>
      <AppRouter />
    </DeveloperProvider>
  );
};

export default App;
