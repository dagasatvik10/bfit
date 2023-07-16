import React, {FC} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

import {useAppSelector} from '../../../app/hooks';
import {selectCurrentActivities} from '../../../features/Activities/activitySlice';
import {selectUser} from '../../../features/Auth/authSlice';

type Props = {
  navigate: () => void;
};
const Header: FC<Props> = ({navigate}) => {
  const user = useAppSelector(selectUser);
  const currentActivities = useAppSelector(selectCurrentActivities);
  return (
    user && (
      <View className="flex flex-row justify-between pb-2">
        <Pressable
          className="flex flex-row w-1/3 justify-start items-center"
          onPress={() => navigate()}>
          <Image
            source={{uri: user.photoURL!}}
            className="w-[50px] h-[50px] rounded-full"
          />
          <View className="flex flex-col justify-center items-center ml-1 text-black">
            <Text className="text-sm">Welcome</Text>
            <Text className="font-medium text-base">{user.displayName}</Text>
          </View>
        </Pressable>
        <View className="flex flex-row w-1/3 justify-end items-center">
          <View className="flex flex-col justify-center items-center mr-1 text-black">
            <Text className="font-bold text-base">
              {currentActivities.filter(val => val.done).length * 50}
            </Text>
            <Text className="text-sm">Points</Text>
          </View>
          <Image source={require('../../../assets/images/coin.webp')} />
        </View>
      </View>
    )
  );
};

export default Header;
