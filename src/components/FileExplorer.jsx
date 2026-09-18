function buildTree(paths) {
  const root = {};
  for (const p of paths) {
    const parts = p.split("/");
    let node = root;
    parts.forEach((part, i) => {
      node.children = node.children || {};
      node.children[part] = node.children[part] || { name: part, path: parts.slice(0, i + 1).join("/") };
      node = node.children[part];
      if (i === parts.length - 1) node.isFile = true;
    });
  }
  return root;
}

function Node({ node, depth, selected, onSelect }) {
  const entries = node.children ? Object.values(node.children).sort((a, b) => {
    if (!!a.children === !!b.children) return a.name.localeCompare(b.name);
    return a.children ? -1 : 1;
  }) : [];

  const classes = [
    "file-node",
    node.isFile ? "is-file" : "is-folder",
    selected === node.path ? "is-selected" : "",
  ].filter(Boolean).join(" ");

  return (
    <div>
      {node.name && (
        <button
          onClick={() => node.isFile && onSelect(node.path)}
          className={classes}
          style={{ paddingLeft: `${depth * 14 + 8}px` }}
        >
          <span className="file-node-caret">{node.children ? "▸" : ""}</span>
          <span className="file-node-name">{node.name}</span>
        </button>
      )}
      {entries.map((child) => (
        <Node key={child.path} node={child} depth={depth + (node.name ? 1 : 0)} selected={selected} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default function FileExplorer({ files, selected, onSelect }) {
  const tree = buildTree(files);
  return (
    <div className="file-tree">
      <Node node={tree} depth={0} selected={selected} onSelect={onSelect} />
    </div>
  );
}
