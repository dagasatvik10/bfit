import {combineReducers} from '@reduxjs/toolkit';

import authReducer from '../features/Login/authSlice';
import teamReducer from '../features/TeamSelection/teamSlice';

const reducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
});

export default reducer;
