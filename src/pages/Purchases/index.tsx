import { Link, Outlet, useLocation } from "react-router-dom";
// import "./purchases.style.css";
import "./Purchases.css";
import { Helmet } from "react-helmet";
import { useAuth } from "../../context/UserContext";

export const Purchases = () => {
  const location = useLocation();
  const { company } = useAuth();

  return (
    <>
      <Helmet>
        <title>Aventura | Compras</title>
      </Helmet>
      <div className="purchase">
        <div className="purchase_header">
          <Link
            to={`/${company}/purchases`}
            className={
              location.pathname === `/${company}/purchases`
                ? "tab activated"
                : "tab"
            }
          >
            Compras
          </Link>
          {/* <Link
            to={`/${company}/purchases/supplierinfo`}
            className={
              location.pathname === `/${company}/purchases/supplierinfo`
                ? "tab activated"
                : "tab"
            }
          >
            Informações do Fornecedor
          </Link> */}
          <Link
            to={`/${company}/purchases/newpurchase`}
            className={
              location.pathname === `/${company}/purchases/newpurchase`
                ? "tab activated"
                : "tab"
            }
          >
            Nova Compra
          </Link>
          {/* <Link
            to={`/${company}/purchases/purchasedetails`}
            className={
              location.pathname === `/${company}/purchases/purchasedetails`
                ? "tab activated"
                : "tab"
            }
          >
            Detalhes da Compra
          </Link> */}
        </div>
        <div className="purchase_body">
          <Outlet />
        </div>
      </div>
    </>
  );
};
