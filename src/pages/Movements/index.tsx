import { useState } from "react";
import "./movements.style.css";
import { Helmet } from "react-helmet";
import Modal from "../../components/Modal";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
// import { Purchases } from "../Purchases";
import { PurchaseForm } from "../Purchases/PurchaseForm";

export const Movements = () => {
  const [open, setOpen] = useState(false);
  // const [commutador, setCommutador] = useState(true)

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Helmet>
        <title>Aventura | Movimientos</title>
      </Helmet>
      <div className="movimientos">
        <div className="movimientos-encabezado">
          <div className="movimientos-titulo">
            <div className="movimiento-fecha">Data</div>
            <div className="movimiento-referencia">Nº</div>
            <div className="movimiento-tipo">Tipo</div>
            <div className="movimiento-material">Material</div>
            <div className="movimiento-cantidad">Qtde</div>
            <div className="movimiento-unidad">Unidade</div>
          </div>
          <div className="dropdown">
            <FaPlus />
            <div className="ddcontent">
              <div className="mc">
                <p onClick={() => handleModal()}>Nova Compra</p>
              </div>
              <div className="mc">
                <p>Nova Ordem de Serviço</p>
              </div>
            </div>
          </div>
        </div>
        <div className="movimientos-detalle">
          <div className="movimiento">
            <div className="movimiento-fecha">fecha</div>
            <div className="movimiento-referencia">referencia</div>
            <div className="movimiento-tipo">tipo</div>
            <div className="movimiento-material">material</div>
            <div className="movimiento-cantidad">cantidad</div>
            <div className="movimiento-unidad">unidad</div>
          </div>
          <div className="movimiento-botonera">
            <div className="movimientobtn">
              <FaEdit />
            </div>
            <div className="movimientobtn">
              <FaTrash />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={open} setIsOpen={handleModal}>
        <PurchaseForm setCommutador={handleModal} />
      </Modal>
    </>
  );
};
