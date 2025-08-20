import { useState } from 'react';

import Date from 'app/comunes/controles/Date';
import Radio from 'app/comunes/controles/Radio';
import Text from 'app/comunes/controles/Text';
import Evidencia from 'app/comunes/evidencias/Evidencia';
import Condicional from 'app/comunes/funcionales/Condicional';
import { useUserStore } from 'app/store/PrincipalStore';

import estilos from '../../estilos/SeccionesFormularios.module.css';
import {
  actualizarCampoRecomendaciones,
  editarRecomendacionArreglo,
  useRecomendacionesMedicasStore,
} from '../../store/StoreRecomendaciones';

const ConceptoRehabilitacion = () => {
  const { usuario } = useUserStore();
  const [index] = useState(0);

  const [abrirEvidencia, setAbrirEvidencia] = useState(false);
  const {
    conceptoRehabilitacion,
    entidadEmiteConcepto,
    fechaEmisionRehabilitacion,
  } = useRecomendacionesMedicasStore().conceptoRehabilitacion;

  const hoy = new globalThis.Date().toISOString().split('T')[0];
  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Reportar una notificación de concepto de rehabilitación</legend>

      <Date
        label="Fecha de emisión del concepto de rehabilitación"
        value={fechaEmisionRehabilitacion}
        max={hoy}
        onChange={(e) => {
          actualizarCampoRecomendaciones(
            'conceptoRehabilitacion',
            'fechaEmisionRehabilitacion',
            e.target.value,
          );
        }}
      />

      <Text
        label="Nombre de la entidad que emite el concepto de rehabilitación"
        name="entidad-emite-concepto"
        id="entidad-emite-concepto"
        value={entidadEmiteConcepto}
        onChange={(e) => {
          actualizarCampoRecomendaciones(
            'conceptoRehabilitacion',
            'entidadEmiteConcepto',
            e.target.value,
          );
        }}
      />
      <Radio
        label="Concepto de rehabilitación"
        name="concepto-rehabilitacion"
        id="concepto-rehabilitacion"
        options={['Favorable', 'Desfavorable']}
        onChange={(e) => {
          actualizarCampoRecomendaciones(
            'conceptoRehabilitacion',
            'conceptoRehabilitacion',
            e.target.value,
          );
        }}
        value={conceptoRehabilitacion}
      />
      <div className={estilos.seccion_botones}>

        <button
          type="button"
          className={estilos.boton_evidencia}
          onClick={() => setAbrirEvidencia(true)}
        >
          Adjuntar evidencia
        </button>
      </div>
      <Condicional condicion={abrirEvidencia}>
        <Evidencia
          titulo="Subir evidencia"
          close={() => setAbrirEvidencia(false)}
          rutaStorage={`recomendaciones-medicas/concepto-rehabilitacion/${usuario.uid}/${index}`}
          archivosCargados={(archivos) => {
            editarRecomendacionArreglo(
              'enfermedadGrave',
              index,
              'archivos',
              archivos,
            );
          }}
        />
      </Condicional>
    </fieldset>
  );
};

export default ConceptoRehabilitacion;
