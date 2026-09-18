export default function ActivityFeed({ events }) {
  return (
    <div className="activity-feed">
      {events.length === 0 && <div className="activity-feed-empty">Waiting for the pipeline to start…</div>}
      {events.map((e, i) => (
        <div key={i} className="activity-line">
          <span className="activity-icon">{e.icon}</span>
          <span
            className={
              e.type === "error"
                ? "activity-text--error"
                : e.type === "ok"
                ? "activity-text--ok"
                : e.type === "final"
                ? "activity-text--final"
                : "activity-text--step"
            }
          >
            {e.text}
          </span>
        </div>
      ))}
    </div>
  );
}
