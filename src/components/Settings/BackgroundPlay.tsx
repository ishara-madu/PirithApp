import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Timer from '../../../assets/svg/Timer';
import DownArrow from '../../../assets/svg/DownArrow';
import Player from '../../../assets/svg/Player';
import ThemeIcon from '../../../assets/svg/ThemeIcon';
import BackgroundPlayIcon from '../../../assets/svg/BackgroundPlayIcon';

type SleepProps = {
    handleBackgroundPlayButton?: any;
    showBackgroundPlayOptions: boolean;
}

const BackgroundPlay = ({ handleBackgroundPlayButton, ...props }: SleepProps) => {
    const [showBackgroundPlayOptions, setShowBackgroundPlayOptions] = useState(false);
    const [selectedBackgroundPlay, setSelectedBackgroundPlay] = useState("Light");


    const bacgroundOptions = ["off", "on",]

    const handleBackground = () => {
        setShowBackgroundPlayOptions(true)
    }
    useEffect(() => {
        setShowBackgroundPlayOptions(props.showBackgroundPlayOptions)
    }, [props.showBackgroundPlayOptions])


    return (
        <View className='flex flex-row justify-between items-center w-full h-full'>
            <View className='flex flex-row items-center gap-x-3 h-full'>
                <BackgroundPlayIcon />
                <Text className='text-white text-md font-semibold'>Background Play</Text>
            </View>
            <View className='flex flex-row items-center h-full gap-1 relative'>
                <TouchableOpacity className='absolute right-2 flex h-auto items-center justify-center px-2 w-28 flex-row rounded-md bg-[#b7b7b7d2]'
                    onPress={() => { handleBackground(); handleBackgroundPlayButton(); }}
                >
                    <View className='flex justify-center items-center'>


                        {
                            showBackgroundPlayOptions ?
                                (bacgroundOptions.map((timeOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setSelectedBackgroundPlay(timeOption); setShowBackgroundPlayOptions(false) }} className='flex flex-row items-center justify-start py-2 w-full'>
                                            <Text>{timeOption}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-between w-full py-2'>
                                        <Text className=''>{selectedBackgroundPlay}</Text>
                                        <DownArrow fill='black' width={14} height={14} />
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