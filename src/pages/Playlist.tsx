import { View, Text, SafeAreaView, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Hmaburger from '../../assets/svg/Hamburger'
import Search from '../../assets/svg/Search'

const Playlist = () => {
    return (
        <SafeAreaView className='flex h-full w-full bg-black items-center'>
            <View className='flex flex-row w-[90%] mt-8 justify-between items-center mb-8'>
                <View className='flex flex-row bg-[#b7b7b7d2] rounded-full h-11 w-[85%] items-center'>
                    <View className='flex px-3'>
                    <Search/>
                    </View>
                    <TextInput placeholder='Search' className='text-base text-white' />
                </View>
                <TouchableOpacity className='p-1' >
                    <Hmaburger fill='white'/>
                </TouchableOpacity>
            </View>
            <View className='flex flex-row w-[90%] justify-between items-center mb-8' >
                <View className='w-[30%] h-28 bg-[#b7b7b74e] rounded-lg flex justify-center items-center'>
                    <Image source={require('../../assets/Love.png')}/>
                    <Text className='text-white text-base font-semibold'>Favorites</Text>
                </View>
                <View className='w-[30%] h-28 bg-[#b7b7b74e] rounded-lg flex justify-center items-center'>
                <Image source={require('../../assets/Playlist.png')}/>
                <Text className='text-white text-base font-semibold'>Playlists</Text>
                </View>
                <View className='w-[30%] h-28 bg-[#b7b7b74e] rounded-lg flex justify-center items-center'>
                <Image source={require('../../assets/Recent.png')}/>
                <Text className='text-white text-base font-semibold'>Recent</Text>
                </View>
            </View>
            <View className='flex-1 w-full bg-[#b7b7b74e] rounded-t-3xl items-center pt-5'>
                <View className='flex w-[85%] mb-5 '>
                <Text className='text-white text-2xl font-bold'>Favorites</Text>
                </View>
                <ScrollView className='flex-1 w-[90%] gap-y-1'>
                    <View className='w-full flex flex-row items-center px-3 h-16 bg-[#00000065] rounded-xl'>
                        <View className='w-11 h-11 bg-green-300 rounded-md mr-7'>
                        </View>
                        <View>
                            <Text className='text-white text-base font-semibold'>Track 1</Text>
                            <Text className='text-white text-xs text-opacity-50'>Artist</Text>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default Playlist