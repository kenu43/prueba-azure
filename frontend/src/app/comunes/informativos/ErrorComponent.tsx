import { FallbackProps } from 'react-error-boundary';
import useErrorNotification from 'hooks/ErrorNotification';

import styles from '../estilos/EstErrores.module.css';

const ErrorFallback = ({ error }: FallbackProps) => {
  useErrorNotification({ error });

  return (
    <main className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>
        Lo sentimos, se presentó un problema en la aplicación y ya hemos
        comunicado al equipo de soporte.
      </h1>

      <p className={styles.errorDescription}>
        Los cambios que ha realizado con anterioridad se encuentran registrados,
        Sin embargo, si el error persiste puede comunicarse a través del{' '}
        <strong>Chat de soporte</strong> o por{' '}
        <strong>Correo electrónico</strong>
      </p>

      <section className={styles.errorDescriptionContainer}>
        <a
          target='_blank'
          rel='noreferrer'
          className={styles.errorSupport}
          href='mailto:soporte@pcsoluciones.com.co?Subject=Reporte de error por usuario'
        >
          Reportar por correo
        </a>
        <button
          type='button'
          className={styles.errorButton}
          onClick={() => window.location.reload()}
        >
          Restaurar el servicio
        </button>
      </section>
    </main>
  );
};

export default ErrorFallback;
