import { CargandoIcono } from 'app/autenticacion/recursos/Iconografia';

import estilos from '../../estilos/Generales.module.css';

const CargandoSeccion = () => {
  return (
    <main className={estilos.contenedor_cargando}>
      <CargandoIcono />
      <span>Cargando sección</span>
    </main>
  );
};

export default CargandoSeccion;
