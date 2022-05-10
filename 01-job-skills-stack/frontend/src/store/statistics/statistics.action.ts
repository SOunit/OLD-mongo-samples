import { Dispatch } from "@reduxjs/toolkit";
import statisticsAdapter from "../../utils/statistics.adapter";
import { statisticsActions } from "./statistics.slice";

export const fetchStatistics = (skillId: string) => {
  return async (
    dispatch: Dispatch<ReturnType<typeof statisticsActions.setStatistics>>
  ) => {
    const statistics = await statisticsAdapter.fetchStatistics(skillId);

    dispatch(statisticsActions.setStatistics(statistics));
  };
};
