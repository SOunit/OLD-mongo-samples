import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import SelectableSkillCard from "../components/selectable-skill-card/SelectableSkillCard";
import { RootState, TypedDispatch } from "../store";
import { jobsActions, SkillsMap } from "../store/jobs/jobs.slice";
import { Skill } from "../store/skills/skills.slice";
import jobsAdapter from "../utils/jobs.adapter";
import statisticsAdapter from "../utils/statistics.adapter";
import classes from "./CreateJob.module.scss";

type InitialState = {
  nameInput: string;
  selectedSkillsMap: SkillsMap;
};

const INITIAL_INPUTS_STATE: InitialState = {
  nameInput: "",
  selectedSkillsMap: {},
};

const CreateJob: FC = () => {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_STATE);
  const { nameInput, selectedSkillsMap } = inputs;
  const skills = useSelector((state: RootState) => state.skills.skills);

  const dispatch = useDispatch<TypedDispatch>();
  const navigate = useNavigate();

  const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const jobData = { name: nameInput, skillsMap: selectedSkillsMap };
    const createdJob = await jobsAdapter.createJob(jobData);
    dispatch(
      jobsActions.addJob({
        jobData: createdJob,
      })
    );

    await statisticsAdapter.addSkillsToStatistics(selectedSkillsMap);

    navigate("/");
  };

  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputs((prevState) => ({ ...prevState, nameInput: event.target.value }));
  };

  const toggleSkillHandler = (skillToToggle: Skill) => {
    if (selectedSkillsMap[skillToToggle._id!]) {
      // delete skill
      const newSelectedSkillsMap = { ...selectedSkillsMap };
      newSelectedSkillsMap[skillToToggle._id!] = null;
      setInputs((prevState) => ({
        ...prevState,
        selectedSkillsMap: newSelectedSkillsMap,
      }));
    } else {
      // add skill
      const newSelectedSkillsMap = {
        ...selectedSkillsMap,
        [skillToToggle._id!]: skillToToggle,
      };
      setInputs((prevState) => ({
        ...prevState,
        selectedSkillsMap: newSelectedSkillsMap,
      }));
    }
  };

  return (
    <div className={classes["form-container"]}>
      <form onSubmit={submitHandler} className={classes["form"]}>
        <label>Job Name</label>
        <input
          className={classes["form__input"]}
          onChange={nameChangeHandler}
          value={nameInput}
        />
        <div className={classes["skills-container"]}>
          {skills &&
            skills.map((skill) => (
              <SelectableSkillCard
                key={skill._id}
                skill={skill}
                onClick={toggleSkillHandler}
                isActive={!!selectedSkillsMap[skill._id!]}
              />
            ))}
        </div>
        <Button>Create Job</Button>
      </form>
    </div>
  );
};

export default CreateJob;
