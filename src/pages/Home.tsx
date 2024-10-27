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
import { dropTable, insertData, updateFavorite } from './Database';
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import Playlist from './Playlist';
import Slider from '@react-native-community/slider';


const Home: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [uniqueId, setUniqueId] = useState(0);
  const { url} = selectedPlaylist || {
    url: 'No Url provided',
  };
  const [isFavorites, setIsFavorites] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [urls, setUrls] = useState<any>([])
  const [repeat, setRepeat] = useState("one")
  const [shuffle, setShuffle] = useState(true)


  const handlePlayPause = useCallback(() => {
    setIsPlay((prev) => !prev);
  }, []);

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

  const params = (url: any, window: boolean, urls: any, uniqueId: any) => {
    const selectedDetails = { url, uniqueId };
    setSelectedPlaylist(selectedDetails);
    setShowPlaylist(window);
    setUrls(urls);
    setUniqueId(uniqueId);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlay) {
        playerRef.current
          .getCurrentTime()
          .then(currentTime => setCurrentTime(currentTime))
          .catch(error => console.error("Error fetching time:", error));
      }
    }, 1000); // Adjust the interval time as needed

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [isPlay]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current
        .getDuration()
        .then(duration => setDuration(duration))
        .catch(error => console.error("Error fetching duration:", error));
    }
  }, [isPlay])




  // Manually skip to a selected time
  const handleTimeChange = (time: any) => {
    setCurrentTime(time);
    if (playerRef.current) {
      playerRef.current.seekTo(time, true); // true allows seeking ahead
    }
  };


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };


  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      console.log("ended")
      setUniqueId(Object.values(urls).indexOf(url) + 1)
    }
  }, []);



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
              <Text className='text-2xl font-semibold text-white text-center'>
                {},{uniqueId}
              </Text>
              <Text className='text-md text-neutral-300'>
                {}
              </Text>
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
              shuffle? (
                <Shuffle opacity={1} />
              ) : (
                <Shuffle opacity={0.5} />
              )
            }
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
                      <Repeat opacity={0.5}/>
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