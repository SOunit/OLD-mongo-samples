import { Dispatch } from "@reduxjs/toolkit";
import skillsAdapter from "../../utils/skills.adapter";
import { Skill, skillsActions } from "./skills.slice";

export const createSkill = (skillData: Skill) => {
  return async (
    dispatch: Dispatch<ReturnType<typeof skillsActions.addSkill>>
  ) => {
    const skill = await skillsAdapter.createSkill({ skill: skillData });

    dispatch(
      skillsActions.addSkill({
        skillData: skill,
      })
    );
  };
};
