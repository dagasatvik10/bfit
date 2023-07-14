import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {CurrentActivity, PastActivity} from '../../../components/Activity';
import Header from '../../../components/layout/header';
import {useAppSelector} from '../../../app/hooks';
import {selectCurrentActivities, selectPastActivities} from '../activitySlice';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../../navigation';
import {HomeStackParamList} from '../../../navigation/HomeStack';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Home'>,
  BottomTabScreenProps<RootTabParamList>
>;

const ActivitiesPage: FC<Props> = ({navigation}) => {
  const currentActivities = useAppSelector(selectCurrentActivities);
  const pastActivities = useAppSelector(selectPastActivities);
  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header navigate={() => navigation.navigate('PointsHistory')} />
        <View className="flex flex-col py-2">
          {/* Activities */}
          <View className="flex flex-col justify-between items-start">
            <Text className="text-black text-2xl font-bold">Activities</Text>
          </View>
          {/* Current Activities */}
          <View className="py-2 flex flex-col justify-evenly">
            <Text className="text-[#424242] text-base font-medium">
              Active challenge of this week
            </Text>
            {currentActivities.map(activity => (
              <CurrentActivity key={activity.title} {...activity} />
            ))}
          </View>
          {/* Past Activities */}
          {pastActivities.length > 0 && (
            <View className="py-2 flex flex-col justify-evenly">
              <Text className="text-[#424242] text-base font-medium">
                Past challenge
              </Text>
              {pastActivities.map(activity => (
                <PastActivity key={activity.title} {...activity} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivitiesPage;
