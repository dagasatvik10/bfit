import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Team {
  name: string;
  points: number;
}

export interface TeamState {
  allTeams: Team[];
  selectedTeam: Team | null;
}

const initialState: TeamState = {
  allTeams: [
    {
      name: 'Team 1',
      points: 0,
    },
    {
      name: 'Team 2',
      points: 0,
    },
    {
      name: 'Team 3',
      points: 0,
    },
    {
      name: 'Team 4',
      points: 0,
    },
    {
      name: 'Team 5',
      points: 0,
    },
  ],
  selectedTeam: null,
  // selectedTeam: {
  //   name: 'Team 3',
  //   points: 0,
  // },
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    selectTeam: (state: TeamState, action: PayloadAction<Team>) => {
      state.selectedTeam = action.payload;
    },
  },
});

export const {selectTeam} = teamSlice.actions;

export const selectAllTeams = (state: {team: TeamState}) => state.team.allTeams;
export const selectSelectedTeam = (state: {team: TeamState}) =>
  state.team.selectedTeam;

export default teamSlice.reducer;
