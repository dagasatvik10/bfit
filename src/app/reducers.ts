import {combineReducers} from '@reduxjs/toolkit';

import activityReducer from '../features/Activities/activitySlice';
import authReducer from '../features/Login/authSlice';
import teamReducer from '../features/TeamSelection/teamSlice';
import {firestoreApi} from './firestoreApi';

const reducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
  activity: activityReducer,
  [firestoreApi.reducerPath]: firestoreApi.reducer,
});

export default reducer;
