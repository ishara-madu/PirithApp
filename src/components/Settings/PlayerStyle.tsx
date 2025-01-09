import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Timer from '../../../assets/svg/Timer';
import DownArrow from '../../../assets/svg/DownArrow';
import Player from '../../../assets/svg/Player';
import { darkStyles, lightStyles, useGlobalContext } from '../Hooks/GlobalContext';
import { saveDataVariable } from '../../pages/Database';

type SleepProps = {

}

const PlayerStyle = ({  ...props }: SleepProps) => {
    const { theme,playerStyle,setPlayerStyle,setActiveButton,showTimeOptions , setShowTimeOptions,showspeedOptions, setShowSpeedOptions,showTypeOptions, setShowTypeOptions,showThemeOptions, setShowThemeOptions,showBackgroundPlayOptions, setShowBackgroundPlayOptions } = useGlobalContext();

    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;

    const timeOptions = ["Simple","Classic","Advanced"]

    const handleStyle = () => {
        setShowTypeOptions(true)
        setActiveButton(3);
        showspeedOptions && setShowSpeedOptions(false);
        showTimeOptions && setShowTimeOptions(false)
        showTypeOptions && setShowTypeOptions(false);
        showThemeOptions && setShowThemeOptions(false);
        showBackgroundPlayOptions && setShowBackgroundPlayOptions(false);
    }




    return (
        <View className='flex flex-row justify-between items-center w-full h-full'>
            <View className='flex flex-row items-center gap-x-2 h-full'>
                <Player str={currentStyles.svg_1}/>
                <Text className={`${currentStyles.tx_1} text-xs font-semibold`}>Player Style</Text>
            </View>
            <View className='flex flex-row items-center h-full gap-1 relative'>
                <TouchableOpacity className={`absolute right-1 flex h-auto items-center justify-center px-2 w-28 flex-row rounded-md ${currentStyles.bg_6}`}
                    onPress={() => { handleStyle();  }}
                >
                    <View className='flex justify-center items-center'>


                        {
                            showTypeOptions ?
                                (timeOptions.map((timeOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setPlayerStyle(timeOption); setShowTypeOptions(false);saveDataVariable("playerStyle", timeOption); }} className='flex flex-row items-center justify-start py-1 w-full'>
                                            <Text className={`${currentStyles.tx_white} text-xs`}>{timeOption}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-between w-full py-1'>
                                        <Text className={`${currentStyles.tx_white} text-xs`}>{playerStyle}</Text>
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

export default PlayerStyle