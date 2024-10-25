import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert, Share } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Shiffle from '../../assets/svg/Shiffle'
import SkipPreviews from '../../assets/svg/SkipPreviews'
import { NavigationContainer } from '@react-navigation/native';
import Play from '../../assets/svg/Play'
import SkipNext from '../../assets/svg/SkipNext'
import Repeat from '../../assets/svg/Repeat'
import Info from '../components/Info';
import Pause from '../../assets/svg/Pause';
import Heart from '../../assets/svg/Heart';
import Shar from '../../assets/svg/Share';
import { dropTable, insertData, updateFavorite } from './Database';
import EventEmitter from 'events';
import Video from '../components/Video';
import YoutubePlayer, {YoutubeIframeRef} from "react-native-youtube-iframe";
import Playlist from './Playlist';



const Home: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);

  const { url, name, artist } = selectedPlaylist || {
    url: 'No Url provided',
    name: 'No Name provided',
    artist: 'No Artist provided',
  };
  const [isFavorites, setIsFavorites] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false)

  const handlePlayPause = () => {
    isPlay ? setIsPlay(false) : setIsPlay(true);
  };

  const handleFavorite = () => {
    if (isFavorites) {
      setIsFavorites(false);
      updateFavorite(false, url);
    } else {
      setIsFavorites(true);
      updateFavorite(true, url);

    }
  }

  const onShare = async () => {
    const result = await Share.share({
      message: `✨ Check out this amazing content! 🌟\n👉 https://music.youtube.com/watch?v=${url}`,
    });


  };

  const params = (url: any, name: any, artist: any, favorite: boolean,window:boolean)=>{
    const selectedDetails = { url, name, artist, favorite };
    setSelectedPlaylist(selectedDetails);
    setShowPlaylist(window);
    setIsFavorites(favorite)
  }


  return (
    <SafeAreaView>
      <View className='w-full h-full flex flex-col items-center bg-black justify-end'>
        <View className='w-full flex h-20 flex-row justify-around items-center z-20'>
          <TouchableOpacity
            className='w-7 h-7 flex justify-center items-center rounded-full'
            onPress={() => setShowPlaylist(true)}
          >
            <Image source={require('../../assets/DownArrow.png')} />
          </TouchableOpacity>
          <Text className='text-white text-xl font-semibold'>Now Playing</Text>
          <TouchableOpacity
            className=' w-7 h-7 flex justify-center items-center rounded-full'
            onPress={() => { showInfo ? setShowInfo(false) : setShowInfo(true) }}
          >
            <Image source={require('../../assets/More.png')} />
          </TouchableOpacity>
        </View>

        <View className='w-full flex-1 justify-center items-center'>
          <View className='w-[80%] h-[85%] bg-slate-200 rounded-3xl overflow-hidden'>
            <YoutubePlayer
              height={100}
              play={isPlay}
              videoId={"gRYV3Dgib7g"}
            />
            <Image className='flex-1 rounded-3xl' source={{ uri: `https://img.youtube.com/vi/${url}/maxresdefault.jpg` }} />
          </View>

        </View>


        <View className='w-full bg-[#ffffff36] rounded-3xl flex items-center'>
          <View className='w-full flex flex-row justify-center items-center mt-5'>
            <TouchableOpacity onPress={handleFavorite}>
              {
                isFavorites ? (
                  <Heart fill={"red"} fillStr={"red"} />
                ) : (
                  <Heart fill={"none"} fillStr={"white"} />
                )
              }
            </TouchableOpacity>
            <View className='flex items-center gap-3 w-[70%] justify-center'>
              <Text className='text-2xl font-semibold text-white text-center'>
                {name}
              </Text>
              <Text className='text-md text-neutral-300'>
                {artist}
              </Text>
            </View>
            <TouchableOpacity onPress={onShare}>
              <Shar />
            </TouchableOpacity>
          </View>
          <View className='w-[70%] flex mt-10'>
            <View className='w-full flex'>
              <View className='bg-white h-1.5 rounded-full'>
                <View className='bg-red-800 h-full w-[40%] rounded-full'></View>
              </View>
            </View>
            <View className='flex flex-row justify-between mt-2'>
              <Text className='text-white'>{ }</Text>
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
            <TouchableOpacity onPress={() => { handlePlayPause() }}>
              {
                isPlay ? (
                  <Pause />
                ) : (
                  <Play />
                )
              }
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
          showInfo && <Info />
        }

      </View>
      {
        showPlaylist &&     <Playlist onSelect={params} />

      }
    </SafeAreaView>
  )
}

export default Home