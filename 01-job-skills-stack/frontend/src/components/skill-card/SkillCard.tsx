import { FC, MouseEventHandler } from "react";
import { Skill } from "../../store/skills/skills.slice";
import classes from "./Skill.module.scss";

type Props = {
  skill: Skill;
  onClick: (skillToToggle: Skill) => void;
  isActive: boolean;
};

const SkillCard: FC<Props> = (props) => {
  const { skill, onClick, isActive } = props;

  const skillClickHandler: MouseEventHandler<HTMLDivElement> = () => {
    console.log("skill click!");
    onClick(skill);
  };

  return (
    <div
      className={`${classes["skill-card"]} ${
        isActive && classes["skill-card--active"]
      }`}
      onClick={skillClickHandler}
    >
      {skill.name}
    </div>
  );
};

export default SkillCard;
