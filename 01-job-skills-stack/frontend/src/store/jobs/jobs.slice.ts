import { createSlice } from "@reduxjs/toolkit";
import { Skill } from "../skills/skills.slice";

export type Job = {
  id: number;
  name: string;
  skills: Skill[];
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
