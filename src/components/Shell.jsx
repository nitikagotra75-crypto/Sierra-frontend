import { NavLink } from "react-router-dom";

export default function Shell({ children }) {
  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Sierra</div>
        <nav className="nav">
          <NavLink to="/new" className={linkClass}>New project</NavLink>
          <NavLink to="/" end className={linkClass}>Projects</NavLink>
          <NavLink to="/runs" className={linkClass}>Runs</NavLink>
          <span className="nav-link-disabled">
            Settings <span className="nav-tag">(soon)</span>
          </span>
        </nav>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
