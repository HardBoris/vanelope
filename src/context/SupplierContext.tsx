import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";
import { consultarCNPJ } from "consultar-cnpj";

interface SupplierProviderProps {
  children: ReactNode;
}

export interface Supplier {
  supplierId?: string;
  supplierName: string;
  supplierCNPJ: string;
  supplierCorporateName?: string;
  supplierEmail?: string;
  supplierPhone?: string;
}

interface SuplierContextData {
  supplier: Supplier;
  suppliers: Supplier[];
  Suppliers: () => void;
  Supplier: (data: Supplier) => void;
  Fornecedor: (id: string) => void;
  SupplierEditor: (data: Supplier) => void;
  SupplierEliminator: (id: string) => void;
  Consulta: (cnpj: string) => void;
}

export const SupplierContext = createContext<SuplierContextData>(
  {} as SuplierContextData
);

const useSupplier = () => useContext(SupplierContext);

const SupplierProvider = ({ children }: SupplierProviderProps) => {
  const { company } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplier, setSupplier] = useState<Supplier>({} as Supplier);

  const Suppliers = async () => {
    await api
      .get(`/${company}/suppliers`)
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => console.log(error));
  };

  /* useEffect(() => {
    Suppliers();
  }, []); */

  const Supplier = async (data: Supplier) => {
    await api
      .post(`/${company}/suppliers/register`, data)
      .then((response) => setSupplier(response.data))
      .catch((error) => console.log(error));
  };

  const Fornecedor = async (id: string) => {
    await api
      .get(`/${company}/suppliers/${id}`)
      .then((response) => setSupplier(response.data))
      .catch((error) => console.log(error));
  };

  const SupplierEditor = async (data: Supplier) => {
    await api
      .patch(`/${company}/suppliers/${data.supplierId}`, data)
      .then((response) => setSupplier(response.data))
      .catch((error) => console.log(error));
  };

  const SupplierEliminator = async (id: string) => {
    await api
      .delete(`/${company}/suppliers/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const Consulta = async (cnpj: string) => {
    const datos = await consultarCNPJ(cnpj);
    return datos;
  };

  return (
    <SupplierContext.Provider
      value={{
        supplier,
        suppliers,
        Supplier,
        Suppliers,
        Fornecedor,
        SupplierEditor,
        SupplierEliminator,
        Consulta,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export { useSupplier, SupplierProvider };
