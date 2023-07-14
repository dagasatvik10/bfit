import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';

import Header from '../../../components/layout/header';
import {Activity, selectPastActivities} from '../../Activities/activitySlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectSelectedTeam} from '../../TeamSelection/teamSlice';
import {signOut} from '../../Login/authSlice';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../navigation/HomeStack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../../navigation';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'PointsHistory'>,
  BottomTabScreenProps<RootTabParamList>
>;

const PointsHistoryPage: FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const pastActivities = useAppSelector(selectPastActivities);
  const selectedTeam = useAppSelector(selectSelectedTeam);

  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header navigate={() => navigation.navigate('PointsHistory')} />
        <View className="border-[1px] border-[#e5e5e5] my-2" />
        <View className="flex flex-col py-2">
          <View className="flex flex-col justify-start">
            <View className="py-2 flex flex-col justify-between items-start">
              <Text className="text-black font-bold text-2xl">Points</Text>
            </View>
            <View className="flex flex-row justify-between">
              <View className="rounded-xl bg-[#018e89] flex-1 mx-1 px-2 py-2 flex-col justify-between items-center">
                <Text className="font-light text-sm text-white">
                  Your Team Points
                </Text>
                <View className="flex flex-row justify-between items-center">
                  <Image
                    className="px-1"
                    source={require('../../../assets/images/coin.webp')}
                  />
                  <Text className="font-bold text-base px-1 text-white">
                    {selectedTeam?.points} Points
                  </Text>
                </View>
              </View>
              <View className="rounded-xl bg-[#ffebce] flex-1 mx-1 px-2 py-2 flex-col justify-between items-center text-black">
                <Text className="font-light text-sm">Your Contribution</Text>
                <View className="flex flex-row justify-between items-center">
                  <Image
                    className="px-1"
                    source={require('../../../assets/images/coin.webp')}
                  />
                  <Text className="font-bold text-base px-1">200 Points</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex flex-col justify-start py-2">
            <View className="py-2 flex flex-col justify-between items-start">
              <Text className="text-black font-bold text-base">
                Earned Points
              </Text>
            </View>
            {pastActivities.map((activity: Activity) => (
              <View
                key={activity.title}
                className="flex flex-col justify-start my-2">
                <View className="flex flex-row rounded-xl justify-between items-center border-2 border-[#e5e5e5] shadow-lg h-14 px-4">
                  <Text className="font-medium text-sm text-black">
                    {activity.title} {activity.done ? 'Completed' : 'Missed'}
                  </Text>
                  <Text
                    className={`font-medium text-xs ${
                      activity.done ? 'text-[#018e89]' : 'text-[#ff4c02]'
                    } `}>
                    50 Points
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View className="border-[1px] border-[#e5e5e5] my-2" />
          <View className="flex flex-row justify-center my-2">
            <Pressable onPress={() => dispatch(signOut())}>
              <Text className="text-[#616161] text-sm">Logout</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PointsHistoryPage;
