import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Timer from '../../../assets/svg/Timer';
import DownArrow from '../../../assets/svg/DownArrow';
import Player from '../../../assets/svg/Player';
import { darkStyles, lightStyles, useGlobalContext } from '../Hooks/GlobalContext';
import { saveDataVariable } from '../../pages/Database';

type SleepProps = {
    handleStyleButton?: any;
    showTypeOptions: boolean;
}

const PlayerStyle = ({ handleStyleButton, ...props }: SleepProps) => {
    const { theme,playerStyle,setPlayerStyle } = useGlobalContext();
    const [showTypeOptions, setShowTypeOptions] = useState(false);
    const [selectedType, setSelectedType] = useState(playerStyle);

    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;

    const timeOptions = ["Simple","Classic","Advanced"]

    const handleStyle = () => {
        setShowTypeOptions(true)
    }
    useEffect(() => {
        setShowTypeOptions(props.showTypeOptions)
    }, [props.showTypeOptions])

    useEffect(() => {
        setPlayerStyle(selectedType);
    },[selectedType])


    return (
        <View className='flex flex-row justify-between items-center w-full h-full'>
            <View className='flex flex-row items-center gap-x-3 h-full'>
                <Player str={currentStyles.svg_1}/>
                <Text className={`${currentStyles.tx_1} text-md font-semibold`}>Player Style</Text>
            </View>
            <View className='flex flex-row items-center h-full gap-1 relative'>
                <TouchableOpacity className={`absolute right-2 flex h-auto items-center justify-center px-2 w-28 flex-row rounded-md ${currentStyles.bg_6}`}
                    onPress={() => { handleStyle(); handleStyleButton(); }}
                >
                    <View className='flex justify-center items-center'>


                        {
                            showTypeOptions ?
                                (timeOptions.map((timeOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setSelectedType(timeOption); setShowTypeOptions(false);saveDataVariable("playerStyle", timeOption); }} className='flex flex-row items-center justify-start py-2 w-full'>
                                            <Text className={`${currentStyles.tx_white}`}>{timeOption}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-between w-full py-2'>
                                        <Text className={`${currentStyles.tx_white}`}>{selectedType}</Text>
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