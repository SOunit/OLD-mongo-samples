import { FC, MouseEventHandler } from "react";
import { Skill } from "../../store/skills/skills.slice";
import SkillCard from "../skill-card/SkillCard";

type Props = {
  skill: Skill;
  onClick: (skillToToggle: Skill) => void;
  isActive: boolean;
};

const SelectableSkillCard: FC<Props> = (props) => {
  const { skill, onClick, isActive } = props;

  const skillClickHandler: MouseEventHandler<HTMLDivElement> = () => {
    console.log("skill click!");
    onClick(skill);
  };

  return (
    <div onClick={skillClickHandler}>
      <SkillCard skill={skill} isActive={isActive} />
    </div>
  );
};

export default SelectableSkillCard;
