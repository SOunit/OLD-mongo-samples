import { createSlice } from "@reduxjs/toolkit";

export type Skill = {
  id: number;
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

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    createSkill(state, action: CreateSkillAction) {
      const { skillData } = action.payload;
      state.skills.push(skillData);
    },
  },
});

export const skillsActions = skillsSlice.actions;
export const skillsReducer = skillsSlice.reducer;
