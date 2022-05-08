import { createSlice } from "@reduxjs/toolkit";
import { SkillsMap } from "../jobs/jobs.slice";
import { Skill } from "../skills/skills.slice";

type SubSkillsMap = {
  [key: string]: {
    skill: Skill;
    count: number;
  };
};

type Statistics = {
  [key: string]: {
    primarySkill: Skill;
    subSkillsMap: SubSkillsMap;
  };
};

type StatisticsState = {
  statistics: Statistics;
};

const initialState: StatisticsState = {
  statistics: {},
};

type AddSkillAction = {
  type: string;
  payload: {
    skillsMapToAdd: SkillsMap;
  };
};

type RemoveSkillAction = {
  type: string;
  payload: {
    skillsMapToRemove: SkillsMap;
  };
};

const StatisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    addSkills(state, action: AddSkillAction) {
      const { skillsMapToAdd } = action.payload;

      // create primary skill
      Object.keys(skillsMapToAdd).forEach((skillId) => {
        const skillToAdd = skillsMapToAdd[+skillId];
        if (!state.statistics[skillId] && skillToAdd) {
          state.statistics[skillId] = {
            primarySkill: skillToAdd,
            subSkillsMap: {},
          };
        }
      });

      // loop on primary key
      Object.keys(skillsMapToAdd).forEach((primarySkillId) => {
        Object.keys(skillsMapToAdd).forEach((skillIdToAdd) => {
          if (primarySkillId === skillIdToAdd) {
            return;
          }

          // update
          const targetSkillMap = state.statistics[primarySkillId].subSkillsMap;

          if (targetSkillMap[skillIdToAdd]) {
            targetSkillMap[skillIdToAdd].count++;
          } else {
            targetSkillMap[skillIdToAdd] = {
              count: 1,
              skill: skillsMapToAdd[skillIdToAdd]!,
            };
          }
        });
      });
    },
    removeSkill(state, action: RemoveSkillAction) {
      const { skillsMapToRemove } = action.payload;

      Object.keys(skillsMapToRemove).forEach((primarySkillId) => {
        const targetStatistics = state.statistics[primarySkillId];

        Object.keys(skillsMapToRemove).forEach((subSkillId) => {
          if (primarySkillId !== subSkillId) {
            const targetSubSkill = targetStatistics.subSkillsMap[subSkillId];
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
