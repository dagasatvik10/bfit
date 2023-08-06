import firestore from '@react-native-firebase/firestore';

import {firestoreApi} from '../../../app/firestoreApi';
import {Meta} from '../../../types';

export const metaApi = firestoreApi.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    fetchMeta: builder.query<Meta, {currentDate: number; previousDate: number}>(
      {
        async queryFn({currentDate, previousDate}) {
          try {
            const currentTimestamp =
              firestore.Timestamp.fromMillis(currentDate);
            const previousTimestamp =
              firestore.Timestamp.fromMillis(previousDate);
            const ref = firestore().collection('meta');
            const querySnapshot = await ref
              .orderBy('start', 'asc')
              .startAt(previousTimestamp)
              .endAt(currentTimestamp)
              .get();
            const meta: Partial<Meta> = {};
            querySnapshot.forEach(doc => {
              const data = doc.data();
              meta.id = doc.id;
              meta.health_tips = data.health_tips;
              meta.home_banner = data.home_banner;
              meta.start = data.start.toMillis();
            });
            return {data: meta as Meta};
          } catch (error: any) {
            console.error(error);
            return {error: error.message};
          }
        },
        providesTags: ['Meta'],
      },
    ),
  }),
});

export const {useFetchMetaQuery} = metaApi;
