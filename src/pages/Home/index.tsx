import "./home.style.css";
import { Helmet } from "react-helmet";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Aventura | Home</title>
      </Helmet>
      <div className="welcome">
        <h1>Oikos</h1>
        <h2>Controle de Estoque</h2>
      </div>
    </>
  );
};
