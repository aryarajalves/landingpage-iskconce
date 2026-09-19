import React from 'react';
import { AudioProvider } from './context/AudioContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { LinktreePage } from './pages/LinktreePage';
import { SundayFestivalPage } from './pages/SundayFestivalPage';
import { OnlineProgramsPage } from './pages/OnlineProgramsPage';

export const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  // Normalização do caminho (remove trailing slash e converte para minúsculas)
  const normalizedPath = currentPath.toLowerCase().replace(/\/$/, '');

  if (normalizedPath === '/festivaldedomingo' || normalizedPath === '/festival-de-domingo') {
    return <SundayFestivalPage />;
  }

  if (
    normalizedPath === '/programacoesonline' ||
    normalizedPath === '/programas-online' ||
    normalizedPath === '/programacoes-online'
  ) {
    return <OnlineProgramsPage />;
  }

  // Rota padrão (raiz /): Linktree das Programações do Templo
  return <LinktreePage />;
};

export const App: React.FC = () => {
  return (
    <RouterProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </RouterProvider>
  );
};

export default App;
