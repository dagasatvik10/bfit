import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useMemo} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAppSelector} from '../../../app/hooks';
import {CurrentActivity} from '../../../components/Activity';
import {TeamPill} from '../../../components/Team';
import Header from '../../../components/layout/header';
import {HomeStackParamList} from '../../../navigation/HomeStack';
import {RootTabParamList} from '../../../navigation/HomeTab';
import {selectAuthUser} from '../../../slices/userSlice';
import {getTeamPosition, sortTeamsByKey} from '../../../utils';
import {useFetchCurrentActivitiesQuery} from '../../Activities/activitySlice';
import {getPreviousDate} from '../../../utils/date';
import {
  useFetchTeamByTeamIdQuery,
  useFetchTeamsQuery,
} from '../../TeamSelection/teamSlice';

type SectionTitleProps = {
  title: string;
  navigate: () => void;
};

const SectionTitle: FC<SectionTitleProps> = ({title, navigate}) => {
  return (
    <View className="py-2 flex flex-row justify-between">
      <Text className="text-base text-[#424242] font-medium">{title}</Text>
      {/* TODO: navigate */}
      <Pressable onPress={() => navigate()}>
        <Text className="text-[#018e89] font-medium text-base">View all</Text>
      </Pressable>
    </View>
  );
};

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Home'>,
  BottomTabScreenProps<RootTabParamList>
>;

const HomePage: FC<Props> = ({navigation}) => {
  const currentDate = useMemo(() => new Date(), []);
  const previousDate = useMemo(
    () => getPreviousDate(currentDate, 7),
    [currentDate],
  );

  const user = useAppSelector(selectAuthUser);
  const selectedTeamData = useFetchTeamByTeamIdQuery(user?.teamId!);
  const {data: allTeams = []} = useFetchTeamsQuery();
  const {data: currentActivities = []} = useFetchCurrentActivitiesQuery({
    currentDate: currentDate.getTime(),
    previousDate: previousDate.getTime(),
  });

  const allTeamsSorted = useMemo(
    () => sortTeamsByKey(allTeams.slice(), 'points', 'desc'),
    [allTeams],
  );

  const teamPosition = useMemo(
    () => getTeamPosition(allTeamsSorted, selectedTeamData.data!),
    [allTeamsSorted, selectedTeamData],
  );
  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header navigate={() => navigation.navigate('PointsHistory')} />
        {/* Activity Image */}
        <View className="py-2">
          <Image
            className="rounded w-full h-52"
            source={require('../assets/images/workshop.webp')}
          />
        </View>
        {/* Active Challenge */}
        <View className="py-2 flex flex-col">
          <SectionTitle
            title="Active Challenge"
            navigate={() => navigation.navigate('Activities')}
          />
          {currentActivities[0] && (
            <CurrentActivity
              title={currentActivities[0].title}
              description={currentActivities[0].description}
              points={currentActivities[0].points}
              done={false}
            />
          )}
        </View>
        {/* Health Tips */}
        <View className="py-2 h-60 w-full">
          <ImageBackground
            className="h-full flex flex-col w-full rounded-2xl justify-center"
            source={require('../assets/images/health_bg.webp')}>
            <View className="flex flex-col px-8 justify-center">
              <View className="flex flex-row justify-start">
                <Text className="text-white text-xl font-bold">
                  Today's health tip
                </Text>
              </View>
              <View className="border-b-2 border-white" />
              <View>
                <Text className="text-white text-lg font-normal py-2">
                  Eat a balanced diet, stay hydrated, exercise regularly, get
                  enough sleep, and practice good hygiene for overall health and
                  well-being.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* Leader board */}
        <View className="py-2 mb-4 flex flex-col">
          <SectionTitle
            title="Leader board"
            navigate={() =>
              navigation.navigate('LeaderboardStack', {screen: 'Leaderboard'})
            }
          />
          <View className="pt-2 pb-4 flex flex-col bg-[#f5f5f5] rounded-xl shadow-2xl w-full h-[400px]">
            <View className="h-full flex flex-col px-6 justify-evenly">
              <Text className="text-base text-[#424242] font-bold">
                Your Team Position: {teamPosition}
              </Text>
              {allTeamsSorted.slice(0, 4).map((team, index) => (
                <TeamPill
                  key={team.id}
                  navigate={(teamId: string) =>
                    navigation.navigate('LeaderboardStack', {
                      screen: 'Team',
                      params: {teamId},
                    })
                  }
                  id={team.id}
                  name={team.name}
                  points={team.points}
                  index={index}
                  isCurrent={team.id === selectedTeamData?.data?.id}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
