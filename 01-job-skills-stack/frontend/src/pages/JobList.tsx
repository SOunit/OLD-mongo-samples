import { useSelector } from "react-redux";
import JobCard from "../components/job-card/JobCard";
import { RootState } from "../store";
import classes from "./JobList.module.scss";

const JobList = () => {
  const jobs = useSelector((state: RootState) => state.jobs.jobs);

  return (
    <div className={classes["jobs-container"]}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
