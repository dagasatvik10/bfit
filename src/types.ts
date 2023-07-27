// Redux
export interface Team {
  id: string;
  name: string;
  points: number;
  sortKey: number;
}

export type Teams = Team[];

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  teamId?: string | null;
  createdAt: number;
}

export type Users = User[];

export interface Activity {
  id: string;
  title: string;
  description: string;
  youtubeLink?: string;
  points: number;
  start: number; // timestamp
  end: number; // timestamp
}

export type Activities = Activity[];

export interface UserActivity {
  userId: string;
  activityId: string;
  points: number;
  completed: boolean;
  completedAt: number; // timestamp
}

export type UserActivities = UserActivity[];

export type Image = {
  name: string;
  uri: string;
};

export type Images = Image[];
