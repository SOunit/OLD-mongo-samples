import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Job, jobsActions } from "../store/jobs/jobs.slice";
import { statisticsActions } from "../store/statistics/statistics.slice";

const DUMMY_DATA_LIST: Job[] = [
  {
    _id: "1",
    name: "React Job",
    skillsMap: {
      1: { _id: "1", name: "React" },
      2: { _id: "2", name: "Node" },
      3: { _id: "3", name: "MongoDB" },
      4: { _id: "4", name: "Docker" },
    },
  },
  {
    _id: "2",
    name: "Node Job",
    skillsMap: {
      1: { _id: "1", name: "React" },
      2: { _id: "2", name: "Node" },
    },
  },
];

export const useSetupData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    DUMMY_DATA_LIST.forEach((jobData) => {
      dispatch(
        jobsActions.addJob({
          jobData: { ...jobData, _id: Math.random().toString() },
        })
      );
      dispatch(
        statisticsActions.addSkills({ skillsMapToAdd: jobData.skillsMap })
      );
    });
  }, [dispatch]);
};
