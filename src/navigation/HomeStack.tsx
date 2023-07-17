import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {HomePage, PointsHistoryPage} from '../features';

export type HomeStackParamList = {
  Home: undefined;
  PointsHistory: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="PointsHistory" component={PointsHistoryPage} />
    </Stack.Navigator>
  );
};
