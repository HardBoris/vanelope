import { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.style.css";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export const Button = ({ children, ...rest }: ButtonProps) => (
  <div className="btn">
    <button {...rest}>{children}</button>
  </div>
);
