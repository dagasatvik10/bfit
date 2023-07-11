import React, {FC} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

interface Props {
  title: string;
  description: string;
  points: number;
  done: boolean;
}

export const CurrentActivity: FC<Props> = ({
  title,
  description,
  points,
  done,
}) => {
  return (
    <View className="my-4 py-4 px-4 bg-[#fef8f1] h-48 rounded-2xl shadow flex flex-col justify-between w-full">
      <View className="flex flex-row justify-between py-2">
        <Text className="text-black font-bold text-base">{title}</Text>
        <View className="flex flex-row items-center justify-around">
          <Text className="text-xs">{points} points</Text>
          <Image source={require('../../assets/images/coin.webp')} />
        </View>
      </View>
      <View className="flex flex-row items-center justify-center">
        <Text className="text-base text-black font-normal">{description}</Text>
      </View>
      <View className="w-full py-2">
        {/* TODO: dispatch activity done action */}
        <Pressable
          className="w-full flex flex-row items-center justify-center"
          onPress={() => console.log(`${title} done`)}
          disabled={done}>
          <View className="rounded-full bg-[#018e89] items-center p-2 w-full">
            <Text className="text-base font-bold text-white">Yes</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export const PastActivity: FC<Props> = ({title, description, points, done}) => {
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
            done ? 'text-[#018e89]' : 'text-[#ff4c02]'
          } font-normal`}>
          {done
            ? `You have earned ${points} points`
            : `You have missed ${points} points`}
        </Text>
      </View>
    </View>
  );
};
