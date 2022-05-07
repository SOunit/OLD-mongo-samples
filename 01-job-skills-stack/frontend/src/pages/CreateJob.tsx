import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

type InputsState = {
  [key: string]: string;
};

const INITIAL_INPUTS_STATE: InputsState = {
  nameInput: "",
};

const CreateJob: FC = () => {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_STATE);
  const { nameInput } = inputs;

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("submit", inputs);
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
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
