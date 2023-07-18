import {Team, Teams} from '../types';

export const sortTeamsByKey = (
  teams: Teams,
  key: keyof Team,
  order: 'asc' | 'desc' = 'asc',
) =>
  teams.sort((a, b) =>
    order === 'desc'
      ? Number(b[key]) - Number(a[key])
      : Number(a[key]) - Number(b[key]),
  );

export const getTeamPosition = (teams: Team[], currentTeam: Team) =>
  teams.findIndex(team => team.name === currentTeam?.name) + 1;
