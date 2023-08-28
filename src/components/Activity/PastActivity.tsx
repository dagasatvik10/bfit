import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';

import {useFetchUserActivityQuery} from '../../slices/userSlice';

interface Props {
  id: string;
  title: string;
  description: string;
  points: number;
  youtubeLink?: string;
}

export const PastActivity: FC<Props> = ({id, title, description, points}) => {
  const {data: userActivity} = useFetchUserActivityQuery(
    {activityId: id},
    {refetchOnMountOrArgChange: true},
  );
  return (
    <View className="my-4 py-4 bg-[#fef8f1] h-48 rounded-2xl shadow flex flex-col justify-between w-full">
      <View className="flex flex-row justify-start px-4 py-2">
        <Text className="text-black font-bold text-base">{title}</Text>
        {/* <View className="flex flex-row items-center justify-around">
          <Text className="text-xs">{points} points</Text>
          <Image source={require('../../assets/images/coin.webp')} />
        </View> */}
      </View>
      <View className="flex flex-row items-center justify-start px-4">
        <Text className="text-base text-black font-normal">{description}</Text>
      </View>
      <View className="w-full py-2 flex flex-row px-4 justify-start text-center">
        <Image source={require('../../assets/images/coin.webp')} />
        <Text
          className={`pl-2 text-sm ${
            userActivity?.completed ? 'text-[#018e89]' : 'text-[#ff4c02]'
          } font-normal`}>
          {userActivity?.completed
            ? `You have earned ${points} points`
            : `You have missed ${points} points`}
        </Text>
      </View>
    </View>
  );
};
