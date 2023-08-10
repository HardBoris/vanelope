import { useState } from "react";
import { PurchaseInfo } from "./PurchaseInfo";
import { Purchase } from "../../../context/PurchaseContext";

export const NewPurchase = () => {
  const [thisPurchase, setThisPurchase] = useState<Purchase>({} as Purchase);
  const [show, setShow] = useState(0);

  console.log(thisPurchase, show);

  return (
    <div>
      <PurchaseInfo
        setThisPurchase={setThisPurchase}
        setShow={setShow}
      ></PurchaseInfo>
    </div>
  );
};
