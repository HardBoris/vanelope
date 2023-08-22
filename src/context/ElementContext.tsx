import { ReactNode, createContext, useContext, useState } from "react";
import { Purchase } from "./PurchaseContext";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";

interface ElementProviderProps {
  children: ReactNode;
}

export interface Element {
  elementId?: string;
  elementName?: string;
}

interface ElementContextData {
  elements: Element[];
  ElementsList: () => void;
}

export const ElementContext = createContext<ElementContextData>(
  {} as ElementContextData
);

const useElement = () => useContext(ElementContext);

const ElementProvider = ({ children }: ElementProviderProps) => {
  const { company, token } = useAuth();
  const [elements, setElements] = useState<Element[]>([]);

  const ElementsList = async () => {
    await api
      .get(`/${company}/elements`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setElements(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <ElementContext.Provider value={{ elements, ElementsList }}>
      {children}
    </ElementContext.Provider>
  );
};

export { useElement, ElementProvider };
