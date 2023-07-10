import React, {FC} from 'react';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';

import {useAppDispatch} from '../../../app/hooks';
import Header from '../../../components/layout/header';
import {AuthUser, signOut} from '../../Login/authSlice';

interface Props {
  user: AuthUser;
}

const HomePage: FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView className="flex-1 container">
      <ScrollView className="flex-1 px-4 py-4">
        <Header user={user} />
        <View className="flex-1 items-center justify-center">
          <Text>Welcome {user.displayName}</Text>

          <Button title={'Sign out'} onPress={() => dispatch(signOut())} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
