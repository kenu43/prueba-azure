import styles from '../../estilos/EnviarCorreo.module.css';

type ModalCorreosProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalCorreos = ({ isOpen, onClose, children }: ModalCorreosProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal_sombra} onClick={onClose}>
      <div className={styles.modal_contenido} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalCorreos;
