import styles from './estilos/EstBarraLateralGeneral.module.css';
import AppConfig from './secciones/AppConfig';
import AppModulos from './secciones/AppModulos';

const BarraLateral = () => {
  return (
    <section className={styles.contenedor_barra_lateral}>
      <AppConfig />
      <AppModulos />
    </section>
  );
};
export default BarraLateral;
