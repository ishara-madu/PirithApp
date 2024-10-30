import { View, Text, TouchableOpacity, SafeAreaView, Linking } from 'react-native'
import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import Home from '../../assets/svg/Home'
import Playlist from '../../assets/svg/Playlist'
import SettingsIcon from '../../assets/svg/Settings'
import About from '../../assets/svg/About'
import Help from '../../assets/svg/Help'
import Rate from '../../assets/svg/Rate'
import { useGlobalContext } from '../components/Hooks/GlobalContext'
import AboutUs from './About'
import Settings from './Settings'

const Menu = () => {
  const { showMenu, setShowMenu, setShowPlaylist,setShowAbout,showAbout,showSettings,setShowSettings } = useGlobalContext();

  return (
    <>
      <SafeAreaView className='bg-black flex w-full h-full absolute'>

        <View className='flex relative h-auto items-center w-full flex-row justify-center mt-8 mb-8'>
          <Text className='text-2xl text-white font-bold'>Menu</Text>
          <TouchableOpacity onPress={() => { setShowMenu(false) }} className='absolute right-10'>
            <Text className=' text-white'>Done</Text>
          </TouchableOpacity>
        </View>
        <View className='w-full flex-1 bg-slate-700 items-center rounded-t-3xl pt-10'>
          <View className='w-[70%] flex-1'>
            <TouchableOpacity onPress={() => { setShowMenu(false); setShowPlaylist(false) }} className='h-14 active:bg-[#0000002f] rounded-xl w-full flex flex-row items-center pl-5'>
              <Home />
              <Text className='text-white text-lg ml-8'>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShowMenu(false) }} className='h-14 active:bg-[#0000002f] rounded-xl w-full flex flex-row items-center pl-5'>
              <Playlist />
              <Text className='text-white text-lg ml-8'>Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setShowSettings(true)}} className='h-14 active:bg-[#0000002f] rounded-xl w-full flex flex-row items-center pl-5'>
              <SettingsIcon />
              <Text className='text-white text-lg ml-8'>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Linking.openURL("https://github.com/ishara-madu/Pirith-mobile-app") }} className='h-14 active:bg-[#0000002f] rounded-xl w-full flex flex-row items-center pl-5'>
              <Rate />
              <Text className='text-white text-lg ml-8'>Rate Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Linking.openURL("https://github.com/ishara-madu/Pirith-mobile-app/issues")
            }} className='h-14 active:bg-[#0000002f] rounded-xl w-full flex flex-row items-center pl-5'>
              <Help />
              <Text className='text-white text-lg ml-8'>Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShowAbout(true); }} className='h-14  active:bg-[#0000002f] rounded-xl w-full flex flex-row items-center pl-4'>
              <About wh={40} />
              <Text className='text-white text-lg ml-6'>About Us</Text>
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