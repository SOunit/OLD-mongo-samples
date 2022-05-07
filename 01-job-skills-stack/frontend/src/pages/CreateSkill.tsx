import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form, { FormInputsState } from "../components/form/Form";
import { skillsActions } from "../store/skills/skills.slice";
import classes from "./CreateSkill.module.scss";

const INITIAL_INPUTS_STATE: FormInputsState = {
  nameInput: "",
};

const CreateSkill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(INITIAL_INPUTS_STATE);
  const { nameInput } = inputs;

  const onSubmit = () => {
    dispatch(
      skillsActions.createSkill({
        skillData: { id: Math.random(), name: nameInput },
      })
    );
    navigate("/");
  };

  return (
    <div className={classes["form-container"]}>
      <Form
        inputsState={inputs}
        onSubmit={onSubmit}
        setInputs={setInputs}
        submitButtonText="Create Skill"
      />
    </div>
  );
};

export default CreateSkill;
