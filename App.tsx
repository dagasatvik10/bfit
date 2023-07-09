/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {StrictMode, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

import {LoginPage} from './src/features';
import {Button, SafeAreaView, Text, View} from 'react-native';

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChange(user) {
    console.log('hey');
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  });

  if (initializing) {
    return null;
  }
  if (!user) {
    return (
      <SafeAreaView className="flex-1">
        <LoginPage />
      </SafeAreaView>
    );
  }

  return (
    <StrictMode>
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Text>Welcome {user.displayName}</Text>
          <Button
            title={'Sign out'}
            onPress={() =>
              auth()
                .signOut()
                .then(() => {
                  console.log('Signed out');
                })
            }
          />
        </View>
      </SafeAreaView>
    </StrictMode>
  );
}

export default App;
