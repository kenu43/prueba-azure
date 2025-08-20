import ReactDOM from 'react-dom';
import { ModalProps } from 'comunes/types/FuncionalesTypes';
import { ModalContainer } from 'comunes/estilos/EstFuncionales';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, onClick }: ModalProps) =>
  ReactDOM.createPortal(
    <ModalContainer onClick={onClick}>{children}</ModalContainer>,
    modalRoot!
  );

export default Modal;
