import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import SkillCard from "../components/skill-card/SkillCard";
import { RootState } from "../store";
import { jobsActions } from "../store/jobs/jobs.slice";
import classes from "./Job.module.scss";

const Job = () => {
  const { jobId } = useParams();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!jobId) {
    return <div>Data not found</div>;
  }

  const job = jobs.find((job) => job.id === +jobId);

  if (!job) {
    return <div>Data not found</div>;
  }

  const deleteJobHandler = () => {
    dispatch(jobsActions.deleteJob({ jobId: +jobId }));

    navigate("/");
  };

  return (
    <div className={classes["job"]}>
      <h1>{job.name}</h1>
      <div className={classes["skills-container"]}>
        {Object.keys(job.skillsMap).map((key) => {
          const skill = job.skillsMap[key];
          return skill && <SkillCard isActive skill={skill} key={skill.id} />;
        })}
      </div>
      <div className={classes["button-container"]}>
        <Button onClick={deleteJobHandler}>Delete</Button>
      </div>
    </div>
  );
};

export default Job;
