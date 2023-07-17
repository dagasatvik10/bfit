import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {Image} from 'react-native';
import {NavigatorScreenParams} from '@react-navigation/native';

import {ActivitiesPage, LeaderboardPage} from '../features';
import {HomeStack, HomeStackParamList} from './HomeStack';

type BarIconProps = {
  focused: boolean;
};

const HomeBarIcon: FC<BarIconProps> = ({focused}) => {
  return (
    <>
      {focused ? (
        <Image
          source={require('../assets/icons/home_active.webp')}
          className="w-5 h-5"
        />
      ) : (
        <Image
          source={require('../assets/icons/home.webp')}
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
          source={require('../assets/icons/activities_active.webp')}
          className="w-5 h-5"
        />
      ) : (
        <Image
          source={require('../assets/icons/activities.webp')}
          className="w-5 h-5"
        />
      )}
    </>
  );
};

const LeaderboardBarIcon: FC<BarIconProps> = ({focused}) => {
  return (
    <>
      {focused ? (
        <Image
          source={require('../assets/icons/leaderboard_active.webp')}
          className="w-5 h-5"
        />
      ) : (
        <Image
          source={require('../assets/icons/leaderboard.webp')}
          className="w-5 h-5"
        />
      )}
    </>
  );
};

export type RootTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Activities: undefined;
  Leaderboard: undefined;
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
          tabBarActiveTintColor: '#018e89',
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardPage}
        options={{
          tabBarIcon: LeaderboardBarIcon,
          tabBarActiveTintColor: '#018e89',
        }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesPage}
        options={{
          tabBarIcon: ActivitiesBarIcon,
          tabBarActiveTintColor: '#018e89',
        }}
      />
    </Tab.Navigator>
  );
};
