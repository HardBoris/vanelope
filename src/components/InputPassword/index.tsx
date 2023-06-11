import "./style.css";
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
    <div className="input__form">
      <div className="input__label">
        {label} {!!error && <span>: {error} </span>}
      </div>
      <div className="input__field">
        <input
          {...register(name)}
          {...rest}
          className="input__input"
          type={isText ? "text" : "password"}
        />
        <button
          type="button"
          className="input__eye"
          onClick={() => showPassword()}
        >
          {isText ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
    </div>
  );
};
