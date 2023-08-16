import firestore from '@react-native-firebase/firestore';

import {firestoreApi} from '../../app/firestoreApi';
import {onTeamSelection} from '../../lib/team';
import {Team, Teams} from '../../types';

export const teamsApi = firestoreApi.injectEndpoints({
  endpoints: builder => ({
    fetchTeams: builder.query<Teams, string>({
      async queryFn() {
        try {
          const ref = firestore().collection('teams');
          const querySnapshot = await ref.get();
          let teams: Teams = [];
          querySnapshot.forEach(doc => {
            teams.push({id: doc.id, ...doc.data()} as Team);
          });
          return {data: teams};
        } catch (error: any) {
          console.error(error);
          return {error: error.message};
        }
      },
      providesTags: result => {
        return result ? result.map(({id}) => ({type: 'Team', id})) : ['Team'];
      },
    }),
    fetchTeamByTeamId: builder.query<Team, string>({
      async queryFn(teamId) {
        try {
          const ref = firestore().collection<Team>('teams').doc(teamId);
          const docSnapshot = await ref.get();
          const teamData = docSnapshot.data();
          return {data: {id: docSnapshot.id, ...teamData} as Team};
        } catch (error: any) {
          console.error(error.message);
          return {error: error.message};
        }
      },
      providesTags: result => [{type: 'Team', id: result?.id}],
    }),
    setUserTeam: builder.mutation<null, {userId: string; teamId: string}>({
      async queryFn(args) {
        try {
          const {teamId, userId} = args;
          await onTeamSelection(userId, teamId);
          return {data: null};
        } catch (error: any) {
          console.error(error.message);
          return {error: error.message};
        }
      },
      invalidatesTags: ['User', 'Team'],
    }),
  }),
});

export const {
  useFetchTeamByTeamIdQuery,
  useFetchTeamsQuery,
  useSetUserTeamMutation,
} = teamsApi;
