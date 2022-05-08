import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SkillCard from "../components/skill-card/SkillCard";
import { RootState } from "../store";
import classes from "./SkillList.module.scss";

const SkillList = () => {
  const skills = useSelector((state: RootState) => state.skills.skills);

  return (
    <div className={classes["skill-card-list"]}>
      <h1 className={classes["title"]}>Select Skill</h1>
      <div className={classes["skill-cards-container"]}>
        {skills.map((skill) => (
          <Link to={`/skills/statistics/${skill.id}`}>
            <SkillCard key={skill.id} isActive={true} skill={skill} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SkillList;
