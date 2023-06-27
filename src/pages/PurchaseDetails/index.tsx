// import { useState } from "react";
// import { PurchaseForm } from "./PurchaseForm";
import "./purchases.style.css";
import { Helmet } from "react-helmet";
// import Modal from "../../components/Modal";

export const Purchases = () => {
  return (
    <>
      <Helmet>
        <title>Aventura | Compras</title>
      </Helmet>
      <div className="compras">
        <div className="compras-fitment"></div>
        <div className="compras-still">
          {/* <PurchaseForm commutador={() => {}} /> */}
        </div>
      </div>
    </>
  );
};
