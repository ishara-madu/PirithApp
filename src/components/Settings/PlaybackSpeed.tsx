import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DownArrow from '../../../assets/svg/DownArrow';
import Play from '../../../assets/svg/Playback';
import { useGlobalContext } from '../Hooks/GlobalContext';

type PlaybackProps = {
    handlePlaybackButton?: any;
    showspeedOptions: boolean;
}

const PlaybackSpeed = ({ handlePlaybackButton, ...props }: PlaybackProps) => {
    const [showspeedOptions, setShowSpeedOptions] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState<any>("Default");
    const { playbackRate, setPlaybackRate } = useGlobalContext();


    const handlePlaybackSpeed = () => {
        setShowSpeedOptions(true)
    }
    useEffect(() => {
        setShowSpeedOptions(props.showspeedOptions)
    }, [props.showspeedOptions])


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
                    ):(
                        speedOption == 1.5? (
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
            <View className='flex flex-row items-center gap-x-3 h-full'>
                <Play />
                <Text className='text-white text-md font-semibold'>Playback Speed</Text>
            </View>
            <View className='flex flex-row items-center h-full gap-1 relative'>
                <TouchableOpacity className='absolute right-2 flex h-auto items-center justify-start px-2 w-20 flex-row rounded-md bg-[#b7b7b7d2]'
                    onPress={() => { handlePlaybackSpeed(); handlePlaybackButton(); }}
                >
                    <View className='flex justify-center items-center'>
                        {
                            showspeedOptions ?
                                (speedOptions.map((speedOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setPlaybackSpeed(speedSet(speedOption)); setPlaybackRate(speedOption); setShowSpeedOptions(false) }} className='flex flex-row items-center justify-start w-full py-2'>
                                            <Text>{speedOption}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-between w-full py-2'>
                                        <Text className=''>{playbackSpeed} </Text>
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

export default PlaybackSpeed