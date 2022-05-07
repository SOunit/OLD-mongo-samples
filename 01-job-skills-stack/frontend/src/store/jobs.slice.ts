import { createSlice } from "@reduxjs/toolkit";

type Job = {
  name: string;
};

type JobsState = {
  jobs: Job[];
};

const initialState: JobsState = {
  jobs: [],
};

const jobsSlice = createSlice({ name: "jobs", initialState, reducers: {} });

export const jobsActions = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
