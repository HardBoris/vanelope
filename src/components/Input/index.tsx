import "./input.style.css";
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
    return isText;
  };

  return (
    <div className="input-form">
      {label && <div className="input-label">{label}</div>}
      {isPassword ? (
        <div className={!!error ? "input-field borded" : "input-field"}>
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
          {entrada && (
            <>
              <div
                role="button"
                className={!!error ? "iconbtn error" : "iconbtn"}
                onClick={() => {
                  setEntrada("");
                }}
              >
                <FaTimes />
              </div>
              <div
                role="button"
                className={!!error ? "iconbtn error" : "iconbtn"}
                onClick={() => showPassword()}
              >
                {isText ? <FaEyeSlash /> : <FaEye />}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={!!error ? "input-field borded" : "input-field"}>
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
          {entrada && (
            <div
              role="button"
              className={!!error ? "iconbtn error" : "iconbtn"}
              onClick={() => {
                setEntrada("");
              }}
            >
              <FaTimes />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
