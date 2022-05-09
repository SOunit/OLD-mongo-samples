import { Dispatch } from "@reduxjs/toolkit";
import db from "../../utils/db";
import { Skill, skillsActions } from "./skills.slice";

export const createSkill = (skillData: Skill) => {
  return async (
    dispatch: Dispatch<ReturnType<typeof skillsActions.addSkill>>
  ) => {
    const skill = await db.createSkill({ skill: skillData });

    dispatch(
      skillsActions.addSkill({
        skillData: skill,
      })
    );
  };
};
