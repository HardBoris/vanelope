import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { localApi as api } from "../services/api";
import { Company } from "./CompanyContext";

interface UserProviderProps {
  children: ReactNode;
}

export interface User {
  userId: string;
  name: string;
  userCategory: string;
}

interface AuthState {
  token: string;
  user: User;
  company: Company;
}

interface SignInCredentials {
  name: string;
  password: string;
  companyCode: string;
}

interface UserContextData {
  user: User;
  token: string;
  company: Company;
  usersArray: User[];
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  signUp: (info: SignInCredentials) => void;
  usersList: () => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const history = useNavigate();
  const [usersArray, setUsersArray] = useState<User[]>([]);

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Aventura:token");
    const user = localStorage.getItem("@Aventura:user");
    const company = localStorage.getItem("@Aventura:company");

    if (token && user && company) {
      return { token, user: JSON.parse(user), company: JSON.parse(company) };
    }

    return {} as AuthState;
  });

  const usersList = async () => {
    await api
      .get(`/${data.company.companyId}/users`, {
        headers: { authorization: `Bearer ${data.token}` },
      })
      .then((response) => setUsersArray(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    usersList();
  }, []);

  const signIn = async ({ name, password, companyCode }: SignInCredentials) => {
    // const aviso = toast.loading("Por Favor espere...");
    await api
      .post("/login", { name, password, companyCode })
      .then((response) => {
        const { user, token, company } = response.data;
        localStorage.setItem("@Aventura:token", token);
        localStorage.setItem("@Aventura:user", JSON.stringify(user));
        localStorage.setItem("@Aventura:company", JSON.stringify(company));
        console.log(company);
        setData({ user, token, company });
        history(`/${company.companyId}`);
        /* toast.update(aviso, {
          render: "Bem-Vindo a Oikos!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        }); */
      })
      .catch((error) => {
        console.log(error);
        /* toast.update(aviso, {
          render: error.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        }); */
      });
  };

  const signUp = async ({ name, password }: SignInCredentials) => {
    // const aviso = toast.loading("Por Favor espere...");
    await api
      .post(
        `/${data.company.companyId}/users/register`,
        {
          name,
          password,
        },
        { headers: { authorization: `Bearer ${data.token}` } }
      )
      .then((response) => {
        console.log(response.data);
        const { usuario } = response.data;
        /* toast.update(aviso, {
          render: "Novo usuário cadastrado!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        }); */
      })
      .then(() => history("/login"))
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = () => {
    localStorage.removeItem("@Aventura:token");
    localStorage.removeItem("@Aventura:user");
    localStorage.removeItem("@Aventura:company");

    setData({} as AuthState);
  };

  return (
    <UserContext.Provider
      value={{
        token: data.token,
        user: data.user,
        company: data.company,
        usersArray,
        signIn,
        signOut,
        signUp,
        usersList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useAuth };
