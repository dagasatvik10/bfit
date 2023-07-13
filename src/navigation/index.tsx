import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';

import {ActivitiesPage} from '../features';
import {HomeStack} from './HomeStack';

const HomeBarIcon = () => {
  return (
    <Image
      source={require('../assets/images/home_icon.webp')}
      className="w-5 h-5"
    />
  );
};

const ActivitiesBarIcon = () => {
  return (
    <Image
      source={require('../assets/images/activities_icon.webp')}
      className="w-5 h-5"
    />
  );
};

export type RootTabParamList = {
  HomeStack: undefined;
  Activities: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const DefaultNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeStack">
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: HomeBarIcon,
        }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesPage}
        options={{
          tabBarIcon: ActivitiesBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default DefaultNavigation;
