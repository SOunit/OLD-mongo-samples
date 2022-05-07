import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form, { FormInputsState } from "../components/form/Form";
import { jobsActions } from "../store/jobs/jobs.slice";
import classes from "./CreateJob.module.scss";

const INITIAL_INPUTS_STATE: FormInputsState = {
  nameInput: "",
};

const CreateJob: FC = () => {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_STATE);
  const { nameInput } = inputs;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    dispatch(
      jobsActions.createJob({ jobData: { id: Math.random(), name: nameInput } })
    );
    navigate("/");
  };

  return (
    <div className={classes["form-container"]}>
      <Form
        inputsState={inputs}
        onSubmit={onSubmit}
        setInputs={setInputs}
        submitButtonText="Create Job"
      />
    </div>
  );
};

export default CreateJob;
