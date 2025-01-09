import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {  getDataVariable } from '../../pages/Database';

type GlobalContextType = {
  playbackRate: number;
  setPlaybackRate: (value: number) => void;
  urls: any;
  uniqueId: any;
  setUniqueId: (value: any) => void;
  setUrls: (value: any) => void;
  showMenu: boolean;
  setShowMenu: (value: any) => void;
  showPlaylist: boolean;
  setShowPlaylist: (value: any) => void;
  showAbout: boolean;
  setShowAbout: (value: any) => void;
  showSettings: boolean;
  setShowSettings: (value: any) => void;
  theme: string;
  setTheme: (value: any) => void;
  isPlay: boolean;
  setIsPlay: (value: any) => void;
  url: string;
  setUrl: (value: any) => void;
  isFavoritesAll: any;
  setIsFavoritesAll: (value: any) => void;
  nameAll: any;
  setNameAll: (value: any) => void;
  artistAll: any;
  setArtistAll: (value: any) => void;
  playerStyle: any;
  setPlayerStyle: (value: any) => void;
  selectedBackgroundPlay: any;
  setSelectedBackgroundPlay: (value: any) => void;
  isFavorites: boolean;
  setIsFavorites: (value: boolean) => void;
  data: any;
  setData: (value: any) => void;
  activeButton: number;
  setActiveButton: (value: number) => void;
  showTimeOptions: boolean;
  setShowTimeOptions: (value: boolean) => void;
  showspeedOptions: boolean;
  setShowSpeedOptions: (value: boolean) => void;
  showTypeOptions: boolean;
  setShowTypeOptions: (value: boolean) => void;
  showThemeOptions: boolean;
  setShowThemeOptions: (value: boolean) => void;
  showBackgroundPlayOptions: boolean;
  setShowBackgroundPlayOptions: (value: boolean) => void;
  showInfo: boolean;
  setShowInfo: (value: boolean) => void;

};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children,...props }: { children: ReactNode,data:any }) => {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFavoritesAll, setIsFavoritesAll] = useState<any>([]);
  const [nameAll, setNameAll] = useState<any>([])
  const [artistAll, setArtistAll] = useState<any>([]);
  const [urls, setUrls] = useState<any>([]);
  const [url, setUrl] = useState('');
  const [uniqueId, setUniqueId] = useState(0);
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [theme, setTheme] = useState("Light");
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [playerStyle, setPlayerStyle] = useState<any>("Classic");
  const [selectedBackgroundPlay, setSelectedBackgroundPlay] = useState("On");
  const [isFavorites, setIsFavorites] = useState(false);
  const [data, setData] = useState<any>(props.data);
  const [activeButton, setActiveButton] = useState(0);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [showspeedOptions, setShowSpeedOptions] = useState(false);
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [showBackgroundPlayOptions, setShowBackgroundPlayOptions] = useState(false);
  const [showInfo, setShowInfo] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
      const theme = await getDataVariable("theme");
      const playerStyle = await getDataVariable("playerStyle");
      const uniqueId = await getDataVariable("uniqueId");
      const url = await getDataVariable("url");
      const urls = await getDataVariable("urls");
      const isFavoritesAll = await getDataVariable("isFavoritesAll");
      const nameAll = await getDataVariable("nameAll");
      const artistAll = await getDataVariable("artistAll");
      setTheme(theme ?? "Light");
      setPlayerStyle(playerStyle ?? "Classic");
      setUniqueId(uniqueId ?? 0);
      setUrl(url ?? '');
      setUrls(urls ?? []);
      setIsFavoritesAll(isFavoritesAll ?? []);
      setNameAll(nameAll ?? []);
      setArtistAll(artistAll ?? []);
    };
    fetchData();
  }, []);


  return (
    <GlobalContext.Provider value={{showInfo, setShowInfo, playbackRate, setPlaybackRate, urls, setUrls, uniqueId, setUniqueId, showMenu, setShowMenu, showPlaylist, setShowPlaylist, showAbout, setShowAbout, showSettings, setShowSettings, theme, setTheme, isPlay, setIsPlay, url, setUrl, isFavoritesAll, setIsFavoritesAll, nameAll, setNameAll, artistAll, setArtistAll, playerStyle, setPlayerStyle, selectedBackgroundPlay, setSelectedBackgroundPlay, isFavorites, setIsFavorites, data, setData, showTimeOptions, setShowTimeOptions, showspeedOptions, setShowSpeedOptions, activeButton, setActiveButton, showTypeOptions, setShowTypeOptions, showThemeOptions, setShowThemeOptions, showBackgroundPlayOptions, setShowBackgroundPlayOptions }}>
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
  bg_6: 'bg-[#000000d4]',
  bg_7: 'bg-[#0000002f]',
  bg_active_7: 'active:bg-[#0000002f]',

  tx_1: 'text-[#051014]',
  tx_2: 'text-[#1b263b]',
  tx_3: 'text-[#415a77]',
  tx_4: 'text-[#778da9]',
  tx_5: 'text-[#e0e1dd]',
  tx_6: 'text-[#e6c81f]',
  tx_7: 'text-[#2b29aa]',
  tx_8: 'text-[#32CD32]',
  tx_white: 'text-[#e0e1dd]',

  svg_1: '#051014',
  svg_2: '#1b263b',
  svg_3: '#415a77',
  svg_4: '#778da9',
  svg_5: '#e0e1dd',
  svg_white: '#e0e1dd'
};

export const darkStyles = {
  bg_1: 'bg-[#051014]', // Opposite of lightStyles bg_1
  bg_2: 'bg-[#1b263b]', // Opposite of lightStyles bg_2
  bg_3: 'bg-[#415a77]', // Opposite of lightStyles bg_3
  bg_4: 'bg-[#778da9]', // Opposite of lightStyles bg_4
  bg_5: 'bg-[#e0e1dd]', // Opposite of lightStyles bg_5
  bg_6: 'bg-[#000000d4]',
  bg_7: 'bg-[#0000002f]',
  bg_active_7: 'active:bg-[#0000002f]',


  tx_1: 'text-[#e0e1dd]', // Opposite of lightStyles tx_1
  tx_2: 'text-[#778da9]', // Opposite of lightStyles tx_2
  tx_3: 'text-[#415a77]', // Opposite of lightStyles tx_3
  tx_4: 'text-[#1b263b]', // Opposite of lightStyles tx_4
  tx_5: 'text-[#051014]', // Opposite of lightStyles tx_5
  tx_6: 'text-[#FFD700]',
  tx_7: 'text-[#1E90FF]',
  tx_8: 'text-[#32CD32]',
  tx_white: 'text-[#e0e1dd]',

  svg_1: '#e0e1dd', // Opposite of lightStyles svg_1
  svg_2: '#778da9', // Opposite of lightStyles svg_2
  svg_3: '#415a77', // Opposite of lightStyles svg_3
  svg_4: '#1b263b', // Opposite of lightStyles svg_4
  svg_5: '#051014', // Opposite of lightStyles svg_5
  svg_white: '#e0e1dd'

};
