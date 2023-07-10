import React, {FC} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Header from '../../../components/layout/header';
import {AuthUser} from '../../Login/authSlice';

interface Props {
  user: AuthUser;
}

const HomePage: FC<Props> = ({user}) => {
  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header user={user} />
        {/* Activity Image */}
        <View className="py-2">
          <Image
            className="rounded w-full h-52"
            source={require('../assets/images/workshop.webp')}
          />
        </View>
        {/* Active Challenge */}
        <View className="py-2 flex flex-col">
          <View className="py-2 flex flex-row justify-between">
            <Text className="text-base text-[#424242] font-medium">
              Active Challenge
            </Text>
            {/* TODO: navigate to activities screen */}
            <Pressable onPress={() => console.log('active challenge view all')}>
              <Text className="text-[#018e89] font-medium text-base">
                View all
              </Text>
            </Pressable>
          </View>
          <View className="py-2 bg-[#fef8f1] h-48 rounded-2xl shadow flex flex-col justify-between w-full">
            <View className="flex flex-row justify-between px-4 py-2">
              <Text className="text-black font-bold text-base">
                Challenge 1
              </Text>
              <View className="flex flex-row items-center justify-around">
                <Text className="text-xs">50 points</Text>
                <Image source={require('../../../assets/images/coin.webp')} />
              </View>
            </View>
            <View className="flex flex-row items-center justify-center">
              <Text className="text-base text-black font-normal">
                8-10 Glasses of water today?
              </Text>
            </View>
            <View className="w-full py-2">
              {/* TODO: dispatch activity done action */}
              <Pressable className="w-full flex flex-row items-center justify-center">
                <View className="rounded-full bg-[#018e89] items-center p-2 w-3/4">
                  <Text className="text-base font-bold text-white">Yes</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        {/* Health Tips */}
        <View className="py-2 mb-4 h-60 w-full">
          <ImageBackground
            className="h-full flex flex-col w-full rounded-2xl justify-center"
            source={require('../assets/images/health_bg.webp')}>
            <View className="flex flex-col px-8 justify-center">
              <View className="flex flex-row justify-start">
                <Text className="text-white text-xl font-bold">
                  Today's health tip
                </Text>
              </View>
              <View className="border-b-2 border-white" />
              <View>
                <Text className="text-white text-lg font-normal py-2">
                  Eat a balanced diet, stay hydrated, exercise regularly, get
                  enough sleep, and practice good hygiene for overall health and
                  well-being.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
