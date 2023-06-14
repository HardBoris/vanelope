import "./password.style.css";
import { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

interface NewInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  register: any;
  name: string;
  isPassword: boolean;
  error?: any;
  label?: string;
}

export const NewInput = ({
  label,
  register,
  name,
  placeholder,
  isPassword,
  error,
  ...rest
}: NewInputProps) => {
  const [entrada, setEntrada] = useState("");
  const [isText, setIsText] = useState(true);
  const showPassword = () => {
    setIsText(!isText);
    console.log(isText);
    return isText;
  };

  return (
    <div className="input-form">
      {label ? (
        <div className="input-label">{label}</div>
      ) : (
        <div className="invisible"></div>
      )}
      <div className={!!error ? "input-error" : "input-field"}>
        <input
          {...register(name)}
          {...rest}
          className="input-input"
          placeholder={!!error ? `${error}` : `${placeholder}`}
          type={isText ? "text" : "password"}
          /* value={entrada}
          onChange={(e) => {
            setEntrada(e.target.value);
          }} */
        />
        <div role="button" className="input-x" onClick={() => {}}>
          <FaTimes />
        </div>
        {isPassword && (
          <div
            role="button"
            className="password-eye"
            onClick={() => showPassword()}
          >
            {isText ? <FaEye /> : <FaEyeSlash />}
          </div>
        )}
      </div>
    </div>
  );
};
