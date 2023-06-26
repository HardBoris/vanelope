import { ReactNode } from "react";
import "./form.style.css";

interface FormularioProps {
  children: ReactNode;
  onSubmit?: () => void;
  isColumn: boolean;
}

export const Formulario = ({
  children,
  isColumn,
  ...rest
}: FormularioProps) => (
  <form {...rest} className={isColumn ? "vertical" : "horizontal"}>
    {children}
  </form>
);
