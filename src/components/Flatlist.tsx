import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Pause from '../../assets/svg/Pause'
import Play from '../../assets/svg/Play'
import { darkStyles, lightStyles, useGlobalContext } from './Hooks/GlobalContext';
import { saveDataVariable } from '../pages/Database';

interface Items {
    url: string;
    isFavorites: any;
    name: any;
    artist: any

}

type FlatlistProps = {
    listtype: any;
}

const Flatlist = (props: FlatlistProps) => {

    const { setShowPlaylist, theme, isPlay, setUrl, setUniqueId, setUrls, setIsFavoritesAll, setNameAll, setArtistAll, urls, uniqueId } = useGlobalContext();
    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;



    const handleTransactions = () => {

        setUrls(props.listtype.map((item: Items) => item.url).filter((url: Items) => url).reverse());
        saveDataVariable("urls", props.listtype.map((item: Items) => item.url).filter((url: Items) => url).reverse());

        setIsFavoritesAll(props.listtype.map((item: Items) => item.isFavorites ? 1 : 0).reverse());
        saveDataVariable("isFavoritesAll",props.listtype.map((item: Items) => item.isFavorites ? 1 : 0).reverse());

        setNameAll(props.listtype.map((item: Items) => item.name).filter((name: Items) => name).reverse());
        saveDataVariable("nameAll",props.listtype.map((item: Items) => item.name).filter((name: Items) => name).reverse());

        setArtistAll(props.listtype.map((item: Items) => item.artist).filter((artist: Items) => artist).reverse());
        saveDataVariable("artistAll",props.listtype.map((item: Items) => item.artist).filter((artist: Items) => artist).reverse());
    }

    function truncateString(str: string, length: number): string {
        if (str && Array.from(str).length) {
            const actualLength = Array.from(str).length;
            
            if (actualLength > length) {
                return Array.from(str).slice(0, length).join('') + '...';
            }
            
            return str;
        }
        return '';
    }
    

    return (
        <FlatList
            data={props.listtype}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                    handleTransactions();
                    setUniqueId(item.uniqueId);
                    saveDataVariable("uniqueId", item.uniqueId);
                    setUrl(item.url)
                    saveDataVariable("url", item.url);
                    setShowPlaylist(false)
                }} className={`w-full flex flex-row items-center px-3 h-14 ${currentStyles.bg_7} rounded-xl mt-1`}>
                    <View className='w-11 h-9 rounded-md mr-3 overflow-hidden relative'>
                        <Image className='rounded-md flex-1 w-full h-full' source={{ uri: `https://img.youtube.com/vi/${item.url}/default.jpg` }} />
                        <View className='absolute flex w-full h-full justify-center items-center'>
                            {
                                urls[uniqueId] == item.url &&
                                <View className={`absolute flex w-full h-full justify-center items-center ${currentStyles.bg_6}`}>
                                    {
                                        isPlay ?
                                            (
                                                <>
                                                    <Pause fill={currentStyles.svg_white} w={18} h={18} />
                                                </>
                                            ) : (
                                                <>
                                                    <Play fill={currentStyles.svg_white} w={18} h={18} />
                                                </>
                                            )
                                    }
                                </View>
                            }
                        </View>
                    </View>
                    <View>
                        <Text className={`${currentStyles.tx_1} text-sm font-semibold`}>{truncateString(item.name,23)}</Text>
                        <Text className={`${currentStyles.tx_2} text-[10px]`}>{truncateString(item.artist,26)}</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.uniqueId}
        />
    )
}

export default Flatlist