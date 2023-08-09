import { useState } from "react";
import { Info1 } from "./Info1/Info1";
import { Info2 } from "./Info2/Info2";
import { useRequisition } from "../../../context/RequisitionContext";
import { FaTrash } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";
import { ToolReqPrint } from "./Print/Tools";
import { User } from "../../../context/UserContext";

export interface ToolMovement {
  moveId?: string;
  moveType: string;
  moveElement: string;
  elementType: string;
  elementCode: string;
  moveQuantity: number;
  moveUnit: string;
  requisition?: ToolRequest;
}

interface Order {
  serviceOrderId: string;
  order: string;
}

export interface ToolRequest {
  requestId?: string;
  requestDate: string;
  requestor: User;
  service: Order;
  movements?: ToolMovement[];
}

export const ToolReq = () => {
  const navigate = useNavigate();
  const { Peticion, solicitud } = useRequisition();
  const [toolRequest, setToolRequest] = useState<ToolRequest>(
    {} as ToolRequest
  );
  const [show, setShow] = useState(0);
  const [movimientos, setMovimientos] = useState<ToolMovement[]>([]);
  const [isPrint, setIsPrint] = useState(false);

  const activate = (n: number) => {
    setShow(n);
  };

  const apagar = (index: number) => {
    const eliminado = movimientos.splice(index, 1);
    setMovimientos(movimientos.filter((item) => item !== eliminado[0]));
  };

  const guardar = () => {
    Peticion(toolRequest);
    setIsPrint(true);
  };

  const handleModal = () => {
    setIsPrint(!isPrint);
  };

  return (
    <>
      <aside>
        <h3>Requisição de Ferramentas</h3>
        <div className={show === 0 ? "lateral-tab active" : "lateral-tab"}>
          <div className="sider" role="button" onClick={() => activate(0)}>
            Informações Gerais
          </div>
        </div>
        <div className={show === 1 ? "lateral-tab active" : "lateral-tab"}>
          <div
            className={"sider"}
            role="button"
            onClick={
              toolRequest.requestDate &&
              toolRequest.service &&
              toolRequest.requestor
                ? () => activate(1)
                : undefined
            }
          >
            Lista de Ferramentas
          </div>
        </div>
      </aside>
      <section>
        <div className={show !== 0 ? "invisible" : ""}>
          <Info1 setToolRequest={setToolRequest} setShow={setShow} />
        </div>
        <div className={show !== 1 ? "invisible" : ""}>
          <Info2
            movimientos={movimientos}
            setMovimientos={setMovimientos}
            setShow={setShow}
            toolRequest={toolRequest}
            setToolRequest={setToolRequest}
          />
        </div>
        <div className={movimientos.length === 0 ? "invisible" : "lista"}>
          <div className={show !== 1 ? "invisible" : "list_head"}>
            <div className="elemento">Elemento</div>
            <div className="codigo">Lacre</div>
            <div className="delete-item"></div>
          </div>
          <div className={show !== 1 ? "invisible" : "list_body"}>
            {movimientos &&
              movimientos.map((item, index) => (
                <div className="list_row" key={index}>
                  <div className="elemento">{item.moveElement}</div>
                  <div className="codigo">{item.elementCode}</div>
                  <div
                    role="button"
                    className="delete-item"
                    onClick={() => apagar(index)}
                  >
                    <FaTrash />
                  </div>
                </div>
              ))}
          </div>
          <div className={show !== 1 ? "invisible" : "list_action"}>
            <Button type="button" onClick={() => navigate("/requisitions")}>
              Cancelar
            </Button>
            <Button type="button" onClick={() => guardar()}>
              Guardar
            </Button>
          </div>
        </div>
      </section>
      <Modal isOpen={isPrint} setIsOpen={handleModal}>
        <ToolReqPrint request={solicitud} movida={movimientos} />
      </Modal>
    </>
  );
};
