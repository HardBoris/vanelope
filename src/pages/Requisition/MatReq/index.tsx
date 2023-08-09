import { useState } from "react";
import { Info1 } from "./Info1/Info1";
import { Info2 } from "./Info2/Info2";
import {
  Requisicion,
  useRequisition,
} from "../../../context/RequisitionContext";
import { FaTrash } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";
import { Movement } from "../../../context/MoveContext";
import { MaterialReqPrinter } from "./Print/Printer";
import "./style.css";

export const MaterialReq = () => {
  const navigate = useNavigate();
  const { Peticion, solicitud } = useRequisition();
  const [materialRequest, setMaterialRequest] = useState<Requisicion>(
    {} as Requisicion
  );
  const [show, setShow] = useState(0);
  const [movimientos, setMovimientos] = useState<Movement[]>([]);
  const [isPrint, setIsPrint] = useState(false);

  const activate = (n: number) => {
    setShow(n);
  };

  const apagar = (index: number) => {
    const eliminado = movimientos.splice(index, 1);
    setMovimientos(movimientos.filter((item) => item !== eliminado[0]));
  };

  const guardar = () => {
    Peticion(materialRequest);
    setIsPrint(true);
  };

  const handleModal = () => {
    setIsPrint(!isPrint);
  };

  return (
    <>
      <aside>
        <h3>Requisição de Materiais</h3>
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
              materialRequest.requestDate &&
              materialRequest.service &&
              materialRequest.requestor
                ? () => activate(1)
                : undefined
            }
          >
            Lista de Materiais
          </div>
        </div>
      </aside>
      <section>
        <div className={show !== 0 ? "invisible" : ""}>
          <Info1 setMaterialRequest={setMaterialRequest} setShow={setShow} />
        </div>
        <div className={show !== 1 ? "invisible" : ""}>
          <Info2
            movimientos={movimientos}
            setMovimientos={setMovimientos}
            setShow={setShow}
            materialRequest={materialRequest}
            setMaterialRequest={setMaterialRequest}
          />
        </div>
        <div className={movimientos.length === 0 ? "invisible" : "lista"}>
          <div className={show !== 1 ? "invisible" : "list_head"}>
            <div className="elemento">Elemento</div>
            <div className="cantidad">Quantidade</div>
            <div className="unidad">Unidade</div>
            <div className="delete-item"></div>
          </div>
          <div className={show !== 1 ? "invisible" : "list_body"}>
            {movimientos &&
              movimientos.map((item, index) => (
                <div key={index} className="list_row">
                  <div className="elemento">{item.moveElement}</div>
                  <div className="cantidad">{item.moveQuantity}</div>
                  <div className="unidad">{item.moveUnit}</div>
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
        <MaterialReqPrinter requested={solicitud} />
      </Modal>
    </>
  );
};
