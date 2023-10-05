import { AiFillCloseCircle } from "react-icons/ai";
import React from "react";

const Modal = ({ isOpen, onClose, children, maxWidth }) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="modal" onClick={onClose}></div>
          <div className="modal-content" style={{maxWidth:maxWidth}}>
            <div className="close text-teal-700  dark:text-teal-500">
            <AiFillCloseCircle size="1.8rem"  onClick={onClose} />
            </div>
            {children}
          </div>
        </>
      )}
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index:100;
        }

        .modal-content {
          z-index:150;
          width:90%;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 50%;
        }

        .close {
          position: absolute;
          top: -5px;
          right:-5px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Modal;
