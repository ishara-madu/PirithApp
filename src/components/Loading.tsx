import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Loading: React.FC = () => {
  return (
    <View className="absolute w-full h-full flex items-center justify-center z-20">
      <ActivityIndicator size={70} color="#4B79A1" />
    </View>
  );
};

export default Loading;
