import styles from '../estilos/SinDatos.module.css';
import Evaluaciones from '../recursos/evaluaciones.svg';

type SinDatosProps = {
  mensaje?: string;
};

const SinDatos = ({ mensaje = 'No hay datos para mostrar' }: SinDatosProps) => {
  return (
    <div className={styles.contenedor}>
      <img src={Evaluaciones} className={styles.icono} />
      <p className={styles.texto}>{mensaje}</p>
    </div>
  );
};

export default SinDatos;
