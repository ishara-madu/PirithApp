import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Timer from '../../../assets/svg/Timer';
import DownArrow from '../../../assets/svg/DownArrow';
import Player from '../../../assets/svg/Player';

type SleepProps = {
    handleStyleButton?: any;
    showTypeOptions: boolean;
}

const PlayerStyle = ({ handleStyleButton, ...props }: SleepProps) => {
    const [showTypeOptions, setShowTypeOptions] = useState(false);
    const [selectedType, setSelectedType] = useState("Classic");


    const timeOptions = ["Simple","Classic","Advanced"]

    const handleStyle = () => {
        setShowTypeOptions(true)
    }
    useEffect(() => {
        setShowTypeOptions(props.showTypeOptions)
    }, [props.showTypeOptions])


    return (
        <View className='flex flex-row justify-between items-center w-full h-full'>
            <View className='flex flex-row items-center gap-x-3 h-full'>
                <Player />
                <Text className='text-white text-md font-semibold'>Player Style</Text>
            </View>
            <View className='flex flex-row items-center h-full gap-1 relative'>
                <TouchableOpacity className='absolute right-2 flex h-auto items-center justify-center px-2 w-28 flex-row rounded-md bg-[#b7b7b7d2]'
                    onPress={() => { handleStyle(); handleStyleButton(); }}
                >
                    <View className='flex justify-center items-center'>


                        {
                            showTypeOptions ?
                                (timeOptions.map((timeOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setSelectedType(timeOption); setShowTypeOptions(false) }} className='flex flex-row items-center justify-start py-2 w-full'>
                                            <Text>{timeOption}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-between w-full py-2'>
                                        <Text className=''>{selectedType}</Text>
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

export default PlayerStyle