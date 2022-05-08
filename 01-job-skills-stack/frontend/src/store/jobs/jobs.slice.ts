import { createSlice } from "@reduxjs/toolkit";
import { Skill } from "../skills/skills.slice";

export type SkillsMap = { [key: string]: Skill | null };

export type Job = {
  id: number;
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
    jobId: number;
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
      state.jobs = state.jobs.filter((job) => job.id !== +jobId);
    },
  },
});

export const jobsActions = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
