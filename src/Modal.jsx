// basically stolen from the React docs
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    console.log("mounted modal");
    return () => modalRoot.removeChild(elRef.current, console.log("unmounted modal"));
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;