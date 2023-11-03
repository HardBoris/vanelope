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
  elementId: string;
  quantity: number;
  unit: string;
  cost?: number;
}

interface DetailContextData {
  details: Detail[];
  DetailsList: () => void;
  DetailCreator: (data: Detail) => void;
}

export const DetailContext = createContext<DetailContextData>(
  {} as DetailContextData
);

const useDetail = () => useContext(DetailContext);

const DetailProvider = ({ children }: DetailProviderProps) => {
  const { company, token } = useAuth();
  const [details, setDetails] = useState<Detail[]>([]);

  const DetailCreator = async (data: Detail) => {
    await api
      .post(`/${company.companyId}/details/register`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  const DetailsList = async () => {
    await api
      .get(`/${company}/details`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setDetails(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <DetailContext.Provider value={{ details, DetailsList, DetailCreator }}>
      {children}
    </DetailContext.Provider>
  );
};

export { useDetail, DetailProvider };
