import axios from "axios";
import { SkillsMap } from "../store/jobs/jobs.slice";

export const addSkills = async (skillsMapToAdd: SkillsMap) => {
  await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/statistics`,
    skillsMapToAdd
  );
};

export const fetchStatistics = async (skillId: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/statistics/${skillId}`
  );
  return response.data.statistics;
};
