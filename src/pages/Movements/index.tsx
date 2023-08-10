import { Movement, useMove } from "../../context/MoveContext";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal";
import { MovDelModal } from "./DeleteModal";
import { MoveEditForm } from "./EditForm";
import "./Movements.style.css";
import { BGLogo } from "../../components/Logo";

interface Setter {
  (arg: boolean): void;
}

export const Movements = () => {
  const { movimientos, MovementsList } = useMove();
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [movida, setMovida] = useState<Movement>({} as Movement);

  useEffect(() => {
    MovementsList();
  }, [isDelete, isEdit]);

  const Trigger = (id: string | undefined, callback: Setter) => {
    setMovida(movimientos.filter((item) => item.moveId === id)[0]);
    callback(true);
  };

  const handleEditor = () => {
    setIsEdit(!isEdit);
  };

  const handleDeletor = () => {
    setIsDelete(!isDelete);
  };

  return (
    <>
      <div className="movements">
        <div className="move_header">
          <h2 className="move_title">Movimientos</h2>
        </div>
        <div className="move_head_wrapper">
          <div className="move_head">
            <div className="move_data">
              <div className="movimiento-id">id</div>
              <div className="movimiento-id">referência</div>
              <div className="movimiento-tipo">movimiento</div>
              <div className="elemento">elemento</div>
              <div className="elemento-tipo">Tipo</div>
              <div className="cantidad">cantidad</div>
              <div className="unidad">unidad</div>
            </div>
            <div className="move_action"></div>
          </div>
        </div>
        <div className="movements_list">
          {movimientos &&
            movimientos.map((item, index) => (
              <div
                key={item.moveId}
                className={
                  Number(index) % 2 !== 0 ? "move_row" : "move_row alterno"
                }
              >
                {item.requisition ? (
                  <div className="move_data">
                    <div className="movimiento-id">{item.moveId}</div>
                    <div className="movimiento-id">
                      {item.requisition.requestId}
                    </div>
                    <div className="movimiento-tipo">{item.moveType}</div>
                    <div className="elemento">{item.moveElement}</div>
                    <div className="elemento-tipo">{item.elementType}</div>
                    <div className="cantidad">{item.moveQuantity}</div>
                    <div className="unidad">{item.moveUnit}</div>
                  </div>
                ) : (
                  item.entry && (
                    <div className="move_data">
                      <div className="movimiento-id">{item.moveId}</div>
                      <div className="movimiento-id">{item.entry.entryId}</div>
                      <div className="movimiento-tipo">{item.moveType}</div>
                      <div className="elemento">{item.moveElement}</div>
                      <div className="elemento-tipo">{item.elementType}</div>
                      <div className="cantidad">{item.moveQuantity}</div>
                      <div className="unidad">{item.moveUnit}</div>
                    </div>
                  )
                )}
                <div className="move_action">
                  <div
                    className="move-btn"
                    onClick={() => Trigger(item.moveId, setIsEdit)}
                  >
                    <FaEdit />
                  </div>
                  <div
                    className="move-btn"
                    onClick={() => Trigger(item.moveId, setIsDelete)}
                  >
                    <FaTrash />
                  </div>
                </div>
              </div>
            ))}
          <footer>
            <div className="logo">
              Powered by <BGLogo />
            </div>
          </footer>
        </div>
      </div>
      <Modal isOpen={isEdit} setIsOpen={handleEditor}>
        <div className="modal-wrapper">
          <MoveEditForm move={movida} handleEditor={handleEditor} />
        </div>
      </Modal>
      <Modal isOpen={isDelete} setIsOpen={handleDeletor}>
        <div className="modal-wrapper">
          <MovDelModal move={movida} handleDeletor={handleDeletor} />
        </div>
      </Modal>
    </>
  );
};
