import { useState, useEffect, ReactNode } from "react";
import "./modal.style.css";
import ReactModal from "react-modal";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal = ({ children, isOpen, setIsOpen }: ModalType) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      className="modal-box"
      overlayClassName="modal-overlay"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
