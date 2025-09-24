import {type ReactNode, useEffect, useRef} from "react";
import {createPortal} from 'react-dom';

interface ModalProps {
    children: ReactNode;
}

const Modal = ({children} : ModalProps) => {
    const elRef = useRef<HTMLDivElement | null>(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById('modal');
        if (!modalRoot || !elRef.current) {
            return;
        }
        const currentEl = elRef.current;
        modalRoot.appendChild(currentEl);
        return () => {
            modalRoot.removeChild(currentEl);
        }
    }, [])

    return createPortal(<div>{children}</div>, elRef.current)

};

export default Modal;