import {Teams} from '../../types';

// sort in ascending order
export const sortTeamsBySortKey = (teams: Teams) =>
  teams.sort((a, b) => a.sortKey - b.sortKey);
