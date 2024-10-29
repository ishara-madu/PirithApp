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
  const [isPlay, setIsPlay] = useState<boolean>(true);
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
  const [repeat, setRepeat] = useState("all")
  const [shuffle, setShuffle] = useState(false)
  const [showLoading, setShowLoading] = useState(true)


  const handlePlayPause = () => {
    setIsPlay((prev) => !prev);
  };

  const onShare = async () => {
    const result = await Share.share({
      message: `✨ Check out this amazing content! 🌟\n👉 https://music.youtube.com/watch?v=${urls[uniqueId]}`,
    });
  };

  const params = (url: any, urls: any, uniqueId: any, isFavoritesAll: any, nameAll: string, artistAll: string) => {
    setUrls(urls);
    setUniqueId(uniqueId);
    setUrl(url)
    setIsFavoritesAll(isFavoritesAll);
    setNameAll(nameAll);
    setArtistAll(artistAll);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    if (playerRef.current && isPlay) {
      interval = setInterval(() => {
        if (playerRef.current) {
          playerRef.current
            .getCurrentTime()
            .then((currentTime: number) => setCurrentTime(currentTime))
            .catch((error: any) => console.error("Error fetching time:", error));
        }
      }, 1000);
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlay, playerRef]);


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


const onStateChange = (state:any) => {
  if(state === 'buffering' || state === 'unstarted'){
    setShowLoading(true);
  }else{
    setShowLoading(false);
  }
  if (state === "ended") {
    if (repeat === "one") {
      setUniqueId((prevId) => {
        const newId = prevId + 1;
        setTimeout(() => {
          setUniqueId(newId - 1); // Reset back to original uniqueId
        }, 1);
        return newId;
      });
    } else if (repeat === "all") {
      setUniqueId((prevId) => (prevId < urls.length - 1 ? prevId + 1 : 0));
      setUrl(urls[(uniqueId + 1) % urls.length]);
    } else {
      setUniqueId((prevId) => (prevId < urls.length - 1 ? prevId + 1 : prevId));
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
      setUniqueId((prevId) => {
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
      } else if (prev == "no"){
        return "all"
      }else{
        return prev
      }
    })

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
          <View className='w-[80%] h-[85%] bg-slate-200 rounded-3xl overflow-hidden relative'>
            {
              <YoutubePlayer
                ref={playerRef}
                height={0}
                // width={0}
                play={isPlay}
                videoId={urls[uniqueId]}
                useLocalHTML={true}
                onChangeState={onStateChange}
                />
            }
            {
              showLoading && (
                <Loading/>
              )
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
            <TouchableOpacity onPress={handleshuffle} className='w-5 h-5 relative flex justify-center items-center'>
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
                  <Pause w={35} h={45} />
                ) : (
                  <Play w={35} h={45} />
                )
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext}>
              <SkipNext />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRepeat} className='w-5 h-5 relative flex justify-center items-center'>
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

      <Playlist onSelect={params} showPlaylist={showPlaylist} setShowPlaylist={setShowPlaylist} url={url} isPlay={isPlay}/>
    </SafeAreaView>
  )
}

export default Home