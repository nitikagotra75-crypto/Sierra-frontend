import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { useProjectEvents } from "../hooks/useProjectEvents";
import StatusBadge from "../components/StatusBadge";
import ActivityFeed from "../components/ActivityFeed";
import FileExplorer from "../components/FileExplorer";
import CodeViewer from "../components/CodeViewer";
import ReportPanel from "../components/ReportPanel";

export default function ProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [tab, setTab] = useState("activity");

  function refreshAfterFinal() {
    api.getProject(id).then(setProject).catch(() => {});
    api.listFiles(id).then((d) => setFiles(d.files)).catch(() => {});
    setTab("report");
  }

  const events = useProjectEvents(id, refreshAfterFinal);

  useEffect(() => {
    api.getProject(id).then(setProject).catch(() => {});
    api.listFiles(id).then((d) => setFiles(d.files)).catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!selectedFile) return;
    api.getFile(id, selectedFile).then((d) => setFileContent(d.content)).catch(() => setFileContent("// couldn't load file"));
  }, [id, selectedFile]);

  if (!project) {
    return <div className="project-loading">Loading project…</div>;
  }

  return (
    <div className="project-view">
      <div className="project-header">
        <div>
          <h1 className="project-title">{project.name}</h1>
          <p className="project-subtitle">{project.requirement}</p>
        </div>
        <StatusBadge status={project.finalStatus} />
      </div>

      <div className="tabs">
        {["activity", "files", "report"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`tab${tab === t ? " active" : ""}`}>
            {t === "activity" ? "Live activity" : t === "files" ? "Project files" : "Verification report"}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {tab === "activity" && (
          <div className="tab-panel--activity">
            <ActivityFeed events={events} />
          </div>
        )}

        {tab === "files" && (
          <div className="tab-panel--files">
            <div className="file-explorer-pane">
              <FileExplorer files={files} selected={selectedFile} onSelect={setSelectedFile} />
            </div>
            <div className="code-pane">
              <CodeViewer path={selectedFile} content={fileContent} />
            </div>
          </div>
        )}

        {tab === "report" && (
          <div className="tab-panel--report">
            <ReportPanel project={project} />
          </div>
        )}
      </div>
    </div>
  );
}
