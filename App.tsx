/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import Navigation from './src/navigation';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Navigation />;
}

export default App;
