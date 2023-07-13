import {Team} from '../../TeamSelection/teamSlice';

export const sortTeams = (teams: Team[]) =>
  teams.sort((a, b) => a.points - b.points);

export const getTeamPosition = (teams: Team[], currentTeam: Team) =>
  teams.findIndex(team => team.name === currentTeam?.name) + 1;
