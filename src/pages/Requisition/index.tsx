import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Requisition.style.css";
import { useAuth } from "../../context/UserContext";

export const Requisition = () => {
  const location = useLocation();
  const { company } = useAuth();

  return (
    <div className="requisitions">
      <div className="requisitions-header">
        <Link
          to={`/${company}/requisitions`}
          className={
            location.pathname === `/${company}/requisitions`
              ? "tab activated"
              : "tab"
          }
        >
          Requisições
        </Link>
        <Link
          to={`/${company}/requisitions/materialreq`}
          className={
            location.pathname === `/${company}/requisitions/materialreq`
              ? "tab activated"
              : "tab"
          }
        >
          Requisição de Materiais
        </Link>
        <Link
          to={`/${company}/requisitions/toolreq`}
          className={
            location.pathname === `/${company}/requisitions/toolreq`
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
