import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectableSkillCard from "../components/selectable-skill-card/SelectableSkillCard";
import { RootState } from "../store";
import { jobsActions, SkillsMap } from "../store/jobs/jobs.slice";
import { Skill } from "../store/skills/skills.slice";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    dispatch(
      jobsActions.createJob({
        jobData: {
          id: Math.random(),
          name: nameInput,
          skillsMap: selectedSkillsMap,
        },
      })
    );

    navigate("/");
  };

  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputs((prevState) => ({ ...prevState, nameInput: event.target.value }));
  };

  const toggleSkillHandler = (skillToToggle: Skill) => {
    if (selectedSkillsMap[skillToToggle.id]) {
      // delete skill
      const newSelectedSkillsMap = { ...selectedSkillsMap };
      newSelectedSkillsMap[skillToToggle.id] = null;
      setInputs((prevState) => ({
        ...prevState,
        selectedSkillsMap: newSelectedSkillsMap,
      }));
    } else {
      // add skill
      const newSelectedSkillsMap = {
        ...selectedSkillsMap,
        [skillToToggle.id]: skillToToggle,
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
          {skills.map((skill) => (
            <SelectableSkillCard
              key={skill.id}
              skill={skill}
              onClick={toggleSkillHandler}
              isActive={!!selectedSkillsMap[skill.id]}
            />
          ))}
        </div>
        <button>Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
