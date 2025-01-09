import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Timer from '../../../assets/svg/Timer';
import DownArrow from '../../../assets/svg/DownArrow';
import Player from '../../../assets/svg/Player';
import ThemeIcon from '../../../assets/svg/ThemeIcon';
import BackgroundPlayIcon from '../../../assets/svg/BackgroundPlayIcon';
import { darkStyles, lightStyles, useGlobalContext } from '../Hooks/GlobalContext';

type SleepProps = {

}

const BackgroundPlay = ({  ...props }: SleepProps) => {
    const { theme,setActiveButton,selectedBackgroundPlay,showTimeOptions , setShowTimeOptions, setSelectedBackgroundPlay,showspeedOptions, setShowSpeedOptions,showTypeOptions, setShowTypeOptions,showThemeOptions, setShowThemeOptions,showBackgroundPlayOptions, setShowBackgroundPlayOptions } = useGlobalContext();
    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;

    const bacgroundOptions = ["Off", "On",]

    const handleBackground = () => {
        setShowBackgroundPlayOptions(true)
        setActiveButton(5);
        showspeedOptions && setShowSpeedOptions(false);
        showTimeOptions && setShowTimeOptions(false)
        showTypeOptions && setShowTypeOptions(false);
        showThemeOptions && setShowThemeOptions(false);
        showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
    }


    return (
        <View className='flex flex-row justify-between items-center w-full h-full'>
            <View className='flex flex-row items-center gap-x-2 h-full'>
                <BackgroundPlayIcon fill={currentStyles.svg_1}/>
                <Text className={`${currentStyles.tx_1} text-xs font-semibold`}>Background Play</Text>
            </View>
            <View className='flex flex-row items-center h-full gap-1 relative'>
                <TouchableOpacity className={`absolute right-1 flex h-auto items-center justify-center px-2 w-28 flex-row rounded-md ${currentStyles.bg_6}`}
                    onPress={() => { handleBackground(); }}
                >
                    <View className='flex justify-center items-center'>


                        {
                            showBackgroundPlayOptions ?
                                (bacgroundOptions.map((timeOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setSelectedBackgroundPlay(timeOption); setShowBackgroundPlayOptions(false) }} className='flex flex-row items-center justify-start py-1 w-full'>
                                            <Text className={`${currentStyles.tx_white} text-xs`}>{timeOption}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-between w-full py-1'>
                                        <Text className={`${currentStyles.tx_white} text-xs`}>{selectedBackgroundPlay}</Text>
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

export default BackgroundPlay