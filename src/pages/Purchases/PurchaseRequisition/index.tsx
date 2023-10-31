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
import { ElementToBuy } from "../../../context/ElementContext";
import { usePR } from "../../../context/PurchaseRequisitionContext";

export const PurchaseRequisition = () => {
  const { prequestCreator } = usePR();
  const { Buy } = usePurchase();
  const [thisPurchase, setThisPurchase] = useState<PurchaseData>(
    {} as PurchaseData
  );
  const [show, setShow] = useState(0);
  const [elementos, setElementos] = useState<ElementToBuy[]>([]);
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

  // console.log(elementos);

  return (
    <>
      <section>
        <div className="purchase-info">
          <PRInfo /* setThisPurchase={setThisPurchase} setShow={setShow} */ />
        </div>
        {/* <div className="purchase-detail">
          <PRDetails elementos={elementos} setElementos={setElementos} />
        </div>
        <div
          className={
            elementos.length === 0 ? "invisible" : "purchase-elements-list"
          }
        > */}
        {/* <PRDetailsList
            show={show}
            elementos={elementos}
            apagar={apagar}
            guardar={guardar}
          /> */}
        {/* </div> */}
      </section>
      <Modal isOpen={isPrint} setIsOpen={handlePrint}>
        <div className="envoltura">Modal</div>
      </Modal>
    </>
  );
};
