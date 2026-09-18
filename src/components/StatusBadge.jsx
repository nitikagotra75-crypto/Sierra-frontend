const STYLES = {
  PENDING: { label: "Pending", cls: "badge--pending" },
  RUNNING: { label: "Running", cls: "badge--running" },
  VERIFIED: { label: "Verified", cls: "badge--verified" },
  FAILED: { label: "Failed", cls: "badge--failed" },
  NOT_VERIFIED: { label: "Not verified", cls: "badge--not-verified" },
};

export default function StatusBadge({ status }) {
  const s = STYLES[status] || STYLES.PENDING;
  return (
    <span className={`badge ${s.cls}`}>
      <span className="badge-dot" />
      {s.label}
    </span>
  );
}
