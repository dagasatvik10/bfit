import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {HomePage, PointsHistoryPage, SelectionDonePage} from '../features';

export type HomeStackParamList = {
  SelectionDone: undefined;
  Home: undefined;
  PointsHistory: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectionDone"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen
        name="SelectionDone"
        component={SelectionDonePage}
        options={{navigationBarHidden: true}}
      />
      <Stack.Screen name="PointsHistory" component={PointsHistoryPage} />
    </Stack.Navigator>
  );
};
