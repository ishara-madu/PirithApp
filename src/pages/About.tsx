import React from 'react';
import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { darkStyles, lightStyles, useGlobalContext } from '../components/Hooks/GlobalContext';

const AboutUs = () => {
  const { setShowAbout, theme } = useGlobalContext();
  const currentStyles = theme === 'Light' ? lightStyles : darkStyles;

  return (
    <SafeAreaView className='w-full h-full absolute'>


      <View className={`flex-1 ${currentStyles.bg_1}`}>
        {/* Header Section */}
        <View className='flex relative h-auto items-center w-full flex-row justify-center mt-8'>
          <Text className={`text-2xl ${currentStyles.tx_1} font-bold`}>About Me</Text>
          <TouchableOpacity onPress={() => { setShowAbout(false) }} className='absolute right-10'>
            <Text className={`${currentStyles.tx_1}`}>Done</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image Section */}
        <View className={`mt-8 mb-6`}>
          <Image
            source={require('../../assets/owner.jpg')}
            className={`w-40 h-40 rounded-full mx-auto`}
            resizeMode="cover"
          />
        </View>

        {/* Introduction Section */}
        <View className={`flex-1 ${currentStyles.bg_2} rounded-t-3xl px-4 pt-4`}>
          <ScrollView className={`flex-1`}>
            <View className={``}>
              <Text className={`text-xl ${currentStyles.tx_1} font-semibold`}>
                Hi there, I’m <Text className={`${currentStyles.tx_6}`}>Ishara Madhusanka</Text> 👨‍💻
              </Text>
              <Text className={`${currentStyles.tx_2} mt-2 leading-6`}>
                I’m an ICT diploma student (NVQ Level 5) passionate about technology and programming 🚀. I enjoy learning and building projects that bring value to others. My goal is to keep growing in the tech world and contribute to innovative solutions 🌐.
              </Text>
            </View>

            {/* Journey Section */}
            <View className={`mt-8`}>
              <Text className={`text-xl ${currentStyles.tx_1} font-semibold`}>
                My Journey 🌱
              </Text>
              <Text className={`${currentStyles.tx_2} mt-2 leading-6`}>
                My tech journey started with a deep interest in computers 💻. Through my NVQ diploma, I’ve built a foundation in ICT and worked on practical projects that expand my skills and knowledge.
              </Text>
            </View>

            {/* Values Section */}
            <View className={`mt-8 mb-6`}>
              <Text className={`text-xl ${currentStyles.tx_1} font-semibold`}>
                What I Value 💡
              </Text>
              <Text className={`${currentStyles.tx_2} mt-2 leading-6`}>
                I believe in the power of technology to make lives easier and more connected 🤝. I aim to build solutions that are user-friendly, innovative, and reliable 💯.
              </Text>
            </View>

            {/* Contact Section */}
            <View className={`mt-10 mb-12`}>
              <Text className={`text-xl ${currentStyles.tx_1} font-semibold`}>
                Get in Touch 📬</Text>
              <Text className={`${currentStyles.tx_2} mt-2 leading-6`}>
                I’d love to connect! Feel free to reach out via email or phone.
              </Text>
              <Text className=' mt-4 '>📩&nbsp;&nbsp;
                <Text
                  className={`${currentStyles.tx_7} underline`}
                  onPress={() => Linking.openURL('mailto:isharamadushankab@gmail.com')}>
                  isharamadushankab@gmail.com
                </Text>
              </Text>
              <Text className=' mt-2 '>📞&nbsp;&nbsp;
                <Text
                  className={`${currentStyles.tx_7} underline`}
                  onPress={() => Linking.openURL('tel:+94789365102')}>
                  (+94)78-936-5102
                </Text>
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutUs;
