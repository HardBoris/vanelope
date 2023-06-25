import { useState } from "react";
import "./purchases.style.css";
import { Helmet } from "react-helmet";
import Modal from "../../components/Modal";

export const Purchases = () => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    console.log(open);
    setOpen(!open);
  };

  return (
    <>
      <Helmet>
        <title>Aventura | Compras</title>
      </Helmet>
      <div className="compras">
        <div className="titulocompra">
          <div className="compranumero">Nº</div>
          <div className="comprafecha">Data</div>
          <div className="compraproveedor">Fornecedor</div>
          <div className="compravalor">Valor</div>
          <div role="button" className="plusbtn" onClick={() => handleModal()}>
            +
          </div>
        </div>
        <div className="filacompra">
          <div className="detalle">
            <div className="compranumero"></div>
            <div className="comprafecha"></div>
            <div className="compraproveedor"></div>
            <div className="compravalor"></div>
          </div>
          <div className="comprabtn">Editar</div>
          <div className="comprabtn">Apagar</div>
        </div>
      </div>
      <Modal isOpen={open} setIsOpen={handleModal}>
        <div>Hola</div>
      </Modal>
    </>
  );
};
