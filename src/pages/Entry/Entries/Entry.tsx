import "./Entry.style.css";
import { useEffect, useState } from "react";
import {
  FaCheckSquare,
  FaEdit,
  FaPlus,
  FaSquare,
  FaTrash,
} from "react-icons/fa";
import { Entry, EntryInfo, useEntry } from "../../../context/EntryContext";
import { BGLogo } from "../../../components/Logo";

interface Setter {
  (arg: boolean): void;
}

export const Entries = () => {
  const { entrada, entradas, Admisiones, Fechador, entryEditor } = useEntry();
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [admitido, setAdmitido] = useState<Entry>({} as Entry);

  useEffect(() => {
    Admisiones();
  }, [isAdd, isDelete, isEdit, isPrint, entrada]);

  const deliverer = (data: Entry) => {
    entryEditor(data);
  };

  const Trigger = (id: string | undefined, callback: Setter) => {
    setAdmitido(entradas.filter((item) => item.entryId === id)[0]);
    callback(true);
  };

  /* const handlePrint = () => {
    setIsPrint(!isPrint);
  }; */

  /* const handleEditor = () => {
    setIsEdit(!isEdit);
  }; */

  /* const handleDeletor = () => {
    setIsDelete(!isDelete);
  }; */

  /* const handleAdd = () => {
    setIsAdd(!isAdd);
  }; */

  const reformadas = entradas.map((item) => ({
    ...item,
    entryDate: Fechador(item.entryDate),
  }));

  return (
    <div className="entry">
      <div className="entryEnvelope">
        <div className="entry-head">
          <div className="entry-data">
            <div className="entry-id">Id</div>
            <div className="entry-date">Data</div>
            <div className="entry-source">Referência</div>
            <div className="entry-shopper">Responsável</div>
          </div>
          <div className="entry-action"></div>
        </div>
      </div>
      <div className="entry-list">
        {reformadas &&
          reformadas.map((item, index) => (
            <div
              key={item.entryId}
              title="Visualizar a entrada"
              className={
                Number(index) % 2 !== 0 ? "entry-row" : "entry-row alterno"
              }
            >
              <div
                className="entry-data"
                role="button"
                onClick={() => Trigger(item.entryId, setIsPrint)}
              >
                <div className="entry-id">{item.entryId}</div>
                <div className="entry-date">{item.entryDate}</div>
                <div className="entry-source">{item.purchase.purchaseId}</div>
                <div className="entry-shopper">{item.responsivel.name}</div>
              </div>
              <div className="entry-action">
                {item.isReceived ? (
                  <div className="checked">
                    <FaCheckSquare />
                  </div>
                ) : (
                  <div
                    className="action-btn"
                    role="button"
                    onClick={() => deliverer({ ...item, isReceived: true })}
                  >
                    <FaSquare />
                  </div>
                )}
                <div
                  className="action-btn"
                  onClick={() => Trigger(item.entryId, setIsAdd)}
                >
                  <FaPlus />
                </div>
                <div
                  className="action-btn"
                  onClick={() => Trigger(item.entryId, setIsEdit)}
                >
                  <FaEdit />
                </div>
                <div
                  className="action-btn"
                  onClick={() => Trigger(item.entryId, setIsDelete)}
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
          <ReqDelModal requisicion={admitido} handleDeletor={handleDeletor} />
        </div>
      </Modal> */}
      {/* <Modal isOpen={isEdit} setIsOpen={handleEditor}>
        <div className="modal-wrapper">
          <EditForm requisicion={admitido} handleEditor={handleEditor} />
        </div>
      </Modal> */}
      {/* <Modal isOpen={isPrint} setIsOpen={handlePrint}>
        <ReqPrinter
          admitido={admitido}
          movements={admitido.movements}
          handlePrint={handlePrint}
          isPrintable={true}
        />
      </Modal> */}
      {/* <Modal isOpen={isAdd} setIsOpen={handleAdd}>
        <div className="wrapper">
          <AddForm
            admitido={admitido}
            // move={admitido.movements}
            handleAdd={handleAdd}
          />
        </div>
      </Modal> */}
    </div>
  );
};
