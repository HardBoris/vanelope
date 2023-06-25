import { Link } from "react-router-dom";
import "./navigator.style.css";
import { useAuth } from "../../context/UserContext";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaDashcube,
  FaHome,
  FaShekelSign,
  FaShoppingCart,
} from "react-icons/fa";

export const Navigator = () => {
  const { signOut, company } = useAuth();

  return (
    <nav>
      <div className="navigator">
        <Link to="/">
          {/* <span>Home</span> */}
          <FaHome />
        </Link>
      </div>
      <div className="navigator">
        <Link to="/login">
          {/* <span>LogIn</span> */}
          <FaArrowAltCircleLeft />
        </Link>
      </div>
      <div className="navigator">
        <Link to="/signup">
          {/* <span>SignUp</span> */}
          <FaArrowAltCircleDown />
        </Link>
      </div>
      {company && (
        <>
          <div className="navigator">
            <Link to={`/${company}`} onClick={() => {}}>
              {/* <span>Dashboard</span> */}
              <FaDashcube />
            </Link>
          </div>
          <div className="navigator">
            <Link to={`/${company}/purchases`} onClick={() => {}}>
              {/* <span>Compras</span> */}
              <FaShoppingCart />
            </Link>
          </div>
          <div className="navigator">
            <Link to={`/${company}/movements`} onClick={() => {}}>
              {/* <span>Movimientos</span> */}
              <FaShekelSign />
            </Link>
          </div>
        </>
      )}
      <div className="navigator">
        <Link to="/" onClick={() => signOut()}>
          {/* <span>Salir</span> */}
          <FaArrowAltCircleRight />
        </Link>
      </div>
    </nav>
  );
};
