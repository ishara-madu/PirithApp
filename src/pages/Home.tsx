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
import { getData, saveDataVariable, updateFavorite } from './Database';
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
import { length } from '../../node_modules/@protobufjs/base64/index.d';



const Home: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [repeat, setRepeat] = useState("all")
  const [shuffle, setShuffle] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [intervalId, setIntervalId] = useState<any>();
  const [btnPress, setBtnPress] = useState<boolean>(false)

  const { playbackRate, setUniqueId, uniqueId, setUrls, urls, setShowPlaylist, showPlaylist, theme, isPlay, setIsPlay, url, setUrl, isFavoritesAll, nameAll, artistAll, playerStyle, isFavorites, setIsFavorites, setActiveButton,showspeedOptions,showTimeOptions, setShowTimeOptions, setShowSpeedOptions,showTypeOptions, setShowTypeOptions,showThemeOptions, setShowThemeOptions,showBackgroundPlayOptions, setShowBackgroundPlayOptions } = useGlobalContext();

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
      if (state === 'unstarted') {
        setDuration(0);
        setCurrentTime(0)
      }
    } else {
      setShowLoading(false);
      if (playerRef.current) {
        playerRef.current
          .getDuration()
          .then(duration => setDuration(duration))
          .catch(error => console.error("Error fetching duration:", error));
      }
    }
    if (state === "ended") {
      if (repeat === "one") {
        setUniqueId((prevId: any) => {
          const newId = prevId + 1;
          setTimeout(() => {
            setUniqueId(newId - 1); // Reset back to original uniqueId
          }, 1);
          saveDataVariable("uniqueId", newId);
          return newId;
        });
      } else if (repeat === "all") {
        setUniqueId((prevId: any) => (prevId < urls.length - 1 ? prevId + 1 : 0));
        setUrl(urls[(uniqueId + 1) % urls.length]);
        saveDataVariable("uniqueId", uniqueId + 1);
      } else {
        setUniqueId((prevId: any) => (prevId < urls.length - 1 ? prevId + 1 : prevId));
        setUrl(urls[uniqueId]);
        saveDataVariable("uniqueId", uniqueId);
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
      saveDataVariable("uniqueId", randomIndex);
      setUrl(urls[randomIndex]);
    } else {
      if (uniqueId < urls.length - 1) {
        const nextId = uniqueId + 1;
        setUniqueId(nextId);
        setUrl(urls[nextId]);
        saveDataVariable("uniqueId", nextId);
      } else {
        setUniqueId(0);
        setUrl(urls[0]);
        saveDataVariable("uniqueId", 0);
      }
    }
    setBtnPress(true);
  };


  const handlePrevious = () => {
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * urls.length);
      setUniqueId(randomIndex);
      saveDataVariable("uniqueId", randomIndex);
      setUrl(urls[randomIndex]);
    } else {
      setUniqueId((prevId: any) => {
        const newId = (prevId > 0) ? prevId - 1 : urls.length - 1;
        setUrl(urls[newId]);
        saveDataVariable("uniqueId", newId);
        return newId;
      });
    }
    setBtnPress(true);
  }




  useEffect(() => {
    setIsFavorites(isFavoritesAll[uniqueId])
    setBtnPress(false);
  }, [btnPress]);



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

  const handleLeftSkip = () => {
    if (currentTime > 5) {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime - 5, true);
        setCurrentTime(currentTime - 5)
      }
    }

  }


  const handleRightSkip = () => {

    if ((duration - 5) > currentTime) {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime + 5, true);
        setCurrentTime(currentTime + 5)
      }
    }
  }

  function truncateString(str: string, length: number) {
    if (str != null && str.length) {

      if (str.length > length) {
        return str.slice(0, length) + '...';
      }
      return str;
    }
  }

  const clearSettings = () => {
    setShowInfo(false);
    showspeedOptions && setShowSpeedOptions(false);
    showTimeOptions && setShowTimeOptions(false)
    showTypeOptions && setShowTypeOptions(false);
    showThemeOptions && setShowThemeOptions(false);
    showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
    setActiveButton(0);
  }


  return (
    <>
      <StatusBar barStyle={"default"} />
      <SafeAreaView>
        <View className={`w-full h-full flex flex-col items-center ${currentStyles.bg_1} justify-end`}>
          <TouchableWithoutFeedback onPress={() => { clearSettings() }}>


            <View className='w-full flex h-10 flex-row justify-around items-end z-20 bg-gre5'>
              <TouchableOpacity
                className='w-7 h-7 flex justify-center items-center rounded-full'
                onPress={() => { setShowPlaylist(true); clearSettings() }}
              >
                <DownArrow fill={currentStyles.svg_1} width={22} height={12} />
              </TouchableOpacity>
              <Text className={`${currentStyles.tx_1} text-sm font-semibold`}>Now Playing</Text>
              <TouchableOpacity
                className=' w-7 h-7 flex justify-center items-center rounded-full'
                onPress={() => {
                  if (showInfo) {
                    clearSettings();
                  } else {
                    setShowInfo(true);
                  }
                }}
              >
                <More fill={currentStyles.svg_1} />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
          <View className='w-full flex-1 justify-center items-center'>
            <View className={`w-[90%] h-[90%] ${currentStyles.bg_3} rounded-3xl overflow-hidden relative`}>
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
              <Image className='flex-1 rounded-3xl' source={{ uri: `https://img.youtube.com/vi/${urls[uniqueId]}/maxresdefault.jpg` }} />
            </View>

          </View>


          <View className={`w-full ${currentStyles.bg_2} h-[40%] rounded-t-3xl flex items-center`}>
            <View className='w-full flex flex-row justify-center items-center mt-5'>
              {
                playerStyle === "Simple" ? (
                  ""
                ) : (
                  <TouchableOpacity className='absolute bottom-0 left-8' onPress={handleFavorite}>
                    {
                      isFavoritesAll[uniqueId] ? (
                        <Heart fill={"red"} fillStr={"red"} />
                      ) : (
                        <Heart fill={"none"} fillStr={currentStyles.svg_1} />
                      )
                    }
                  </TouchableOpacity>
                )
              }

              <View className={`flex items-center w-[90%] h-16 justify-center`}>


                <View >
                  <Text className={`text-sm font-semibold ${currentStyles.tx_1} text-center`}>
                    {truncateString(nameAll[uniqueId], 60)}
                  </Text>
                  <Text className={`text-xs ${currentStyles.tx_1} opacity-60 text-center mt-3`}>
                    {truncateString(artistAll[uniqueId], 20)}
                  </Text>
                </View>

              </View>
              {
                playerStyle === "Simple" ? (
                  ""
                ) : (
                  <TouchableOpacity className='absolute bottom-0 right-8' onPress={onShare}>
                    <Shar str={currentStyles.svg_1} />
                  </TouchableOpacity>
                )
              }

            </View>
            <View className='w-[70%] flex mt-5'>
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
                <Text className={`${currentStyles.tx_1} text-xs`}>{formatTime(currentTime)}</Text>
                <Text className={`${currentStyles.tx_1} text-xs`}>{formatTime(duration)}</Text>
              </View>
            </View>

            <View className={`${playerStyle === "Advanced" ? "w-[85%]" : "w-[70%]"} flex flex-row ${playerStyle === "Simple" ? "justify-around" : "justify-between"} items-center mt-5 mb-7`}>
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
                    <Pause fill={currentStyles.svg_1} w={30} h={35} />
                  ) : (
                    <Play fill={currentStyles.svg_1} w={30} h={35} />
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
      <Playlist />
    </>
  )
}

export default Home