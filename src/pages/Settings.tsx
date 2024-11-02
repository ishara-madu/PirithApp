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


  const { setShowSettings, theme, setActiveButton, activeButton, setShowSpeedOptions, setShowTimeOptions, showspeedOptions, showTimeOptions, showTypeOptions, setShowTypeOptions, showThemeOptions, setShowThemeOptions, showBackgroundPlayOptions, setShowBackgroundPlayOptions } = useGlobalContext();
  const currentStyles = theme === 'Light' ? lightStyles : darkStyles;



  const handleSleepButton = () => {
    setActiveButton(1);
    showspeedOptions && setShowSpeedOptions(false);
    showTimeOptions && setShowTimeOptions(false)
    showTypeOptions && setShowTypeOptions(false);
    showThemeOptions && setShowThemeOptions(false);
    showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
  }

  const handlePlaybackButton = () => {
    setActiveButton(2);
    showspeedOptions && setShowSpeedOptions(false);
    showTimeOptions && setShowTimeOptions(false)
    showTypeOptions && setShowTypeOptions(false);
    showThemeOptions && setShowThemeOptions(false);
    showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
  }
  const handleStyleButton = () => {
    setActiveButton(3);
    showspeedOptions && setShowSpeedOptions(false);
    showTimeOptions && setShowTimeOptions(false)
    showTypeOptions && setShowTypeOptions(false);
    showThemeOptions && setShowThemeOptions(false);
    showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
  }
  const handleThemeButton = () => {
    setActiveButton(4);
    showspeedOptions && setShowSpeedOptions(false);
    showTimeOptions && setShowTimeOptions(false)
    showTypeOptions && setShowTypeOptions(false);
    showThemeOptions && setShowThemeOptions(false);
    showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
  }
  const handleBackgroundPlayButton = () => {
    setActiveButton(5);
    showspeedOptions && setShowSpeedOptions(false);
    showTimeOptions && setShowTimeOptions(false)
    showTypeOptions && setShowTypeOptions(false);
    showThemeOptions && setShowThemeOptions(false);
    showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
  }
  return (
    <SafeAreaView className={`${currentStyles.bg_1} flex w-full h-full absolute`}>
      <View className='flex relative h-auto items-center w-full flex-row justify-center mt-8 mb-8'>
        <Text className={`text-xl ${currentStyles.tx_1} font-bold`}>Settings</Text>
        <TouchableOpacity onPress={() => {
          setShowSettings(false);
          setActiveButton(0);
          showspeedOptions && setShowSpeedOptions(false);
          showTimeOptions && setShowTimeOptions(false)
          showTypeOptions && setShowTypeOptions(false);
          showThemeOptions && setShowThemeOptions(false);
          showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
        }} className='absolute right-10'>
          <Text className={`${currentStyles.tx_1} text-xs`}>Done</Text>
        </TouchableOpacity>
      </View>
      <View className={`w-full flex-1 ${currentStyles.bg_2} items-center rounded-t-3xl pt-10`}>
        <View className='w-[90%] flex-1'>
          <TouchableOpacity onPress={handleSleepButton} className={`h-14 px-2 ${activeButton == 1 ? `${currentStyles.bg_7} z-10` : ""} rounded-xl w-full flex flex-row items-center`}>
            <Sleep />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlaybackButton} className={`h-14 px-2 ${activeButton == 2 ? `${currentStyles.bg_7} z-10` : ""} rounded-xl w-full flex flex-row items-center`}>
            <PlaybackSpeed />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleStyleButton} className={`h-14 px-2 ${activeButton == 3 ? `${currentStyles.bg_7} z-10` : ""} rounded-xl w-full flex flex-row items-center`}>
            <PlayerStyle />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleThemeButton} className={`h-14 px-2 ${activeButton == 4 ? `${currentStyles.bg_7} z-10` : ""} rounded-xl w-full flex flex-row items-center`}>
            <Theme />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackgroundPlayButton} className={`h-14 px-2 ${activeButton == 5 ? `${currentStyles.bg_7} z-10` : ""} rounded-xl w-full flex-row items-center hidden`}>
            <BackgroundPlay />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings