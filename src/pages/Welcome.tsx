import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native'
import { useGlobalContext } from '../components/Hooks/GlobalContext'
import {  useState } from 'react'
import { saveDataVariable } from './Database'

type WelcomeProps={
  onChange:(showWelcome:boolean) => void,
}

const Welcome = ({onChange}:WelcomeProps) => {
  const  {setShowPlaylist} = useGlobalContext()
  const setVal = ()=>{
    onChange(false);
    saveDataVariable('Welcome',false)
    setShowPlaylist(true);
  }
  return (
    <SafeAreaView className="flex w-full h-full items-center justify-center bg-black">
      <StatusBar barStyle={"default"} />
      <Image className='h-full w-full' source={require('../../assets/welcome-bg.jpg')} />
      <View className='absolute bottom-12 flex items-center w-full '>

        <Image className='mb-10 w-[90%]' resizeMode='contain' source={require("../../assets/sethpirith.png")} />
        <Text className='text-white mb-16 text-xs'>සියලුම සෙත් පිරිත් දේශනා එකම තැනකි​න්</Text>
        <TouchableOpacity
          className='bg-[#ffffff2e] h-10 w-[70%] rounded-full text-white font-bold flex flex-row justify-center items-center'
          onPress={() => { setVal() }}
        >
          <Text className='font-bold text-white text-xs'>Start Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Welcome