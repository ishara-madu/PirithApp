import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Timer from '../../../assets/svg/Timer';
import DownArrow from '../../../assets/svg/DownArrow';
import { darkStyles, lightStyles, useGlobalContext } from '../Hooks/GlobalContext';

type SleepProps = {
    handleSleepButton?: any;
    showTimeOptions: boolean;
}

const Sleep = ({ handleSleepButton, ...props }: SleepProps) => {
    const [showTimeOptions, setShowTimeOptions] = useState(false);
    const [selectedTime, setSelectedTime] = useState("Off");
    const buttonRef = useRef(null);


    const { theme,isClickedOutside, setIsClickedOutside } = useGlobalContext();
    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;



    const timeOptions = ["Off", "05", "10", "15", "30", "60"]

    const handleSleepTimer = () => {
        setShowTimeOptions(true)
    }
    // useEffect(() => {
    //     setShowTimeOptions(props.showTimeOptions)
    // }, [props.showTimeOptions])



    return (
        <View className='flex flex-row justify-between items-center w-full h-full'>
            <View className='flex flex-row items-center gap-x-2 h-full'>
                <Timer str={currentStyles.svg_1} />
                <Text className={`${currentStyles.tx_1} text-xs font-semibold`}>Sleep Timer</Text>
            </View>
            <View className='flex flex-row items-center h-full gap-1 relative'>
                <TouchableOpacity className={`absolute right-1 flex h-auto items-center justify-center px-2 w-28 flex-row rounded-md ${currentStyles.bg_6}`}
                ref={buttonRef}
                    onPress={() => { handleSleepTimer(); handleSleepButton(); }}
                >
                    <View className='flex justify-center items-center w-full'>


                        {
                            showTimeOptions ?
                                (timeOptions.map((timeOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setSelectedTime(timeOption); setShowTimeOptions(false) }} className='flex flex-row items-center justify-center py-1 w-full'>
                                            <Text className={`text-xs ${currentStyles.tx_white}`}>{timeOption} {timeOption === "Off" ? "" : "Minutes"}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-between w-full py-1'>
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