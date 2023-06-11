import "./login.style.css";
import { LoginForm } from "./loginForm";

export const Login = () => {
  return (
    <div className="login">
      <div className="movida"></div>
      <div className="quieta">
        <LoginForm />
      </div>
    </div>
  );
};
