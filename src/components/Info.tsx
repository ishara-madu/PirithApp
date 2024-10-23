import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Timer from '../../assets/svg/Timer'
import About from '../../assets/svg/About'
import Playback from '../../assets/svg/Playback'
import DownArrow from '../../assets/svg/DownArrow'


const Info = () => {
    const [activeButton,setActiveButton] = useState(0);
    const [selectedTime, setSelectedTime] = useState("off");
    const [playbackSpeed, setPlaybackSpeed] = useState("Default");
    const [showspeedOptions, setShowSpeedOptions] = useState(false);
    const [showTimeOptions, setShowTimeOptions] = useState(false);
    const timeOptions = ["off", "05", "10", "15", "30", "60"]
    const speedOptions = ["0.5", "Default", "1.5", "2"]

    const speed = Object.entries(speedOptions);

    const handleSleepTimer = () => {
        setShowTimeOptions(true)
    }
    const handlePlaybackSpeed = () => {
        setShowSpeedOptions(true)
    }
    



    const handleSleepButton = () => {
        setActiveButton(1);
        setShowTimeOptions(true);
        setShowSpeedOptions(false);
    }
    const handlePlaybackButton = () => {
        setActiveButton(2);
        setShowTimeOptions(false);
        setShowSpeedOptions(true);
    }
    const handleAboutButton = () => {
        setActiveButton(3);
        setShowTimeOptions(false);
        setShowSpeedOptions(false);
    }
    return (
        <View className='w-full h-[88%] bg-[#393939f3] inset-0 backdrop-blur-md absolute rounded-3xl flex justify-center items-center flex-row'>
            <View className='w-[80%] h-[80%] flex items-center gap-y-2'>
                <TouchableOpacity onPress={handleSleepButton} className={`w-[100%] ${activeButton ==1 ? "bg-black z-10":""} h-14 px-5 rounded-xl flex flex-row justify-between items-center`}>
                    <View className='flex flex-row items-center gap-x-3 h-full'>
                        <Timer />
                        <Text className='text-white text-md font-semibold'>Sleep Timer</Text>
                    </View>
                    <View className='flex flex-row items-center h-full gap-1 relative'>
                        <TouchableOpacity className='absolute right-2 flex h-auto items-center justify-center px-2 w-28 flex-row rounded-md bg-[#b7b7b7d2]'
                            onPress={()=>{handleSleepTimer();handleSleepButton();}}
                        >
                            <View className='flex justify-center items-center'>


                                {
                                    showTimeOptions ?
                                        (timeOptions.map((timeOption, id) => {
                                            return (
                                                <TouchableOpacity key={id} onPress={() => { setSelectedTime(timeOption); setShowTimeOptions(false) }} className='flex flex-row items-center justify-start py-2 w-full'>
                                                    <Text>{timeOption} {timeOption === "off" ? "" : "Minutes"}</Text>
                                                </TouchableOpacity>
                                            )
                                        })) :
                                        (
                                            <View className='flex flex-row items-center justify-between w-full py-2'>
                                                <Text className=''>{selectedTime} {selectedTime === "off" ? "" : "Minutes"} </Text>
                                                <DownArrow fill='black' width={14} height={14} />
                                            </View>
                                        )
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePlaybackButton} className={`w-[100%] ${activeButton ==2 ? "bg-black z-10":""} h-14 px-5 rounded-xl flex flex-row justify-between items-center`}>
                    <View className='flex flex-row items-center gap-x-3 h-full'>
                        <Playback />
                        <Text className='text-white text-md font-semibold'>Playback Speed</Text>
                    </View>
                    <View className='flex flex-row items-center h-full gap-1 relative'>
                        <TouchableOpacity className='absolute right-2 flex h-auto items-center justify-start px-2 w-20 flex-row rounded-md bg-[#b7b7b7d2]'
                            onPress={()=>{handlePlaybackSpeed();handlePlaybackButton();}}
                        >
                            <View className='flex justify-center items-center'>
                                {
                                    showspeedOptions ?
                                        (speedOptions.map((speedOption, id) => {
                                            return (
                                                <TouchableOpacity key={id} onPress={() => { setPlaybackSpeed(speedOption); setShowSpeedOptions(false) }} className='flex flex-row items-center justify-start w-full py-2'>
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
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAboutButton} className={`w-[100%] ${activeButton ==3 ? "bg-black z-10":""} h-14 px-5 rounded-xl flex flex-row justify-between items-center`}>
                    <View className='flex flex-row items-center gap-x-3 h-full'>
                        <About wh={43} />
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