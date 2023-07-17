import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {firestoreApi} from '../../../app/firestoreApi';
import {User} from '../../../types';
import {createSelector} from '@reduxjs/toolkit';

export const usersApi = firestoreApi.injectEndpoints({
  endpoints: builder => ({
    getAuthUser: builder.query<User | null, void>({
      async queryFn() {
        try {
          const user = auth().currentUser;
          console.log(user);
          if (user && user.email) {
            const ref = firestore().collection('users').doc(user.email);
            const docSnapshot = await ref.get();
            const userData = docSnapshot.data();
            if (userData) {
              console.log(docSnapshot.id);
              return {data: {...userData, id: docSnapshot.id} as User};
            }
          }
          return {data: null};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
      providesTags: ['User'],
    }),
    createUser: builder.mutation<
      null,
      Pick<User, 'name' | 'email'> & {password: string}
    >({
      async queryFn(args) {
        try {
          const {name, email, password} = args;
          await auth().createUserWithEmailAndPassword(email, password);
          const ref = firestore().collection('users').doc(email);
          await ref.set({name, email, points: 0, createdAt: Date.now()});
          return {data: null};
        } catch (error: any) {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
          return {error: error.message};
        }
      },
      invalidatesTags: ['User'],
    }),
    signInUser: builder.mutation<null, {email: string; password: string}>({
      async queryFn(args) {
        try {
          const {email, password} = args;
          await auth().signInWithEmailAndPassword(email, password);
          return {data: null};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
      invalidatesTags: ['User'],
    }),
    signOutUser: builder.mutation<null, void>({
      async queryFn() {
        try {
          await auth().signOut();
          return {data: null};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const selectAuthUserResult = usersApi.endpoints.getAuthUser.select();

export const selectAuthUser = createSelector(
  selectAuthUserResult,
  user => user.data,
);

export const {
  useCreateUserMutation,
  useGetAuthUserQuery,
  useSignInUserMutation,
  useSignOutUserMutation,
} = usersApi;
