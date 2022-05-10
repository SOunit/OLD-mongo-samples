import { Skill } from "./skill";

export type Job = {
  _id?: string;
  name: string;
  skillsMap: SkillsMap;
};

export type SkillsMap = {
  [key: string]: Skill;
};
