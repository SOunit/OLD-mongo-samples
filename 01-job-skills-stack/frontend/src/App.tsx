import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import CreateJob from "./pages/CreateJob";
import JobList from "./pages/JobList";
import CreateSkill from "./pages/CreateSkill";
import Statistics from "./pages/Statistics";
import SkillList from "./pages/SkillList";
import Job from "./pages/Job";
import { useEffect } from "react";
// import { useSetupData } from "./utils/setup-data";
import db from "./utils/db";
import { useDispatch } from "react-redux";
import { skillsActions } from "./store/skills/skills.slice";

function App() {
  // useSetupData();
  const dispatch = useDispatch();

  useEffect(() => {
    const initSkills = async () => {
      const skills = await db.getSkills();
      dispatch(skillsActions.setSkills({ skills }));
    };

    initSkills();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<JobList />} />
        <Route path="jobs" element={<JobList />} />
        <Route path="jobs/new" element={<CreateJob />} />
        <Route path="jobs/:jobId" element={<Job />} />
        <Route path="skills/new" element={<CreateSkill />} />
        <Route path="skills" element={<SkillList />} />
        <Route path="skills/statistics/:skillId" element={<Statistics />} />
      </Route>
    </Routes>
  );
}

export default App;
