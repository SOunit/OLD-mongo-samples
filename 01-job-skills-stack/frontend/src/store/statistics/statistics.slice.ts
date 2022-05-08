import { createSlice } from "@reduxjs/toolkit";
import { Skill } from "../skills/skills.slice";

type SubSkill = {
  skill: Skill;
  count: number;
};

type StatisticsData = {
  primarySkill: Skill;
  subSkills: SubSkill[];
};

type Statistics = {
  [key: string]: StatisticsData;
};

type StatisticsState = {
  statistics: Statistics;
};

const initialState: StatisticsState = {
  statistics: {
    1: {
      primarySkill: { id: 1, name: "React" },
      subSkills: [
        { count: 5, skill: { id: 2, name: "Node" } },
        { count: 3, skill: { id: 3, name: "MongoDB" } },
        { count: 1, skill: { id: 4, name: "Docker" } },
      ],
    },
  },
};

export type AddSkillAction = {
  type: string;
  payload: {
    skillToAdd: Skill;
  };
};

const StatisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    addSkill(state, action: AddSkillAction) {
      const { skillToAdd } = action.payload;
      if (state.statistics) {
      }
    },
    removeSkill() {},
  },
});

export const statisticsActions = StatisticsSlice.actions;
export const statisticsReducer = StatisticsSlice.reducer;
