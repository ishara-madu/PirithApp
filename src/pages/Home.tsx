import { View, Text, Image, TouchableOpacity, Alert, Share, TouchableWithoutFeedback, StatusBar } from 'react-native'
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
import {updateFavorite } from './Database';
import YoutubePlayer, { YoutubeIframeRef, getYoutubeMeta } from "react-native-youtube-iframe";
import Playlist from './Playlist';
import Slider from '@react-native-community/slider';
import Loading from '../components/Loading';
import { darkStyles, lightStyles, useGlobalContext } from '../components/Hooks/GlobalContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import DownArrow from '../../assets/svg/DownArrow';
import More from '../../assets/svg/More';
import RightSkip from '../../assets/svg/RightSkip';
import LeftSkip from '../../assets/svg/LeftSkip';



const Home: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [isFavorites, setIsFavorites] = useState(false);
  const [repeat, setRepeat] = useState("all")
  const [shuffle, setShuffle] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [intervalId, setIntervalId] = useState<any>();

  const { playbackRate, setUniqueId, uniqueId, setUrls, urls, setShowPlaylist, showPlaylist, theme, isPlay, setIsPlay, url, setUrl, isFavoritesAll, nameAll, artistAll, playerStyle } = useGlobalContext();

  const currentStyles = theme === 'Light' ? lightStyles : darkStyles;




  const handlePlayPause = () => {
    setIsPlay((prev: any) => !prev);
  };

  const onShare = async () => {
    const result = await Share.share({
      message: `✨ Check out this amazing content! 🌟\n👉 https://music.youtube.com/watch?v=${urls[uniqueId]}`,
    });
  };



  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // Only start interval if player is playing
    if (playerRef.current && isPlay) {
      interval = setInterval(() => {
        playerRef.current
          ?.getCurrentTime()
          .then((currentTime: number) => setCurrentTime(currentTime))
          .catch((error: any) => console.error("Error fetching time:", error));
      }, 1000);
    }

    // Cleanup interval on component unmount or if `isPlay` changes
    return () => {
      if (interval) clearInterval(interval);
    };
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
    if (state === 'buffering' || state === 'unstarted') {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
    if (state === "ended") {
      if (repeat === "one") {
        setUniqueId((prevId: any) => {
          const newId = prevId + 1;
          setTimeout(() => {
            setUniqueId(newId - 1); // Reset back to original uniqueId
          }, 1);
          return newId;
        });
      } else if (repeat === "all") {
        setUniqueId((prevId: any) => (prevId < urls.length - 1 ? prevId + 1 : 0));
        setUrl(urls[(uniqueId + 1) % urls.length]);
      } else {
        setUniqueId((prevId: any) => (prevId < urls.length - 1 ? prevId + 1 : prevId));
        setUrl(urls[uniqueId]);
      }
    }
  };



  const handleshuffle = () => {
    setShuffle(!shuffle)
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

  const handleNext = () => {
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * urls.length);
      setUniqueId(randomIndex);
      setUrl(urls[randomIndex]);
    } else {
      if (uniqueId < urls.length - 1) {
        const nextId = uniqueId + 1;
        setUniqueId(nextId);
        setUrl(urls[nextId]);
      } else {
        setUniqueId(0);
        setUrl(urls[0]);
      }
    }
  };


  const handlePrevious = () => {
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * urls.length);
      setUniqueId(randomIndex);
      setUrl(urls[randomIndex]);
    } else {
      setUniqueId((prevId: any) => {
        const newId = (prevId > 0) ? prevId - 1 : urls.length - 1;
        setUrl(urls[newId]);
        return newId;
      });
    }
  }


  useEffect(() => {
    if (playerRef.current) {
      playerRef.current
        .getDuration()
        .then(duration => setDuration(duration))
        .catch(error => console.error("Error fetching duration:", error));
    }
  }, [showPlaylist, handleNext, handlePrevious])


  useEffect(() => {

    setIsFavorites(isFavoritesAll[uniqueId])

  }, [handleNext, handlePrevious]);



  const handleRepeat = () => {
    setRepeat((prev) => {
      if (prev == "all") {
        return "one"
      } else if (prev == "one") {
        return "no"
      } else if (prev == "no") {
        return "all"
      } else {
        return prev
      }
    })

  }

  const handleLeftSkip = ()=>{
    if (currentTime > 5) {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime-5, true);
        setCurrentTime(currentTime-5)
      }
    }

  }


  const handleRightSkip = ()=>{

    if ((duration - 5) > currentTime) {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime+5, true);
        setCurrentTime(currentTime+5)
      }
    }
  }


  return (
    <>
      <StatusBar barStyle={"default"} />
      <SafeAreaView>
        <View className={`w-full h-full flex flex-col items-center ${currentStyles.bg_1} justify-end`}>
          <TouchableWithoutFeedback onPress={() => { setShowInfo(false) }}>


            <View className='w-full flex h-20 flex-row justify-around items-center z-20 bg-gre5'>
              <TouchableOpacity
                className='w-7 h-7 flex justify-center items-center rounded-full'
                onPress={() => { setShowPlaylist(true); setShowInfo(false); }}
              >
                <DownArrow fill={currentStyles.svg_1} width={22} height={12} />
              </TouchableOpacity>
              <Text className={`${currentStyles.tx_1} text-xl font-semibold`}>Now Playing</Text>
              <TouchableOpacity
                className=' w-7 h-7 flex justify-center items-center rounded-full'
                onPress={() => { showInfo ? setShowInfo(false) : setShowInfo(true) }}
              >
                <More fill={currentStyles.svg_1} />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
          <View className='w-full flex-1 justify-center items-center'>
            <View className={`w-[80%] h-[85%] ${currentStyles.bg_3} rounded-3xl overflow-hidden relative`}>
              {
                <YoutubePlayer
                  ref={playerRef}
                  height={0}
                  width={0}
                  play={isPlay}
                  videoId={urls[uniqueId]}
                  useLocalHTML={true}
                  onChangeState={onStateChange}
                  playbackRate={playbackRate}
                />
              }
              {
                showLoading && (
                  <Loading />
                )
              }
              <Image className='flex-1 rounded-3xl' source={{ uri: `https://img.youtube.com/vi/${url}/maxresdefault.jpg` }} />
            </View>

          </View>


          <View className={`w-full ${currentStyles.bg_2} rounded-t-3xl flex items-center`}>
            <View className='w-full flex flex-row justify-center items-center mt-5'>
              {
                playerStyle === "Simple" ? (
                  ""
                ) : (
                  <TouchableOpacity onPress={handleFavorite}>
                    {
                      isFavorites ? (
                        <Heart fill={"red"} fillStr={"red"} />
                      ) : (
                        <Heart fill={"none"} fillStr={currentStyles.svg_1} />
                      )
                    }
                  </TouchableOpacity>
                )
              }

              <View className='flex items-center gap-3 w-[70%] justify-center'>


                <View >
                  <Text className={`text-2xl font-semibold ${currentStyles.tx_1} text-center`}>
                    {nameAll[uniqueId]}
                  </Text>
                  <Text className={`text-md ${currentStyles.tx_2} opacity-60 text-center`}>
                    {artistAll[uniqueId]}
                  </Text>
                </View>

              </View>
              {
                playerStyle === "Simple" ? (
                  ""
                ) : (
                  <TouchableOpacity onPress={onShare}>
                    <Shar str={currentStyles.svg_1} />
                  </TouchableOpacity>
                )
              }

            </View>
            <View className='w-[70%] flex mt-10'>
              <View className='w-full flex'>
                <Slider
                  minimumValue={0}
                  maximumValue={duration}
                  value={currentTime}
                  onValueChange={handleTimeChange}
                  minimumTrackTintColor={currentStyles.svg_3}
                  maximumTrackTintColor={currentStyles.svg_3}
                  thumbTintColor={currentStyles.svg_2}
                />
              </View>
              <View className='flex flex-row justify-between mt-2'>
                <Text className={`${currentStyles.tx_1}`}>{formatTime(currentTime)}</Text>
                <Text className={`${currentStyles.tx_1}`}>{formatTime(duration)}</Text>
              </View>
            </View>

            <View className={`${playerStyle === "Advanced" ? "w-[85%]" : "w-[70%]"} flex flex-row ${playerStyle === "Simple" ? "justify-around" : "justify-between"} items-center mt-7 mb-10`}>
              {
                playerStyle != "Simple" && (
                  <TouchableOpacity onPress={handleshuffle} className='w-5 h-5 relative flex justify-center items-center'>
                    {
                      shuffle ? (
                        <Shuffle str={currentStyles.svg_1} opacity={1} />
                      ) : (
                        <Shuffle str={currentStyles.svg_2} opacity={0.5} />
                      )
                    }
                  </TouchableOpacity>
                )
              }
              <TouchableOpacity onPress={handlePrevious}>
                <SkipPreviews fill={currentStyles.svg_1} />
              </TouchableOpacity>
              {
                playerStyle === "Advanced" && (
                  <TouchableOpacity 
                  onPress={handleLeftSkip}
                  >
                    <LeftSkip fill={currentStyles.svg_1} />
                  </TouchableOpacity>
                )
              }
              <TouchableOpacity onPress={() => { handlePlayPause() }}>
                {
                  isPlay ? (
                    <Pause fill={currentStyles.svg_1} w={35} h={45} />
                  ) : (
                    <Play fill={currentStyles.svg_1} w={35} h={45} />
                  )
                }
              </TouchableOpacity>
              {
                playerStyle === "Advanced" && (
                  <TouchableOpacity onPress={handleRightSkip}>
                    <RightSkip fill={currentStyles.svg_1} />
                  </TouchableOpacity>
                )
              }

              <TouchableOpacity onPress={handleNext}>
                <SkipNext fill={currentStyles.svg_1} />
              </TouchableOpacity>
              {
                playerStyle != "Simple" && (
                  <TouchableOpacity onPress={handleRepeat} className='w-5 h-5 relative flex justify-center items-center'>
                    {
                      repeat === "all" ? (
                        <Repeat stroke={currentStyles.svg_1} opacity={1} />
                      ) : (
                        repeat === "one" ? (
                          <>
                            <Text className={`${currentStyles.tx_1} flex text-xs absolute`}>1</Text>
                            <Repeat stroke={currentStyles.svg_1} opacity={1} />
                          </>
                        ) : (
                          <>
                            <View className={`${currentStyles.bg_4} opacity-[0.5] font-bold flex w-[2px] h-full absolute rotate-[-28deg]`}></View>
                            <Repeat stroke={currentStyles.svg_2} opacity={0.5} />
                          </>
                        )
                      )
                    }
                    <View className='text-white absolute w-full h-full flex justify-center items-center z-20'>
                    </View>
                  </TouchableOpacity>
                )
              }

            </View>
          </View>

          {
            showInfo && <Info />
          }
        </View>

      </SafeAreaView>
      <Playlist isFavorites={isFavorites} />
    </>
  )
}

export default Home