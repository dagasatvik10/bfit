// Redux
export interface Team {
  id: string;
  name: string;
  points: number;
  userCount: number;
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
  excluded?: boolean;
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
  isImageRequired?: boolean;
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

export type Meta = {
  id: string;
  health_tips: string[];
  home_banner: string;
  start: number;
};
