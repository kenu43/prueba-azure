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
          <p>{trabajador.cedula || '123456789'}</p>
        </div>

        <div>
          <h6>Nombre</h6>
          <p>{trabajador.nombre || 'Laura Pérez'}</p>
        </div>

        <div>
          <h6>SAP</h6>
          <p>{trabajador.sap || '2345632532'}</p>
        </div>

        <div>
          <h6>Número de contacto</h6>
          <p>{trabajador.telefono || '3136049821'}</p>
        </div>

        <div>
          <h6>Correo corporativo</h6>
          <p>{trabajador.correo || 'LauraPerez@claro.com'}</p>
        </div>

        <div>
          <h6>Región</h6>
          <p>{trabajador.region || 'Región 2'}</p>
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
          <p>Plaza claro t2</p>
        </div>

        <div>
          <h6>Cargo</h6>
          <p>Ingeniero(a) de mantenimiento de obras civiles estándar</p>
        </div>

        <div>
          <h6>Nombre del jefe</h6>
          <p>{trabajador.nombreJefe || 'Luis Alberto Ortega Moreno'}</p>
        </div>

        <div>
          <h6>Correo del jefe</h6>
          <p>{trabajador.correoJefe || 'LuisalbertoMoreno@claro.com'}</p>
        </div>
      </section>
    </fieldset>
  );
};

export default InformacionTrabajador;
