import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";

interface ElementProviderProps {
  children: ReactNode;
}

export interface MyElement {
  elementId?: string;
  element?: string;
}

export interface ElementToBuy {
  element?: string;
  elementName: string;
  elementType: string;
  quantity: string;
  unit: string;
  company?: string;
}

export interface Midia {
  midiaId?: string;
  midiaName: string;
  midiaDescription?: string;
  midiaWidth?: string;
  midiaHeight?: string;
  midiaThick?: string;
  measurementUnit?: string;
  minimunStock?: string;
  idealStock?: string;
}

export interface Stuff {
  stuffId?: string;
  stuff: string;
  description?: string;
  defaultUnit?: string;
  stuffPerPacking?: string;
  minimumStock?: string;
  idealStock?: string;
}

export interface Tool {
  toolId?: string;
  tool: string;
  toolModel?: string;
  toolPower?: string;
}

interface ElementContextData {
  element: MyElement;
  stock: MyElement[];
  ElementsList: () => void;
  ElementCreator: (data: ElementToBuy) => void;
}

export const ElementContext = createContext<ElementContextData>(
  {} as ElementContextData
);

const useElement = () => useContext(ElementContext);

const ElementProvider = ({ children }: ElementProviderProps) => {
  const { company, token } = useAuth();
  const [stock, setStock] = useState<MyElement[]>([]);
  const [element, setElement] = useState<MyElement>({});

  const ElementsList = async () => {
    await api
      .get(`/${company.companyId}/elements`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setStock(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    ElementsList();
  }, []);

  const ElementCreator = async (data: ElementToBuy) => {
    await api
      .post(`/${company.companyId}/elements/register`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setElement(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <ElementContext.Provider
      value={{
        element,
        stock,
        ElementsList,
        ElementCreator,
      }}
    >
      {children}
    </ElementContext.Provider>
  );
};

export { useElement, ElementProvider };
