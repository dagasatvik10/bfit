import {combineReducers} from '@reduxjs/toolkit';

import {firestoreApi} from './firestoreApi';

const reducer = combineReducers({
  [firestoreApi.reducerPath]: firestoreApi.reducer,
});

export default reducer;
