import { FC } from "react";
import { Skill } from "../../store/skills/skills.slice";
import classes from "./Skill.module.scss";

type Props = {
  skill: Skill;
  isActive: boolean;
};

const SkillCard: FC<Props> = (props) => {
  const { skill, isActive } = props;

  return (
    <div
      className={`${classes["skill-card"]} ${
        isActive && classes["skill-card--active"]
      }`}
    >
      {skill.name}
    </div>
  );
};

export default SkillCard;
