import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Job, jobsActions } from "../store/jobs/jobs.slice";
import { statisticsActions } from "../store/statistics/statistics.slice";

const DUMMY_DATA_LIST: Job[] = [
  {
    id: 1,
    name: "React Job",
    skillsMap: {
      1: { id: 1, name: "React" },
      2: { id: 2, name: "Node" },
      3: { id: 3, name: "MongoDB" },
      4: { id: 4, name: "Docker" },
    },
  },
  {
    id: 2,
    name: "Node Job",
    skillsMap: {
      1: { id: 1, name: "React" },
      2: { id: 2, name: "Node" },
    },
  },
];

export const useSetupData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    DUMMY_DATA_LIST.forEach((jobData) => {
      dispatch(
        jobsActions.createJob({ jobData: { ...jobData, id: Math.random() } })
      );
      dispatch(
        statisticsActions.addSkills({ skillsMapToAdd: jobData.skillsMap })
      );
    });
  }, [dispatch]);
};
