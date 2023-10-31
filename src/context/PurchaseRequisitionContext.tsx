import { ReactNode, createContext, useContext, useState } from "react";
import { ElementToBuy } from "./ElementContext";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";

interface PRProviderProps {
  children: ReactNode;
}

export interface PRequest {
  prequestId?: string;
  listDate: string;
  details: ElementToBuy[];
}

interface PRequestContextData {
  prequestList: PRequest[];
  prequest: PRequest;
  prequestsLoader: () => void;
  prequestLoader: () => void;
  prequestCreator: (data: PRequest) => void;
  prequestEditor: (data: PRequest) => void;
  prequestEliminator: (id: string) => void;
}

export const PRContext = createContext<PRequestContextData>(
  {} as PRequestContextData
);

const usePR = () => useContext(PRContext);

const PRProvider = ({ children }: PRProviderProps) => {
  const { company, token, user } = useAuth();
  const [prequestList, setPrequestList] = useState<PRequest[]>([]);
  const [prequest, setPrequest] = useState<PRequest>({} as PRequest);
  // const [thisPRequest, setThisPRequest] = useState<PRequest>({} as PRequest);

  const prequestsLoader = async () => {
    await api
      .get(`/${company.companyId}/prequests`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPrequestList(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const prequestLoader = async () => {
    await api
      .get(`/${company.companyId}/prequests/:prequestId`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPrequest(response.data);
      })
      .catch((error) => console.log(error));
  };

  const prequestCreator = async (data: PRequest) => {
    const objeto = { ...data, requestor: user.userId };
    await api
      .post(`/${company.companyId}/prequests/register`, objeto, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setPrequest(response.data))
      .catch((error) => console.log(error));
  };

  const prequestEditor = async (data: PRequest) => {
    await api
      .patch(`/${company}/prequests/${data.prequestId}`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setPrequest(response.data))
      .catch((error) => console.log(error));
  };

  const prequestEliminator = async (id: string) => {
    await api
      .delete(`/${company}/prequests/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <PRContext.Provider
      value={{
        prequestList,
        prequest,
        prequestsLoader,
        prequestLoader,
        prequestCreator,
        prequestEditor,
        prequestEliminator,
      }}
    >
      {children}
    </PRContext.Provider>
  );
};

export { usePR, PRProvider };
