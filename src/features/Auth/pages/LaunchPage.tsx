import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Image, ImageBackground, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AuthStackParamList} from '../../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Launch'>;

const LaunchPage: FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="flex-1"
        source={require('../../../assets/images/splash.webp')}>
        <View className="basis-1/4" />
        <View className="basis-1/2 ml-4">
          <View className="flex-1 justify-center items-start ">
            <Image source={require('..//assets/images/fortum.webp')} />
          </View>
          <View className="flex-2 justify-center items-start">
            <Text className="text-white text-4xl">Welcome to</Text>
            <Text className="text-[#f9c06c] text-8xl">B.FIT</Text>
          </View>
          <View className="basis-1/4 justify-start items-start">
            <Image source={require('../assets/images/logo.webp')} />
          </View>
        </View>
        <View className="flex-1 justify-center items-center w-screen px-8">
          <Pressable
            onPress={() => navigation.navigate('Signup')}
            className="bg-white w-full h-16 rounded-full flex flex-row justify-center items-center border-[#979797] border-2">
            <Text className="text-black font-bold text-base">Get Started</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LaunchPage;
