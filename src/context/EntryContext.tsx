import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";
import { Movement } from "./MoveContext";

interface EntryProviderProps {
  children: ReactNode;
}

export interface Entry {
  entryId?: string;
  entryDate: string;
  responsivel: string;
  purchase: string;
  isReceived?: boolean;
  movements?: Movement[];
}

interface EntryContextData {
  entrada: Entry;
  entradas: Entry[];
  Admisiones: () => void;
  Admision: (data: Entry) => void;
  setEntrada: (arg: any) => void;
  Ingreso: (id: string) => Promise<void>;
  entryEliminator: (id: string) => void;
  Fechador: (data: string) => string;
  entryEditor: (data: Entry) => void;
}

export const EntryContext = createContext<EntryContextData>(
  {} as EntryContextData
);

const useEntry = () => useContext(EntryContext);

const EntryProvider = ({ children }: EntryProviderProps) => {
  const [entradas, setEntradas] = useState<Entry[]>([]);
  const [entrada, setEntrada] = useState<Entry>({} as Entry);

  const Admisiones = async () => {
    await api
      .get("/entries")
      .then((response) => {
        setEntradas(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    Admisiones();
  }, []);

  const Admision = async (data: Entry) => {
    await api
      .post("/entries/register", data)
      .then((response) => setEntrada(response.data))
      .catch((error) => console.log(error));
  };

  const Ingreso = async (id: string) => {
    await api
      .get(`/entries/${id}`)
      .then((response) => setEntrada(response.data))
      .catch((error) => console.log(error));
  };

  const entryEditor = async (data: Entry) => {
    await api
      .patch(`/entries/${data.entryId}`, data)
      .then((response) => setEntrada(response.data))
      .catch((error) => console.log(error));
  };

  const entryEliminator = async (id: string) => {
    await api
      .delete(`/entries/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const Fechador = (data: string) => {
    const fecha = new Date(data);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const ano = fecha.getFullYear();
    if (dia < 10 && mes < 10) {
      return `0${dia}/0${mes}/${ano}`;
    } else if (dia >= 10 && mes < 10) {
      return `${dia}/0${mes}/${ano}`;
    } else if (dia < 10 && mes >= 10) {
      return `0${dia}/${mes}/${ano}`;
    } else {
      return `${dia}/${mes}/${ano}`;
    }
  };

  return (
    <EntryContext.Provider
      value={{
        entrada,
        entradas,
        Admisiones,
        Admision,
        setEntrada,
        Ingreso,
        entryEliminator,
        Fechador,
        entryEditor,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};

export { useEntry, EntryProvider };
