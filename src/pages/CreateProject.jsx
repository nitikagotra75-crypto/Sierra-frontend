import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [requirement, setRequirement] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const project = await api.createProject({ name, requirement });
      await api.generate(project.projectId);
      navigate(`/project/${project.projectId}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="page page--narrow">
      <h1 className="page-title">New project</h1>
      <p className="page-subtitle">Describe what it needs to do.</p>

      <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="field-label">Project name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Task Manager API"
            className="input"
          />
        </div>

        <div>
          <label className="field-label">Describe your backend</label>
          <textarea
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            required
            rows={6}
            placeholder="Create a task management API with user registration, login, and CRUD operations for tasks."
            className="textarea"
          />
        </div>

        <div className="stack-line">
          <strong>Stack</strong>
          <span>MERN</span>
        </div>

        {error && <div className="error-box">{error}</div>}

        <button type="submit" disabled={submitting} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
          {submitting ? "Starting…" : "Generate backend"}
        </button>
      </form>
    </div>
  );
}
