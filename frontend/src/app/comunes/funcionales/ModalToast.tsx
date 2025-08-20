import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const ModalToast = ({ children }: { children: React.ReactNode }) =>
  ReactDOM.createPortal(<>{children}</>, modalRoot!);

export default ModalToast;
