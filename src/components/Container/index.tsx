import { ReactNode } from "react";
import "./container.style.css";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => (
  <div className="contenedor">{children}</div>
);
