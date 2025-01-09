import React from 'react';
import { View, Text, Image, ScrollView, Linking, TouchableOpacity,SafeAreaView } from 'react-native';
import { darkStyles, lightStyles, useGlobalContext } from '../components/Hooks/GlobalContext';

const AboutUs = () => {
  const { setShowAbout, theme } = useGlobalContext();
  const currentStyles = theme === 'Light' ? lightStyles : darkStyles;

  return (
    <SafeAreaView className='w-full h-full absolute'>


      <View className={`flex-1 ${currentStyles.bg_1}`}>
        {/* Header Section */}
        <View className='flex absolute h-auto items-center w-full flex-row justify-center mt-8 z-20'>
          <Text className={`text-xl ${currentStyles.tx_1} font-bold`}>About Me</Text>
          <TouchableOpacity onPress={() => { setShowAbout(false) }} className='absolute right-10'>
            <Text className={`${currentStyles.tx_1} text-xs`}>Done</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image Section */}
        <View className={`mt-10`}>
          <Image
            source={require('../../assets/about-us.png')}
            className={`w-full rounded-full mx-auto`}
            resizeMode="contain"
          />
        </View>

        {/* Introduction Section */}
        <View className={`flex-1 ${currentStyles.bg_7} rounded-t-3xl px-5 pt-4 `}>
          <ScrollView className={`flex-1`}>
            <View className={``}>
              <Text className={`text-base ${currentStyles.tx_1} font-semibold`}>
                Hi there, I’m <Text className={`${currentStyles.tx_8}`}>Ishara Madhusanka</Text> 👨‍💻
              </Text>
              <Text className={`${currentStyles.tx_2} mt-2 leading-6 text-xs`}>
                I’m an ICT diploma student (NVQ Level 5) passionate about technology and programming 🚀. I enjoy learning and building projects that bring value to others. My goal is to keep growing in the tech world and contribute to innovative solutions 🌐.
              </Text>
            </View>

            {/* Journey Section */}
            <View className={`mt-8`}>
              <Text className={`text-base ${currentStyles.tx_1} font-semibold`}>
                My Journey 🌱
              </Text>
              <Text className={`${currentStyles.tx_2} mt-2 leading-6 text-xs`}>
                My tech journey started with a deep interest in computers 💻. Through my NVQ diploma, I’ve built a foundation in ICT and worked on practical projects that expand my skills and knowledge.
              </Text>
            </View>

            {/* Values Section */}
            <View className={`mt-8 mb-6`}>
              <Text className={`text-base ${currentStyles.tx_1} font-semibold`}>
                What I Value 💡
              </Text>
              <Text className={`${currentStyles.tx_2} mt-2 leading-6 text-xs`}>
                I believe in the power of technology to make lives easier and more connected 🤝. I aim to build solutions that are user-friendly, innovative, and reliable 💯.
              </Text>
            </View>

            {/* Contact Section */}
            <View className={`mt-5 mb-12`}>
              <Text className={`text-base ${currentStyles.tx_1} font-semibold`}>
                Get in Touch 📬</Text>
              <Text className={`${currentStyles.tx_2} mt-2 leading-6 text-xs`}>
                I’d love to connect! Feel free to reach out via email or phone.
              </Text>
              <Text className=' mt-4 '>📩&nbsp;&nbsp;
                <Text
                  className={`${currentStyles.tx_7} underline text-xs`}
                  onPress={() => Linking.openURL('mailto:isharamadushankab@gmail.com')}>
                  isharamadushankab@gmail.com
                </Text>
              </Text>
              <Text className=' mt-2 '>📞&nbsp;&nbsp;
                <Text
                  className={`${currentStyles.tx_7} underline text-xs`}
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
