/**
 * @format
 */

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {StrictMode} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import App from './App';
import {name as appName, auth} from './app.json';
import {persistor, store} from './src/app/store';

GoogleSignin.configure({webClientId: auth.webClientId});

AppRegistry.registerComponent(appName, () => () => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
));
