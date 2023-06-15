import { Link } from "react-router-dom";
// import { Desire } from "../Desire";
// import Modal from "../Modal";
import "./navigator.style.css";
import { useAuth } from "../../context/UserContext";

export const Navigator = () => {
  const { signOut } = useAuth();
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
      <div className="navigator">
        <Link to="/" onClick={() => signOut()}>
          <span>Salir</span>
        </Link>
      </div>
    </nav>
  );
};
