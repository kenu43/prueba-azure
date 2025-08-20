import estilos from '../../estilos/SolicitarEPP.module.css';
import { useTrabajadorEppStore } from '../../store/StoreEpp';

const InformacionTrabajador = () => {
  const trabajador = useTrabajadorEppStore();

  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Información del trabajador</legend>

      <section className={estilos.contenedor_preguntas}>
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
          <p>{trabajador.sap || 'N/A'}</p>
        </div>

        <div>
          <h6>Cargo</h6>
          <p>
            {trabajador.historiaOcupacional.cargo ||
              'Owner Aseguramiento operaciones Jr'}{' '}
          </p>
        </div>

        <div>
          <h6>Ciudad</h6>
          <p>{trabajador.ciudad || 'N/A'}</p>
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
