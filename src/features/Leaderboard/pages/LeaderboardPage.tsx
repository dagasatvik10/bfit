import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '../../../components/layout/header';
import {TeamPill} from '../../../components/Team';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../navigation/HomeStack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../../navigation';

const TEAMS = [
  {
    name: 'Team One',
    points: 200,
  },
  {
    name: 'Team Four',
    points: 100,
  },
  {
    name: 'Team Two',
    points: 50,
  },
  {
    name: 'Team Three',
    points: 50,
  },
  {
    name: 'Team Five',
    points: 50,
  },
];

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Leaderboard'>,
  BottomTabScreenProps<RootTabParamList>
>;

const LeaderboardPage: FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header navigate={() => navigation.navigate('PointsHistory')} />
        <View className="flex flex-col py-2">
          {/* Leaderboard */}
          <View className="py-2 flex flex-col justify-between items-start">
            <Text className="text-black text-2xl font-bold">Leaderboard</Text>
          </View>
          <View className="py-2 flex flex-col justify-evenly">
            <Text className="text-[#424242] text-base font-bold">
              Your Team Position: 2
            </Text>
            {TEAMS.map((team, index) => (
              <TeamPill
                key={team.name}
                name={team.name}
                points={team.points}
                index={index}
                isCurrent={team.name === 'Team Four'}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaderboardPage;
