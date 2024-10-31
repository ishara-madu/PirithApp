import React from 'react';
import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../components/Hooks/GlobalContext';

const AboutUs = () => {
  const { setShowAbout } = useGlobalContext();

  return (
    <SafeAreaView className='w-full h-full absolute'>


    <ScrollView className={`flex-1 bg-gray-900 px-4 `}>
      {/* Header Section */}
      <View className='flex relative h-auto items-center w-full flex-row justify-center mt-8'>
        <Text className='text-2xl text-white font-bold'>About Me</Text>
        <TouchableOpacity onPress={()=>{setShowAbout(false)}} className='absolute right-5'>
          <Text className=' text-white'>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Image Section */}
      <View className={`mt-8 mb-6`}>
        <Image
          source={require('../../assets/owner.jpg')}
          className={`w-40 h-40 rounded-full border-4 border-blue-500 mx-auto`}
          resizeMode="cover"
        />
      </View>

      {/* Introduction Section */}
      <View className={`mt-4`}>
        <Text className={`text-xl text-gray-200 font-semibold`}>
          Hi there, I’m Ishara 👨‍💻
        </Text>
        <Text className={`text-gray-400 mt-2 leading-6`}>
          I’m an ICT diploma student (NVQ Level 5) passionate about technology and programming 🚀. I enjoy learning and building projects that bring value to others. My goal is to keep growing in the tech world and contribute to innovative solutions 🌐.
        </Text>
      </View>

      {/* Journey Section */}
      <View className={`mt-8`}>
        <Text className={`text-xl text-gray-200 font-semibold`}>
          My Journey 🌱
        </Text>
        <Text className={`text-gray-400 mt-2 leading-6`}>
          My tech journey started with a deep interest in computers 💻. Through my NVQ diploma, I’ve built a foundation in ICT and worked on practical projects that expand my skills and knowledge.
        </Text>
      </View>

      {/* Values Section */}
      <View className={`mt-8 mb-6`}>
        <Text className={`text-xl text-gray-200 font-semibold`}>
          What I Value 💡
        </Text>
        <Text className={`text-gray-400 mt-2 leading-6`}>
          I believe in the power of technology to make lives easier and more connected 🤝. I aim to build solutions that are user-friendly, innovative, and reliable 💯.
        </Text>
      </View>

      {/* Contact Section */}
      <View className={`mt-10 mb-12`}>
        <Text className={`text-xl font-semibold text-gray-200`}>Get in Touch 📬</Text>
        <Text className={`text-gray-400 mt-2 leading-6`}>
          I’d love to connect! Feel free to reach out via email or phone.
        </Text>
        <Text 
          className={`text-blue-400 mt-4 underline`}
          onPress={() => Linking.openURL('mailto:your-email@example.com')}>
          📧 your-email@example.com
        </Text>
        <Text 
          className={`text-blue-400 mt-2 underline`}
          onPress={() => Linking.openURL('tel:+1234567890')}>
          📞 +1 (234) 567-890
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
