import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {Image} from 'react-native';
import {NavigatorScreenParams} from '@react-navigation/native';
import Icon from 'react-native-paper/src/components/Icon';

import {ActivitiesPage, PhotoWallPage} from '../features';
import {HomeStack, HomeStackParamList} from './HomeStack';
import {LeaderboardStack, LeaderboardStackParamList} from './LeaderboardStack';

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

const PhotoWallBarIcon: FC<BarIconProps> = ({focused}) => {
  return (
    <>
      {focused ? (
        <Icon size={20} source="view-dashboard-outline" color="#018e89" />
      ) : (
        <Icon size={20} source="view-dashboard-outline" color="#717171" />
      )}
    </>
  );
};

export type RootTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Activities: undefined;
  LeaderboardStack: NavigatorScreenParams<LeaderboardStackParamList>;
  PhotoWall: undefined;
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
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="LeaderboardStack"
        component={LeaderboardStack}
        options={{
          tabBarIcon: LeaderboardBarIcon,
          tabBarActiveTintColor: '#018e89',
          title: 'Leaderboard',
        }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesPage}
        options={{
          tabBarIcon: ActivitiesBarIcon,
          tabBarActiveTintColor: '#018e89',
          title: 'Activities',
        }}
      />
      <Tab.Screen
        name="PhotoWall"
        component={PhotoWallPage}
        options={{
          tabBarIcon: PhotoWallBarIcon,
          tabBarActiveTintColor: '#018e89',
          title: 'PhotoWall',
        }}
      />
    </Tab.Navigator>
  );
};
