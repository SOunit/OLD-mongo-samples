import { createSlice } from "@reduxjs/toolkit";

export type Skill = {
  _id?: string;
  name: string;
};

type SkillsState = {
  skills: Skill[];
};

const initialState: SkillsState = {
  // FIXME: delete dummy data
  skills: [
    { _id: "1", name: "React" },
    { _id: "2", name: "Node" },
    { _id: "3", name: "MongoDB" },
    { _id: "4", name: "docker" },
  ],
};

type CreateSkillAction = {
  type: string;
  payload: { skillData: Skill };
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addSkill(state, action: CreateSkillAction) {
      const { skillData } = action.payload;
      state.skills.push(skillData);
    },
  },
});

export const skillsActions = skillsSlice.actions;
export const skillsReducer = skillsSlice.reducer;
