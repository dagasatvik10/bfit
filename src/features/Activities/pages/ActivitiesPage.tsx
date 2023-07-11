import React, {FC} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import {CurrentActivity, PastActivity} from '../../../components/Activity';
import Header from '../../../components/layout/header';
import {AuthUser} from '../../Login/authSlice';

interface Props {
  user: AuthUser;
}

const CURRENT_ACTIVITIES = [
  {
    title: 'Challenge 3',
    description: '8-10 Glasses of water today?',
    points: 50,
    done: false,
  },
  {
    title: 'Challenge 4',
    description: 'Did you Sleep 6-8 hours today?',
    points: 50,
    done: false,
  },
];

const PAST_ACTIVITIES = [
  {
    title: 'Challenge 1',
    description: '8-10 Glasses of water today?',
    points: 50,
    done: true,
  },
  {
    title: 'Challenge 2',
    description: 'Did you Sleep 6-8 hours today?',
    points: 50,
    done: false,
  },
];

const ActivitiesPage: FC<Props> = ({user}) => {
  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header user={user} />
        <View className="flex flex-col py-2">
          {/* Activities */}
          <View className="flex flex-col justify-between items-start">
            <Text className="text-black text-2xl font-bold">Activities</Text>
          </View>
          {/* Current Activities */}
          <View className="py-2 flex flex-col justify-evenly">
            <Text className="text-[#424242] text-base font-medium">
              Active challenge of this week
            </Text>
            {CURRENT_ACTIVITIES.map(activity => (
              <CurrentActivity key={activity.title} {...activity} />
            ))}
          </View>
          {/* Past Activities */}
          <View className="py-2 flex flex-col justify-evenly">
            <Text className="text-[#424242] text-base font-medium">
              Past challenge
            </Text>
            {PAST_ACTIVITIES.map(activity => (
              <PastActivity key={activity.title} {...activity} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivitiesPage;
