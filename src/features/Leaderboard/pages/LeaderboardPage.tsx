import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAppSelector} from '../../../app/hooks';
import {TeamPill} from '../../../components/Team';
import Header from '../../../components/layout/header';
import {RootTabParamList} from '../../../navigation';
import {HomeStackParamList} from '../../../navigation/HomeStack';
import {getTeamPosition, sortTeams} from '../../../utils';
import {
  Team,
  selectAllTeams,
  selectSelectedTeam,
} from '../../TeamSelection/teamSlice';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Leaderboard'>,
  BottomTabScreenProps<RootTabParamList>
>;

const LeaderboardPage: FC<Props> = ({navigation}) => {
  const selectedTeam = useAppSelector(selectSelectedTeam);
  const allTeams = useAppSelector(selectAllTeams);

  const allTeamsSorted = useMemo(() => sortTeams(allTeams), [allTeams]);
  const teamPosition = useMemo(
    () => getTeamPosition(allTeamsSorted, selectedTeam!),
    [allTeamsSorted, selectedTeam],
  );
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
              Your Team Position: {teamPosition}
            </Text>
            {allTeamsSorted.map((team: Team, index: number) => (
              <TeamPill
                key={team.name}
                name={team.name}
                points={team.points}
                index={index}
                isCurrent={team.name === selectedTeam?.name}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaderboardPage;
