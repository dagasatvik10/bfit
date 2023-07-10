/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {useAppSelector} from './src/app/hooks';
import {LoginPage, SelectionDonePage} from './src/features';
import {selectUser} from './src/features/Login/authSlice';
import {onUserSignIn} from './src/lib/auth';

function App(): JSX.Element {
  const user = useAppSelector(selectUser);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(
      (authUser: FirebaseAuthTypes.User | null) => {
        if (authUser) {
          onUserSignIn(authUser).catch(error => {
            console.info('Error: ', error);
          });
        }
      },
    );
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <LoginPage />;
  }

  // return <HomePage user={user} />;
  return <SelectionDonePage teamName="Three" />;
}

export default App;
