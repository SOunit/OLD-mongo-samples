import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import CreateJob from "./pages/CreateJob";
import JobList from "./pages/JobList";
import CreateSkill from "./pages/CreateSkill";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<JobList />} />
        <Route path="jobs" element={<JobList />} />
        <Route path="jobs/new" element={<CreateJob />} />
        <Route path="skills/new" element={<CreateSkill />} />
        <Route path="skills/statistics" element={<Statistics />} />
      </Route>
    </Routes>
  );
}

export default App;
