import React, {FC, useMemo} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppSelector} from '../../../app/hooks';
import Header from '../../../components/layout/header';
import {HomeStackParamList} from '../../../navigation/HomeStack';
import {RootTabParamList} from '../../../navigation/HomeTab';
import {
  selectAuthUser,
  useSignOutUserMutation,
} from '../../../slices/userSlice';

import {useFetchTeamByTeamIdQuery} from '../../TeamSelection/teamSlice';
import {
  useFetchCurrentActivitiesQuery,
  useFetchPastActivitiesQuery,
} from '../../Activities/activitySlice';
import {Activity} from '../../../types';
import {Points} from '../molecules/Points';
import {getPreviousDate} from '../../../utils/date';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'PointsHistory'>,
  BottomTabScreenProps<RootTabParamList>
>;

const PointsHistoryPage: FC<Props> = ({navigation}) => {
  const currentDate = useMemo(() => new Date(), []);
  const previousDate = useMemo(
    () => getPreviousDate(currentDate, 7),
    [currentDate],
  );
  const user = useAppSelector(selectAuthUser);
  const {data: currentActivities = []} = useFetchCurrentActivitiesQuery({
    currentDate: currentDate.getTime(),
    previousDate: previousDate.getTime(),
  });
  const {data: pastActivities = []} = useFetchPastActivitiesQuery({
    currentDate: currentDate.getTime(),
  });
  const {data: selectedTeam} = useFetchTeamByTeamIdQuery(user?.teamId!);

  const [signOutUser] = useSignOutUserMutation();

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
            {[...currentActivities, ...pastActivities].map(
              (activity: Activity) => (
                <Points activity={activity} key={activity.id} />
              ),
            )}
          </View>
          <View className="border-[1px] border-[#e5e5e5] my-2" />
          <View className="flex flex-row justify-center my-2">
            <Pressable onPress={() => signOutUser()}>
              <Text className="text-[#616161] text-sm">Logout</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PointsHistoryPage;
