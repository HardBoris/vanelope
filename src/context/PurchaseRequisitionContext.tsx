import { ReactNode, createContext, useContext, useState } from "react";
import { ElementToBuy } from "./ElementContext";

interface PRProviderProps {
  children: ReactNode;
}

export interface PRequest {
  listDate: string;
  elementsList: ElementToBuy[];
}

interface PRequestContextData {
  prequestList: PRequest[];
  prequest: PRequest;
}

export const PRContext = createContext<PRequestContextData>(
  {} as PRequestContextData
);

const usePR = () => useContext(PRContext);

const PRProvider = ({ children }: PRProviderProps) => {
  const [prequestList, setPrequestList] = useState<PRequest[]>([]);
  const [prequest, setPrequest] = useState<PRequest>({} as PRequest);
  return (
    <PRContext.Provider value={{ prequestList, prequest }}>
      {children}
    </PRContext.Provider>
  );
};

export { usePR, PRProvider };
