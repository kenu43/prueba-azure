import { useTrabajadorEppStore } from 'app/interfaz/modulos/epp/store/StoreEpp';
import estilos from '../../estilos/SolicitarEPP.module.css';

const InformacionTrabajador = () => {
  const trabajador = useTrabajadorEppStore();

  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Información del trabajador</legend>

      <section className={estilos.contenedor_preguntas}>
        <div>
          <h6>Número de documento</h6>
          <p>{trabajador.cedula || 'N/A'}</p>
        </div>

        <div>
          <h6>Nombre</h6>
          <p>{trabajador.nombre || 'N/A'}</p>
        </div>

        <div>
          <h6>SAP</h6>
          <p>{trabajador.sap || '123456789'}</p>
        </div>

        <div>
          <h6>Cargo</h6>
          <p>{trabajador.historiaOcupacional.cargo || 'Zone Owner I'}</p>
        </div>

        <div>
          <h6>Ciudad</h6>
          <p>{trabajador.ciudad || 'Bogotá D.C'}</p>
        </div>

        <div>
          <h6>Región</h6>
          <p>{trabajador.region || 'N/A'}</p>
        </div>
      </section>
    </fieldset>
  );
};

export default InformacionTrabajador;
