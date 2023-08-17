import { useState } from "react";
import { PurchaseInfo } from "./PurchaseInfo";
import { Purchase } from "../../../context/PurchaseContext";
import "./NewPurchase.style.css";
import { Details } from "./Details";

export const NewPurchase = () => {
  const [thisPurchase, setThisPurchase] = useState<Purchase>({} as Purchase);
  const [show, setShow] = useState(0);

  console.log(thisPurchase, show);

  const activate = (n: number) => {
    setShow(n);
  };

  return (
    <>
      <aside>
        <h3>Nova Compra</h3>
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
      </aside>
      <section>
        <div className={show !== 0 ? "invisible" : "purchase-info"}>
          <PurchaseInfo setThisPurchase={setThisPurchase} setShow={setShow} />
        </div>
        <div className={show !== 1 ? "invisible" : "purchase-detail"}>
          <Details />
        </div>
      </section>
    </>
  );
};
