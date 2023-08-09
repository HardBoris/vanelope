import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";
import { Movement } from "./MoveContext";

interface RequisitionProviderProps {
  children: ReactNode;
}

/* export interface Movimiento {
  moveType?: string;
  moveElement: string;
  elementType: string;
  moveQuantity: number;
  moveUnit: string;
} */

export interface Requisicion {
  requestId?: string;
  requestDate: string;
  requestor: string;
  requestTarget: string;
  isDelivered?: boolean;
  movements?: Movement[];
}

interface RequisitionContextData {
  solicitud: Requisicion;
  solicitudes: Requisicion[];
  Solicitudes: () => void;
  Peticion: (data: Requisicion) => void;
  setSolicitud: (arg: any) => void;
  Pedido: (id: string) => Promise<void>;
  requestEliminator: (id: string) => void;
  Fechador: (data: string) => string;
  RequestEditor: (data: Requisicion) => void;
}

export const RequisitionContext = createContext<RequisitionContextData>(
  {} as RequisitionContextData
);

const useRequisition = () => useContext(RequisitionContext);

const RequisitionProvider = ({ children }: RequisitionProviderProps) => {
  const [solicitudes, setSolicitudes] = useState<Requisicion[]>([]);
  const [solicitud, setSolicitud] = useState<Requisicion>({} as Requisicion);

  const Solicitudes = async () => {
    await api
      .get("/requisitions")
      .then((response) => {
        setSolicitudes(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    Solicitudes();
  }, []);

  const Peticion = async (data: Requisicion) => {
    await api
      .post("/requisitions/register", data)
      .then((response) => setSolicitud(response.data))
      .catch((error) => console.log(error));
  };

  const Pedido = async (id: string) => {
    await api
      .get(`/requisitions/${id}`)
      .then((response) => setSolicitud(response.data))
      .catch((error) => console.log(error));
  };

  const RequestEditor = async (data: Requisicion) => {
    await api
      .patch(`/requisitions/${data.requestId}`, data)
      .then((response) => setSolicitud(response.data))
      .catch((error) => console.log(error));
  };

  const requestEliminator = async (id: string) => {
    await api
      .delete(`/requisitions/${id}`)
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
    <RequisitionContext.Provider
      value={{
        solicitud,
        solicitudes,
        Solicitudes,
        Peticion,
        setSolicitud,
        Pedido,
        requestEliminator,
        Fechador,
        RequestEditor,
      }}
    >
      {children}
    </RequisitionContext.Provider>
  );
};

export { useRequisition, RequisitionProvider };
