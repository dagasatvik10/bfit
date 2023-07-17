import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {Image} from 'react-native';

import {ActivitiesPage} from '../features';
import {HomeStack} from './HomeStack';

type BarIconProps = {
  focused: boolean;
};

const HomeBarIcon: FC<BarIconProps> = ({focused}) => {
  return (
    <>
      {focused ? (
        <Image
          source={require('../assets/images/home_icon.webp')}
          className="w-5 h-5"
        />
      ) : (
        <Image
          source={require('../assets/images/home_icon.webp')}
          className="w-5 h-5"
        />
      )}
    </>
  );
};

const ActivitiesBarIcon: FC<BarIconProps> = ({focused}) => {
  return (
    <>
      {focused ? (
        <Image
          source={require('../assets/images/activities_icon.webp')}
          className="w-5 h-5"
        />
      ) : (
        <Image
          source={require('../assets/images/activities_icon.webp')}
          className="w-5 h-5"
        />
      )}
    </>
  );
};

// const LeaderboardBarIcon: FC<BarIconProps> = () => {};

export type RootTabParamList = {
  HomeStack: undefined;
  Activities: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const HomeTab = () => {
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
