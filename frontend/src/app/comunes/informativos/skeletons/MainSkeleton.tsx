import './estilos/EstMainSkeleton.css';

const MainSkeleton = ({ mensaje }: { mensaje: string }) => {
  return (
    <>
      <section className="upperbar-section">
        <div className="skeleton-section"></div>
      </section>
      <section className="config-section">
        <div className="skeleton-section"></div>
        <div className="skeleton-section"></div>
        <div className="skeleton-section"></div>
      </section>
      <section className="modules-section">
        <div className="skeleton-section"></div>
        <div className="skeleton-section"></div>
        <div className="skeleton-section"></div>
      </section>
      <main className="content-section">
        <div className="skeleton-section"></div>
        <section className="data-section">
          <div className="skeleton-section"></div>
          <h1>{mensaje}</h1>
          <div className="skeleton-section-content"></div>
        </section>
      </main>
    </>
  );
};

export default MainSkeleton;
