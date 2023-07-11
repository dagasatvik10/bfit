import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';

import {selectUser} from '../../../features/Login/authSlice';
import {useAppSelector} from '../../../app/hooks';

const Header: FC = () => {
  const user = useAppSelector(selectUser);
  return (
    user && (
      <View className="flex flex-row justify-between pb-2">
        <View className="flex flex-row w-1/3 justify-start items-center">
          <Image
            source={{uri: user.photoURL!}}
            className="w-[50px] h-[50px] rounded-full"
          />
          <View className="flex flex-col justify-center items-center ml-1 text-black">
            <Text className="text-sm">Welcome</Text>
            <Text className="font-medium text-base">{user.displayName}</Text>
          </View>
        </View>
        <View className="flex flex-row w-1/3 justify-end items-center">
          <View className="flex flex-col justify-center items-center mr-1 text-black">
            <Text className="font-bold text-base">100</Text>
            <Text className="text-sm">Points</Text>
          </View>
          <Image source={require('../../../assets/images/coin.webp')} />
        </View>
      </View>
    )
  );
};

export default Header;
