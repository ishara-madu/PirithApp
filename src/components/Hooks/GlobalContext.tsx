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
showAbout:boolean;
setShowAbout:(value: any) => void;
showSettings:boolean;
setShowSettings:(value: any) => void;
theme:string;
setTheme:(value: any) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [urls, setUris] = useState<any>([])
  const [uniqueId, setUniId] = useState(0);
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [theme,setTheme] = useState("");






  return (
    <GlobalContext.Provider value={{ playbackRate, setPlaybackRate,urls, setUris,uniqueId, setUniId,showMenu, setShowMenu,showPlaylist, setShowPlaylist,showAbout, setShowAbout,showSettings, setShowSettings,theme,setTheme}}>
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


export const lightStyles = {
  bg_1: 'bg-[#e0e1dd]',
  bg_2: 'bg-[#778da9]',
  bg_3: 'bg-[#415a77]',
  bg_4: 'bg-[#1b263b]',
  bg_5: 'bg-[#051014]',
  bg_6: 'bg-[#0000002f]',

  tx_1: 'text-[#051014]',
  tx_2: 'text-[#1b263b]',
  tx_3: 'text-[#415a77]',
  tx_4: 'text-[#778da9]',
  tx_5: 'text-[#e0e1dd]',
  tx_6: 'text-[#FFD700]',
  tx_7: 'text-[#1E90FF]',
  tx_8: 'text-[#32CD32]',
  
  svg_1: '#051014',
  svg_2: '#1b263b',
  svg_3: '#415a77',
  svg_4: '#778da9',
  svg_5: '#e0e1dd',
};

export const darkStyles = {
  bg_1: 'bg-[#051014]', // Opposite of lightStyles bg_1
  bg_2: 'bg-[#1b263b]', // Opposite of lightStyles bg_2
  bg_3: 'bg-[#415a77]', // Opposite of lightStyles bg_3
  bg_4: 'bg-[#778da9]', // Opposite of lightStyles bg_4
  bg_5: 'bg-[#e0e1dd]', // Opposite of lightStyles bg_5
  bg_6: 'bg-[#0000002f]',

  tx_1: 'text-[#e0e1dd]', // Opposite of lightStyles tx_1
  tx_2: 'text-[#778da9]', // Opposite of lightStyles tx_2
  tx_3: 'text-[#415a77]', // Opposite of lightStyles tx_3
  tx_4: 'text-[#1b263b]', // Opposite of lightStyles tx_4
  tx_5: 'text-[#051014]', // Opposite of lightStyles tx_5
  tx_6: 'text-[#FFD700]',
  tx_7: 'text-[#1E90FF]',
  tx_8: 'text-[#32CD32]',

  svg_1: '#e0e1dd', // Opposite of lightStyles svg_1
  svg_2: '#778da9', // Opposite of lightStyles svg_2
  svg_3: '#415a77', // Opposite of lightStyles svg_3
  svg_4: '#1b263b', // Opposite of lightStyles svg_4
  svg_5: '#051014', // Opposite of lightStyles svg_5
};
