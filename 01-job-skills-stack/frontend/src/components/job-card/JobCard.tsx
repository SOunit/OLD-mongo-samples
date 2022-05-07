import { FC } from "react";
import { Job } from "../../store/jobs/jobs.slice";
import classes from "./JobCard.module.scss";

type Props = {
  job: Job;
};

const JobCard: FC<Props> = (props) => {
  const { job } = props;
  return <div className={classes["job-card"]}>{job.name}</div>;
};

export default JobCard;
