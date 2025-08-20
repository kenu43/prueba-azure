import styles from './estilos/EstModulosSkeleton.module.css';

const ModuloSkeleton = () => {
  return (
    <main className='content-section'>
      <h1>Cargando módulo</h1>
      <div className={styles.actions_buttons}>
        <div className={styles.skeleton_section}></div>
        <div className={styles.skeleton_section}></div>
      </div>
      <section className={styles.data_section}>
        <div className={styles.skeleton_section}></div>
        <div className={styles.skeleton_section}></div>
        <div className={styles.skeleton_section}></div>
        <div className={styles.skeleton_section}></div>
      </section>
    </main>
  );
};

export default ModuloSkeleton;
