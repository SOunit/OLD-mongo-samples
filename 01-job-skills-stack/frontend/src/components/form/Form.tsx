import { ChangeEventHandler, FC, FormEventHandler } from "react";
import Button from "../button/Button";
import classes from "./Form.module.scss";

export type FormInputsState = {
  [key: string]: string;
};

export const updateInput = (
  fieldName: string,
  fieldValue: string,
  setInputs: React.Dispatch<React.SetStateAction<FormInputsState>>
) => {
  setInputs((prevState) => ({
    ...prevState,
    [fieldName]: fieldValue,
  }));
};

type Props = {
  submitButtonText: string;
  inputsState: FormInputsState;
  onSubmit: Function;
  setInputs: React.Dispatch<React.SetStateAction<FormInputsState>>;
};

const Form: FC<Props> = (props) => {
  const { inputsState, onSubmit, setInputs, submitButtonText } = props;

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit();
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    updateInput(name, value, setInputs);
  };

  return (
    <form onSubmit={submitHandler} className={classes["form"]}>
      {Object.keys(inputsState).map((key) => (
        <input
          className={classes["form__input"]}
          key={key}
          name={key}
          onChange={onChangeHandler}
          // FIXME:
          required
          value={inputsState[key]}
        />
      ))}

      <Button>{submitButtonText}</Button>
    </form>
  );
};

export default Form;
