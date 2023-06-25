import { useState } from "react";
import "./movements.style.css";
import { Helmet } from "react-helmet";
import Modal from "../../components/Modal";

export const Movements = () => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    console.log(open);
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
            <div className="movimiento-cantidad">Quantidade</div>
          </div>
          <div role="button" className="plusbtn" onClick={() => handleModal()}>
            +
          </div>
        </div>
        <div className="movimientos-detalle">
          <div className="movimiento">
            <div className="movimiento-fecha"></div>
            <div className="movimiento-referencia"></div>
            <div className="movimiento-tipo"></div>
            <div className="movimiento-material"></div>
            <div className="movimiento-cantidad"></div>
          </div>
          <div className="movimientobtn">Editar</div>
          <div className="movimientobtn">Apagar</div>
        </div>
      </div>
      <Modal isOpen={open} setIsOpen={handleModal}>
        <div>Modal</div>
      </Modal>
    </>
  );
};
