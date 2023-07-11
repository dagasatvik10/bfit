import React, {FC} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import Header from '../../../components/layout/header';
import {TeamPill} from '../../../components/Team';

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

const LeaderboardPage: FC = () => {
  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header />
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
