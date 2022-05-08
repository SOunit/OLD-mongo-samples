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
  statistics: {
    1: {
      primarySkill: { id: 1, name: "React" },
      subSkillsMap: {
        2: { count: 5, skill: { id: 2, name: "Node" } },
        3: { count: 3, skill: { id: 3, name: "MongoDB" } },
        4: { count: 1, skill: { id: 4, name: "Docker" } },
      },
    },
  },
};

export type AddSkillAction = {
  type: string;
  payload: {
    skillsMapToAdd: SkillsMap;
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
      Object.keys(state.statistics).forEach((statisticsId) => {
        console.log(statisticsId);
        Object.keys(skillsMapToAdd).forEach((skillId) => {
          console.log(skillId);
          const skillToAdd = skillsMapToAdd[skillId];
          const targetStatistics = state.statistics[statisticsId];
          const targetSubSkill = targetStatistics.subSkillsMap[skillId];

          if (
            !skillToAdd ||
            targetStatistics.primarySkill.id === skillToAdd.id
          ) {
            return;
          }

          // update sub skill
          if (targetSubSkill) {
            // count up
            targetSubSkill.count++;
          } else {
            // create
            targetStatistics.subSkillsMap[skillId] = {
              count: 1,
              skill: skillToAdd,
            };
          }
        });
      });
    },
    removeSkill() {},
  },
});

export const statisticsActions = StatisticsSlice.actions;
export const statisticsReducer = StatisticsSlice.reducer;
