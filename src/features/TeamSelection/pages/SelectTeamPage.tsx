import React from 'react';
import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectAllTeams, selectTeam} from '../teamSlice';

export const SelectTeamPage = () => {
  const allTeams = useAppSelector(selectAllTeams);
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView className="flex-1">
      <View className="basis-1/3 justify-center items-center">
        <View className="flex-1 justify-center">
          <Text className="text-black text-2xl text-center py-1 font-bold">
            Find Out Your Team
          </Text>
        </View>
        <View className="basis-1/4">
          {/* TODO: navigate to home screen */}
          <Pressable onPress={() => dispatch(selectTeam(allTeams[2]))}>
            <View className="rounded-full w-80 bg-[#f9c06c] items-center p-2">
              <Text className="text-2xl font-bold text-black">Tap here</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View className="basis-2/3 items-center justify-end">
        <Image source={require('../assets/images/wheel.webp')} />
      </View>
    </SafeAreaView>
  );
};

export default SelectTeamPage;
