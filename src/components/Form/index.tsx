import { ReactNode } from "react";
import "./form.style.css";

interface FormularioProps {
  children: ReactNode;
  onSubmit?: () => void;
  clase?: string;
}

export const Formulario = ({ children, clase, ...rest }: FormularioProps) => (
  <form {...rest} className={clase}>
    {children}
  </form>
);
