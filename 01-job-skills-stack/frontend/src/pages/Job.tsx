import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/button/Button";
import SkillCard from "../components/skill-card/SkillCard";
import { RootState } from "../store";
import jobsAdapter from "../utils/jobs.adapter";
import statisticsAdapter from "../utils/statistics.adapter";
import classes from "./Job.module.scss";

const Job = () => {
  const { jobId } = useParams();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const navigate = useNavigate();

  if (!jobId) {
    return <div>Data not found</div>;
  }

  const job = jobs.find((job) => job._id === jobId);

  if (!job) {
    return <div>Data not found</div>;
  }

  const deleteJobHandler = async () => {
    await statisticsAdapter.removeSkillsFromStatistics(job.skillsMap);
    await jobsAdapter.deleteJob(jobId);

    navigate("/");
  };

  return (
    <div className={classes["job"]}>
      <h1>{job.name}</h1>
      <div className={classes["skills-container"]}>
        {Object.keys(job.skillsMap).map((key) => {
          const skill = job.skillsMap[key];
          return skill && <SkillCard isActive skill={skill} key={skill._id} />;
        })}
      </div>
      <div className={classes["button-container"]}>
        <Button onClick={deleteJobHandler}>Delete</Button>
      </div>
    </div>
  );
};

export default Job;
