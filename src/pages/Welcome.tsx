import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar';

type WelcomeProps = {
    navigation: any;
  
}

const Welcome = (navigation : WelcomeProps) => {
  return (
      <SafeAreaView className="flex w-full h-full items-center justify-center bg-black">
      <StatusBar style="light" />
      <Image className='h-full w-full' source={require('../../assets/welcome-bg.jpg')}/>
      <LinearGradient
      colors={['rgba(0,0,0,0.95)', 'rgba(0,0,0,0)','rgba(0,0,0,0.7)']}
      locations={[0, 0.6,1]}
      start={{ x: 0, y: 1 }} // Start from the bottom
      end={{ x: 0, y: 0 }} // End at the top
      className='w-full h-full flex items-center justify-center absolute'
    >
      <View className='absolute bottom-10 flex items-center w-full '>

      <Image className='mb-10' source={require("../../assets/sethpirith.png")}/>
    <Text className='text-white mb-16'>සියලුම සෙත් පිරිත් දේශනා එකම තැනකි​න්</Text>
    <TouchableOpacity
      className='bg-[#ffffff2e] h-12 w-[70%] rounded-full text-white font-bold flex flex-row justify-center items-center'
      onPress={() => navigation.navigation.replace('Home')}
    >
      <Text className='font-bold text-white'>පටන් ගන්න</Text>
    </TouchableOpacity>
      </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Welcome