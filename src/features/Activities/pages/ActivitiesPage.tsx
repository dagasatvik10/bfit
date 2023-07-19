import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {FC, useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {CurrentActivity, PastActivity} from '../../../components/Activity';
import Header from '../../../components/layout/header';
import {RootTabParamList} from '../../../navigation/HomeTab';
import {
  useFetchCurrentActivitiesQuery,
  useFetchPastActivitiesQuery,
} from '../activitySlice';
import {getPreviousDate} from '../../../utils/date';

type Props = BottomTabScreenProps<RootTabParamList, 'Activities'>;

const ActivitiesPage: FC<Props> = ({navigation}) => {
  const currentDate = useMemo(() => new Date(), []);
  const previousDate = useMemo(
    () => getPreviousDate(currentDate, 7),
    [currentDate],
  );
  const {data: currentActivities = []} = useFetchCurrentActivitiesQuery({
    currentDate: currentDate.getTime(),
    previousDate: previousDate.getTime(),
  });
  const {data: pastActivities = []} = useFetchPastActivitiesQuery({
    currentDate: currentDate.getTime(),
  });

  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header
          navigate={() =>
            navigation.navigate('HomeStack', {
              screen: 'PointsHistory',
            })
          }
        />
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
            {currentActivities?.map(activity => (
              <CurrentActivity
                key={activity.title}
                {...activity}
                done={false}
              />
            ))}
          </View>
          {/* Past Activities */}
          {pastActivities.length > 0 && (
            <View className="py-2 flex flex-col justify-evenly">
              <Text className="text-[#424242] text-base font-medium">
                Past challenge
              </Text>
              {pastActivities.map(activity => (
                <PastActivity key={activity.title} {...activity} done={false} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivitiesPage;
