import { createSlice } from "@reduxjs/toolkit";
import { Skill } from "../skills/skills.slice";

export type SkillsMap = { [key: string]: Skill | null };

export type Job = {
  _id: string;
  name: string;
  skillsMap: SkillsMap;
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

type DeleteJobAction = {
  type: string;
  payload: {
    jobId: string;
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
    deleteJob(state, action: DeleteJobAction) {
      const { jobId } = action.payload;
      state.jobs = state.jobs.filter((job) => job._id !== jobId);
    },
  },
});

export const jobsActions = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
