import Date from 'app/comunes/controles/Date';
import Numeric from 'app/comunes/controles/Numeric';
import Text from 'app/comunes/controles/Text';

import estilos from '../../estilos/SeccionesFormularios.module.css';
import {
  actualizarCampoRecomendaciones,
  useRecomendacionesMedicasStore,
} from '../../store/StoreRecomendaciones';

const PerdidaCapacidadLaboral = () => {
  const {
    entidadEmiteCertificacion,
    fechaEmision,
    porcentajePCL,
  } = useRecomendacionesMedicasStore().perdidaCapacidadLaboral;

  const hoy = new globalThis.Date().toISOString().split('T')[0];
  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Reportar una notificación de pérdida de capacidad laboral</legend>

      <Date
        label="Fecha de emisión"
        value={fechaEmision}
        max={hoy}
        onChange={(e) => {
          actualizarCampoRecomendaciones(
            'perdidaCapacidadLaboral',
            'fechaEmision',
            e.target.value,
          );
        }}
      />

      <Text
        label="Entidad que emite la calificación"
        value={entidadEmiteCertificacion}
        onChange={(e) => {
          actualizarCampoRecomendaciones(
            'perdidaCapacidadLaboral',
            'entidadEmiteCertificacion',
            e.target.value,
          );
        }}
      />

      <Numeric
        label="Porcentaje de pérdida de capacidad laboral calificado (PCL)"
        value={porcentajePCL}
        max={100}
        onChange={(e) => {
          actualizarCampoRecomendaciones(
            'perdidaCapacidadLaboral',
            'porcentajePCL',
            e.target.value,
          );
        }}
        validacionTexto={(e) => {
          e.currentTarget.setCustomValidity(
            'Debe diligenciar números entre 0 y 100',
          );
        }}

        onInput={(e) => {
          e.currentTarget.setCustomValidity('');
        }}
      />

    </fieldset>
  );
};

export default PerdidaCapacidadLaboral;
