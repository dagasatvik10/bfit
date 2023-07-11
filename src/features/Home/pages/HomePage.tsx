import React, {FC} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CurrentActivity} from '../../../components/Activity';
import {TeamPill} from '../../../components/Team';
import Header from '../../../components/layout/header';
import {selectCurrentActivities} from '../../Activities/activitySlice';
import {useAppSelector} from '../../../app/hooks';
// import {useAppDispatch} from '../../../app/hooks';
// import {signOut} from '../../Login/authSlice';

const SectionTitle: FC<{title: string; navigateTo: string}> = ({
  title,
  navigateTo,
}) => {
  const navigation = useNavigation();
  return (
    <View className="py-2 flex flex-row justify-between">
      <Text className="text-base text-[#424242] font-medium">{title}</Text>
      {/* TODO: navigate */}
      <Pressable onPress={() => navigation.navigate(navigateTo)}>
        {/* <Pressable onPress={() => dispatch(signOut())}> */}
        <Text className="text-[#018e89] font-medium text-base">View all</Text>
      </Pressable>
    </View>
  );
};

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
];

const HomePage: FC = () => {
  const currentActivities = useAppSelector(selectCurrentActivities);
  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header />
        {/* Activity Image */}
        <View className="py-2">
          <Image
            className="rounded w-full h-52"
            source={require('../assets/images/workshop.webp')}
          />
        </View>
        {/* Active Challenge */}
        <View className="py-2 flex flex-col">
          <SectionTitle title="Active Challenge" navigateTo="Activities" />
          <CurrentActivity
            title={currentActivities[0].title}
            description={currentActivities[0].description}
            points={currentActivities[0].points}
            done={currentActivities[0].done}
          />
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
          <SectionTitle title="Leader board" navigateTo="Leaderboard" />
          <View className="pt-2 pb-4 flex flex-col bg-[#f5f5f5] rounded-xl shadow-2xl w-full h-[400px]">
            <View className="h-full flex flex-col px-6 justify-evenly">
              <Text className="text-base text-[#424242] font-bold">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
