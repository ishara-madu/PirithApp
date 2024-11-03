import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Hmaburger from '../../assets/svg/Hamburger'
import Search from '../../assets/svg/Search'
import Return from '../../assets/svg/Return'
import List from '../../assets/svg/List'
import Flatlist from '../components/Flatlist'
import Menu from './Menu'
import { darkStyles, lightStyles, useGlobalContext } from '../components/Hooks/GlobalContext'
import { getData } from './Database'


type PlaylistProps = {
}



const Playlist = (props: PlaylistProps) => {
    const [listType, setListType] = useState("Recent");
    const [inputValue, setInputValue] = useState('');
    const [insidePlaylist, setInsidePlaylist] = useState(false)
    const [outsidePlaylist, setOutsidePlaylist] = useState<any>()
    const [insidePlaylistData, setInsidePlaylistData] = useState()
    const [recentData, setRecentData] = useState()
    const [favoriteData, setFavoriteData] = useState()
    const [playlistName,setPlaylistName] = useState<string | any>()


    const { setData, showMenu, setShowMenu, setShowPlaylist, showPlaylist, theme, isFavorites, setIsFavorites, data } = useGlobalContext();

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
        return data.reduce((acc: any, item: any) => {
            if (!acc.some(({ playlist }: any) => playlist === item.playlist)) {
                acc.push({ uniqueId: acc.length.toString(), playlist: item.playlist });
            }
            return acc;
        }, []);
    }, [data]);

    const handleInPlaylist = useCallback((playlistName: any) => {
        setInsidePlaylist(true);
        const tempInsidePlaylist = data.filter((song: any) => song.playlist === playlistName)
            .map((song: any, index: any) => ({ ...song, uniqueId: index.toString() }));
        tempInsidePlaylist.sort((a: any, b: any) => parseInt(b.uniqueId) - parseInt(a.uniqueId))
        setInsidePlaylistData(tempInsidePlaylist);
    }, [data]);








    const handleRecent = useMemo(() => {
        return data.map((value: any, index: any) => ({
            ...value,
            uniqueId: index
        }));
    }, [data])

    const handleFavorite = useMemo(() => {
        return data
            .filter((song: any) => song.isFavorites === 1 || song.isFavorites === true)
            .map((song: any, index: any) => ({ ...song, uniqueId: index })); // Prefix for unique IDs
    }, [data, isFavorites])

    useEffect(() => {
        if (listType === 'Recent') {
            setRecentData(filterAndSort(handleRecent));
        } else if (listType === 'Favorite') {
            setFavoriteData(filterAndSort(handleFavorite));
        } else if (listType === 'Playlist') {
            setOutsidePlaylist(filterAndSort(handleOutPlaylist));
        }
    }, [listType, showPlaylist, inputValue,data]);

    const handleInputChange = (text: any) => {
        setInputValue(text);
    };

    
    function truncateString(str: string, length: number) {
        if (str != null && str.length) {

            if (str.length > length) {
                return str.slice(0, length) + '...';
            }
            return str;
        }
    }



    return (
        <>
            <SafeAreaView className={`${showPlaylist ? "flex" : "hidden"} h-full w-full ${currentStyles.bg_1} items-center absolute`}>
                <View className='flex flex-row w-[90%] mt-5 justify-between items-center mb-5'>
                    <View className={`flex flex-row ${currentStyles.bg_2} rounded-full h-9 w-[85%] items-center`}>
                        <View className='flex px-2.5'>
                            <Search fill={currentStyles.svg_1} />
                        </View>
                        <TextInput onChangeText={handleInputChange} placeholder='Search' placeholderTextColor={currentStyles.svg_2} value={inputValue} className={`text-xs ${currentStyles.tx_1}`} />
                    </View>
                    <TouchableOpacity onPress={() => { setShowMenu(true) }} className='p-1.5' >
                        <Hmaburger fill={currentStyles.svg_1} />
                    </TouchableOpacity>
                </View>
                <View className='flex flex-row w-[90%] justify-between items-center mb-5' >
                    <TouchableOpacity onPress={() => { setListType("Favorite") }} className={`w-[30%] h-24 ${listType == "Favorite" ? `${currentStyles.bg_2}` : `${currentStyles.bg_7}`} rounded-lg flex justify-between py-2 items-center`}>
                        <Image resizeMode='contain' className='w-[60%]' source={require('../../assets/Favorite.png')} />
                        <Text className={`${currentStyles.tx_1} text-xs font-semibold`}>Favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setListType("Playlist") }} className={`w-[30%] h-24 ${listType == "Playlist" ? `${currentStyles.bg_2}` : `${currentStyles.bg_7}`} rounded-lg flex justify-between pb-2 items-center`}>
                        <Image resizeMode='contain' className='w-[60%]' source={require('../../assets/Playlist.png')} />
                        <Text className={`${currentStyles.tx_1} text-xs font-semibold`}>Playlists</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setListType("Recent") }} className={`w-[30%] h-24 ${listType == "Recent" ? `${currentStyles.bg_2}` : `${currentStyles.bg_7}`} rounded-lg flex justify-between pb-2 items-center`}>
                        <Image resizeMode='contain' className='w-[60%]' source={require('../../assets/Recent.png')} />
                        <Text className={`${currentStyles.tx_1} text-xs font-semibold`}>Recent</Text>
                    </TouchableOpacity>
                </View>
                <View className={`flex-1 w-full ${currentStyles.bg_2} rounded-t-3xl items-center pt-5`}>
                    <View className='flex w-[85%] mb-5 flex-row items-center justify-between h-10'>
                        <Text className={`${currentStyles.tx_1} text-xl font-bold`}>{!insidePlaylist ? listType : truncateString(playlistName,15)}</Text>
                        {
                            listType == "Playlist" && insidePlaylist ? (
                                <TouchableOpacity onPress={() => {
                                    setInsidePlaylist(false);
                                }} className=' p-1'>
                                    <Return fill={currentStyles.svg_1} />
                                </TouchableOpacity>) : (
                                <TouchableOpacity onPress={() => {
                                    setShowPlaylist(false);
                                }} className=' p-1'>
                                    <Return fill={currentStyles.svg_1} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <View className='flex-1 w-[90%]'>
                        {listType === 'Recent' && handleRecent != '' ?
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
                                                            setPlaylistName(item.playlist);
                                                        }} className={`w-full flex flex-row items-center px-3 h-14 ${currentStyles.bg_7} rounded-xl mt-1`}>
                                                            <View className='w-11 h-11 rounded-md mr-3 overflow-hidden'>
                                                                <View className='flex-1 justify-center items-center'>
                                                                    <List str={currentStyles.svg_1} />
                                                                </View>
                                                            </View>
                                                            <View>
                                                                <Text className={`${currentStyles.tx_1} text-sm font-semibold`}>{truncateString(item.playlist, 23)}</Text>
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