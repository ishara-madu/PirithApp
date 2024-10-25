import { View, Text, SafeAreaView, TextInput, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Hmaburger from '../../assets/svg/Hamburger'
import Search from '../../assets/svg/Search'
import { dropTable, getAllData, getFovoriteData, getPlaylistData, insertData } from './Database'
import { database } from '../../firebaseConfig'
import { get, onValue, ref } from 'firebase/database'
import { useFocusEffect } from '@react-navigation/native'
import Return from '../../assets/svg/Return'


type PlaylistProps = {
    onSelect: (url: string, name: string, artist: string, favorite: boolean,window:boolean) => void;
}



const Playlist: React.FC<PlaylistProps> = ({onSelect}) => {
    const [capturedValues, setCapturedValues] = useState<any>();
    const [listType, setListType] = useState("Recent");
    const [currentPlaylist, setCurrentPlaylist] = useState();
    const [inputValue, setInputValue] = useState('');
    const [insidePlaylist, setInsidePlaylist] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            if (listType === "Playlist") {
                if(insidePlaylist){
                    const val = getPlaylistData(currentPlaylist);
                    setCapturedValues(val);
                }else{
                    const val = getAllData(inputValue, true);
                setCapturedValues(val);
                }
                
            } else if (listType === "Favorite") {
                const val = getFovoriteData(inputValue);
                setCapturedValues(val)
            } else {
                const val = getAllData(inputValue, false);
                setCapturedValues(val);
            }
            return () => {
            };
        }, [listType, inputValue])
    );

    // insertData();

    function truncateString(str: string) {
        if (str.length > 8) {
            return str.slice(0, 27) + '...';  // Take the first 8 characters and add '...'
        }
        return str;  // If the string is 8 characters or less, return it as is
    }

    const handleInputChange = (text: any) => {
        setInputValue(text);
    };


    const handlePressed = (url: any, name: any, artist: any, favorite: boolean) => {
        const window = false;
        onSelect(url, name, artist, favorite,window )
    }

    const handlePlaylist = (playlist: any) => {
        const val = getPlaylistData(playlist);
        setCurrentPlaylist(playlist);
        setCapturedValues(val);
        setInsidePlaylist(true);
    }
    const handleReturn = () => {
        const val = getAllData(inputValue, true);
        setCapturedValues(val);
        setInsidePlaylist(false);
    }

    return (
        <View className='flex h-full w-full bg-black items-center absolute'>
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
                    <Image source={require('../../assets/Love.png')} />
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
                    <Text className='text-white text-2xl font-bold'>Favorites</Text>
                    {
                        listType == "Playlist" && insidePlaylist &&
                        <TouchableOpacity onPress={handleReturn} className=' p-1'>
                        <Return />
                    </TouchableOpacity>}
                </View>
                <View className='flex-1 w-[90%]'>
                    {
                        listType == "Playlist" && !insidePlaylist ? (
                            <FlatList
                                data={capturedValues}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => { handlePlaylist(item.playlist) }} key={item.id} className='w-full flex flex-row items-center px-3 h-16 bg-[#00000065] rounded-xl mt-1'>
                                        <View className='w-11 h-11 rounded-md mr-7 overflow-hidden'>
                                            <Image className='rounded-md flex-1 w-full h-full' source={{ uri: `https://img.youtube.com/vi/${item.playlist}/default.jpg` }} />
                                        </View>
                                        <View>
                                            <Text className='text-white text-base font-semibold'>{truncateString(item.playlist)}</Text>
                                            <Text className='text-white text-xs text-opacity-50'>{item.playlist}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        ) : (
                            <FlatList
                                data={capturedValues}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => { handlePressed(item.url, truncateString(item.name), item.artist, item.isFavorites) }} key={item.id} className='w-full flex flex-row items-center px-3 h-16 bg-[#00000065] rounded-xl mt-1'>
                                        <View className='w-11 h-11 rounded-md mr-7 overflow-hidden'>
                                            <Image className='rounded-md flex-1 w-full h-full' source={{ uri: `https://img.youtube.com/vi/${item.url}/default.jpg` }} />
                                        </View>
                                        <View>
                                            <Text className='text-white text-base font-semibold'>{truncateString(item.name)}</Text>
                                            <Text className='text-white text-xs text-opacity-50'>{item.artist}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        )
                    }
                </View>





            </View>
        </View>
    )
}

export default Playlist