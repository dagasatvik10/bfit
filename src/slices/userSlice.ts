import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createSelector} from '@reduxjs/toolkit';

import {firestoreApi} from '../app/firestoreApi';
import {User, UserActivities, UserActivity, Users} from '../types';
import {onUserActivityAdd} from '../lib/activity';

export const usersApi = firestoreApi.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getAuthUser: builder.query<User | null, void>({
      async queryFn() {
        try {
          const user = auth().currentUser;
          if (user && user.email) {
            const ref = firestore().collection('users').doc(user.email);
            const docSnapshot = await ref.get();
            const userData = docSnapshot.data();
            if (userData) {
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
    fetchUsersByTeamId: builder.query<Users, {teamId: string}>({
      async queryFn({teamId}) {
        try {
          const ref = firestore().collection('users');
          const querySnapshot = await ref
            .where('teamId', '==', teamId)
            .orderBy('points', 'desc')
            .get();
          const users: Users = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            users.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt.toMillis(),
            } as User);
          });
          return {data: users};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
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
          await ref.set({
            name,
            email,
            points: 0,
            createdAt: firestore.Timestamp.now(),
          });
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
      invalidatesTags: ['User', 'UserActivity', 'Team'],
    }),
    addUserActivity: builder.mutation<
      null,
      {activityId: string; points: number; teamId: string; userId: string}
    >({
      async queryFn({activityId, points, teamId, userId}) {
        try {
          await onUserActivityAdd(userId, teamId, activityId, points);
          return {data: null};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
      invalidatesTags: ['UserActivity', 'Team', 'User'],
    }),
    fetchUserActivity: builder.query<UserActivity | null, {activityId: string}>(
      {
        async queryFn({activityId}) {
          try {
            const user = auth().currentUser;
            if (user && user.email) {
              const ref = firestore()
                .collection('users')
                .doc(user.email)
                .collection('activities')
                .doc(activityId);
              const docSnapshot = await ref.get();
              const userActivityData = docSnapshot.data();
              if (userActivityData) {
                return {
                  data: {
                    activityId: docSnapshot.id,
                    userId: user.email,
                    ...userActivityData,
                    completedAt:
                      userActivityData.completedAt &&
                      userActivityData.completedAt.toMillis(),
                  } as UserActivity,
                };
              }
            }
            return {data: null};
          } catch (error: any) {
            console.error(error);
            return {error: error.message};
          }
        },
        providesTags: ['UserActivity'],
      },
    ),
    fetchUserActivities: builder.query<UserActivities, void>({
      async queryFn() {
        try {
          const user = auth().currentUser;
          if (user && user.email) {
            const ref = firestore()
              .collection('users')
              .doc(user.email)
              .collection('activities');
            const querySnapshot = await ref.get();
            const userActivities: UserActivities = [];
            querySnapshot.forEach(doc => {
              const data = doc.data();
              userActivities.push({
                activityId: doc.id,
                userId: user.email,
                ...data,
                completedAt: data.completedAt && data.completedAt.toMillis(),
              } as UserActivity);
            });
            return {data: userActivities};
          }
          return {data: []};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
      providesTags: ['UserActivity'],
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
  useAddUserActivityMutation,
  useFetchUserActivityQuery,
  useFetchUserActivitiesQuery,
  useFetchUsersByTeamIdQuery,
} = usersApi;
