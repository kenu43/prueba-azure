import Date from 'app/comunes/controles/Date';
import Numeric from 'app/comunes/controles/Numeric';
import Text from 'app/comunes/controles/Text';

import estilos from '../../estilos/SeccionesFormularios.module.css';
import {
  actualizarCampoRecomendaciones,
  useRecomendacionesMedicasStore,
} from '../../store/StoreRecomendaciones';

const DiscapacidadCertificada = () => {
  const { entidadEmiteCalificacion, fechaEmision, porcentajePCL }
    = useRecomendacionesMedicasStore().discapacidadCertificada;

  const hoy = new globalThis.Date().toISOString().split('T')[0];
  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Reportar una discapacidad certificada</legend>
      <Date
        label="Fecha de emisión"
        name="fecha-emision"
        id="fecha-emision"
        max={hoy}
        value={fechaEmision}
        onChange={(e) => {
          actualizarCampoRecomendaciones(
            'discapacidadCertificada',
            'fechaEmision',
            e.target.value,
          );
        }}
      />
      <Text
        label="Entidad que emite la calificación"
        name="entidad-emite-calificacion"
        id="entidad-emite-calificacion"
        value={entidadEmiteCalificacion}
        onChange={(e) => {
          actualizarCampoRecomendaciones(
            'discapacidadCertificada',
            'entidadEmiteCalificacion',
            e.target.value,
          );
        }}
      />
      <Numeric
        label="Porcentaje de pérdida de capacidad laboral calificado (PCL)"
        name="% PCL"
        id="%-pcl"
        value={porcentajePCL}
        max={100}
        onChange={(e) => {
          actualizarCampoRecomendaciones(
            'discapacidadCertificada',
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
export default DiscapacidadCertificada;
