import { Link } from "react-router-dom";
import "./navigator.style.css";
import { useAuth } from "../../context/UserContext";

export const Navigator = () => {
  const { signOut, company } = useAuth();

  return (
    <nav>
      <div className="navigator">
        <Link to="/">
          <span>Home</span>
        </Link>
      </div>
      <div className="navigator">
        <Link to="/login">
          <span>LogIn</span>
        </Link>
      </div>
      <div className="navigator">
        <Link to="/signup">
          <span>SignUp</span>
        </Link>
      </div>
      {company && (
        <>
          <div className="navigator">
            <Link to={`/${company}`} onClick={() => {}}>
              <span>Dashboard</span>
            </Link>
          </div>
          <div className="navigator">
            <Link to={`/${company}/purchases`} onClick={() => {}}>
              <span>Compras</span>
            </Link>
          </div>
          <div className="navigator">
            <Link to={`/${company}/movements`} onClick={() => {}}>
              <span>Movimientos</span>
            </Link>
          </div>
        </>
      )}
      <div className="navigator">
        <Link to="/" onClick={() => signOut()}>
          <span>Salir</span>
        </Link>
      </div>
    </nav>
  );
};
