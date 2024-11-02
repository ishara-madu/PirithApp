import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Timer from '../../../assets/svg/Timer';
import DownArrow from '../../../assets/svg/DownArrow';
import { darkStyles, lightStyles, useGlobalContext } from '../Hooks/GlobalContext';

type SleepProps = {
}

const Sleep = ({  ...props }: SleepProps) => {
    const [selectedTime, setSelectedTime] = useState("Off");


    const { theme,showTimeOptions, setShowTimeOptions,setActiveButton } = useGlobalContext();
    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;



    const timeOptions = ["Off", "05", "10", "15", "30", "60"]

    const handleSleepTimer = () => {
        setShowTimeOptions(true)
        setActiveButton(1);
    }



    return (
        <View className='flex flex-row justify-between items-center w-full h-full'>
            <View className='flex flex-row items-center gap-x-2 h-full'>
                <Timer str={currentStyles.svg_1} />
                <Text className={`${currentStyles.tx_1} text-xs font-semibold`}>Sleep Timer</Text>
            </View>
            <View className='flex flex-row items-center h-full relative'>
                <TouchableOpacity className={`absolute right-1 flex h-auto items-center justify-center w-28 flex-row rounded-md ${currentStyles.bg_6}`}
                    onPress={() => { handleSleepTimer(); }}
                >
                    <View className='flex w-full items-center'>


                        {
                            showTimeOptions ?
                                (timeOptions.map((timeOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setSelectedTime(timeOption); setShowTimeOptions(false) }} className='flex-1 items-center py-1 w-full'>
                                            <Text className={`text-xs ${currentStyles.tx_white}`}>{timeOption} {timeOption === "Off" ? "" : "Minutes"}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-around w-full py-1'>
                                        <Text className={`${currentStyles.tx_white} text-xs `}>{selectedTime} {selectedTime === "Off" ? "" : "Minutes"} </Text>
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

export default Sleep