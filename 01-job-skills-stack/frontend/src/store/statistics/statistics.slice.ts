import { createSlice } from "@reduxjs/toolkit";
import { SkillsMap } from "../jobs/jobs.slice";
import { Skill } from "../skills/skills.slice";

type SubSkillsMap = {
  [key: string]: {
    skill: Skill;
    count: number;
  };
};

export type Statistics = {
  _id?: string;
  primarySkill: Skill;
  subSkillsMap: SubSkillsMap;
};

type StatisticsState = {
  statistics: Statistics | null;
};

const initialState: StatisticsState = {
  statistics: null,
};

type RemoveSkillAction = {
  type: string;
  payload: {
    skillsMapToRemove: SkillsMap;
  };
};

type SetStatisticsAction = {
  type: string;
  payload: Statistics;
};

const StatisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setStatistics(state, action: SetStatisticsAction) {
      state.statistics = action.payload;
    },
    removeSkill(state, action: RemoveSkillAction) {
      const { skillsMapToRemove } = action.payload;

      Object.keys(skillsMapToRemove).forEach((primarySkillId) => {
        const targetStatistics = state.statistics;

        Object.keys(skillsMapToRemove).forEach((subSkillId) => {
          if (primarySkillId !== subSkillId) {
            const targetSubSkill = targetStatistics!.subSkillsMap[subSkillId];
            targetSubSkill.count--;
            if (targetSubSkill.count < 0) {
              targetSubSkill.count = 0;
            }
          }
        });
      });
    },
  },
});

export const statisticsActions = StatisticsSlice.actions;
export const statisticsReducer = StatisticsSlice.reducer;
