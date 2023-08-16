import React, {FC} from 'react';

import {useGetAuthUserQuery} from '../slices/userSlice';
import {AuthStack} from './AuthStack';
import {HomeTab} from './HomeTab';
import {TeamStack} from './TeamStack';

const Navigation: FC = () => {
  const {data: user} = useGetAuthUserQuery('auth', {
    refetchOnMountOrArgChange: true,
  });

  if (!user) {
    return <AuthStack />;
  }

  if (!user.teamId) {
    return <TeamStack />;
  }

  return <HomeTab />;
};

export default Navigation;
