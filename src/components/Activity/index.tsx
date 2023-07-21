import React, {FC} from 'react';
import {Image, Linking, Pressable, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';

import {
  useAddUserActivityMutation,
  useFetchUserActivityQuery,
  useGetAuthUserQuery,
} from '../../slices/userSlice';

interface Props {
  id: string;
  title: string;
  description: string;
  points: number;
  youtubeLink?: string;
}

export const CurrentActivity: FC<Props> = ({
  id,
  title,
  description,
  points,
  youtubeLink,
}) => {
  const {data: user} = useGetAuthUserQuery();
  const {data: userActivity} = useFetchUserActivityQuery(
    {activityId: id},
    {refetchOnMountOrArgChange: true},
  );
  const [addUserActivity] = useAddUserActivityMutation();
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
      {youtubeLink && (
        <Pressable
          onPress={() => Linking.openURL(youtubeLink)}
          className="flex flex-row items-center justify-center my-2">
          <Text className="text-base text-blue-500 font-normal">
            Watch video
          </Text>
        </Pressable>
      )}
      <View className="w-full py-2">
        {userActivity?.completed ? (
          <View className="rounded-full bg-[#018e89] items-center py-2 my-4 w-full">
            <Text className="text-base font-bold text-white">Completed</Text>
          </View>
        ) : (
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row justify-start items-center">
              <IconButton
                icon="camera"
                iconColor="#018e89"
                size={20}
                className="w-1/4"
              />
            </View>
            <Pressable
              className="flex flex-row items-center justify-center w-3/4"
              onPress={() =>
                addUserActivity({
                  activityId: id,
                  points,
                  userId: user?.id!,
                  teamId: user?.teamId!,
                })
              }>
              <View className="rounded-full bg-[#018e89] items-center p-2 mr-4 w-full">
                <Text className="text-base font-bold text-white">Yes</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export const PastActivity: FC<Props> = ({title, description, points}) => {
  const done = false;
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
