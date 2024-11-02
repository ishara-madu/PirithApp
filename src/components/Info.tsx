import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Image, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import About from '../../assets/svg/About'
import Sleep from './Settings/Sleep'
import PlaybackSpeed from './Settings/PlaybackSpeed'
import { darkStyles, lightStyles, useGlobalContext } from './Hooks/GlobalContext'
import { getYoutubeMeta } from 'react-native-youtube-iframe'


const Info = () => {
    const [activeButton, setActiveButton] = useState(0);
    const [author, setAuthor] = useState('');
    const [authorUrl, setAuthorUrl] = useState('');
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const { urls, uniqueId, theme,showTimeOptions, setShowTimeOptions,showspeedOptions, setShowSpeedOptions } = useGlobalContext();
    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;

    const meta = () => {
        getYoutubeMeta(urls[uniqueId]).then(meta => {

            setAuthor(meta.author_name);
            setAuthorUrl(meta.author_url);
            setTitle(meta.title);
            setThumbnail(meta.thumbnail_url);
        });
    }
    const handleSleepButton = () => {
        setActiveButton(1);
        showspeedOptions && setShowSpeedOptions(false);
        showTimeOptions && setShowTimeOptions(false)
    }
    const handlePlaybackButton = () => {
        setActiveButton(2);
        showspeedOptions && setShowSpeedOptions(false);
        showTimeOptions && setShowTimeOptions(false)

    }
    const handleAboutButton = () => {
        setActiveButton(3);
        showspeedOptions && setShowSpeedOptions(false);
        showTimeOptions && setShowTimeOptions(false)

        meta();
    }
    return (
        <View className={`w-full h-[91%] ${currentStyles.bg_2} inset-0 backdrop-blur-md absolute rounded-t-3xl flex justify-center items-center flex-row`}>
            <View className='w-[90%] h-[80%] flex items-center gap-y-2'>
                <TouchableOpacity onPress={handleSleepButton} className={`w-[100%] ${activeButton == 1 ? `${currentStyles.bg_7} z-10` : ""} h-14 px-3 rounded-xl flex flex-row justify-between items-center`}>
                    <Sleep  />
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePlaybackButton} className={`w-[100%] ${activeButton == 2 ? `${currentStyles.bg_7} z-10` : ""} h-14 px-3 rounded-xl flex flex-row justify-between items-center`}>
                    <PlaybackSpeed />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAboutButton} className={`w-[100%] ${activeButton == 3 ? `${currentStyles.bg_7} z-10` : ""} h-14 px-2.5 rounded-xl flex flex-row justify-between items-center`}>
                    <View className='flex flex-row items-center gap-x-1.5 h-full'>
                        <About wh={35} fill={currentStyles.svg_1}/>
                        <Text className={`${currentStyles.tx_1} text-xs font-semibold`}>About Track</Text>
                    </View>
                </TouchableOpacity>
                {
                    activeButton == 3 &&
                    <View className={`${currentStyles.bg_1} w-full h-full flex-1 rounded-3xl shadow-2xl p-5`}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                            <Text className={`${currentStyles.tx_1} text-base font-bold mb-5 text-center w-full`}>
                                {title}
                            </Text>

                            {thumbnail !== '' && (
                                <Image
                                    source={{ uri: thumbnail }}
                                    style={{
                                        width: '100%',
                                        height: 170,
                                        borderRadius: 15,
                                        marginBottom: 15,
                                        borderWidth: 2,
                                        borderColor: '#444',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 5,
                                    }}
                                    resizeMode="cover"
                                />
                            )}

                            <Text className={`${currentStyles.tx_1} text-xs mb-2 font-normal`}>
                                🌟 Author: <Text className={`font-semibold ${currentStyles.tx_6}`}>{author}</Text>
                            </Text>

                            <Text
                                className={`${currentStyles.tx_7} underline mb-4 text-xs`}
                                onPress={() => Linking.openURL(authorUrl)}
                            >
                                🔗 Check out their Channel!
                            </Text>

                            <Text className={`${currentStyles.tx_2} mb-4 text-xs`}>
                                Click the link above to dive deeper into the amazing content created by <Text className={`font-semibold ${currentStyles.tx_6}`}>{author}</Text>! 🎉
                            </Text>

                            <Text className={`${currentStyles.tx_8} text-xs italic mt-2`}>
                                Together, we can create more incredible experiences! 🚀
                            </Text>
                        </ScrollView>
                    </View>
                }
            </View>

        </View>
    )
}

export default Info