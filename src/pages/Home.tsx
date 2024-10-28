import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert, Share } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Shuffle from '../../assets/svg/Shuffle'
import SkipPreviews from '../../assets/svg/SkipPreviews'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import Play from '../../assets/svg/Play'
import SkipNext from '../../assets/svg/SkipNext'
import Repeat from '../../assets/svg/Repeat'
import Info from '../components/Info';
import Pause from '../../assets/svg/Pause';
import Heart from '../../assets/svg/Heart';
import Shar from '../../assets/svg/Share';
import { dropTable, getAllData, insertData, updateFavorite } from './Database';
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import Playlist from './Playlist';
import Slider from '@react-native-community/slider';
import Loading from '../components/Loading';




const Home: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [uniqueId, setUniqueId] = useState(0);
  const [isFavorites, setIsFavorites] = useState(false);
  const [isFavoritesAll, setIsFavoritesAll] = useState<any>([]);
  const [nameAll, setNameAll] = useState<any>([])
  const [artistAll, setArtistAll] = useState<any>([]);
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [urls, setUrls] = useState<any>([])
  const [url, setUrl] = useState('r');
  const [repeat, setRepeat] = useState("one")
  const [shuffle, setShuffle] = useState(true)


  const handlePlayPause = useCallback(() => {
    setIsPlay((prev) => !prev);
  }, []);


  const onShare = async () => {
    const result = await Share.share({
      message: `✨ Check out this amazing content! 🌟\n👉 https://music.youtube.com/watch?v=${url}`,
    });
  };

  const params = (url: any, window: boolean, urls: any, uniqueId: any, isFavoritesAll: boolean,nameAll:string,artistAll:string) => {
    setShowPlaylist(window);
    setUrls(urls);
    setUniqueId(uniqueId);
    setUrl(url)
    setIsFavoritesAll(isFavoritesAll);
    setNameAll(nameAll);
    setArtistAll(artistAll);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlay) {
        playerRef.current
          .getCurrentTime()
          .then(currentTime => setCurrentTime(currentTime))
          .catch(error => console.error("Error fetching time:", error));
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [isPlay]);


  const handleTimeChange = (time: any) => {
    setCurrentTime(time);
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
    }
  };


  const formatTime = (seconds?: number) => {
    if (seconds === undefined) {
      return "00:00";
    }
  
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  

  const onStateChange = (state: any) => {
    if (state === "ended") {
      if (uniqueId < (urls.length) - 1) {
        setUniqueId(uniqueId + 1);
        setUrl(urls[uniqueId + 1]);
      } else {
        setUniqueId(0);
        setUrl(urls[0]);
      }
    }
  };

  const hanleNext = () => {
    if (uniqueId < (urls.length) - 1) {
      setUniqueId(Object.values(urls).indexOf(url) + 1);
      setUrl(urls[uniqueId + 1]);
    } else {
      setUniqueId(0);
      setUrl(urls[0]);
    }
  }
  const handleFavorite = () => {
    if (isFavorites) {
      setIsFavorites(false);
      updateFavorite(false, url);
      isFavoritesAll[uniqueId] = false;
    } else {
      setIsFavorites(true);
      updateFavorite(true, url);
      isFavoritesAll[uniqueId] = true;
    }
  }

  
  
  const handlePrevious = () => {
    if (uniqueId > 0) {
      setUniqueId(uniqueId - 1);
      setUrl(urls[uniqueId - 1]);
    } else {
      setUniqueId(urls.length - 1);
      setUrl(urls[urls.length - 1]);
    }
  }
  
    useEffect(() => {
      if (playerRef.current) {
        playerRef.current
          .getDuration()
          .then(duration => setDuration(duration))
          .catch(error => console.error("Error fetching duration:", error));
      }
    }, [showPlaylist,hanleNext,handlePrevious])
  

  useEffect(() => {

    setIsFavorites(isFavoritesAll[uniqueId])

  }, [hanleNext, handlePrevious]);



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
            {
              <YoutubePlayer
                ref={playerRef}
                height={100}
                play={isPlay}
                videoId={urls[uniqueId]}
                useLocalHTML={true}
                onChangeState={onStateChange}
              />
            }

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

              
                    <View >
                      <Text className='text-2xl font-semibold text-white text-center'>
                        {nameAll[uniqueId]}
                      </Text>
                      <Text className='text-md text-neutral-300'>
                        {artistAll[uniqueId]}
                      </Text>
                    </View>
                  
            </View>
            <TouchableOpacity onPress={onShare}>
              <Shar />
            </TouchableOpacity>
          </View>
          <View className='w-[70%] flex mt-10'>
            <View className='w-full flex'>
              <Slider
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                onValueChange={handleTimeChange}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#8B8B8B"
                thumbTintColor="#1EB1FC" // Large, vibrant thumb color
              />
            </View>
            <View className='flex flex-row justify-between mt-2'>
              <Text className='text-white'>{formatTime(currentTime)}</Text>
              <Text className='text-white'>{formatTime(duration)}</Text>
            </View>
          </View>

          <View className='w-[70%] flex flex-row justify-between items-center mt-7 mb-10'>
            <TouchableOpacity className='w-5 h-5 relative flex justify-center items-center'>
              {
                shuffle ? (
                  <Shuffle opacity={1} />
                ) : (
                  <Shuffle opacity={0.5} />
                )
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePrevious}>
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
            <TouchableOpacity onPress={hanleNext}>
              <SkipNext />
            </TouchableOpacity>
            <TouchableOpacity className='w-5 h-5 relative flex justify-center items-center'>
              {
                repeat === "all" ? (
                  <Repeat opacity={1} />
                ) : (
                  repeat === "one" ? (
                    <>
                      <Text className='text-white flex text-xs absolute'>1</Text>
                      <Repeat opacity={1} />
                    </>
                  ) : (
                    <>
                      <View className='bg-[#fff] opacity-[0.5] font-bold flex w-[2px] h-full absolute rotate-[-28deg]'></View>
                      <Repeat opacity={0.5} />
                    </>
                  )
                )
              }
              <View className='text-white absolute w-full h-full flex justify-center items-center z-20'>
                {/* > */}

              </View>
            </TouchableOpacity>
          </View>
        </View>
        {
          showInfo && <Info />
        }

      </View>

      <Playlist onSelect={params} showPlaylist={showPlaylist} />
    </SafeAreaView>
  )
}

export default Home