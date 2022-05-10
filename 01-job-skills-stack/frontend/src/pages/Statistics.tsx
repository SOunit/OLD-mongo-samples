import { useDispatch, useSelector } from "react-redux";
import { RootState, TypedDispatch } from "../store";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import classes from "./Statistics.module.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchStatistics } from "../store/statistics/statistics.action";

Chart.register(...registerables);

const Statistics = () => {
  const { skillId } = useParams();
  const dispatch = useDispatch<TypedDispatch>();

  const statistics = useSelector(
    (state: RootState) => state.statistics.statistics
  );

  useEffect(() => {
    if (skillId) {
      dispatch(fetchStatistics(skillId));
    }
  }, [dispatch, skillId]);

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
