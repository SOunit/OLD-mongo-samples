import { FC } from "react";
import { Job } from "../../store/jobs/jobs.slice";
import SkillCard from "../skill-card/SkillCard";
import classes from "./JobCard.module.scss";

type Props = {
  job: Job;
};

const JobCard: FC<Props> = (props) => {
  const { job } = props;
  return (
    <div className={classes["job-card"]}>
      {job.name}
      <div className={classes["job-card__skills-container"]}>
        {Object.keys(job.skillsMap).map((key) => {
          const skill = job.skillsMap[key];
          return skill ? (
            <SkillCard key={`${job._id}${skill._id}`} skill={skill} isActive />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default JobCard;
