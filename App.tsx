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
import {selectUser} from './src/features/Login/authSlice';
import {onUserSignIn} from './src/lib/auth';
import Navigation from './src/navigation';
import {LoginPage} from './src/features';

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

  return <Navigation />;
}

export default App;
