import Editor from "@monaco-editor/react";

function languageFor(path) {
  if (!path) return "plaintext";
  if (path.endsWith(".json")) return "json";
  if (path.endsWith(".js")) return "javascript";
  if (path.endsWith(".md")) return "markdown";
  if (path.toLowerCase().includes("dockerfile")) return "dockerfile";
  return "plaintext";
}

export default function CodeViewer({ path, content }) {
  if (!path) {
    return <div className="code-viewer-empty">Select a file to view its generated code</div>;
  }
  return (
    <Editor
      height="100%"
      theme="vs-dark"
      language={languageFor(path)}
      value={content ?? ""}
      options={{
        readOnly: true,
        minimap: { enabled: false },
        fontSize: 13,
        fontFamily: "JetBrains Mono, monospace",
        scrollBeyondLastLine: false,
        padding: { top: 12 },
      }}
    />
  );
}
