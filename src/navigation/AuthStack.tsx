import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {LoginPage, LaunchPage} from '../features';

export type AuthStackParamList = {
  Launch: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Launch"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Launch" component={LaunchPage} />
      <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>
  );
};
