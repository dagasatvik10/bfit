import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';

interface Props {
  name: string;
  points: number;
  index: number;
  isCurrent: boolean;
}

export const TeamPill: FC<Props> = ({name, points, index, isCurrent}) => {
  return (
    <View
      className={`my-4 flex flex-row justify-start items-center rounded-xl w-full h-16 border-2 border-[#e5e5e5] ${
        isCurrent ? 'bg-[#a2ece9]' : 'bg-white'
      }`}>
      <View className="flex flex-col justify-center items-center rounded-full bg-[#f7b500] h-10 w-10 mx-4">
        {index !== 0 ? (
          <Text className="text-sm text-center font-bold">{index + 1}</Text>
        ) : (
          <Image source={require('../../assets/images/crown.webp')} />
        )}
      </View>
      <View className="flex-2 flex-col items-start justify-center">
        <Text className="text-base text-black font-bold">{name}</Text>
        <Text className="text-black text-sm">{points} Points</Text>
      </View>
    </View>
  );
};