import {combineReducers} from '@reduxjs/toolkit';

import authReducer from '../features/Login/authSlice';

const reducer = combineReducers({
  auth: authReducer,
});

export default reducer;
