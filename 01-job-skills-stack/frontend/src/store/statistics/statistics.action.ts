import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { SkillsMap } from "../jobs/jobs.slice";
import { statisticsActions } from "./statistics.slice";

export const addSkills = (skillsMapToAdd: SkillsMap) => {
  return async (
    dispatch: Dispatch<ReturnType<typeof statisticsActions.setStatistics>>
  ) => {
    const response = await axios.post(`${process.env.REACT}`, skillsMapToAdd);
    const statistics = response.data.statistics;

    dispatch(statisticsActions.setStatistics({ statistics }));
  };
};
