import StatusBadge from "./StatusBadge";

function Row({ label, ok, detail }) {
  return (
    <div className="report-row">
      <span className="report-row-label">{label}</span>
      <span className={`report-row-detail ${ok ? "report-row-detail--ok" : "report-row-detail--fail"}`}>{detail}</span>
    </div>
  );
}

export default function ReportPanel({ project }) {
  const report = project?.report;

  if (!report) {
    return <div className="report-empty">No verification report yet — waiting for the pipeline to finish.</div>;
  }

  if (report.status && report.reason && !report.apiTests) {
    return (
      <div className="report">
        <div className="report-header">
          <div className="report-title">Verification report</div>
          <StatusBadge status={report.status} />
        </div>
        <div className="report-reason">{report.reason}</div>
        {report.detail && <pre className="report-detail">{report.detail}</pre>}
      </div>
    );
  }

  return (
    <div className="report">
      <div className="report-header">
        <div className="report-title">Verification report</div>
        <StatusBadge status={report.status} />
      </div>

      <div className="report-section">
        <Row label="Files generated" ok={report.filesGenerated} detail={report.filesGenerated ? "✓" : "✗"} />
        <Row label="Dependencies" ok={report.dependenciesInstalled} detail={report.dependenciesInstalled ? "✓" : "✗"} />
        <Row label="Build" ok={report.build} detail={report.build ? "✓" : "✗"} />
        <Row label="Server startup" ok={report.serverStartup} detail={report.serverStartup ? `✓ (${report.dockerMode ? "docker" : "sandbox"})` : "✗"} />
        <Row
          label="API tests"
          ok={report.apiTests.passed === report.apiTests.total && report.apiTests.total > 0}
          detail={`${report.apiTests.passed}/${report.apiTests.total}`}
        />
        <Row label="Regression tests" ok={report.regressionTests} detail={report.regressionTests ? "✓" : "✗"} />
        <Row label="Code quality" ok={report.codeQuality.issues.length === 0} detail={`${report.codeQuality.issues.length} issue(s)`} />
        <Row
          label="Security check"
          ok={!report.security.findings.some((f) => f.level === "fail")}
          detail={`${report.security.findings.filter((f) => f.level === "fail").length} fail, ${report.security.findings.filter((f) => f.level === "warn").length} warn`}
        />
      </div>

      {report.fixAttempts && report.fixAttempts.length > 0 && (
        <div className="report-section">
          <div className="report-section-title">Self-debugging</div>
          {report.fixAttempts.map((f, i) => (
            <div key={i} className="report-fix-line">
              #{f.attempt} {f.failure}: {f.applied ? `fixed ${f.file} (${f.method})` : "no confident fix found"}
            </div>
          ))}
        </div>
      )}

      {report.apisCreated && (
        <div className="report-section">
          <div className="report-section-title">APIs created</div>
          <div className="report-tags">
            {report.apisCreated.map((a) => (
              <span key={a} className="report-tag">{a}</span>
            ))}
          </div>
        </div>
      )}

      {report.security?.disclaimer && <div className="report-disclaimer">{report.security.disclaimer}</div>}
    </div>
  );
}
