import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {HomePage, LeaderboardPage} from '../features';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeTab" component={HomePage} />
      <Stack.Screen name="Leaderboard" component={LeaderboardPage} />
    </Stack.Navigator>
  );
};
