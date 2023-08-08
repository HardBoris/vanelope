import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Requisition.style.css";

export const Requisition = () => {
  const location = useLocation();

  return (
    <div className="requisitions">
      <div className="requisitions-header">
        <Link
          to="/requisitions"
          className={
            location.pathname === "/requisitions" ? "tab activated" : "tab"
          }
        >
          Requisições
        </Link>
        <Link
          to="/requisitions/materialreq"
          className={
            location.pathname === "/requisitions/materialreq"
              ? "tab activated"
              : "tab"
          }
        >
          Requisição de Materiais
        </Link>
        <Link
          to="/requisitions/toolreq"
          className={
            location.pathname === "/requisitions/toolreq"
              ? "tab activated"
              : "tab"
          }
        >
          Requisição de Ferramentas
        </Link>
      </div>
      <div className="requisitions-body">
        <Outlet />
      </div>
    </div>
  );
};
