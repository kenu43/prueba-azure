import logo from 'assets/logo.webp';

import { version } from '../../../../../package.json';
import estilos from '../../estilos/Informativos.module.css';

const InformacionPrincipal = () => {
  return (
    <main className={estilos.contenedor_principal}>
      <section className={estilos.contenedor_marca}>
        <img
          className={estilos.imagen_marca}
          src={logo}
          alt="Logo empresa cliente"
          loading="lazy"
        />
        <h1 className={estilos.titulo_marca}>Claro APP</h1>
      </section>

      <p style={{ color: 'var(--color-placeholder)' }}>
        Selecciona la plataforma a la que deseas acceder
      </p>

      <small style={{ color: 'var(--color-placeholder)' }}>
        version -
        {' '}
        {version}
      </small>
    </main>
  );
};

export default InformacionPrincipal;
