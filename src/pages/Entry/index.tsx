import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Requisition.style.css";

export const Entry = () => {
  const location = useLocation();

  return (
    <div className="entries">
      <div className="entries-header">
        <Link
          to="/entries"
          className={location.pathname === "/entries" ? "tab activated" : "tab"}
        >
          Entradas
        </Link>
        <Link
          to="/entries/materialentry"
          className={
            location.pathname === "/entries/materialentry"
              ? "tab activated"
              : "tab"
          }
        >
          Entrada de Materiais
        </Link>
        <Link
          to="/entries/toolentry"
          className={
            location.pathname === "/entries/toolentry" ? "tab activated" : "tab"
          }
        >
          Entrada de Ferramentas
        </Link>
      </div>
      <div className="entries-body">
        <Outlet />
      </div>
    </div>
  );
};
