import { Link } from "react-router-dom";
// import { Desire } from "../Desire";
// import Modal from "../Modal";
import "./navigator.style.css";

export const Navigator = () => {
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
    </nav>
  );
};
