import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getYoutubeMeta } from 'react-native-youtube-iframe';

type GlobalContextType = {
playbackRate: number;
setPlaybackRate: (value: number) => void;
urls: any;
uniqueId: any;
setUniId: (value: any) => void;
setUris:(value: any) => void;
showMenu:boolean;
setShowMenu:(value: any) => void;
showPlaylist:boolean;
setShowPlaylist:(value: any) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [urls, setUris] = useState<any>([])
  const [uniqueId, setUniId] = useState(0);
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showPlaylist, setShowPlaylist] = useState(false)




  return (
    <GlobalContext.Provider value={{ playbackRate, setPlaybackRate,urls, setUris,uniqueId, setUniId,showMenu, setShowMenu,showPlaylist, setShowPlaylist}}>
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
