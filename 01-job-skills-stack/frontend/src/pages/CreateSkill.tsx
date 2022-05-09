import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form, { FormInputsState } from "../components/form/Form";
import { TypedDispatch } from "../store";
import { createSkill } from "../store/skills/skills.action";
import classes from "./CreateSkill.module.scss";

const INITIAL_INPUTS_STATE: FormInputsState = {
  nameInput: "",
};

const CreateSkill = () => {
  const dispatch = useDispatch<TypedDispatch>();

  const navigate = useNavigate();

  const [inputs, setInputs] = useState(INITIAL_INPUTS_STATE);
  const { nameInput } = inputs;

  const onSubmit = async () => {
    await dispatch(createSkill({ id: Math.random(), name: nameInput }));

    navigate("/jobs/new");
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
