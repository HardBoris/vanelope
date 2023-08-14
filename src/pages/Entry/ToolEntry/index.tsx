import { useState } from "react";
import { InfoToolEntry1 } from "./Info1/Info1";
import { InfoToolEntry2 } from "./Info2/Info2";
import { FaTrash } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useEntry } from "../../../context/EntryContext";
import { User } from "../../../context/UserContext";
import { Purchase } from "../../../context/PurchaseContext";

export interface ToolEntryMovement {
  moveId?: string;
  moveType: string;
  moveElement: string;
  elementType: string;
  elementCode: string;
  moveQuantity: number;
  moveUnit: string;
  entry?: ToolEntry;
}

export interface ToolEntry {
  entryId?: string;
  entryDate: string;
  responsivel: User;
  purchase: Purchase;
  movements?: ToolEntryMovement[];
}

export interface ToolEntryInfo {
  entryId?: string;
  entryDate: string;
  responsivel: string;
  purchase: string;
  movements?: ToolEntryMovement[];
}

export const ToolEntry = () => {
  const navigate = useNavigate();
  const { Admision, entrada } = useEntry();
  const [toolEntry, setToolEntry] = useState<ToolEntryInfo>(
    {} as ToolEntryInfo
  );
  const [show, setShow] = useState(0);
  const [movimientos, setMovimientos] = useState<ToolEntryMovement[]>([]);
  const [isPrint, setIsPrint] = useState(false);

  const activate = (n: number) => {
    setShow(n);
  };

  const apagar = (index: number) => {
    const eliminado = movimientos.splice(index, 1);
    setMovimientos(movimientos.filter((item) => item !== eliminado[0]));
  };

  const guardar = () => {
    Admision(toolEntry);
    setIsPrint(true);
    navigate("/entries");
  };

  /* const handleModal = () => {
    setIsPrint(!isPrint);
  }; */

  return (
    <>
      <aside>
        <h3>Entrada de Ferramentas</h3>
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
              toolEntry.entryDate && toolEntry.purchase && toolEntry.responsivel
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
          <InfoToolEntry1 setToolEntry={setToolEntry} setShow={setShow} />
        </div>
        <div className={show !== 1 ? "invisible" : ""}>
          <InfoToolEntry2
            movimientos={movimientos}
            setMovimientos={setMovimientos}
            setShow={setShow}
            toolEntry={toolEntry}
            setToolEntry={setToolEntry}
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
            <Button type="button" onClick={() => navigate("/entries")}>
              Cancelar
            </Button>
            <Button type="button" onClick={() => guardar()}>
              Guardar
            </Button>
          </div>
        </div>
      </section>
      {/* <Modal isOpen={isPrint} setIsOpen={handleModal}>
        <ToolEntryPrint entry={entrada} movida={movimientos} />
      </Modal> */}
    </>
  );
};
