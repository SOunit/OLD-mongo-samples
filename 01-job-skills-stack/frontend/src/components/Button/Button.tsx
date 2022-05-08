import { FC, MouseEventHandler, ReactNode } from "react";
import classes from "./Button.module.scss";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const Button: FC<Props> = (props) => {
  const { onClick, children } = props;

  return (
    <button onClick={onClick} className={classes["button"]}>
      {children}
    </button>
  );
};

export default Button;
