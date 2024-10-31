import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Hmaburger from '../../assets/svg/Hamburger'
import Search from '../../assets/svg/Search'
// import { dropTable, getAllData, insertData } from './Database'
import { database } from '../../firebaseConfig'
import { get, onValue, ref } from 'firebase/database'
import { useFocusEffect } from '@react-navigation/native'
import Return from '../../assets/svg/Return'
import List from '../../assets/svg/List'
import Play from '../../assets/svg/Play'
import Pause from '../../assets/svg/Pause'
import Flatlist from '../components/Flatlist'
import { getAllData, getData, saveData } from './Database'
import Menu from './Menu'
import { darkStyles, lightStyles, useGlobalContext } from '../components/Hooks/GlobalContext'
import { SafeAreaView } from 'react-native-safe-area-context'


type PlaylistProps = {
    isFavorites: any
}



const Playlist = (props: PlaylistProps) => {
    const [listType, setListType] = useState("Recent");
    const [inputValue, setInputValue] = useState('');
    const [insidePlaylist, setInsidePlaylist] = useState(false)
    const [data, setData] = useState<any>([]);
    const [outsidePlaylist, setOutsidePlaylist] = useState<any>()
    const [insidePlaylistData, setInsidePlaylistData] = useState()
    const [recentData, setRecentData] = useState()
    const [favoriteData, setFavoriteData] = useState()


    const {showMenu,setShowMenu,setShowPlaylist,showPlaylist,theme} = useGlobalContext();

    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;





    const fuzzyMatch = (text: any, search: any) => {
        let searchIndex = 0;
        for (let char of text.toLowerCase()) {
            if (char === search[searchIndex]) {
                searchIndex++;
            }
            if (searchIndex === search.length) {
                return true;
            }
        }
        return false;
    };
    const filterAndSort = (data: any) => {
        const search = inputValue.toLowerCase();
        return data
            .filter((item: any) =>
                ['name', 'artist', 'playlist'].some(key =>
                    item[key] && fuzzyMatch(item[key].toLowerCase(), search)
                )
            )
            .sort((a: any, b: any) => parseInt(b.uniqueId) - parseInt(a.uniqueId));
    };




    const handleOutPlaylist = useMemo(() => {
        return data.reduce((acc:any, item:any) => {
            if (!acc.some(({ playlist }:any) => playlist === item.playlist)) {
                acc.push({ uniqueId: acc.length.toString(), playlist: item.playlist });
            }
            return acc;
        }, []);
    }, [data]);

    const handleInPlaylist = useCallback((playlistName: any) => {
        setInsidePlaylist(true);
        const tempInsidePlaylist = data.filter((song:any) => song.playlist === playlistName)
            .map((song:any, index:any) => ({ ...song, uniqueId: index.toString() }));
        tempInsidePlaylist.sort((a: any, b: any) => parseInt(b.uniqueId) - parseInt(a.uniqueId))
        setInsidePlaylistData(tempInsidePlaylist);
    }, [data]);


    useMemo(() => {
        const fetchData = async () => {
            try {
                const users = await getData();
                setData(users);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();


    }, [props.isFavorites,showPlaylist]);
    
    //   saveData("id1","gRYV3Dgib7g","Song 1","Artist 1","Playlist 1",true)
    //   saveData("id2","dqkxmiI0kYo","Song 2","Artist 2","Playlist 1",false)
    //   saveData("id3","y8YBkbgw18E","Song 3","Artist 3","Playlist 2",true)



    const handleRecent = useMemo(() => {
        return data.map((value: any, index: any) => ({
            ...value,
            uniqueId: index
        }));
    }, [data])

    const handleFavorite = useMemo(() => {
        return data
            .filter((song:any) => song.isFavorites === 1 || song.isFavorites === true)
            .map((song:any, index:any) => ({ ...song, uniqueId: index })); // Prefix for unique IDs
    }, [data,props.isFavorites])

    useEffect(() => {
        if (listType === 'Recent') {
            setRecentData(filterAndSort(handleRecent));
        } else if (listType === 'Favorite') {
            setFavoriteData(filterAndSort(handleFavorite));
        } else if (listType === 'Playlist') {
            setOutsidePlaylist(filterAndSort(handleOutPlaylist));
        }
    }, [listType, showPlaylist, inputValue]);

    const handleInputChange = (text: any) => {
        setInputValue(text);
    };

    function truncateString(str: string) {
        if (str != null && str.length) {

            if (str.length > 27) {
                return str.slice(0, 27) + '...';
            }
            return str;
        }
    }




    return (
    <>
        <SafeAreaView className={`${showPlaylist ? "flex" : "hidden"} h-full w-full ${currentStyles.bg_1} items-center absolute`}>
            <View className='flex flex-row w-[90%] mt-8 justify-between items-center mb-8'>
                <View className={`flex flex-row ${currentStyles.bg_2} rounded-full h-11 w-[85%] items-center`}>
                    <View className='flex px-3'>
                        <Search fill={currentStyles.svg_1} />
                    </View>
                    <TextInput onChangeText={handleInputChange} placeholder='Search' placeholderTextColor={currentStyles.svg_2} value={inputValue} className={`text-base ${currentStyles.tx_1}`} />
                </View>
                <TouchableOpacity onPress={()=>{setShowMenu(true)}} className='p-1' >
                    <Hmaburger fill={currentStyles.svg_1} />
                </TouchableOpacity>
            </View>
            <View className='flex flex-row w-[90%] justify-between items-center mb-8' >
                <TouchableOpacity onPress={() => { setListType("Favorite") }} className={`w-[30%] h-28 ${listType == "Favorite" ? `${currentStyles.bg_2}` : `${currentStyles.bg_7}`} rounded-lg flex justify-center items-center`}>
                    <Image source={require('../../assets/Favorite.png')} />
                    <Text className={`${currentStyles.tx_1} text-base font-semibold`}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListType("Playlist") }} className={`w-[30%] h-28 ${listType == "Playlist" ? `${currentStyles.bg_2}` : `${currentStyles.bg_7}`} rounded-lg flex justify-center items-center`}>
                    <Image source={require('../../assets/Playlist.png')} />
                    <Text className={`${currentStyles.tx_1} text-base font-semibold`}>Playlists</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListType("Recent") }} className={`w-[30%] h-28 ${listType == "Recent" ? `${currentStyles.bg_2}` : `${currentStyles.bg_7}`} rounded-lg flex justify-center items-center`}>
                    <Image source={require('../../assets/Recent.png')} />
                    <Text className={`${currentStyles.tx_1} text-base font-semibold`}>Recent</Text>
                </TouchableOpacity>
            </View>
            <View className={`flex-1 w-full ${currentStyles.bg_2} rounded-t-3xl items-center pt-5`}>
                <View className='flex w-[85%] mb-5 flex-row items-center justify-between h-10'>
                    <Text className={`${currentStyles.tx_1} text-2xl font-bold`}>{listType}</Text>
                    {
                        listType == "Playlist" && insidePlaylist ? (
                            <TouchableOpacity onPress={() => {
                                setInsidePlaylist(false);
                            }} className=' p-1'>
                                <Return fill={currentStyles.svg_1}/>
                            </TouchableOpacity>) : (
                            <TouchableOpacity onPress={() => {
                                setShowPlaylist(false);
                            }} className=' p-1'>
                                <Return fill={currentStyles.svg_1}/>
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
                                                    <TouchableOpacity onPress={() => {
                                                        handleInPlaylist(item.playlist)
                                                    }} className={`w-full flex flex-row items-center px-3 h-16 ${currentStyles.bg_7} rounded-xl mt-1`}>
                                                        <View className='w-11 h-11 rounded-md mr-7 overflow-hidden'>
                                                            <View className='flex-1 justify-center items-center'>
                                                                <List str={currentStyles.svg_1} />
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <Text className={`${currentStyles.tx_1} text-base font-semibold`}>{item.playlist}</Text>
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
        </SafeAreaView>
            {
                showMenu && <Menu />
            }
            </>
    )
}

export default Playlist