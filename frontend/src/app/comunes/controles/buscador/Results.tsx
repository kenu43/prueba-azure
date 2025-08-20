import type { ResultProps } from './types/ResultsTypes';

import styles from './estilos/StylesResults.module.css';
import LoadingComponent from './LoadingComponent';
import NotFoundItems from './NotFoundItems';
import { DocumentIcon } from './recursos/Iconografia';

const Results = ({ data = [], searchWord, loading, callback }: ResultProps) => {
  if (loading && searchWord !== '')
    return <LoadingComponent loading={loading} />;

  if (data.length === 0 && searchWord !== '' && !loading)
    return <NotFoundItems />;

  return (
    <section className={styles.results_container}>
      <p
        className={styles.results_total}
      >
        {`${data.length} resultados encontrados`}
      </p>
      {data.map((res, index) => (
        <div key={index} className={styles.results_text_container}>
          <DocumentIcon />
          <p className={styles.results_text} key={index}>
            {res.nombre}
          </p>
          <h5
            className={styles.results_selection}
            onClick={() => callback(res)}
          >
            Seleccionar
          </h5>
        </div>
      ))}
    </section>
  );
};

export default Results;
