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

  if (!(skillId && statistics)) {
    return <div>No data found!</div>;
  }

  return (
    <div className={classes["statistics"]}>
      <h1>{statistics.primarySkill.name}</h1>
      <div className={classes["chart-container"]}>
        <Bar
          data={{
            labels: Object.keys(statistics.subSkillsMap).map(
              (key) => statistics.subSkillsMap[key].skill.name
            ),
            datasets: [
              {
                label: "Related Skills",
                data: Object.keys(statistics.subSkillsMap).map(
                  (key) => statistics.subSkillsMap[key].count
                ),
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
