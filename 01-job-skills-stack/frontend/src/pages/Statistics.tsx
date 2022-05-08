import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import classes from "./Statistics.module.scss";

Chart.register(...registerables);

const Statistics = () => {
  const statistics = useSelector(
    (state: RootState) => state.statistics.statistics
  );

  return (
    <div className={classes["statistics"]}>
      <h1>{statistics.primarySkill.name}</h1>
      <div className={classes["chart-container"]}>
        <Bar
          data={{
            labels: statistics.subSkills.map((elem) => elem.skill.name),
            datasets: [
              {
                label: "Related Skills",
                data: statistics.subSkills.map((elem) => elem.count),
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
