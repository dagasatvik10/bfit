/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import CodePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';

import Navigation from './src/navigation';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Navigation />;
}

export default CodePush(codePushOptions)(App);
