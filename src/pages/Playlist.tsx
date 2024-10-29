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
import Flatlist from '../components/Flatlist'


type PlaylistProps = {
    onSelect: (url: string, window: boolean, urls: any, uniqueId: any, isFavoritesAll: boolean, nameAll: string, artistAll: string) => void;
    showPlaylist: boolean;
    setShowPlaylist: any;
    url: any;
    isPlay: boolean;
}



const Playlist = ({ onSelect, ...props }: PlaylistProps) => {
    const [listType, setListType] = useState("Recent");
    const [inputValue, setInputValue] = useState('');
    const [insidePlaylist, setInsidePlaylist] = useState(false)
    const [data, setData] = useState<any>([]);
    const [outsidePlaylist, setOutsidePlaylist] = useState<any>()
    const [insidePlaylistData, setInsidePlaylistData] = useState()
    const [recentData, setRecentData] = useState()
    const [favoriteData, setFavoriteData] = useState()



    
    
    const handleOutPlaylist = () => {
        setInsidePlaylist(false);
        let idCounter = 0;
        const tempOutsidePlaylist: any[] = [];
        for (let i = 0; i < data.length; i++) {
            const playlist = data[i].playlist;
            if (!tempOutsidePlaylist.some(item => item.playlist === playlist)) {
                tempOutsidePlaylist.push({ uniqueId: `${idCounter++}`, playlist });
            }
        }
        tempOutsidePlaylist.sort((a, b) => parseInt(b.uniqueId) - parseInt(a.uniqueId));
        setOutsidePlaylist(tempOutsidePlaylist);
    }
    const handleInPlaylist = (playllistName: any) => {
        setInsidePlaylist(true);
        const tempInsidePlaylist:any = data
        .filter(song => song.playlist === playllistName)
        .map((song:any, index:any) => ({ ...song, uniqueId: index }));
        setInsidePlaylistData(tempInsidePlaylist);
        console.log(tempInsidePlaylist);
        
    };


    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllData();
            setData(result);
        };

        fetchData();
    }, [props.showPlaylist,handleOutPlaylist,handleInPlaylist]);




    const handleRecent = () => {
        const recentData = data.map((value: any, index: any) => ({
            ...value,
            uniqueId: index
        }));
        recentData.sort((a: any, b: any) => parseInt(b.uniqueId) - parseInt(a.uniqueId));
        setRecentData(recentData);
    }
    

    const handleFavorite = () => {
        const favoriteSongs = data
            .filter(song => song.isFavorites === 1)
            .map((song, index) => ({ ...song, uniqueId: index })); // Prefix for unique IDs
        setFavoriteData(favoriteSongs);
    }

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
                            <TouchableOpacity onPress={()=>{
                                setInsidePlaylist(false);
                            }} className=' p-1'>
                                <Return />
                            </TouchableOpacity>) : (
                            <TouchableOpacity onPress={() => {
                                handleOutPlaylist()
                            }} className=' p-1'>
                                <Return />
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View className='flex-1 w-[90%]'>
                    {listType === 'Recent' ?
                        (
                            <Flatlist listtype={recentData} />
                        ) : (
                            listType === 'Favorite' ?
                                (
                                    <Flatlist listtype={favoriteData} />
                                ) : (
                                    listType === 'Playlist' && !insidePlaylist ?
                                        (
                                            <FlatList
                                                data={outsidePlaylist}
                                                showsVerticalScrollIndicator={false}
                                                keyExtractor={(item) => item.uniqueId}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity onPress={()=>{
                                                        handleInPlaylist(item.playlist)
                                                    }} className='w-full flex flex-row items-center px-3 h-16 bg-[#00000065] rounded-xl mt-1'>
                                                        <View className='w-11 h-11 rounded-md mr-7 overflow-hidden'>
                                                            <View className='flex-1 justify-center items-center'>
                                                                <List />
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <Text className='text-white text-base font-semibold'>{item.playlist},{item.uniqueId}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        ) : (
                                            listType === 'Playlist' && insidePlaylist &&
                                            (
                                                <Flatlist listtype={insidePlaylistData} />
                                            )
                                        )
                                )
                        )
                    }
                </View>





            </View>
        </View>
    )
}

export default Playlist