import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Pause from '../../assets/svg/Pause'
import Play from '../../assets/svg/Play'

const Flatlist = (props: any) => {    
    return (
        <FlatList
            data={props.listtype}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity className='w-full flex flex-row items-center px-3 h-16 bg-[#00000065] rounded-xl mt-1'>
                    <View className='w-11 h-11 rounded-md mr-7 overflow-hidden relative'>
                        <Image className='rounded-md flex-1 w-full h-full' source={{ uri: `https://img.youtube.com/vi/${item.url}/default.jpg` }} />
                        <View className='absolute flex w-full h-full justify-center items-center'>
                            {/* {
                                <>


                                    <Pause w={20} h={20} />

                                    <Play w={20} h={20} />


                                </>
                            } */}
                        </View>
                    </View>
                    <View>
                        <Text className='text-white text-base font-semibold'>{item.name},{item.uniqueId}</Text>
                        <Text className='text-white text-xs text-opacity-50'>{item.artist}</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.uniqueId}
        />
    )
}

export default Flatlist