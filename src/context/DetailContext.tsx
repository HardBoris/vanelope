import { ReactNode, createContext, useContext, useState } from "react";
import { Purchase, PurchaseDetail } from "./PurchaseContext";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";

interface DetailProviderProps {
  children: ReactNode;
}

export interface Detail {
  itemId?: string;
  purchase?: Purchase;
  midiaId?: string;
  stuffId?: string;
  toolId?: string;
  quantity: number;
  unit: string;
  cost: number;
}

interface DetailContextData {
  details: Detail[];
  DetailsList: () => void;
}

export const DetailContext = createContext<DetailContextData>(
  {} as DetailContextData
);

const useDetail = () => useContext(DetailContext);

const DetailProvider = ({ children }: DetailProviderProps) => {
  const { company, token } = useAuth();
  const [details, setDetails] = useState<Detail[]>([]);

  const DetailsList = async () => {
    await api
      .get(`/${company}/details`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setDetails(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <DetailContext.Provider value={{ details, DetailsList }}>
      {children}
    </DetailContext.Provider>
  );
};

export { useDetail, DetailProvider };
