import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import About from '../../assets/svg/About'
import Sleep from './Settings/Sleep'
import PlaybackSpeed from './Settings/PlaybackSpeed'


const Info = () => {
    const [activeButton, setActiveButton] = useState(0);
    const [showTimeOptions, setShowTimeOptions] = useState(false);
    const [showspeedOptions, setShowSpeedOptions] = useState(false);


    const handleSleepButton = () => {
        setActiveButton(1);
        setShowSpeedOptions(false);
    }
    const handlePlaybackButton = () => {
        setActiveButton(2);
        setShowTimeOptions(false);
    }
    const handleAboutButton = () => {
        setActiveButton(3);
        setShowTimeOptions(false);
        setShowSpeedOptions(false);
    }
    return (
        <View className='w-full h-[88%] bg-[#393939f3] inset-0 backdrop-blur-md absolute rounded-3xl flex justify-center items-center flex-row'>
            <View className='w-[80%] h-[80%] flex items-center gap-y-2'>
                <TouchableOpacity onPress={handleSleepButton} className={`w-[100%] ${activeButton == 1 ? "bg-black z-10" : ""} h-14 px-5 rounded-xl flex flex-row justify-between items-center`}>
                    <Sleep handleSleepButton={handleSleepButton} showTimeOptions={showTimeOptions} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePlaybackButton} className={`w-[100%] ${activeButton == 2 ? "bg-black z-10" : ""} h-14 px-5 rounded-xl flex flex-row justify-between items-center`}>
                    <PlaybackSpeed handlePlaybackButton={handlePlaybackButton } showspeedOptions={showspeedOptions}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAboutButton} className={`w-[100%] ${activeButton == 3 ? "bg-black z-10" : ""} h-14 px-5 rounded-xl flex flex-row justify-between items-center`}>
                    <View className='flex flex-row items-center gap-x-3 h-full'>
                        <About wh={40} />
                        <Text className='text-white text-md font-semibold'>About Track</Text>
                    </View>
                </TouchableOpacity>
                {
                    activeButton == 3 &&
                    <View className='bg-[#151515f3] w-full h-full flex-1 rounded-3xl'>

                    </View>}
            </View>

        </View>
    )
}

export default Info