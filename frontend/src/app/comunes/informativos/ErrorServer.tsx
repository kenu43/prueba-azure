import type { FallbackProps } from 'react-error-boundary';

import errorImg from 'assets/no_autorizado.webp';
import { useNavigate } from 'react-router-dom';

import useErrorNotification from 'hooks/ErrorNotification';

import styles from '../estilos/EstErroresServer.module.css';
import { EmailIcon, NotionIcon, RefreshIcon } from '../recursos/Iconografia';

const ErrorServer = ({ error }: FallbackProps) => {
  const { mensaje } = useErrorNotification({ error });
  const navigate = useNavigate();

  return (
    <main className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>
        {mensaje}
      </h1>

      <p className={styles.errorDescription}>
        Sabemos que es frustrante, pero no te preocupes, si esto persiste puedes comunicarte a través de las siguientes opciones
      </p>

      <section className={styles.container_error_section}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://pcsoluciones.notion.site/1ff8e274256c80b78fc9c95ee02244da?pvs=105"
          className={`${styles.errorButton} ${styles.notion_error}`}
          onClick={() => navigate('/soporte')}
        >
          <NotionIcon />
          Escribir a soporte
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          className={`${styles.errorButton} ${styles.email_error}`}
          href="mailto:soporte@pcsoluciones.com.co?Subject=Reporte de error"
        >
          <EmailIcon />
          Reportar por correo
        </a>
        <button
          type="button"
          className={`${styles.errorButton} ${styles.restore_error}`}
          onClick={() => window.location.reload()}
        >
          <RefreshIcon />
          Restaurar el servicio
        </button>
      </section>

      <img src={errorImg} alt="Error" className={styles.errorImage} />
    </main>
  );
};

export default ErrorServer;
