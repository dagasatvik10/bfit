import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useMemo, useRef} from 'react';
import {Animated, Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {TeamStackParamList} from '../../../navigation/TeamStack';
import {sortTeamsByKey} from '../../../utils';
import {useFetchTeamsQuery} from '../teamSlice';

type Props = NativeStackScreenProps<TeamStackParamList, 'SelectTeam'>;

export const SelectTeamPage: FC<Props> = ({navigation}) => {
  const {data: allTeams = [], isSuccess} = useFetchTeamsQuery('all');

  const sortedTeams = useMemo(
    () => sortTeamsByKey(allTeams.slice(), 'sortKey'),
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
          navigation.navigate('SelectionDone', {team: selected});
        }, 1000);
      });
    };

    return (
      <SafeAreaView className="flex-1">
        <View className="basis-1/4 justify-center items-center">
          <View className="flex-1 justify-center">
            <Text className="text-black text-2xl text-center py-1 font-bold">
              Find Out Your Team
            </Text>
          </View>
          <View className="basis-1/4">
            <Pressable onPress={async () => spinWheel()}>
              <View className="rounded-full w-80 bg-[#f9c06c] items-center p-2">
                <Text className="text-xl font-bold text-black">Tap here</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View className="basis-3/4 items-center justify-end pb-2">
          <Image
            className="-m-20 z-10"
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
