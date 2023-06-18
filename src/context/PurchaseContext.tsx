import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { useCompany } from "./CompanyContext";

interface PurchaseProviderProps {
  children: ReactNode;
}

export interface PurchaseDetail {
  purchaseDetailId: string;
  purchaseId: string;
  ingredientName: string;
  ingredientQty: number;
  measurementUnit: string;
  ingredientPrice: number;
}

export interface Purchase {
  purchaseId: string;
  purchaseDate: string;
  userId: string;
  purchaseDetails: PurchaseDetail[];
  purchaseTotal: number;
}

interface ingredientData {
  ingredientName: string;
  ingredientQty: string;
  measurementUnit: string;
  ingredientPrice: string;
}

interface PurchaseContextData {
  purchases: Purchase[];
  ingredient: {};
  purchaseDetails: PurchaseDetail[];
  thisPurchase: Purchase;
  Shopping: () => void;
  shoppingList: (purchaseId: string) => void;
  Buy: () => void;
  itemBuy: (data: ingredientData, purchaseId: string) => Promise<void>;
  eliminaCompra: (id: string) => void;
}

export const PurchaseContext = createContext<PurchaseContextData>(
  {} as PurchaseContextData
);

const usePurchase = () => useContext(PurchaseContext);

const PurchaseProvider = ({ children }: PurchaseProviderProps) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { miCompania } = useCompany();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [thisPurchase, setThisPurchase] = useState<Purchase>({} as Purchase);
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetail[]>([]);
  const [ingredient, setIngredient] = useState({});

  const Shopping = async () => {
    await api
      .get(`/${miCompania.companyId}/purchases`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPurchases(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const shoppingList = async (purchaseId: string) => {
    await api
      .get(`/${miCompania.companyId}/purchases/${purchaseId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setThisPurchase(response.data);
      })
      .catch((error) => console.log(error));
  };

  const Buy = () => {
    api
      .post(
        `/${miCompania.companyId}/purchases`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        navigate(
          `/${miCompania.companyId}/purchases/${response.data.purchaseId}`
        );
        // setCompraId(response.data.purchaseId);
      })
      .catch((error) => console.log(error));
  };

  const itemBuy = async (data: ingredientData, purchaseId: string) => {
    await api
      .post(`/${miCompania.companyId}/purchases/${purchaseId}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIngredient(response.data);
        shoppingList(response.data.purchase);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const eliminaCompra = async (id: string) => {
    await api
      .delete(`/oikos-api/purchases/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        ingredient,
        purchaseDetails,
        thisPurchase,
        shoppingList,
        Shopping,
        Buy,
        itemBuy,
        eliminaCompra,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};

export { usePurchase, PurchaseProvider };
