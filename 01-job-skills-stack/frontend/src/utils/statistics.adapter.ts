import axios from "axios";
import { SkillsMap } from "../store/jobs/jobs.slice";

const addSkillsToStatistics = async (skillsMapToAdd: SkillsMap) => {
  await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/statistics`,
    skillsMapToAdd
  );
};

const fetchStatistics = async (skillId: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/statistics/${skillId}`
  );
  return response.data.statistics;
};

const removeSkillsFromStatistics = async (skillsMapToRemove: SkillsMap) => {
  await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/statistics/delete`,
    skillsMapToRemove
  );
};

const statisticsAdapter = {
  addSkillsToStatistics,
  fetchStatistics,
  removeSkillsFromStatistics,
};

export default statisticsAdapter;
