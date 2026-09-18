import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.listProjects().then((d) => setProjects(d.projects)).catch((e) => setError(e.message));
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
        <Link to="/new" className="btn btn-primary">New project</Link>
      </div>

      {error && <div className="error-box" style={{ marginBottom: 20 }}>{error}</div>}

      {projects && projects.length === 0 && (
        <div className="empty-state">
          <p>Nothing here yet.</p>
          <Link to="/new" className="btn-link" style={{ display: "inline-block", marginTop: 8 }}>Start one</Link>
        </div>
      )}

      <div className="list">
        {projects && projects.map((p) => (
          <Link key={p.projectId} to={`/project/${p.projectId}`} className="list-item">
            <div className="list-item-main">
              <div className="list-item-title truncate">{p.name}</div>
              <div className="list-item-sub truncate">{p.requirement}</div>
            </div>
            <div style={{ flexShrink: 0, marginLeft: 16 }}><StatusBadge status={p.finalStatus} /></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
