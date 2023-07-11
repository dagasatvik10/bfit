import {combineReducers} from '@reduxjs/toolkit';

import authReducer from '../features/Login/authSlice';
import teamReducer from '../features/TeamSelection/teamSlice';
import activityReducer from '../features/Activities/activitySlice';

const reducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
  activity: activityReducer,
});

export default reducer;
