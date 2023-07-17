import React, {FC} from 'react';

import {useGetAuthUserQuery} from '../features/Auth/slices/userSlice';
import {AuthStack} from './AuthStack';
import {SelectTeamPage} from '../features';
import {HomeTab} from './HomeTab';

const Navigation: FC = () => {
  const {data: user} = useGetAuthUserQuery();

  if (!user) {
    return <AuthStack />;
  }

  if (!user.teamId) {
    return <SelectTeamPage />;
  }

  return <HomeTab />;
};

export default Navigation;
