import type { FallbackProps } from 'react-error-boundary';

import { useNavigate } from 'react-router-dom';

import useErrorNotification from 'hooks/ErrorNotification';

import styles from '../estilos/EstErrores.module.css';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { mensaje } = useErrorNotification({ error });
  const navigate = useNavigate();

  return (
    <main className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>
        {mensaje}
      </h1>

      <p className={styles.errorDescription}>
        Los cambios que ha realizado con anterioridad se encuentran registrados,
        Sin embargo, si el error persiste puede comunicarse a través del
        <strong>Chat de soporte</strong>
        o por
        <strong>Correo electrónico</strong>
      </p>

      <section className={styles.errorDescriptionContainer}>
        <button
          type="button"
          className={styles.errorSupport}
          onClick={() => navigate('/soporte')}
        >
          Chat de soporte
        </button>
        <a
          target="_blank"
          rel="noreferrer"
          className={styles.errorSupport}
          href="mailto:soporte@pcsoluciones.com.co?Subject=Reporte de error"
        >
          Reportar por correo
        </a>
        <button
          type="button"
          className={styles.errorButton}
          onClick={() => resetErrorBoundary}
        >
          Restaurar el servicio
        </button>
      </section>
    </main>
  );
};

export default ErrorFallback;
