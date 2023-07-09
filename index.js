/**
 * @format
 */

import React, {StrictMode} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import App from './App';
import {name as appName} from './app.json';
import {store} from './src/app/store';

GoogleSignin.configure({
  webClientId:
    '791972729440-vmh7151kmp52644ipm8ihc6e9beco2hb.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => () => (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
));
