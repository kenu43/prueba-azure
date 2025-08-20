import { NoItemsFoundIcon } from './recursos/Iconografia';

import styles from './estilos/StylesResults.module.css';

const NotFoundItems = () => {
  return (
    <section className={styles.results_container_error}>
      <NoItemsFoundIcon />
      <h4 className={styles.results_selection_error}>
        No se encontraron resultados
      </h4>
    </section>
  );
};

export default NotFoundItems;
