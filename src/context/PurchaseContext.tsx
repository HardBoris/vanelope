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
import { Partner } from "./PartnerContext";
import { ElementToBuy, Midia, MyElement, Stuff, Tool } from "./ElementContext";

interface PurchaseProviderProps {
  children: ReactNode;
}

export interface PurchaseDetail {
  purchaseDetailId?: string;
  purchase?: Purchase;
  element: string;
  elementType: string;
  quantity: number;
  unit: string;
  cost: number;
  midia?: string;
  stuff?: string;
  tool?: string;
  company: string;
}

export interface purchaseRequisitionValues {
  listDate: string;
  elementsList: ElementToBuy[];
}

export interface Purchase {
  purchaseId?: string;
  purchaseDate: string;
  invoice?: string;
  deliveryDate?: string;
  logisticMode: string;
  paymentForm: string;
  paymentInstallments: string;
  purchaseStatus: string;
  partner: Partner;
  details: PurchaseDetail[];
  purchaseTotal: number;
}

export interface PurchaseData {
  purchaseDate: string;
  fantasyName: string;
  CNPJ: string;
  logisticMode: string;
  paymentForm: string;
  paymentInstallments: string;
  deliveryDate?: string;
  details: PurchaseDetail[];
}

export interface elementData {
  element: string;
  quantity: number;
  unit: string;
  cost: number;
  elementType: string;
  company: string;
}

interface PurchaseContextData {
  purchases: Purchase[];
  ingredient: {};
  purchaseDetails: PurchaseDetail[];
  thisPurchase: Purchase;
  ShoppingList: () => void;
  Shopping: (purchaseId: string) => void;
  Buy: (data: PurchaseData) => void;
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

  const ShoppingList = async () => {
    await api
      .get(`/${company.companyId}/purchases`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPurchases(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Shopping = async (purchaseId: string) => {
    await api
      .get(`/${company.companyId}/purchases/${purchaseId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setThisPurchase(response.data);
      })
      .catch((error) => console.log(error));
  };

  const Buy = (data: PurchaseData) => {
    api
      .post(`/${company.companyId}/purchases/register`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        /* navigate(
          `/${miCompania.companyId}/purchases/${response.data.purchaseId}`
        ); */
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const itemBuy = async (data: elementData, purchaseId: string) => {
    await api
      .post(`/${company.companyId}/details`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIngredient(response.data);
        Shopping(response.data.purchase);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const eliminaCompra = async (id: string) => {
    await api
      .delete(`/${company.companyId}/purchases/${id}`, {
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
        ShoppingList,
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
