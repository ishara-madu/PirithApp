import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Timer from '../../../assets/svg/Timer';
import DownArrow from '../../../assets/svg/DownArrow';
import Player from '../../../assets/svg/Player';
import ThemeIcon from '../../../assets/svg/ThemeIcon';
import { darkStyles, lightStyles, useGlobalContext } from '../Hooks/GlobalContext';
import { saveDataVariable } from '../../pages/Database';

type SleepProps = {

}

const Theme = ({  ...props }: SleepProps) => {
    const { theme,setTheme,setActiveButton ,showspeedOptions,showTimeOptions , setShowTimeOptions, setShowSpeedOptions,showTypeOptions, setShowTypeOptions,showThemeOptions, setShowThemeOptions,showBackgroundPlayOptions, setShowBackgroundPlayOptions } = useGlobalContext();

    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;

    const timeOptions = ["Light", "Dark",]

    const handleTheme = () => {
        setShowThemeOptions(true)
        setActiveButton(4);
        showspeedOptions && setShowSpeedOptions(false);
        showTimeOptions && setShowTimeOptions(false)
        showTypeOptions && setShowTypeOptions(false);
        showThemeOptions && setShowThemeOptions(false);
        showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
    }




    return (
        <View className='flex flex-row justify-between items-center w-full h-full'>
            <View className='flex flex-row items-center gap-x-1 h-full'>
                <ThemeIcon str={currentStyles.svg_1}/>
                <Text className={`${currentStyles.tx_1} text-xs font-semibold`}>Theme</Text>
            </View>
            <View className='flex flex-row items-center h-full gap-1 relative'>
                <TouchableOpacity className={`absolute right-1 flex h-auto items-center justify-center px-2 w-28 flex-row rounded-md ${currentStyles.bg_6}`}
                    onPress={() => { handleTheme(); }}
                >
                    <View className='flex justify-center items-center'>


                        {
                            showThemeOptions ?
                                (timeOptions.map((timeOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setTheme(timeOption); setShowThemeOptions(false);saveDataVariable("theme", timeOption); }} className='flex flex-row items-center justify-start py-1 w-full'>
                                            <Text className={`${currentStyles.tx_white} text-xs`}>{timeOption}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-between w-full py-1'>
                                        <Text className={`${currentStyles.tx_white} text-xs`}>{theme}</Text>
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

export default Theme