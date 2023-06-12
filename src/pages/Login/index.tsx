import "./login.style.css";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <div className="login">
      <div className="login-fitment"></div>
      <div className="login-still">
        <LoginForm />
      </div>
    </div>
  );
};
