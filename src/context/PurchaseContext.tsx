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

interface purchaseInfo {
  purchaseReference: string;
  deliveryDate: string;
  supplierId: string;
  logisticMode: string;
  paymentForm: string;
  paymentInstallments: string;
  purchaseStatus: string;
}

interface elementData {
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
  Buy: (data: purchaseInfo) => void;
  itemBuy: (data: elementData, purchaseId: string) => Promise<void>;
  eliminaCompra: (id: string) => void;
}

export const PurchaseContext = createContext<PurchaseContextData>(
  {} as PurchaseContextData
);

const usePurchase = () => useContext(PurchaseContext);

const PurchaseProvider = ({ children }: PurchaseProviderProps) => {
  const navigate = useNavigate();
  const { token, company } = useAuth();
  const { miCompania } = useCompany();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [thisPurchase, setThisPurchase] = useState<Purchase>({} as Purchase);
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetail[]>([]);
  const [ingredient, setIngredient] = useState({});

  const Shopping = async () => {
    await api
      .get(`/${company}/purchases`, {
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
      .get(`/${company}/purchases/${purchaseId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setThisPurchase(response.data);
      })
      .catch((error) => console.log(error));
  };

  const Buy = ({
    purchaseReference,
    deliveryDate,
    supplierId,
    logisticMode,
    paymentForm,
    paymentInstallments,
    purchaseStatus,
  }: purchaseInfo) => {
    api
      .post(
        `/${company}/purchases/register`,
        {
          purchaseReference,
          deliveryDate,
          supplierId,
          logisticMode,
          paymentForm,
          paymentInstallments,
          purchaseStatus,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        /* navigate(
          `/${miCompania.companyId}/purchases/${response.data.purchaseId}`
        ); */
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const itemBuy = async (data: elementData, purchaseId: string) => {
    await api
      .post(`/${company}/purchases/${purchaseId}`, data, {
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
      .delete(`/${company}/purchases/${id}`, {
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
