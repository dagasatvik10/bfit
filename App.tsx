/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {useAppSelector} from './src/app/hooks';
import {HomePage, LoginPage, SelectionDonePage} from './src/features';
import {selectUser} from './src/features/Login/authSlice';

function App(): JSX.Element {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <LoginPage />;
  }

  // return <HomePage user={user} />;
  return <SelectionDonePage />;
}

export default App;
