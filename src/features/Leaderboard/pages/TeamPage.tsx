import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Card} from 'react-native-paper';

import Header from '../../../components/layout/header';

import {TeamPill} from '../../../components/Team';
import {RootTabParamList} from '../../../navigation/HomeTab';
import {LeaderboardStackParamList} from '../../../navigation/LeaderboardStack';
import {
  useFetchUsersByTeamIdQuery,
  useGetAuthUserQuery,
} from '../../../slices/userSlice';
import {User} from '../../../types';
import {useFetchTeamByTeamIdQuery} from '../../TeamSelection/teamSlice';

type Props = CompositeScreenProps<
  NativeStackScreenProps<LeaderboardStackParamList, 'Team'>,
  BottomTabScreenProps<RootTabParamList>
>;

export const TeamPage: FC<Props> = ({route, navigation}) => {
  const {teamId} = route.params;
  const {data: user} = useGetAuthUserQuery('auth');
  const {data: team} = useFetchTeamByTeamIdQuery(teamId, {
    refetchOnMountOrArgChange: true,
  });
  const {data: users = []} = useFetchUsersByTeamIdQuery(
    {teamId},
    {refetchOnMountOrArgChange: true},
  );
  const getUserColor = (u: User) =>
    u.id === user?.id ? 'text-[#018e89]' : 'text-[#424242]';

  return (
    <SafeAreaView className="container flex-1">
      <ScrollView className="flex flex-col my-4 mx-4">
        <Header
          navigate={() =>
            navigation.navigate('HomeStack', {screen: 'PointsHistory'})
          }
        />
        <View className="my-4 border-2 border-[#e5e5e5]" />
        {team && (
          <View className="flex flex-col justify-start mx-4 my-4">
            <View>
              <Text className="font-bold text-base text-[#424242]">
                {team?.name} Details
              </Text>
            </View>
            <TeamPill
              icon="chevron-up"
              id={team.id}
              name={team.name!}
              points={team.points!}
              index={1}
              isCurrent={user?.teamId === teamId}
            />
            {users.length > 0 && (
              <Card className="-my-8">
                <Card.Content>
                  <View className="flex flex-col justify-start mx-4 mt-4">
                    <View className="flex flex-row justify-between mb-4">
                      <Text className="font-bold text-xs text-[#f7b500]">
                        Team Member
                      </Text>
                      <Text className="font-normal text-xs text-[#f7b500]">
                        Points Earned
                      </Text>
                    </View>
                    <View className="border-[1px] border-dashed border-[#cccccc]" />
                    {users.map(u => (
                      <View
                        key={u.id}
                        className="flex flex-row justify-between my-2">
                        <Text
                          className={`text-[11px] ${getUserColor(
                            u,
                          )} font-bold`}>
                          {u.name}
                        </Text>
                        <Text
                          className={`text-[11px] ${getUserColor(
                            u,
                          )} font-normal`}>
                          {user?.teamId === teamId
                            ? `${u.points} Points`
                            : 'Not Available'}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Card.Content>
              </Card>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
