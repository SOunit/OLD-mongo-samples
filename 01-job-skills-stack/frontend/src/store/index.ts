import { configureStore } from "@reduxjs/toolkit";
import { jobsReducer } from "./jobs/jobs.slice";

const store = configureStore({
  reducer: { jobs: jobsReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
