import { createSlice } from "@reduxjs/toolkit";

export type Skill = {
  _id?: string;
  name: string;
};

type SkillsState = {
  skills: Skill[];
};

const initialState: SkillsState = {
  skills: [],
};

type CreateSkillAction = {
  type: string;
  payload: { skillData: Skill };
};

type SetSkillsAction = {
  type: string;
  payload: { skills: Skill[] };
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills(state, action: SetSkillsAction) {
      const { skills } = action.payload;

      state.skills = skills;
    },
    addSkill(state, action: CreateSkillAction) {
      const { skillData } = action.payload;
      state.skills.push(skillData);
    },
  },
});

export const skillsActions = skillsSlice.actions;
export const skillsReducer = skillsSlice.reducer;
