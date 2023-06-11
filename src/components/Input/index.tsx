import "./style.css";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  register: any;
  name: string;
  error?: any;
  label?: string;
}

export const Input = ({
  label,
  register,
  name,
  error,
  ...rest
}: InputProps) => {
  return (
    <div className="input-form">
      <div className="input-label">
        {label} {!!error && <span>: {error} </span>}
      </div>

      <input {...register(name)} {...rest} className="input-input" />
    </div>
  );
};
