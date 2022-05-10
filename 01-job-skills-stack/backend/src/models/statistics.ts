import { ObjectId } from "mongodb";
import { Skill } from "./skill";

export type Statistics = {
  _id?: ObjectId;
  primarySkill: Skill;
  subSkillsMap: SubSkillsMap;
};

type SubSkillsMap = {
  [key: string]: {
    skill: Skill;
    count: number;
  };
};
