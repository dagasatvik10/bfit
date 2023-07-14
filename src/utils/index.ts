import {Team} from '../features/TeamSelection/teamSlice';

// sort in descending order
export const sortTeams = (teams: Team[]) =>
  teams.sort((a, b) => b.points - a.points);

export const getTeamPosition = (teams: Team[], currentTeam: Team) =>
  teams.findIndex(team => team.name === currentTeam?.name) + 1;
