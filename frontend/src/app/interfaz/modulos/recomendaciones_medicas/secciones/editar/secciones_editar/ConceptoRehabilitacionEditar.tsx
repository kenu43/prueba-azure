import { useState } from 'react';

import Date from 'app/comunes/controles/Date';
import Radio from 'app/comunes/controles/Radio';
import Text from 'app/comunes/controles/Text';
import Evidencia from 'app/comunes/evidencias/Evidencia';
import Condicional from 'app/comunes/funcionales/Condicional';
import { useUserStore } from 'app/store/PrincipalStore';
import { getLocalDate } from 'utilidades/FuncionesGenerales';

import estilos from '../../../estilos/SeccionesFormularios.module.css';

const ConceptoRehabilitacionEditar = () => {
  const { usuario } = useUserStore();
  const [index] = useState(0);

  const [abrirEvidencia, setAbrirEvidencia] = useState(false);

  const Hoy = getLocalDate().date;
  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Reportar una notificación de concepto de rehabilitación</legend>

      <Date
        label="Fecha de emisión del concepto de rehabilitación"
        value="2025-02-03"
        onChange={() => {
        }}
      />

      <Text
        label="Nombre de la entidad que emite el concepto de rehabilitación"
        name="entidad-emite-concepto"
        id="entidad-emite-concepto"
        value="Entidad 3"
        onChange={() => {
        }}
      />
      <Radio
        label="Concepto de rehabilitación"
        name="concepto-rehabilitacion"
        id="concepto-rehabilitacion"
        orientation="vertical"

        options={['Favorable', 'Desfavorable']}
        onChange={() => {
        }}
        value="Favorable"
      />

      <button
        type="button"
        className={estilos.boton_evidencia}
        onClick={() => setAbrirEvidencia(true)}
      >
        Adjuntar evidencia
      </button>
      <Condicional condicion={abrirEvidencia}>
        <Evidencia
          titulo="Subir evidencia"
          close={() => setAbrirEvidencia(false)}
          rutaStorage={`recomendaciones-medicas/concepto-rehabilitacion/${usuario.uid}/${index}`}
          archivosCargados={() => {
          }}
        />
      </Condicional>
    </fieldset>
  );
};

export default ConceptoRehabilitacionEditar;
