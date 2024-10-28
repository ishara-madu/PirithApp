import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  );
};

export default Loading;
