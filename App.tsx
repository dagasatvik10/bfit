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
import {selectUser} from './src/features/Auth/authSlice';
import {onUserSignIn} from './src/lib/auth';
import Navigation from './src/navigation';
import {SelectTeamPage} from './src/features';
import {selectSelectedTeam} from './src/features/TeamSelection/teamSlice';
import {AuthStack} from './src/navigation/AuthStack';

function App(): JSX.Element {
  const user = useAppSelector(selectUser);
  const selectedTeam = useAppSelector(selectSelectedTeam);

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
    return <AuthStack />;
  }

  if (!selectedTeam) {
    return <SelectTeamPage />;
  }

  return <Navigation />;
}

export default App;
