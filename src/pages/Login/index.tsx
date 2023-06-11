import "./login.style.css";
import { LoginForm } from "./loginForm";

export const Login = () => {
  return (
    <div className="login">
      <div className="fitment"></div>
      <div className="still">
        <LoginForm />
      </div>
    </div>
  );
};
