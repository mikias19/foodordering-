import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { forwardRef } from "react";

const Modal = forwardRef(function Modal({ children, onCloseModal }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));
  return createPortal(
    <>
      <div className="fixed inset-0 bg-slate-900/40 z-[100]"></div>
      <dialog
        ref={dialog}
        className="fixed rounded-lg shadow-md shadow-slate-400 top-1/2 left-1/2  transition-all transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-[101]"
        onClose={onCloseModal}
      >
        {children}
      </dialog>
    </>,
    document.getElementById("modal")
  );
});
export default Modal;
