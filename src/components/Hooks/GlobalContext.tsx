import React, { createContext, useContext, useState, ReactNode } from 'react';

type GlobalContextType = {
playbackRate: number;
setPlaybackRate: (value: number) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [playbackRate, setPlaybackRate] = useState(1);

  return (
    <GlobalContext.Provider value={{ playbackRate, setPlaybackRate}}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
