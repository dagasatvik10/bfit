import React, {FC} from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// import {useAppDispatch} from '../../../app/hooks';

const SignupPage: FC = () => {
  return (
    <SafeAreaView className="container flex-1">
      <View className="flex-1 flex flex-col px-8 py-4">
        <Text className="text-[#55b295] text-lg font-bold">
          Hey! we need your basic Info
        </Text>
        <View className="flex flex-col"></View>
      </View>
    </SafeAreaView>
  );
};

export default SignupPage;
