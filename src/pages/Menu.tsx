import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Home from '../../assets/svg/Home'
import Playlist from '../../assets/svg/Playlist'
import SettingsIcon from '../../assets/svg/Settings'
import About from '../../assets/svg/About'
import Help from '../../assets/svg/Help'
import Rate from '../../assets/svg/Rate'
import { darkStyles, lightStyles, useGlobalContext } from '../components/Hooks/GlobalContext'
import AboutUs from './About'
import Settings from './Settings'

const Menu = () => {
  const { showMenu, setShowMenu, setShowPlaylist,setShowAbout,showAbout,showSettings,setShowSettings,theme } = useGlobalContext();
  const currentStyles = theme === 'Light' ? lightStyles : darkStyles;


  return (
    <>
      <SafeAreaView className={`${currentStyles.bg_1} flex w-full h-full absolute`}>

        <View className='flex relative h-auto items-center w-full flex-row justify-center mt-8 mb-8'>
          <Text className={`text-xl ${currentStyles.tx_1} font-bold`}>Menu</Text>
          <TouchableOpacity onPress={() => { setShowMenu(false) }} className='absolute right-10'>
            <Text className={`${currentStyles.tx_1} text-xs`}>Done</Text>
          </TouchableOpacity>
        </View>
        <View className={`w-full flex-1 ${currentStyles.bg_2} items-center rounded-t-3xl pt-10`}>
          <View className='w-[80%] flex-1'>
            <TouchableOpacity onPress={() => { setShowMenu(false); setShowPlaylist(false) }} className={`h-12 ${currentStyles.bg_active_7} rounded-xl w-full flex flex-row items-center pl-5`}>
              <Home fill={currentStyles.svg_1}/>
              <Text className={`${currentStyles.tx_1} text-base ml-4`}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShowMenu(false) }} className={`h-12 ${currentStyles.bg_active_7} rounded-xl w-full flex flex-row items-center pl-5`}>
              <Playlist fill={currentStyles.svg_1}/>
              <Text className={`${currentStyles.tx_1} text-base ml-3`}>Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setShowSettings(true)}} className={`h-12 ${currentStyles.bg_active_7} rounded-xl w-full flex flex-row items-center pl-5`}>
              <SettingsIcon fill={currentStyles.svg_1}/>
              <Text className={`${currentStyles.tx_1} text-base ml-3`}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Linking.openURL("https://github.com/ishara-madu/Pirith-mobile-app") }} className={`h-12 ${currentStyles.bg_active_7} rounded-xl w-full flex flex-row items-center pl-5`}>
              <Rate fill={currentStyles.svg_1}/>
              <Text className={`${currentStyles.tx_1} text-base ml-3`}>Rate Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Linking.openURL("https://github.com/ishara-madu/Pirith-mobile-app/issues")
            }} className={`h-14 ${currentStyles.bg_active_7} rounded-xl w-full flex flex-row items-center pl-5`}>
              <Help fill={currentStyles.svg_1}/>
              <Text className={`${currentStyles.tx_1} text-base ml-3`}>Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShowAbout(true); }} className={`h-12 ${currentStyles.bg_active_7} rounded-xl w-full flex flex-row items-center pl-4`}>
              <About wh={30} fill={currentStyles.svg_1}/>
              <Text className={`${currentStyles.tx_1} text-base ml-2`}>About Me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {
        showSettings && <Settings />
      }
      {
        showAbout && <AboutUs />
      }
    </>
  )
}

export default Menu