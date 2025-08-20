import estilos from '../estilos/InformacionTrabajador.module.css';
import { useTrabajadoresRecomendacionesStore } from '../store/TrabajadoresRecomendacionesStore';

const InformacionTrabajador = () => {
  const trabajador = useTrabajadoresRecomendacionesStore();

  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Información del trabajador</legend>

      <section className={estilos.contenedor_datos}>
        <div>
          <h6>Expediente</h6>
          <p>{trabajador.cedula || 'N/A'}</p>
        </div>

        <div>
          <h6>Nombre</h6>
          <p>{trabajador.nombre || 'N/A'}</p>
        </div>

        <div>
          <h6>SAP</h6>
          <p>{trabajador.sap || '12312234413'}</p>
        </div>

        <div>
          <h6>Número de contacto</h6>
          <p>{trabajador.telefono || '3153987654'}</p>
        </div>

        <div>
          <h6>Correo corporativo</h6>
          <p>{trabajador.correo || 'AnaTorres@claro.com'}</p>
        </div>

        <div>
          <h6>Región</h6>
          <p>{trabajador.region || 'Región 3'}</p>
        </div>

        <div>
          <h6>Direccion</h6>
          <p>{trabajador.gerencia || 'Direccion corporativa tecnologia'}</p>
        </div>

        <div>
          <h6>Ciudad</h6>
          <p>{trabajador.ciudad || 'Cúcuta'}</p>
        </div>

        <div>
          <h6>Sede</h6>
          <p>Plaza claro</p>
        </div>

        <div>
          <h6>Cargo</h6>
          <p>Técnico(a) de atención y desinstalación de solicitudes UMM</p>
        </div>

        <div>
          <h6>Nombre del jefe</h6>
          <p>{trabajador.nombreJefe || 'Rubiela Chamorro'}</p>
        </div>

        <div>
          <h6>Correo del jefe</h6>
          <p>{trabajador.correoJefe || 'RubieCham15@claro.com'}</p>
        </div>
      </section>
    </fieldset>
  );
};

export default InformacionTrabajador;
