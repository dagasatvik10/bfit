import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

import {useAppDispatch} from '../../../app/hooks';
import {signIn} from '../authSlice';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView className="flex-1 bg-[#073b38]">
      {/* <View className="flex-1 bg-[#117773] rotate-45" /> */}
      <View className="basis-1/4" />
      <View className="basis-1/2 ml-4">
        <View className="flex-1 justify-center items-start ">
          <Image source={require('../../../assets/images/fortum.webp')} />
        </View>
        <View className="flex-2 justify-center items-start">
          <Text className="text-white text-4xl">Welcome to</Text>
          <Text className="text-[#f9c06c] text-8xl">B.FIT</Text>
        </View>
        <View className="basis-1/4 justify-start items-start">
          <Image source={require('../../../assets/images/logo.webp')} />
        </View>
      </View>
      <View className="flex-1">
        <View className="flex-1 justify-center items-center">
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            onPress={() => dispatch(signIn())}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginPage;
