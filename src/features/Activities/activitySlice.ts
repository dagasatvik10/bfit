import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Activity {
  title: string;
  description: string;
  points: number;
  done: boolean;
}

export interface ActivityState {
  currentActivities: Activity[];
  pastActivities: Activity[];
}

const initialState: ActivityState = {
  currentActivities: [
    {
      title: 'Challenge 1',
      description: '8-10 Glasses of water today?',
      points: 50,
      done: false,
    },
    {
      title: 'Challenge 2',
      description: 'Did you Sleep 6-8 hours today?',
      points: 50,
      done: false,
    },
  ],
  pastActivities: [],
};

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    completeActivity: (state: ActivityState, action: PayloadAction<string>) => {
      const activityIndex = state.currentActivities.findIndex(
        val => val.title === action.payload,
      );
      if (activityIndex !== -1) {
        state.currentActivities[activityIndex].done = true;
      }
    },
  },
});

export const {completeActivity} = activitySlice.actions;

export const selectCurrentActivities = (state: {activity: ActivityState}) =>
  state.activity.currentActivities;

export const selectPastActivities = (state: {activity: ActivityState}) =>
  state.activity.pastActivities;

export default activitySlice.reducer;
