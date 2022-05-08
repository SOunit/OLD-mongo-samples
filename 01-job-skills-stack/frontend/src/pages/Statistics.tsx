import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import classes from "./Statistics.module.scss";
import { useParams } from "react-router-dom";

Chart.register(...registerables);

const Statistics = () => {
  const { skillId } = useParams();

  const statistics = useSelector(
    (state: RootState) => state.statistics.statistics
  );

  if (!(skillId && statistics[skillId])) {
    return <div>No data found!</div>;
  }

  return (
    <div className={classes["statistics"]}>
      <h1>{statistics[skillId].primarySkill.name}</h1>
      <div className={classes["chart-container"]}>
        <Bar
          data={{
            labels: statistics[skillId].subSkills.map(
              (elem) => elem.skill.name
            ),
            datasets: [
              {
                label: "Related Skills",
                data: statistics[skillId].subSkills.map((elem) => elem.count),
                backgroundColor: "pink",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Statistics;
