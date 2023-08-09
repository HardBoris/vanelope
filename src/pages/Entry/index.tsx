import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Requisition.style.css";
import { useAuth } from "../../context/UserContext";

export const Entry = () => {
  const location = useLocation();
  const { company } = useAuth();

  return (
    <div className="entries">
      <div className="entries-header">
        <Link
          to={`/${company}/entries`}
          className={
            location.pathname === `/${company}/entries`
              ? "tab activated"
              : "tab"
          }
        >
          Entradas
        </Link>
        <Link
          to={`/${company}/entries/materialentry`}
          className={
            location.pathname === `/${company}/entries/materialentry`
              ? "tab activated"
              : "tab"
          }
        >
          Entrada de Materiais
        </Link>
        <Link
          to={`/${company}/entries/toolentry`}
          className={
            location.pathname === `/${company}/entries/toolentry`
              ? "tab activated"
              : "tab"
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
