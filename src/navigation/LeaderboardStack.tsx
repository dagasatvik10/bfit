import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {LeaderboardPage, TeamUsersPage} from '../features';

export type LeaderboardStackParamList = {
  Leaderboard: undefined;
  TeamUsers: {teamId: string};
};

const Stack = createNativeStackNavigator<LeaderboardStackParamList>();

export const LeaderboardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Leaderboard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Leaderboard" component={LeaderboardPage} />
      <Stack.Screen name="TeamUsers" component={TeamUsersPage} />
    </Stack.Navigator>
  );
};
