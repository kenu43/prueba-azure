import Radio from 'app/comunes/controles/Radio';
import { SelectString } from 'app/comunes/controles/select';
import TextArea from 'app/comunes/controles/TextArea';
import Condicional from 'app/comunes/funcionales/Condicional';

import { PROYECTOS_RECOMENDACIONES } from '../../constantes/ConstGenerales';
import estilos from '../../estilos/SeccionesFormularios.module.css';
import { actualizarCampoRecomendaciones, useRecomendacionesMedicasStore } from '../../store/StoreRecomendaciones';

const BaseFormularioRecomendaciones = () => {
  const { fechaDiligenciamiento, asisteSede, motivoDeNoAsistencia, proyectoAsignado, infoActualizadaSuccessFactors, correoCorporativoActivo } = useRecomendacionesMedicasStore().informacionBase;

  return (
    <fieldset className={estilos.contenedor_seccion} style={{ alignItems: 'center' }}>
      <legend>Información general</legend>

      <p className={estilos.fecha_diligenciamiento}>
        Fecha de diligenciamiento:
        {' '}
        {fechaDiligenciamiento}
      </p>
      <Radio
        label="¿Actualmente asiste a la sede asignada?"
        name="asiste-sede"
        id="asiste-sede"
        options={[

          'Si',
          'No',
        ]}
        onChange={(e) => {
          actualizarCampoRecomendaciones('informacionBase', 'asisteSede', e.target.value);
        }}
        value={asisteSede}

      />
      <Condicional condicion={asisteSede === 'No'}>
        <TextArea
          label="Por favor especifique el motivo de la no asistencia a la sede asignada"
          value={motivoDeNoAsistencia}
          onChange={(e) => {
            actualizarCampoRecomendaciones('informacionBase', 'motivoDeNoAsistencia', e.target.value);
          }}
        />
      </Condicional>
      {asisteSede === 'Si' && motivoDeNoAsistencia && (
        <>{actualizarCampoRecomendaciones('informacionBase', 'motivoDeNoAsistencia', '')}</>
      )}
      <SelectString

        label="¿Se encuentra asignado a alguno de los siguientes proyectos?"
        name="selecionar-proyecto"
        optionsArray={PROYECTOS_RECOMENDACIONES}
        onChange={(e) => {
          actualizarCampoRecomendaciones('informacionBase', 'proyectoAsignado', e);
        }}
        value={proyectoAsignado}
      />

      <Radio
        label="¿Su información personal y laboral ya se encuentra actualizada en Success Factors?"
        id="informacion-actualizada-success-factors"

        name="informacion-actualizada-success-factors"
        options={[
          'Si',
          'No',
        ]}
        onChange={(e) => {
          actualizarCampoRecomendaciones('informacionBase', 'infoActualizadaSuccessFactors', e.target.value);
        }}
        value={infoActualizadaSuccessFactors}
      />
      <Radio
        label="¿Su correo electrónico corporativo se encuentra activo?"
        id="correo-corporativo-activo"
        name="correo-corporativo-activo"

        options={[
          'Si',
          'No',
        ]}
        onChange={(e) => {
          actualizarCampoRecomendaciones('informacionBase', 'correoCorporativoActivo', e.target.value);
        }}
        value={correoCorporativoActivo}
      />
    </fieldset>
  );
};

export default BaseFormularioRecomendaciones;
