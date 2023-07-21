import firestore from '@react-native-firebase/firestore';

import {firestoreApi} from '../../app/firestoreApi';
import {Activities, Activity} from '../../types';

export const activityApi = firestoreApi.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    fetchCurrentActivities: builder.query<
      Activities,
      {currentDate: number; previousDate: number}
    >({
      async queryFn({currentDate, previousDate}) {
        try {
          const currentTimestamp = firestore.Timestamp.fromMillis(currentDate);
          const previousTimestamp =
            firestore.Timestamp.fromMillis(previousDate);

          const ref = firestore().collection('activities');
          const querySnapshot = await ref
            .orderBy('start', 'asc')
            .orderBy('title', 'asc')
            .startAt(previousTimestamp)
            .endAt(currentTimestamp)
            .get();
          const activities: Activities = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            activities.push({
              id: doc.id,
              ...data,
              start: data.start.toMillis(),
              end: data.end.toMillis(),
            } as Activity);
          });
          return {data: activities};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
      providesTags: result => {
        return result
          ? result.map(({id}) => ({type: 'Activity', id}))
          : ['Activity'];
      },
    }),
    fetchPastActivities: builder.query<Activities, {currentDate: number}>({
      async queryFn({currentDate}) {
        try {
          const currentTimestamp = firestore.Timestamp.fromMillis(currentDate);

          const ref = firestore().collection('activities');
          const querySnapshot = await ref
            .orderBy('end', 'asc')
            .orderBy('title', 'asc')
            // .startAt(previousTimestamp)
            .endAt(currentTimestamp)
            .get();
          const activities: Activities = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            activities.push({
              id: doc.id,
              ...data,
              start: data.start.toMillis(),
              end: data.end.toMillis(),
            } as Activity);
          });
          return {data: activities};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
      providesTags: result => {
        return result
          ? result.map(({id}) => ({type: 'Activity', id}))
          : ['Activity'];
      },
    }),
  }),
});

export const {useFetchCurrentActivitiesQuery, useFetchPastActivitiesQuery} =
  activityApi;
