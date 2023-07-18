import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/layout/header';

import {RootTabParamList} from '../../../navigation/HomeTab';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LeaderboardStackParamList} from '../../../navigation/LeaderboardStack';
import {useFetchTeamByTeamIdQuery} from '../../TeamSelection/teamSlice';
import {TeamPill} from '../../../components/Team';
import {useAppSelector} from '../../../app/hooks';
import {selectAuthUser} from '../../../slices/userSlice';
import {Card} from 'react-native-paper';
import {User} from '../../../types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<LeaderboardStackParamList, 'Team'>,
  BottomTabScreenProps<RootTabParamList>
>;

const USERS: User[] = [
  {
    id: 'johndoe@example.com',
    name: 'John Doe',
    email: 'johndoe@example.com',
    points: 100,
    teamId: 'nXtcf99bC9FlZ62bgBm2',
    createdAt: Date.now(),
  },
  {
    id: 'satvikdaga@gmail.com',
    name: 'Satvik Daga',
    email: 'satvik@example.com',
    points: 200,
    teamId: 'nXtcf99bC9FlZ62bgBm2',
    createdAt: Date.now(),
  },
];

export const TeamPage: FC<Props> = ({route, navigation}) => {
  const {teamId} = route.params;
  const user = useAppSelector(selectAuthUser);
  const {data: team} = useFetchTeamByTeamIdQuery(teamId);
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
            <Card className="-my-8">
              <Card.Content>
                <View className="flex flex-col justify-start mx-4 mt-4">
                  <View className="flex flex-row justify-between mb-4">
                    <Text className="font-bold text-xs text-[#f7b500]">
                      Team Member
                    </Text>
                    <Text className="font-normal text-xs text-[#f7b500]">
                      Earn Points
                    </Text>
                  </View>
                  <View className="border-[1px] border-dashed border-[#cccccc]" />
                  {USERS.map(u => (
                    <View
                      key={u.id}
                      className="flex flex-row justify-between my-2">
                      <Text
                        className={`text-[11px] ${getUserColor(u)} font-bold`}>
                        {u.name}
                      </Text>
                      <Text
                        className={`text-[11px] ${getUserColor(
                          u,
                        )} font-normal`}>
                        {u.points} Points
                      </Text>
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
