import React from 'react';
import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';

function SelectionDonePage({teamName}: {teamName: string}): JSX.Element {
  return (
    <SafeAreaView className="flex-1">
      <View className="basis-1/3 justify-center items-center">
        <View className="flex-1 justify-end">
          <Text className="text-[#55b295] text-3xl font-bold text-center py-1">
            Congratulations!
          </Text>
          <Text className="text-black text-2xl text-center py-1">
            You are the member of
          </Text>
        </View>
        <View className="flex-1 pt-5 justify-start">
          <View className="rounded-full w-48 bg-[#FFF2E2] items-center px-3 py-2">
            <Text className="text-3xl font-bold text-black">
              Team {teamName || 'Four'}
            </Text>
          </View>
        </View>
      </View>

      <View className="basis-2/3 items-center justify-between">
        <View className="basis-3/4">
          <Image source={require('../assets/images/fans.webp')} />
        </View>
        <View className="basis-1/4">
          {/* TODO: navigate to home screen */}
          <Pressable onPress={() => console.log('pressed')}>
            <View className="rounded-full w-80 bg-[#f9c06c] items-center p-2">
              <Text className="text-2xl font-bold text-black">Let's Go</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SelectionDonePage;
