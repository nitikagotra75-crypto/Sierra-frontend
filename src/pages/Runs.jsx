import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

const PHASE_LABEL = { initial: "initial", retest: "retest", regression: "regression" };

export default function Runs() {
  const [runs, setRuns] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.listRecentRuns().then((d) => setRuns(d.runs)).catch((e) => setError(e.message));
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Runs</h1>
      <p className="page-subtitle">Every test run, across all projects.</p>

      {error && <div className="error-box" style={{ marginBottom: 20 }}>{error}</div>}

      {runs && runs.length === 0 && <div style={{ color: "var(--color-text-dim)", fontSize: 13 }}>No test runs yet.</div>}

      <div className="list">
        {runs && runs.map((r) => (
          <Link key={r._id} to={`/project/${r.projectId}`} className="list-item">
            <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
              <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--color-text-dim)", width: 80, flexShrink: 0 }}>
                {PHASE_LABEL[r.phase] || r.phase}
              </span>
              <span className="truncate" style={{ color: "var(--color-text-bright)", fontSize: 13 }}>{r.projectName}</span>
            </div>
            <div className="list-item-side">
              <span style={{ color: r.failed > 0 ? "var(--color-danger)" : "var(--color-accent-dim)" }}>
                {r.passed}/{r.passed + r.failed} passed
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
