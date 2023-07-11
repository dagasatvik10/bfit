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

import Header from '../../../components/layout/header';
import {AuthUser} from '../../Login/authSlice';
import {CurrentActivity} from '../../../components/Activity';

const SectionTitle: FC<{title: string}> = ({title}) => {
  return (
    <View className="py-2 flex flex-row justify-between">
      <Text className="text-base text-[#424242] font-medium">{title}</Text>
      {/* TODO: navigate to leader board screen */}
      <Pressable onPress={() => console.log(`${title} view all`)}>
        <Text className="text-[#018e89] font-medium text-base">View all</Text>
      </Pressable>
    </View>
  );
};

interface Props {
  user: AuthUser;
}

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

const HomePage: FC<Props> = ({user}) => {
  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header user={user} />
        {/* Activity Image */}
        <View className="py-2">
          <Image
            className="rounded w-full h-52"
            source={require('../assets/images/workshop.webp')}
          />
        </View>
        {/* Active Challenge */}
        <View className="py-2 flex flex-col">
          <SectionTitle title="Active Challenge" />
          <CurrentActivity
            title="Challenge 3"
            description="8-10 Glasses of water today?"
            points={50}
            done={false}
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
          <SectionTitle title="Leader board" />
          <View className="pt-2 pb-4 flex flex-col bg-[#f5f5f5] rounded-xl shadow-2xl w-full h-[400px]">
            <View className="h-full flex flex-col px-6 justify-evenly">
              <Text className="text-base text-[#424242] font-bold">
                Your Team Position: 2
              </Text>
              {TEAMS.map((team, index) => (
                <View
                  key={team.name}
                  className="flex flex-row justify-start items-center rounded-xl w-full h-16 bg-white">
                  <View className="flex flex-col justify-center items-center rounded-full bg-[#f7b500] h-10 w-10 mx-4">
                    <Text className="text-sm text-center font-bold">
                      {index + 1}
                    </Text>
                  </View>
                  <View className="flex-2 flex-col items-start justify-center">
                    <Text className="text-base text-black font-bold">
                      {team.name}
                    </Text>
                    <Text className="text-black text-sm">
                      {team.points} Points
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
