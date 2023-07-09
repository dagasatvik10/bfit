import React from 'react';
import {Button, SafeAreaView, View} from 'react-native';

import {useAppDispatch} from '../../../app/hooks';
import {signIn} from '../authSlice';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView className="flex-1 bg-teal-100">
      <View className="flex-1 bg-teal-200 rotate-45" />
      <Button
        title={'Sign in with Google'}
        onPress={() => dispatch(signIn())}
      />
    </SafeAreaView>
  );
}

export default LoginPage;
