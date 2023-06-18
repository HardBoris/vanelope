import { Helmet } from "react-helmet";
import "./dashboard.style.css";

export const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Aventura | Dashboard</title>
      </Helmet>
      <div className="dashboard">
        <div className="segmentos">Compras</div>
        <div className="segmentos">Produção</div>
        <div className="segmentos">Estoque</div>
        <div className="segmentos">Relatórios</div>
      </div>
    </>
  );
};
