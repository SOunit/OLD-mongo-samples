import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import JobCard from "../components/job-card/JobCard";
import { RootState } from "../store";
import classes from "./JobList.module.scss";

const JobList = () => {
  const jobs = useSelector((state: RootState) => state.jobs.jobs);

  return (
    <div className={classes["jobs-container"]}>
      {jobs.map((job) => (
        <Link key={job.id} to={`/jobs/${job.id}`}>
          <JobCard job={job} />
        </Link>
      ))}
    </div>
  );
};

export default JobList;
