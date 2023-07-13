import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAppSelector} from '../../../app/hooks';
import {HomeStackParamList} from '../../../navigation/HomeStack';
import {selectSelectedTeam} from '../teamSlice';

type Props = NativeStackScreenProps<HomeStackParamList, 'SelectionDone'>;

const SelectionDonePage: FC<Props> = ({navigation}) => {
  const selectedTeam = useAppSelector(selectSelectedTeam);

  return (
    selectedTeam && (
      <SafeAreaView className="flex-1">
        <View className="basis-1/3 justify-center items-center">
          <View className="flex-1 justify-end">
            <Text className="text-[#55b295] text-3xl font-bold text-center py-1">
              Congratulations!
            </Text>
            <Text className="text-black text-2xl text-center py-1">
              You are the member of
            </Text>
          </View>
          <View className="flex-1 pt-5 justify-start">
            <View className="rounded-full w-48 bg-[#FFF2E2] items-center px-3 py-2">
              <Text className="text-3xl font-bold text-black">
                {selectedTeam.name}
              </Text>
            </View>
          </View>
        </View>

        <View className="basis-2/3 items-center justify-between">
          <View className="basis-3/4">
            <Image source={require('../assets/images/fans.webp')} />
          </View>
          <View className="basis-1/4">
            {/* TODO: navigate to home screen */}
            <Pressable onPress={() => navigation.navigate('Home')}>
              <View className="rounded-full w-80 bg-[#f9c06c] items-center p-2">
                <Text className="text-2xl font-bold text-black">Let's Go</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    )
  );
};

export default SelectionDonePage;
