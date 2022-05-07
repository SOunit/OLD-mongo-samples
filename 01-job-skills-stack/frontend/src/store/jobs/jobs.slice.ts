import { createSlice } from "@reduxjs/toolkit";

export type Job = {
  id: number;
  name: string;
};

type JobsState = {
  jobs: Job[];
};

const initialState: JobsState = {
  jobs: [],
};

type CreateJobAction = {
  type: string;
  payload: {
    jobData: Job;
  };
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    createJob(state, action: CreateJobAction) {
      const { jobData } = action.payload;
      state.jobs.push(jobData);
    },
  },
});

export const jobsActions = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
