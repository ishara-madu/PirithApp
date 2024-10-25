import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const About = () => {
  return (
    <SafeAreaView className='bg-green-400 flex w-full h-full'>
      
      <View className='flex relative h-auto items-center w-full flex-row justify-center mt-8 mb-8'>
        <Text className='text-2xl text-white font-bold'>About</Text>
        <Text className='absolute right-10 text-white'>Done</Text>
      </View>
      <View className='w-full flex-1 bg-slate-700 items-center rounded-t-3xl pt-10'>
        <View className='w-[80%] flex-1'>
          <Text className='text-white text-base'><Text className='font-bold'>Pirith App</Text> offers a collection of sacred Buddhist chants for daily spiritual practice. With high-quality audio and access with Youtube , you can listen to Pirith anytime, anywhere.</Text>
          <Text className='text-white text-xl font-bold mt-5'>What is Pirith?</Text>
          <Text className='text-white text-base'>Pirith refers to Buddhist chants that provide protection and blessings, promoting peace and harmony in daily life.</Text>
          <Text className='text-white text-xl font-bold mt-5'>Our Mission</Text>
          <Text className='text-white text-base'>We aim to make these spiritual blessings accessible to everyone, helping people find peace and well-being through sacred chants.</Text>
          <Text className='text-white text-xl font-bold mt-5'>Contact Us</Text>
          <Text className='text-white text-base'>For feedback or suggestions:</Text>
          <Text className='text-white text-base'>Email: info@pirithapp.com</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default About