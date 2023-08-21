import { useEffect, useState } from "react";
import { BGLogo } from "../../../components/Logo";
import {
  FaCheckSquare,
  FaEdit,
  FaPlus,
  FaSquare,
  FaTrash,
} from "react-icons/fa";
import { useRequisition } from "../../../context/RequisitionContext";
import { usePurchase } from "../../../context/PurchaseContext";

interface Setter {
  (arg: boolean): void;
}

export const PurchasesList = () => {
  const { Fechador } = useRequisition();
  const { purchases, ShoppingList } = usePurchase();
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  // const [requested, setRequested] = useState<Requisicion>({} as Requisicion);

  useEffect(() => {
    ShoppingList();
  }, [isAdd, isDelete, isEdit, isPrint]);

  console.log(purchases);

  /* const deliverer = (data: Requisicion) => {
    RequestEditor(data);
  }; */

  /* const Trigger = (id: string | undefined, callback: Setter) => {
    setRequested(solicitudes.filter((item) => item.requestId === id)[0]);
    callback(true);
  }; */

  const handlePrint = () => {
    setIsPrint(!isPrint);
  };

  const handleEditor = () => {
    setIsEdit(!isEdit);
  };

  const handleDeletor = () => {
    setIsDelete(!isDelete);
  };

  const handleAdd = () => {
    setIsAdd(!isAdd);
  };

  const reformadas = purchases.map((item) => ({
    ...item,
    requestDate: Fechador(item.purchaseDate),
  }));

  return (
    <div className="requisa">
      <div className="reqEnvelope">
        <div className="requested-head">
          <div className="requested-data">
            <div className="requested-id">Id</div>
            <div className="requested-date">Data</div>
            <div className="requested-target">O. S.</div>
            <div className="requested-requestor">Solicitante</div>
          </div>
          <div className="requested-action"></div>
        </div>
      </div>
      <div className="requested-list">
        {reformadas &&
          reformadas.map((item, index) => (
            <div
              key={item.purchaseId}
              title="Visualizar a requisição"
              className={
                Number(index) % 2 !== 0
                  ? "requested-row"
                  : "requested-row alterno"
              }
            >
              <div
                className="requested-data"
                role="button"
                // onClick={() => Trigger(item.purchaseId, setIsPrint)}
              >
                <div className="requested-id">{item.purchaseId}</div>
                <div className="requested-date">{item.requestDate}</div>
                {/* <div className="requested-target">{item.service.order}</div> */}
                {/* <div className="requested-requestor">{item.requestor.name}</div> */}
              </div>
              <div className="requested-action">
                {item.invoice ? (
                  <div className="checked">
                    <FaCheckSquare />
                  </div>
                ) : (
                  <div
                    className="action-btn"
                    role="button"
                    // onClick={() => deliverer({ ...item, isDelivered: true })}
                  >
                    <FaSquare />
                  </div>
                )}
                <div
                  className="action-btn"
                  // onClick={() => Trigger(item.requestId, setIsAdd)}
                >
                  <FaPlus />
                </div>
                <div
                  className="action-btn"
                  // onClick={() => Trigger(item.requestId, setIsEdit)}
                >
                  <FaEdit />
                </div>
                <div
                  className="action-btn"
                  // onClick={() => Trigger(item.requestId, setIsDelete)}
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
      {/* <Modal isOpen={isDelete} setIsOpen={handleDeletor}>
        <div className="modal-wrapper">
          <ReqDelModal requisicion={requested} handleDeletor={handleDeletor} />
        </div>
      </Modal> */}
      {/* <Modal isOpen={isEdit} setIsOpen={handleEditor}>
        <div className="modal-wrapper">
          <EditForm requisicion={requested} handleEditor={handleEditor} />
        </div>
      </Modal> */}
      {/* <Modal isOpen={isPrint} setIsOpen={handlePrint}>
        <ReqPrinter
          requested={requested}
          movements={requested.movements}
          handlePrint={handlePrint}
          isPrintable={true}
        />
      </Modal> */}
      {/* <Modal isOpen={isAdd} setIsOpen={handleAdd}>
        <div className="wrapper">
          <AddForm
            requested={requested}
            // move={requested.movements}
            handleAdd={handleAdd}
          />
        </div>
      </Modal> */}
    </div>
  );
};
