import { useState } from "react";
import { PRInfo } from "./PRInfo";
import {
  PurchaseData,
  elementData,
  usePurchase,
} from "../../../context/PurchaseContext";
import "./PR.style.css";
import { PRDetails } from "./PRDetails";
import { PRDetailsList } from "./PRDetailsList";
import Modal from "../../../components/Modal";

export const PurchaseRequisition = () => {
  const { Buy } = usePurchase();
  const [thisPurchase, setThisPurchase] = useState<PurchaseData>(
    {} as PurchaseData
  );
  const [show, setShow] = useState(0);
  const [elementos, setElementos] = useState<elementData[]>([]);
  const [isPrint, setIsPrint] = useState(false);

  const handlePrint = () => {
    setIsPrint(!isPrint);
  };

  const activate = (n: number) => {
    setShow(n);
  };

  const apagar = (index: number) => {
    const eliminado = elementos.splice(index, 1);
    setElementos(elementos.filter((item) => item !== eliminado[0]));
  };

  const guardar = () => {
    Buy(thisPurchase);
    handlePrint();
  };

  return (
    <>
      {/* <aside>
        <h3>Solicitação de Compra</h3>
        <div className={show === 0 ? "lateral-tab active" : "lateral-tab"}>
          <div className="sider" role="button" onClick={() => activate(0)}>
            Informações Gerais
          </div>
        </div>
        <div className={show === 1 ? "lateral-tab active" : "lateral-tab"}>
          <div className={"sider"} role="button">
            Lista de Materiais
          </div>
        </div>
      </aside> */}
      <section className="spider">
        <div className="purchase-info">
          <PRInfo setThisPurchase={setThisPurchase} setShow={setShow} />
          {/* <div className="purchase-detail">
            <PRDetails
              elementos={elementos}
              setElementos={setElementos}
              purchase={thisPurchase}
              setPurchase={setThisPurchase}
            />
          </div> */}
        </div>
        <div
          className={
            elementos.length === 0 ? "invisible" : "purchase-elements-list"
          }
        >
          <PRDetailsList
            show={show}
            elementos={elementos}
            apagar={apagar}
            guardar={guardar}
          />
        </div>
      </section>
      <Modal isOpen={isPrint} setIsOpen={handlePrint}>
        <div className="envoltura">Modal</div>
      </Modal>
    </>
  );
};
