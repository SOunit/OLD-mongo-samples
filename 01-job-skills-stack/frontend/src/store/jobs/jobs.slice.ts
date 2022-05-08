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
  jobs: [
    { id: 1, name: "react job", skillsMap: { 1: { id: 1, name: "react" } } },
    { id: 2, name: "node job", skillsMap: { 2: { id: 2, name: "node" } } },
    {
      id: 3,
      name: "MongoDB job",
      skillsMap: {
        3: { id: 3, name: "mongodb" },
        4: { id: 4, name: "docker" },
      },
    },
  ],
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
