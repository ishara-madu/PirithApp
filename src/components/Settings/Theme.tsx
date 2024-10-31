import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Timer from '../../../assets/svg/Timer';
import DownArrow from '../../../assets/svg/DownArrow';
import Player from '../../../assets/svg/Player';
import ThemeIcon from '../../../assets/svg/ThemeIcon';
import { darkStyles, lightStyles, useGlobalContext } from '../Hooks/GlobalContext';

type SleepProps = {
    handleThemeButton?: any;
    showThemeOptions: boolean;
}

const Theme = ({ handleThemeButton, ...props }: SleepProps) => {
    const [showThemeOptions, setShowThemeOptions] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState("Light");

    const { theme } = useGlobalContext();
    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;

    const timeOptions = ["Light", "Dark",]

    const handleTheme = () => {
        setShowThemeOptions(true)
    }
    useEffect(() => {
        setShowThemeOptions(props.showThemeOptions)
    }, [props.showThemeOptions])


    return (
        <View className='flex flex-row justify-between items-center w-full h-full'>
            <View className='flex flex-row items-center gap-x-3 h-full'>
                <ThemeIcon str={currentStyles.svg_1}/>
                <Text className={`${currentStyles.tx_1} text-md font-semibold`}>Theme</Text>
            </View>
            <View className='flex flex-row items-center h-full gap-1 relative'>
                <TouchableOpacity className={`absolute right-2 flex h-auto items-center justify-center px-2 w-28 flex-row rounded-md ${currentStyles.bg_6}`}
                    onPress={() => { handleTheme(); handleThemeButton(); }}
                >
                    <View className='flex justify-center items-center'>


                        {
                            showThemeOptions ?
                                (timeOptions.map((timeOption, id) => {
                                    return (
                                        <TouchableOpacity key={id} onPress={() => { setSelectedTheme(timeOption); setShowThemeOptions(false) }} className='flex flex-row items-center justify-start py-2 w-full'>
                                            <Text className={currentStyles.tx_white}>{timeOption}</Text>
                                        </TouchableOpacity>
                                    )
                                })) :
                                (
                                    <View className='flex flex-row items-center justify-between w-full py-2'>
                                        <Text className={currentStyles.tx_white}>{selectedTheme}</Text>
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