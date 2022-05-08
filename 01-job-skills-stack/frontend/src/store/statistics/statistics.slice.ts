import { createSlice } from "@reduxjs/toolkit";
import { Skill } from "../skills/skills.slice";

type SubSkill = {
  skill: Skill;
  count: number;
};

type Statistics = {
  id: number;
  primarySkill: Skill;
  subSkills: SubSkill[];
};

type StatisticsState = {
  statistics: Statistics;
};

const initialState: StatisticsState = {
  statistics: {
    id: 1,
    primarySkill: { id: 1, name: "React" },
    subSkills: [
      { count: 5, skill: { id: 2, name: "Node" } },
      { count: 3, skill: { id: 3, name: "MongoDB" } },
      { count: 1, skill: { id: 4, name: "Docker" } },
    ],
  },
};

const StatisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    addSkill() {},
    removeSkill() {},
  },
});

export const statisticsActions = StatisticsSlice.actions;
export const statisticsReducer = StatisticsSlice.reducer;
