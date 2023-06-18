import { Helmet } from "react-helmet";
import "./login.style.css";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <>
      <Helmet>
        <title>Aventura | Login</title>
      </Helmet>
      <div className="login">
        <div className="login-fitment"></div>
        <div className="login-still">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
