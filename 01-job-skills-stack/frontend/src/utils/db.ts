import axios from "axios";
import { Skill } from "../store/skills/skills.slice";

type SkillData = {
  skill: Skill;
};

const createSkill = async (skillData: SkillData): Promise<Skill> => {
  const createResponse = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/skills/new`,
    skillData
  );

  const skill = createResponse.data.skill;
  console.log(skill);

  return skill;
};

const getSkills = async (): Promise<Skill[]> => {
  const getResponse = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/skills`
  );

  const skills = getResponse.data.skills;

  return skills;
};

const db = {
  createSkill,
  getSkills,
};

export default db;