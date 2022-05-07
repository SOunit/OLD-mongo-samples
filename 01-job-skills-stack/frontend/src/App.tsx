import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import CreateJob from "./pages/CreateJob";
import JobList from "./pages/JobList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<JobList />} />
        <Route path="jobs" element={<JobList />} />
        <Route path="jobs/new" element={<CreateJob />} />
      </Route>
    </Routes>
  );
}

export default App;
