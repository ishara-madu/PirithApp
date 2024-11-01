import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Home from '../../assets/svg/Home'
import Playlist from '../../assets/svg/Playlist'
import Setting from '../../assets/svg/Settings'
import About from '../../assets/svg/About'
import Help from '../../assets/svg/Help'
import Rate from '../../assets/svg/Rate'
import Sleep from '../components/Settings/Sleep'
import PlayerStyle from '../components/Settings/PlayerStyle'
import PlaybackSpeed from '../components/Settings/PlaybackSpeed'
import Theme from '../components/Settings/Theme'
import BackgroundPlay from '../components/Settings/BackgroundPlay'
import { darkStyles, lightStyles, useGlobalContext } from '../components/Hooks/GlobalContext'

const Settings = () => {
  const [activeButton, setActiveButton] = useState(0);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [showspeedOptions, setShowSpeedOptions] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [showBackgroundPlayOptions, setShowBackgroundPlayOptions] = useState(false);

  const { setShowSettings,theme } = useGlobalContext();
  const currentStyles = theme === 'Light' ? lightStyles : darkStyles;



  const handleSleepButton = () => {
    setActiveButton(1);
    setShowTypeOptions(false);
    setShowSpeedOptions(false);
    setShowThemeOptions(false);
    setShowBackgroundPlayOptions(false);
  }

  const handleStyleButton = () => {
    setActiveButton(2);
    setShowTimeOptions(false);
    setShowSpeedOptions(false);
    setShowThemeOptions(false);
    setShowBackgroundPlayOptions(false);
  }
  const handlePlaybackButton = () => {
    setActiveButton(3);
    setShowTimeOptions(false);
    setShowTypeOptions(false);
    setShowThemeOptions(false);
    setShowBackgroundPlayOptions(false);
  }
  const handleThemeButton = () => {
    setActiveButton(4);
    setShowTimeOptions(false);
    setShowTypeOptions(false);
    setShowSpeedOptions(false);
    setShowBackgroundPlayOptions(false);
  }
  const handleBackgroundPlayButton = () => {
    setActiveButton(5);
    setShowTimeOptions(false);
    setShowTypeOptions(false);
    setShowSpeedOptions(false);
    setShowThemeOptions(false);
  }
  return (
    <SafeAreaView className={`${currentStyles.bg_1} flex w-full h-full absolute`}>
      <View className='flex relative h-auto items-center w-full flex-row justify-center mt-8 mb-8'>
        <Text className={`text-xl ${currentStyles.tx_1} font-bold`}>Settings</Text>
        <TouchableOpacity onPress={()=>{setShowSettings(false)}} className='absolute right-10'>
          <Text className={`${currentStyles.tx_1} text-xs`}>Done</Text>
        </TouchableOpacity>
      </View>
      <View className={`w-full flex-1 ${currentStyles.bg_2} items-center rounded-t-3xl pt-10`}>
        <View className='w-[90%] flex-1'>
          <TouchableOpacity onPress={handleSleepButton} className={`h-14 px-2 ${activeButton == 1 ? `${currentStyles.bg_7} z-10` : ""} rounded-xl w-full flex flex-row items-center`}>
            <Sleep showTimeOptions={showTimeOptions} handleSleepButton={handleSleepButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleStyleButton} className={`h-14 px-2 ${activeButton == 2 ? `${currentStyles.bg_7} z-10` : ""} rounded-xl w-full flex flex-row items-center`}>
            <PlayerStyle showTypeOptions={showTypeOptions} handleStyleButton={handleStyleButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlaybackButton} className={`h-14 px-2 ${activeButton == 3 ? `${currentStyles.bg_7} z-10` : ""} rounded-xl w-full flex flex-row items-center`}>
            <PlaybackSpeed showspeedOptions={showspeedOptions} handlePlaybackButton={handlePlaybackButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleThemeButton} className={`h-14 px-2 ${activeButton == 4 ? `${currentStyles.bg_7} z-10` : ""} rounded-xl w-full flex flex-row items-center`}>
            <Theme showThemeOptions={showThemeOptions} handleThemeButton={handleThemeButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackgroundPlayButton} className={`h-14 px-2 ${activeButton == 5 ? `${currentStyles.bg_7} z-10` : ""} rounded-xl w-full flex flex-row items-center`}>
            <BackgroundPlay showBackgroundPlayOptions={showBackgroundPlayOptions} handleBackgroundPlayButton={handleBackgroundPlayButton} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings