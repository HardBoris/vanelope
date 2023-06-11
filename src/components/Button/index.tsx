import { ButtonHTMLAttributes, ReactNode } from "react";
import "./style.css";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export const Button = ({ children, ...rest }: ButtonProps) => (
  <button {...rest}>{children}</button>
);
