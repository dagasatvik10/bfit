import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {Activity} from '../../../types';
import {useFetchUserActivityQuery} from '../../../slices/userSlice';

interface Props {
  activity: Activity;
  isCurrent?: boolean;
}

export const Points: FC<Props> = ({activity, isCurrent}) => {
  const {data: userActivity} = useFetchUserActivityQuery({
    activityId: activity.id,
  });
  return (
    (!isCurrent || userActivity?.completed) && (
      <View key={activity.title} className="flex flex-col justify-start my-2">
        <View className="flex flex-row rounded-xl justify-between items-center border-2 border-[#e5e5e5] h-14 px-4">
          <Text className="font-medium text-sm text-black">
            {activity.title} {userActivity?.completed ? 'Completed' : 'Missed'}
          </Text>
          <Text
            className={`font-medium text-xs ${
              userActivity?.completed ? 'text-[#018e89]' : 'text-[#ff4c02]'
            } `}>
            50 Points
          </Text>
        </View>
      </View>
    )
  );
};
