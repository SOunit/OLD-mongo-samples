import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jobsActions } from "../store/jobs/jobs.slice";

type InputsState = {
  [key: string]: string;
};

const INITIAL_INPUTS_STATE: InputsState = {
  nameInput: "",
};

const CreateJob: FC = () => {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_STATE);
  const { nameInput } = inputs;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateInput = (fieldName: string, fieldValue: string) => {
    setInputs((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("submit", inputs);

    dispatch(
      jobsActions.createJob({ jobData: { id: Math.random(), name: nameInput } })
    );

    navigate("/");
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    updateInput(name, value);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          name="nameInput"
          onChange={onChangeHandler}
          required
          value={nameInput}
        />
        <button>Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
