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

import {CurrentActivity} from '../../../components/Activity';
import {TeamPill} from '../../../components/Team';
import Header from '../../../components/layout/header';
import {HomeStackParamList} from '../../../navigation/HomeStack';
import {RootTabParamList} from '../../../navigation/HomeTab';
import {useGetAuthUserQuery} from '../../../slices/userSlice';
import {getTeamPosition, sortTeamsByKey} from '../../../utils';
import {getPreviousDate} from '../../../utils/date';
import {useFetchCurrentActivitiesQuery} from '../../Activities/activitySlice';
import {
  useFetchTeamByTeamIdQuery,
  useFetchTeamsQuery,
} from '../../TeamSelection/teamSlice';
import {useFetchMetaQuery} from '../slices/metaSlice';

type SectionTitleProps = {
  title: string;
  navigate: () => void;
};

const SectionTitle: FC<SectionTitleProps> = ({title, navigate}) => {
  return (
    <View className="py-2 flex flex-row justify-between">
      <Text className="text-base text-[#424242] font-medium">{title}</Text>
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

  const {data: user} = useGetAuthUserQuery();
  const {data: selectedTeam} = useFetchTeamByTeamIdQuery(user?.teamId!);
  const {data: allTeams = []} = useFetchTeamsQuery('all');
  const {data: currentActivities = []} = useFetchCurrentActivitiesQuery({
    currentDate: currentDate.getTime(),
    previousDate: previousDate.getTime(),
  });
  const {data: metaData} = useFetchMetaQuery({
    currentDate: currentDate.getTime(),
    previousDate: previousDate.getTime(),
  });

  const allTeamsSorted = useMemo(
    () => sortTeamsByKey(allTeams.slice(), 'points', 'desc'),
    [allTeams],
  );

  const teamPosition = useMemo(
    () => getTeamPosition(allTeamsSorted, selectedTeam!),
    [allTeamsSorted, selectedTeam],
  );

  const getRandomHealthTip = () => {
    const healthTips = metaData?.health_tips;
    const randomIndex = Math.floor(Math.random() * healthTips?.length!);
    return healthTips?.[randomIndex];
  };

  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header navigate={() => navigation.navigate('PointsHistory')} />
        {/* Activity Image */}
        <View className="py-2">
          <Image
            className="rounded w-full h-52"
            source={{uri: metaData?.home_banner}}
          />
        </View>
        {/* Active Challenge */}
        <View className="py-2 flex flex-col">
          <SectionTitle
            title="Active Challenge"
            navigate={() => navigation.navigate('Activities')}
          />
          {currentActivities.length > 0 && (
            <CurrentActivity {...currentActivities[0]} />
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
                  {getRandomHealthTip()}
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
                  isCurrent={team.id === selectedTeam?.id}
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
