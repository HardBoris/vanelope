import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";
// import { api } from "../services/api";

interface CompanyProviderProps {
  children: ReactNode;
}

export interface Company {
  companyId: string;
  companyName: string;
  companyEmail: string;
  code: string;
}

/* interface AuthState {
  token: string;
  user: User;
  company: string;
} */

interface CompanyInfo {
  companyName: string;
  companyEmail: string;
}

interface CompanyContextData {
  compania: Company;
  companias: Company[];
  miCompania: Company;
  companyRegister: (info: CompanyInfo) => Promise<void>;
  companiesList: () => Promise<void>;
  myCompany: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextData>(
  {} as CompanyContextData
);

const useCompany = () => useContext(CompanyContext);

const CompanyProvider = ({ children }: CompanyProviderProps) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [compania, setCompania] = useState<Company>({} as Company);
  const [companias, setCompanias] = useState<Company[]>([]);
  const [miCompania, setMiCompania] = useState<Company>({} as Company);

  const companyRegister = async ({
    companyName,
    companyEmail,
  }: CompanyInfo) => {
    await api
      .post("/companies/register", {
        companyName,
        companyEmail,
      })
      .then((response) => {
        console.log(response.data);
        const { company } = response.data;
        setCompania(company);
      })
      .then(() => navigate(`/${compania.companyId}/users/register`))
      .catch((error) => {
        console.log(error);
      });
  };

  const companiesList = async () => {
    await api
      .get("/companies", {
        headers: {
          authrization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { companies } = response.data;
        setCompanias(companies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const myCompany = async () => {
    await api
      .get("/companies/:companyId", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { company } = response.data;
        setMiCompania(company);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CompanyContext.Provider
      value={{
        compania,
        companias,
        miCompania,
        companyRegister,
        companiesList,
        myCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export { CompanyProvider, useCompany };
