import { useState } from "react";
import { InfoEntry1 } from "./Info1/Info1";
import { InfoEntry2 } from "./Info2/Info2";
import { FaTrash } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { Movement } from "../../../context/MoveContext";
import "./style.css";
import { Entry, EntryInfo, useEntry } from "../../../context/EntryContext";
import { useAuth } from "../../../context/UserContext";

export const MaterialEntry = () => {
  const navigate = useNavigate();
  const { Admision, entrada } = useEntry();
  const { company } = useAuth();
  const [materialEntry, setMaterialEntry] = useState<EntryInfo>(
    {} as EntryInfo
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
    Admision(materialEntry);
    setIsPrint(true);
  };

  /* const handleModal = () => {
    setIsPrint(!isPrint);
  }; */

  return (
    <>
      <aside>
        <h3>Entrada de Materiais</h3>
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
              materialEntry.entryDate &&
              materialEntry.purchase &&
              materialEntry.responsivel
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
          <InfoEntry1 setMaterialEntry={setMaterialEntry} setShow={setShow} />
        </div>
        <div className={show !== 1 ? "invisible" : ""}>
          <InfoEntry2
            movimientos={movimientos}
            setMovimientos={setMovimientos}
            setShow={setShow}
            materialEntry={materialEntry}
            setMaterialEntry={setMaterialEntry}
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
            <Button
              type="button"
              onClick={() => navigate(`/${company}/entries`)}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={() => guardar()}>
              Guardar
            </Button>
          </div>
        </div>
      </section>
      {/* <Modal isOpen={isPrint} setIsOpen={handleModal}>
        <MaterialEntryPrinter admitido={entrada} />
      </Modal> */}
    </>
  );
};
