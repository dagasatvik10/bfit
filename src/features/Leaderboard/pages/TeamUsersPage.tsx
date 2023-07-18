import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/layout/header';

import {RootTabParamList} from '../../../navigation/HomeTab';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LeaderboardStackParamList} from '../../../navigation/LeaderboardStack';

type Props = CompositeScreenProps<
  NativeStackScreenProps<LeaderboardStackParamList, 'TeamUsers'>,
  BottomTabScreenProps<RootTabParamList>
>;

export const TeamUsersPage: FC<Props> = ({route, navigation}) => {
  const {teamId} = route.params;
  console.log(teamId);
  return (
    <SafeAreaView className="container flex-1">
      <ScrollView className="flex flex-col">
        <Header
          navigate={() =>
            navigation.navigate('HomeStack', {screen: 'PointsHistory'})
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};
