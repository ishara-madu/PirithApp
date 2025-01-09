import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingProps{
text?:string
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <View className="absolute w-full h-full flex items-center justify-center z-20">
      <ActivityIndicator size={70} color="#4B79A1" />
      <Text className='flex items-center text-center text-xs text-[#4B79A1]'>{props.text}</Text>
    </View>
  );
};

export default Loading;
