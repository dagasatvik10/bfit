import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';

import {AuthUser, signOut} from '../../Login/authSlice';
import {useAppDispatch} from '../../../app/hooks';

function HomePage({user}: {user: AuthUser}): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text>Welcome {user.displayName}</Text>

        <Button title={'Sign out'} onPress={() => dispatch(signOut())} />
      </View>
    </SafeAreaView>
  );
}

export default HomePage;
