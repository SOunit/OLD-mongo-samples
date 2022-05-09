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

const db = {
  createSkill,
};

export default db;
