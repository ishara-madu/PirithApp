import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DownArrow from '../../../assets/svg/DownArrow';
import Play from '../../../assets/svg/Playback';
import { darkStyles, lightStyles, useGlobalContext } from '../Hooks/GlobalContext';

type PlaybackProps = {
}

const PlaybackSpeed = ({ ...props }: PlaybackProps) => {
    const { playbackRate, setPlaybackRate, theme, showspeedOptions, showTimeOptions, setShowTimeOptions, setShowSpeedOptions, setActiveButton, showTypeOptions, setShowTypeOptions, showThemeOptions, setShowThemeOptions, showBackgroundPlayOptions, setShowBackgroundPlayOptions } = useGlobalContext();
    const [playbackSpeed, setPlaybackSpeed] = useState<any>(playbackRate);


    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;

    const handlePlaybackSpeed = () => {
        setShowSpeedOptions(true)
        setActiveButton(2)
        showspeedOptions && setShowSpeedOptions(false);
        showTimeOptions && setShowTimeOptions(false)
        showTypeOptions && setShowTypeOptions(false);
        showThemeOptions && setShowThemeOptions(false);
        showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
    }



    const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

    const speedSet = (speedOption: number) => {
        let val;
        speedOption == 0.5 ? (
            val = "0.5x"
        ) : (
            speedOption == 0.75 ? (
                val = "0.75x"
            ) : (
                speedOption == 1 ? (
                    val = "Default"
                ) : (
                    speedOption == 1.25 ? (
                        val = "1.25x"
                    ) : (
                        speedOption == 1.5 ? (
                            val = "1.5x"
                        ) : (
                            speedOption == 2 && (
                                val = "2x"
                            )
                        )
                    )
                )
            )
        )
        return val;
    }

    return (
        <View className='flex flex-row justify-between items-center w-full h-full'>
            <View className='flex flex-row items-center gap-x-2 h-full'>
                <Play str={currentStyles.svg_1} />
                <Text className={`${currentStyles.tx_1} text-xs font-semibold`}>Playback Speed</Text>
            </View>
            <View className='flex flex-row items-center h-full gap-1 relative'>
                <TouchableOpacity className={`absolute right-1 flex h-auto items-center justify-start w-28 flex-row rounded-md ${currentStyles.bg_6}`}
                    onPress={() => { handlePlaybackSpeed(); }}
                >
                    <View className='flex items-center w-full'>
                        {
                            showspeedOptions ?
                                (speedOptions.map((speedOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setPlaybackSpeed(speedOption); setPlaybackRate(speedOption); setShowSpeedOptions(false) }} className='flex-1 items-center w-full py-1'>
                                            <Text className={`${currentStyles.tx_white} text-xs`}>{speedSet(speedOption)}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-around w-full py-1'>
                                        <Text className={`${currentStyles.tx_white} text-xs`}>{speedSet(playbackSpeed)} </Text>
                                        <DownArrow fill={currentStyles.svg_white} width={14} height={14} />
                                    </View>
                                )
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PlaybackSpeed