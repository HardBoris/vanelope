import "./signup.style.css";
import { SignupForm } from "./SignupForm";

export const Signup = () => {
  return (
    <div className="signup">
      <div className="signup-still">
        <SignupForm />
      </div>
      <div className="signup-fitment"></div>
    </div>
  );
};
