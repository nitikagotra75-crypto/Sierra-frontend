const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

async function req(path, opts) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  listProjects: () => req("/api/projects"),
  createProject: (data) => req("/api/projects", { method: "POST", body: JSON.stringify(data) }),
  getProject: (id) => req(`/api/projects/${id}`),
  generate: (id) => req(`/api/projects/${id}/generate`, { method: "POST" }),
  listFiles: (id) => req(`/api/projects/${id}/files`),
  getFile: (id, path) => req(`/api/projects/${id}/files/${path}`),
  getTestResults: (id) => req(`/api/projects/${id}/test-results`),
  getStatus: (id) => req(`/api/projects/${id}/status`),
  listRecentRuns: () => req("/api/runs"),
  eventsUrl: (id) => `${BASE}/api/projects/${id}/events`,
};
