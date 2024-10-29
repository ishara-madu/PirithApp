import { View, Text, SafeAreaView, TextInput, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Hmaburger from '../../assets/svg/Hamburger'
import Search from '../../assets/svg/Search'
import { dropTable, getAllData, getFovoriteData, insertData } from './Database'
import { database } from '../../firebaseConfig'
import { get, onValue, ref } from 'firebase/database'
import { useFocusEffect } from '@react-navigation/native'
import Return from '../../assets/svg/Return'
import List from '../../assets/svg/List'
import Play from '../../assets/svg/Play'
import Pause from '../../assets/svg/Pause'


type PlaylistProps = {
    onSelect: (url: string, window: boolean, urls: any, uniqueId: any, isFavoritesAll: any, nameAll: string, artistAll: string) => void;
    showPlaylist: boolean;
    setShowPlaylist: any;
    url: any;
    isPlay: boolean;
}



const Playlist = ({ onSelect, ...props }: PlaylistProps) => {
    const [capturedValues, setCapturedValues] = useState<any>();
    const [listType, setListType] = useState("Recent");
    const [inputValue, setInputValue] = useState('');
    const [insidePlaylist, setInsidePlaylist] = useState(false)
    const [recentData, setRecentData] = useState<any>()
    const [uniquePlaylists, setUniquePlaylists] = useState<any>()
    const [favoriteData, setFavoriteData] = useState<any>()
    const [playlistSongs,setPlaylistSongs] = useState<any>()



    useEffect(() => {
        const values: any = getAllData();
        setCapturedValues(values);
        if (capturedValues != null) {
            const uniquePlaylists:any = [];
            let idCounter = 0;
        
            for (let i = 0; i < capturedValues.length; i++) {
                const playlist = capturedValues[i].playlist;
                // Check if the playlist already exists in uniquePlaylists array
                if (!uniquePlaylists.some(item => item.playlist === playlist)) {
                    uniquePlaylists.push({ uniqueId: `${idCounter++}`, playlist });
                }
            }
        
            setUniquePlaylists(uniquePlaylists); // Sets unique playlists with ID
        
            const favoriteSongs = capturedValues
                .filter(song => song.isFavorites === 1)
                .map((song, index) => ({ ...song, uniqueId: `${index}` })); // Prefix for unique IDs
            setFavoriteData(favoriteSongs); // Sets favorite songs
        
            const recentData = values.map((value, index) => ({
                ...value,
                uniqueId: `${index}` // Prefix for unique IDs in recent data
            }));
            setRecentData(recentData); // Sets recent data with unique IDs
        }
        
        


    }, [props.showPlaylist])


    useEffect(() => {

        switch (listType) {
            case 'Playlist':

                break;
            case 'Favorite':


                break;
            default:
                break;
        }


    }, [listType, inputValue, props.showPlaylist]);

    function truncateString(str: string) {
        if (str != null && str.length) {

            if (str.length > 27) {
                return str.slice(0, 27) + '...';
            }
            return str;
        }
    }

    const handleInputChange = (text: any) => {
        setInputValue(text);
    };


    const handlePressed = (url: any, uniqueId: any) => {
        const window = false;
        const urls = [];
const nameAll = [];
const artistAll = [];
const isFavoritesAll = [];

if (capturedValues != null) {
    for (let i = 0; i < capturedValues.length; i++) {
        const item = capturedValues[i];
        urls.push(item.url);
        nameAll.push(item.name);
        artistAll.push(item.artist);
        isFavoritesAll.push(item.isFavorites);
    }
}
        onSelect(url, window, urls, uniqueId, isFavoritesAll, nameAll, artistAll)
    }

    const handlePlaylist = (playlist: any) => {
        const playlistSongs = capturedValues
        .filter(song => song.playlist == playlist)
        .map((song, index) => ({ ...song, uniqueId: `${index}` })); // Prefix for unique IDs
setPlaylistSongs(playlistSongs); 
        setInsidePlaylist(true);
    }
    const handleReturn = () => {
        setInsidePlaylist(false);
    }

    return (
        <View className={`${props.showPlaylist ? "flex" : "hidden"} h-full w-full bg-black items-center absolute`}>
            <View className='flex flex-row w-[90%] mt-8 justify-between items-center mb-8'>
                <View className='flex flex-row bg-[#b7b7b7d2] rounded-full h-11 w-[85%] items-center'>
                    <View className='flex px-3'>
                        <Search />
                    </View>
                    <TextInput onChangeText={handleInputChange} placeholder='Search' value={inputValue} className='text-base text-white' />
                </View>
                <TouchableOpacity className='p-1' >
                    <Hmaburger fill='white' />
                </TouchableOpacity>
            </View>
            <View className='flex flex-row w-[90%] justify-between items-center mb-8' >
                <TouchableOpacity onPress={() => { setListType("Favorite") }} className={`w-[30%] h-28 ${listType == "Favorite" ? "bg-[#ffffff00]" : "bg-[#b7b7b74e]"} rounded-lg flex justify-center items-center`}>
                    <Image source={require('../../assets/Favorite.png')} />
                    <Text className='text-white text-base font-semibold'>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListType("Playlist") }} className={`w-[30%] h-28 ${listType == "Playlist" ? "bg-[#ffffff00]" : "bg-[#b7b7b74e]"} rounded-lg flex justify-center items-center`}>
                    <Image source={require('../../assets/Playlist.png')} />
                    <Text className='text-white text-base font-semibold'>Playlists</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListType("Recent") }} className={`w-[30%] h-28 ${listType == "Recent" ? "bg-[#ffffff00]" : "bg-[#b7b7b74e]"} rounded-lg flex justify-center items-center`}>
                    <Image source={require('../../assets/Recent.png')} />
                    <Text className='text-white text-base font-semibold'>Recent</Text>
                </TouchableOpacity>
            </View>
            <View className='flex-1 w-full bg-[#b7b7b74e] rounded-t-3xl items-center pt-5'>
                <View className='flex w-[85%] mb-5 flex-row items-center justify-between h-10'>
                    <Text className='text-white text-2xl font-bold'>{listType}</Text>
                    {
                        listType == "Playlist" && insidePlaylist ? (
                            <TouchableOpacity onPress={handleReturn} className=' p-1'>
                                <Return />
                            </TouchableOpacity>) : (
                            <TouchableOpacity onPress={() => {
                                props.setShowPlaylist(false);
                            }} className=' p-1'>
                                <Return />
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View className='flex-1 w-[90%]'>
                    {
                        listType == "Playlist" ? (
                            !insidePlaylist ?(
                            <FlatList
                                data={uniquePlaylists}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => { handlePlaylist(item.playlist) }} className='w-full flex flex-row items-center px-3 h-16 bg-[#00000065] rounded-xl mt-1'>
                                        <View className='w-11 h-11 rounded-md mr-7 overflow-hidden'>
                                            <View className='flex-1 justify-center items-center'>
                                                <List />
                                            </View>
                                        </View>
                                        <View>
                                            <Text className='text-white text-base font-semibold'>{truncateString(item.playlist)}{item.uniqueId}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />):(
                                <FlatList
                                    data={playlistSongs}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => { handlePressed(item.url, item.uniqueId) }} key={item.id} className='w-full flex flex-row items-center px-3 h-16 bg-[#00000065] rounded-xl mt-1'>
                                            <View className='w-11 h-11 rounded-md mr-7 overflow-hidden relative'>
                                                <Image className='rounded-md flex-1 w-full h-full' source={{ uri: `https://img.youtube.com/vi/${item.url}/default.jpg` }} />
                                                <View className='absolute flex w-full h-full justify-center items-center'>
                                                    {
                                                        <>
                                                            {props.url === item.url ? (
                                                                props.isPlay ? (
                                                                    <Pause w={20} h={20} />
                                                                ) : (
                                                                    <Play w={20} h={20} />
                                                                )
                                                            ) : null}
                                                        </>
                                                    }
                                                </View>
                                            </View>
                                            <View>
                                                <Text className='text-white text-base font-semibold'>{truncateString(item.name)}{item.isFavorites}</Text>
                                                <Text className='text-white text-xs text-opacity-50'>{item.artist}{item.uniqueId}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.id}
                                />
                            )
                        ) : (
                            listType == "Favorite" ? (
                                <FlatList
                                    data={favoriteData}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => { handlePressed(item.url, item.uniqueId) }} key={item.id} className='w-full flex flex-row items-center px-3 h-16 bg-[#00000065] rounded-xl mt-1'>
                                            <View className='w-11 h-11 rounded-md mr-7 overflow-hidden relative'>
                                                <Image className='rounded-md flex-1 w-full h-full' source={{ uri: `https://img.youtube.com/vi/${item.url}/default.jpg` }} />
                                                <View className='absolute flex w-full h-full justify-center items-center'>
                                                    {
                                                        <>
                                                            {props.url === item.url ? (
                                                                props.isPlay ? (
                                                                    <Pause w={20} h={20} />
                                                                ) : (
                                                                    <Play w={20} h={20} />
                                                                )
                                                            ) : null}
                                                        </>
                                                    }
                                                </View>
                                            </View>
                                            <View>
                                                <Text className='text-white text-base font-semibold'>{truncateString(item.name)}{item.isFavorites}</Text>
                                                <Text className='text-white text-xs text-opacity-50'>{item.artist}{item.uniqueId}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.id}
                                />
                            ) : (
                                <FlatList
                                    data={recentData}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => { handlePressed(item.url, item.uniqueId) }} key={item.id} className='w-full flex flex-row items-center px-3 h-16 bg-[#00000065] rounded-xl mt-1'>
                                            <View className='w-11 h-11 rounded-md mr-7 overflow-hidden relative'>
                                                <Image className='rounded-md flex-1 w-full h-full' source={{ uri: `https://img.youtube.com/vi/${item.url}/default.jpg` }} />
                                                <View className='absolute flex w-full h-full justify-center items-center'>
                                                    {
                                                        <>
                                                            {props.url === item.url ? (
                                                                props.isPlay ? (
                                                                    <Pause w={20} h={20} />
                                                                ) : (
                                                                    <Play w={20} h={20} />
                                                                )
                                                            ) : null}
                                                        </>
                                                    }
                                                </View>
                                            </View>
                                            <View>
                                                <Text className='text-white text-base font-semibold'>{truncateString(item.name)}{item.isFavorites}</Text>
                                                <Text className='text-white text-xs text-opacity-50'>{item.artist}{item.uniqueId}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.id}
                                />
                            ))
                    }
                </View>





            </View>
        </View>
    )
}

export default Playlist