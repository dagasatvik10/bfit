import React, {FC} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

import {useGetAuthUserQuery} from '../../../slices/userSlice';

type Props = {
  navigate: () => void;
};
const Header: FC<Props> = ({navigate}) => {
  const {data: user} = useGetAuthUserQuery('auth', {
    refetchOnMountOrArgChange: true,
  });
  return (
    user && (
      <View className="flex flex-row justify-between pb-2">
        <Pressable
          className="flex flex-row w-1/3 justify-start items-center"
          onPress={() => navigate()}>
          <Image
            source={require('../../../assets/images/logo.webp')}
            className="w-[50px] h-[50px] rounded-full"
          />
          <View className="flex flex-col justify-center items-center ml-1">
            <Text className="text-sm text-black">Welcome</Text>
            <Text className="font-medium text-base  text-black">
              {user.name}
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate()}
          className="flex flex-row w-1/3 justify-end items-center">
          <View className="flex flex-col justify-center items-center mr-1">
            <Text className="font-bold text-base text-black">
              {user.points}
            </Text>
            <Text className="text-sm text-black">Points</Text>
          </View>

          <Image source={require('../../../assets/images/coin.webp')} />
        </Pressable>
      </View>
    )
  );
};

export default Header;
