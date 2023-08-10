import "./input.style.css";
import { InputHTMLAttributes, useState } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  register?: any;
  name: string;
  error?: any;
  label?: string;
}

export const BGInput = ({
  label,
  register,
  name,
  placeholder,
  error,
  ...rest
}: InputProps) => {
  return (
    <div className="input-form">
      {label && <div className="input-label">{label}</div>}
      <div className={!!error ? "input-field borded" : "input-field"}>
        <input
          {...(register && { ...register(name) })}
          {...rest}
          className={!!error ? "input-password error" : "input-password"}
          placeholder={!!error ? `${error}` : `${placeholder}`}
        />
      </div>
    </div>
  );
};
