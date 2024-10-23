import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Shiffle from '../../assets/svg/Shiffle'
import SkipPreviews from '../../assets/svg/SkipPreviews'
import { NavigationContainer } from '@react-navigation/native';
import Play from '../../assets/svg/Play'
import SkipNext from '../../assets/svg/SkipNext'
import Repeat from '../../assets/svg/Repeat'
import Info from '../components/Info';
import Pause from '../../assets/svg/Pause';
import YoutubePlayer, {YoutubeIframeRef} from "react-native-youtube-iframe";


type HomeProps = {
  navigation: any;
  
}

const Home = (props: HomeProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <SafeAreaView>
      <View className='w-full h-full flex flex-col items-center bg-black justify-end'>
        <View className='w-full flex h-20 flex-row justify-around items-center z-20'>
          <TouchableOpacity
            className='w-7 h-7 flex justify-center items-center rounded-full'
            onPress={() => props.navigation.navigate('Playlist')}
          >
            <Image source={require('../../assets/DownArrow.png')} />
          </TouchableOpacity>
          <Text className='text-white text-xl font-semibold'>Now Playing</Text>
          <TouchableOpacity
            className=' w-7 h-7 flex justify-center items-center rounded-full'
            onPress={() => {showInfo ? setShowInfo(false): setShowInfo(true)}}
          >
            <Image source={require('../../assets/More.png')} />
          </TouchableOpacity>
        </View>

        <View className='w-full flex-1 justify-center items-center'>
          <View className='w-[80%] h-[85%] bg-slate-200 rounded-3xl'>
          
          </View>

        </View>


        <View className='w-full bg-[#ffffff36] rounded-3xl flex items-center'>
          <View className='w-full flex flex-row justify-evenly items-center mt-5'>
            <Image className='scale-75' source={require('../../assets/Hart.png')} />
            <View className='flex items-center gap-3'>
              <Text className='text-3xl font-semibold text-white'>
                Despasito
              </Text>
              <Text className='text-md text-neutral-300'>
                - Fernando Ponce
              </Text>
            </View>
            <Image className='scale-75' source={require('../../assets/Share.png')} />
          </View>
          <View className='w-[70%] flex mt-10'>
            <View className='w-full flex'>
              <View className='bg-white h-1.5 rounded-full'>
                <View className='bg-red-800 h-full w-[40%] rounded-full'></View>
              </View>
            </View>
            <View className='flex flex-row justify-between mt-2'>
              <Text className='text-white'>01:20</Text>
              <Text className='text-white'>11.20</Text>
            </View>
          </View>

          <View className='w-[70%] flex flex-row justify-between items-center mt-7 mb-10'>
            <TouchableOpacity>
              <Shiffle />
            </TouchableOpacity>
            <TouchableOpacity>
              <SkipPreviews />
            </TouchableOpacity>
            <TouchableOpacity>
              <Play />
            </TouchableOpacity>
            <TouchableOpacity>
              <SkipNext />
            </TouchableOpacity>
            <TouchableOpacity>
              <Repeat />
            </TouchableOpacity>
          </View>
        </View>
        {
          showInfo && <Info/>
        }
        
      </View>
    </SafeAreaView>
  )
}

export default Home