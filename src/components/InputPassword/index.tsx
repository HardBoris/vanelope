import "./password.style.css";
import { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  register: any;
  name: string;
  error?: any;
  label?: string;
}

export const InputPassword = ({
  placeholder,
  label,
  register,
  name,
  error,
  ...rest
}: InputProps) => {
  const [isText, setIsText] = useState(false);
  const showPassword = () => {
    setIsText(!isText);
    console.log(isText);
    return isText;
  };
  return (
    <div className="password-form">
      {/* <div className="password-label">
        {label} {!!error && <span>: {error} </span>}
      </div> */}
      <div className={!!error ? "password-error" : "password-field"}>
        <input
          {...register(name)}
          {...rest}
          className="password-input"
          placeholder={!!error ? `${error}` : `${placeholder}`}
          type={isText ? "text" : "password"}
        />
        <div
          role="button"
          className="password-eye"
          onClick={() => showPassword()}
        >
          {isText ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
    </div>
  );
};
