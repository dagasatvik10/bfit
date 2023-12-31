import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {TeamPill} from '../../../components/Team';
import Header from '../../../components/layout/header';
import {RootTabParamList} from '../../../navigation/HomeTab';
import {LeaderboardStackParamList} from '../../../navigation/LeaderboardStack';
import {useGetAuthUserQuery} from '../../../slices/userSlice';
import {Team} from '../../../types';
import {getTeamPosition, sortTeamsByKey} from '../../../utils';
import {
  useFetchTeamByTeamIdQuery,
  useFetchTeamsQuery,
} from '../../TeamSelection/teamSlice';
import {IconButton} from 'react-native-paper';

type Props = CompositeScreenProps<
  NativeStackScreenProps<LeaderboardStackParamList, 'Leaderboard'>,
  BottomTabScreenProps<RootTabParamList>
>;

const LeaderboardPage: FC<Props> = ({navigation}) => {
  const {data: user} = useGetAuthUserQuery('auth');
  const {data: selectedTeamData} = useFetchTeamByTeamIdQuery(user?.teamId!);
  const {data: allTeams = [], refetch} = useFetchTeamsQuery('all', {
    refetchOnMountOrArgChange: true,
  });

  const allTeamsSorted = useMemo(
    () => sortTeamsByKey(allTeams.slice(), 'points', 'desc'),
    [allTeams],
  );
  const teamPosition = useMemo(
    () => getTeamPosition(allTeamsSorted, selectedTeamData!),
    [allTeamsSorted, selectedTeamData],
  );

  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header
          navigate={() =>
            navigation.navigate('HomeStack', {
              screen: 'PointsHistory',
            })
          }
        />
        <View className="flex flex-col py-2">
          {/* Leaderboard */}
          <View className="py-2 flex flex-row justify-start items-center">
            <Text className="text-black text-2xl font-bold">Leaderboard</Text>
            <IconButton icon="refresh" onPress={() => refetch()} />
          </View>
          <View className="py-2 flex flex-col justify-evenly">
            <Text className="text-[#424242] text-base font-bold">
              Your Team Position: {teamPosition}
            </Text>
            {selectedTeamData &&
              allTeamsSorted.map((team: Team, index: number) => (
                <TeamPill
                  key={team.name}
                  navigate={(teamId: string) =>
                    navigation.navigate('Team', {teamId})
                  }
                  id={team.id}
                  name={team.name}
                  points={team.points}
                  index={index}
                  isCurrent={team.id === selectedTeamData.id}
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaderboardPage;
