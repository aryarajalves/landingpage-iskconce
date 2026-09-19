import React, { createContext, useContext, useEffect, useState } from 'react';

export interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    // Fallback gracioso para testes ou uso isolado
    return {
      currentPath: typeof window !== 'undefined' ? window.location.pathname || '/' : '/',
      navigate: (path: string) => {
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', path);
        }
      }
    };
  }
  return context;
};
