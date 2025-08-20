import { Spinner } from './recursos/Iconografia';

import styles from './estilos/StylesLoading.module.css';

const LoadingComponent = ({ loading }: { loading: boolean }) => {
  if (!loading) return <p className={styles.loading_state}></p>;

  return (
    <div className={styles.loading_container}>
      <Spinner />
      <p className={styles.loading_state}>Buscando resultados</p>
    </div>
  );
};

export default LoadingComponent;
