import {combineReducers} from '@reduxjs/toolkit';

import activityReducer from '../features/Activities/activitySlice';

import {firestoreApi} from './firestoreApi';

const reducer = combineReducers({
  activity: activityReducer,
  [firestoreApi.reducerPath]: firestoreApi.reducer,
});

export default reducer;
