import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import JobCard from "../components/job-card/JobCard";
import { RootState } from "../store";
import { jobsActions } from "../store/jobs/jobs.slice";
import jobsAdapter from "../utils/jobs.adapter";
import classes from "./JobList.module.scss";

const JobList = () => {
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    const setJobs = async () => {
      const jobs = await jobsAdapter.getJobs();
      dispatch(jobsActions.setJobs(jobs));
    };

    setJobs();
  }, [dispatch]);

  return (
    <div className={classes["jobs-container"]}>
      {jobs.map((job) => (
        <Link key={job._id} to={`/jobs/${job._id}`}>
          <JobCard job={job} />
        </Link>
      ))}
    </div>
  );
};

export default JobList;
