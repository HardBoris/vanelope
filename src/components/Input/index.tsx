import "./password.style.css";
import { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  register: any;
  name: string;
  isPassword: boolean;
  error?: any;
  label?: string;
}

export const Input = ({
  label,
  register,
  name,
  placeholder,
  isPassword,
  error,
  ...rest
}: InputProps) => {
  const [entrada, setEntrada] = useState("");
  const [isText, setIsText] = useState(true);
  const showPassword = () => {
    setIsText(!isText);
    console.log(isText);
    return isText;
  };

  return (
    <div className="input-form">
      {label && <div className="input-label">{label}</div>}
      {/* <div className="input-wrapper"> */}
      {isPassword ? (
        <div className="input-field">
          <input
            {...register(name)}
            {...rest}
            className={!!error ? "input-password error" : "input-password"}
            placeholder={!!error ? `${error}` : `${placeholder}`}
            type={isText ? "password" : "text"}
            value={entrada}
            onChange={(e) => {
              setEntrada(e.target.value);
            }}
          />
          <div
            role="button"
            className="iconbtn"
            onClick={() => {
              setEntrada("");
            }}
          >
            <FaTimes />
          </div>
          <div role="button" className="iconbtn" onClick={() => showPassword()}>
            {isText ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      ) : (
        <div className="input-field">
          <input
            {...register(name)}
            {...rest}
            className={!!error ? "input-text error" : "input-text"}
            placeholder={!!error ? `${error}` : `${placeholder}`}
            type="text"
            value={entrada}
            onChange={(e) => {
              setEntrada(e.target.value);
            }}
          />
          <div
            role="button"
            className="iconbtn"
            onClick={() => {
              setEntrada("");
            }}
          >
            <FaTimes />
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};
