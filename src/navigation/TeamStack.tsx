import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {SelectTeamPage, SelectionDonePage} from '../features';
import {Team} from '../types';

export type TeamStackParamList = {
  SelectTeam: undefined;
  SelectionDone: {team: Team};
};

const Stack = createNativeStackNavigator<TeamStackParamList>();

export const TeamStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectTeam"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SelectTeam" component={SelectTeamPage} />
      <Stack.Screen name="SelectionDone" component={SelectionDonePage} />
    </Stack.Navigator>
  );
};
