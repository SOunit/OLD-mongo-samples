import { useSelector } from "react-redux";
import { RootState } from "../store";

const JobList = () => {
  const jobs = useSelector((state: RootState) => state.jobs.jobs);

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>{job.name}</div>
      ))}
    </div>
  );
};

export default JobList;
