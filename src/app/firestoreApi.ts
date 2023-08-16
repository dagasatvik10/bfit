import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';

export const TAG_TYPES = [
  'Team',
  'User',
  'Activity',
  'UserActivity',
  'Image',
  'Meta',
  'ApprovedEmail',
  'TeamUser',
];

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: TAG_TYPES,
  endpoints: () => ({}),
});
