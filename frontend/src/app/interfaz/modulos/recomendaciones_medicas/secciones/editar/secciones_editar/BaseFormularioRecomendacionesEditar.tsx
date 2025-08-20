import Radio from 'app/comunes/controles/Radio';
import { SelectString } from 'app/comunes/controles/select';

import { PROYECTOS_RECOMENDACIONES } from '../../../constantes/ConstGenerales';
import estilos from '../../../estilos/SeccionesFormularios.module.css';

const BaseFormularioRecomendacionesEditar = () => {
  return (
    <fieldset className={estilos.contenedor_seccion}>

      <legend>Información general</legend>
      <p>Fecha de diligenciamiento: 2025-08-15</p>

      <Radio
        orientation="vertical"
        label="¿Actualmente asiste a la sede asignada?"
        name="asiste-sede"
        id="asiste-sede"
        options={[
          'Si',
          'No',
        ]}
        onChange={() => {
        }}
        value="Si"

      />
      <SelectString
        label="¿Se encuentra asignado a alguno de los siguientes proyectos?"
        name="selecionar-proyecto"
        optionsArray={PROYECTOS_RECOMENDACIONES}
        onChange={() => {

        }}
        value="Flujo valor canales asistidos"
      />

      <Radio
        label="¿Su información personal y laboral ya se encuentra actualizada en Success Factors?"
        id="informacion-actualizada-success-factors"
        orientation="vertical"

        name="informacion-actualizada-success-factors"
        options={[
          'Si',
          'No',
        ]}
        onChange={() => {
        }}
        value="Si"
      />
      <Radio
        label="Su correo electrónico corporativo se encuentra activo"
        id="correo-corporativo-activo"
        name="correo-corporativo-activo"
        orientation="vertical"

        options={[
          'Si',
          'No',
        ]}
        onChange={() => {
        }}
        value="Si"
      />
    </fieldset>
  );
};

export default BaseFormularioRecomendacionesEditar;
