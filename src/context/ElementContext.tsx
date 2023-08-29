import { ReactNode, createContext, useContext, useState } from "react";
import { Purchase } from "./PurchaseContext";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";

interface ElementProviderProps {
  children: ReactNode;
}

export interface MyElement {
  elementId?: string;
  elementName?: string;
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
  midia: MyElement;
  midias: Midia[];
  stuff: MyElement;
  stuffs: Stuff[];
  tool: MyElement;
  tools: Tool[];
  MidiasList: () => void;
  StuffsList: () => void;
  ToolsList: () => void;
  MidiaCreator: (data: Midia) => void;
  StuffCreator: (data: Stuff) => void;
  ToolCreator: (data: Tool) => void;
}

export const ElementContext = createContext<ElementContextData>(
  {} as ElementContextData
);

const useElement = () => useContext(ElementContext);

const ElementProvider = ({ children }: ElementProviderProps) => {
  const { company, token } = useAuth();
  const [midias, setMidias] = useState<Midia[]>([]);
  const [midia, setMidia] = useState<MyElement>({} as MyElement);
  const [stuffs, setStuffs] = useState<Stuff[]>([]);
  const [stuff, setStuff] = useState<MyElement>({} as MyElement);
  const [tools, setTools] = useState<Tool[]>([]);
  const [tool, setTool] = useState<MyElement>({} as MyElement);

  const StuffsList = async () => {
    await api
      .get(`/${company}/stuffs`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setStuffs(response.data))
      .catch((error) => console.log(error));
  };

  const ToolsList = async () => {
    await api
      .get(`/${company}/tools`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setTools(response.data))
      .catch((error) => console.log(error));
  };

  const MidiasList = async () => {
    await api
      .get(`/${company}/midias`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setMidias(response.data))
      .catch((error) => console.log(error));
  };

  const MidiaCreator = async (data: Midia) => {
    await api
      .post(`/${company}/midias`, data)
      .then((response) => setMidia(response.data))
      .catch((error) => console.log(error));
  };

  const StuffCreator = async (data: Stuff) => {
    await api
      .post(`/${company}/stuffs`, data)
      .then((response) => setStuff(response.data))
      .catch((error) => console.log(error));
  };

  const ToolCreator = async (data: Tool) => {
    await api
      .post(`/${company}/tools`, data)
      .then((response) => setTool(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <ElementContext.Provider
      value={{
        stuff,
        stuffs,
        tool,
        tools,
        midia,
        midias,
        StuffsList,
        ToolsList,
        MidiasList,
        MidiaCreator,
        StuffCreator,
        ToolCreator,
      }}
    >
      {children}
    </ElementContext.Provider>
  );
};

export { useElement, ElementProvider };
