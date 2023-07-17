import React, {useMemo, useRef} from 'react';
import {Animated, Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAppSelector} from '../../../app/hooks';
import {selectAuthUser} from '../../Auth/slices/userSlice';
import {useFetchTeamsQuery, useSetUserTeamMutation} from '../teamSlice';
import {sortTeamsBySortKey} from '../utils';

export const SelectTeamPage = () => {
  const user = useAppSelector(selectAuthUser);
  const {data: allTeams = [], isSuccess} = useFetchTeamsQuery();
  const [setUserTeam] = useSetUserTeamMutation();

  const sortedTeams = useMemo(
    () => sortTeamsBySortKey(allTeams.slice()),
    [allTeams],
  );
  const teamsCount = sortedTeams.length;

  const rotateAnimation = useRef(new Animated.Value(0)).current;

  if (isSuccess) {
    const rotateData = rotateAnimation.interpolate({
      inputRange: [0, teamsCount],
      outputRange: ['0deg', '360deg'],
    });

    const spinWheel = () => {
      const randomIndex = Math.floor(Math.random() * sortedTeams.length);
      const selected = sortedTeams[randomIndex];

      Animated.timing(rotateAnimation, {
        toValue: teamsCount * teamsCount + randomIndex,
        duration: 5000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          console.log('selected', selected);
          setUserTeam({teamId: selected.id, userId: user?.id!});
        }, 2000);
      });
    };

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
            <Pressable onPress={async () => spinWheel()}>
              <View className="rounded-full w-80 bg-[#f9c06c] items-center p-2">
                <Text className="text-2xl font-bold text-black">Tap here</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View className="basis-2/3 items-center justify-end pb-4">
          <Image
            className="-m-8 z-10"
            source={require('../assets/images/arrow.webp')}
          />
          <Animated.Image
            className="pb-2"
            style={{
              transform: [{rotate: rotateData}, {perspective: 1000}],
            }}
            source={require('../assets/images/wheel.webp')}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default SelectTeamPage;
