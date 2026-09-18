import { Routes, Route } from "react-router-dom";
import Shell from "./components/Shell";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import ProjectView from "./pages/ProjectView";
import Runs from "./pages/Runs";

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<CreateProject />} />
        <Route path="/runs" element={<Runs />} />
        <Route path="/project/:id" element={<ProjectView />} />
      </Routes>
    </Shell>
  );
}
