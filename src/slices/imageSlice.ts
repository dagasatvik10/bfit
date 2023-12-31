import storage from '@react-native-firebase/storage';

import {firestoreApi} from '../app/firestoreApi';
import {Images} from '../types';

export const imageApi = firestoreApi.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    uploadImage: builder.mutation<
      null,
      {activityTitle: string; email: string; uri: string}
    >({
      async queryFn({activityTitle, email, uri}) {
        try {
          const ref = storage().ref(`activities/${email}-${activityTitle}.jpg`);
          await ref.putFile(uri);
          return {data: null};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
      invalidatesTags: ['Image'],
    }),
    fetchImages: builder.query<
      {images: Images; pageToken: string | null},
      {pageToken: string | null}
    >({
      async queryFn({pageToken}) {
        try {
          const ref = storage().ref('activities');
          const listResult = await ref.list({
            pageToken: pageToken ?? undefined,
            maxResults: 8,
          });
          const images: Images = [];
          for (const item of listResult.items) {
            const uri = await item.getDownloadURL();
            images.push({name: item.name, uri});
          }
          return {data: {images, pageToken: listResult.nextPageToken}};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
      serializeQueryArgs({endpointName}) {
        return endpointName;
      },
      merge(currentCache, newItems, {arg}) {
        if (!arg.pageToken) {
          return newItems;
        }
        return {
          ...newItems,
          images: [...(currentCache?.images ?? []), ...newItems.images],
        };
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg?.pageToken !== previousArg?.pageToken;
      },
      providesTags: ['Image'],
    }),
  }),
});

export const {useFetchImagesQuery, useUploadImageMutation} = imageApi;
