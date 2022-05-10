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
import skillsAdapter from "./utils/skills.adapter";
import { useDispatch } from "react-redux";
import { skillsActions } from "./store/skills/skills.slice";
import jobsAdapter from "./utils/jobs.adapter";
import { jobsActions } from "./store/jobs/jobs.slice";

function App() {
  // useSetupData();
  const dispatch = useDispatch();

  useEffect(() => {
    const initSkills = async () => {
      const skills = await skillsAdapter.getSkills();
      dispatch(skillsActions.setSkills({ skills }));
    };

    initSkills();
  }, [dispatch]);

  useEffect(() => {
    const initJobs = async () => {
      const jobs = await jobsAdapter.getJobs();
      dispatch(jobsActions.setJobs(jobs));
    };

    initJobs();
  });

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
