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

interface PartnerProviderProps {
  children: ReactNode;
}

export interface Partner {
  partnerId?: string;
  fantasyName: string;
  CNPJ: string;
  corporateName?: string;
  partnerEmail?: string;
  partnerPhone?: string;
}

interface PartnerContextData {
  partner: Partner;
  partners: Partner[];
  Partners: () => void;
  Partner: (data: Partner) => void;
  Fornecedor: (id: string) => void;
  PartnerEditor: (data: Partner) => void;
  PartnerEliminator: (id: string) => void;
  Consulta: (cnpj: string) => void;
}

export const PartnerContext = createContext<PartnerContextData>(
  {} as PartnerContextData
);

const usePartner = () => useContext(PartnerContext);

const PartnerProvider = ({ children }: PartnerProviderProps) => {
  const { company } = useAuth();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partner, setPartner] = useState<Partner>({} as Partner);

  const Partners = async () => {
    await api
      .get(`/${company}/partners`)
      .then((response) => {
        setPartners(response.data);
      })
      .catch((error) => console.log(error));
  };

  /* useEffect(() => {
    Suppliers();
  }, []); */

  const Partner = async (data: Partner) => {
    await api
      .post(`/${company}/partners/register`, data)
      .then((response) => setPartner(response.data))
      .catch((error) => console.log(error));
  };

  const Fornecedor = async (id: string) => {
    await api
      .get(`/${company}/partners/${id}`)
      .then((response) => setPartner(response.data))
      .catch((error) => console.log(error));
  };

  const PartnerEditor = async (data: Partner) => {
    await api
      .patch(`/${company}/partners/${data.partnerId}`, data)
      .then((response) => setPartner(response.data))
      .catch((error) => console.log(error));
  };

  const PartnerEliminator = async (id: string) => {
    await api
      .delete(`/${company}/partners/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const Consulta = async (cnpj: string) => {
    const datos = await consultarCNPJ(cnpj);
    return datos;
  };

  return (
    <PartnerContext.Provider
      value={{
        partner,
        partners,
        Partner,
        Partners,
        Fornecedor,
        PartnerEditor,
        PartnerEliminator,
        Consulta,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export { usePartner, PartnerProvider };
