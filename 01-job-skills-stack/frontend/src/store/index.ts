import { configureStore } from "@reduxjs/toolkit";
import { jobsReducer } from "./jobs/jobs.slice";
import { skillsReducer } from "./skills/skills.slice";
import { statisticsReducer } from "./statistics/statistics.slice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    skills: skillsReducer,
    statistics: statisticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
