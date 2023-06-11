import "./input.style.css";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  register: any;
  name: string;
  error?: any;
  label?: string;
}

export const Input = ({
  placeholder,
  register,
  name,
  error,
  ...rest
}: InputProps) => {
  return (
    <div className="input-form">
      <input
        {...register(name)}
        {...rest}
        className={!!error ? "input-error" : "input-input"}
        placeholder={!!error ? `${error}` : `${placeholder}`}
      />
    </div>
  );
};
