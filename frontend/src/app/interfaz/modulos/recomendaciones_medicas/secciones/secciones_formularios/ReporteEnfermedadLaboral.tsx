import { useState } from 'react';

import Date from 'app/comunes/controles/Date';
import TextArea from 'app/comunes/controles/TextArea';
import Evidencia from 'app/comunes/evidencias/Evidencia';
import Condicional from 'app/comunes/funcionales/Condicional';
import { useUserStore } from 'app/store/PrincipalStore';

import { STORE_RECOMENDACIONES } from '../../constantes/ConstGenerales';
import estilos from '../../estilos/SeccionesFormularios.module.css';
import { agregarRecomendacion, editarRecomendacionArreglo, eliminarRecomendacionArreglo, useRecomendacionesMedicasStore } from '../../store/StoreRecomendaciones';

const ReporteEnfermedadLaboral = () => {
  const [abrirEvidencia, setAbrirEvidencia] = useState(false);
  const { usuario } = useUserStore();
  const datos = useRecomendacionesMedicasStore().enfermedadLaboral;
  const hoy = new globalThis.Date().toISOString().split('T')[0];
  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Reportar una enfermedad laboral, calificada mediante dictamen</legend>

      {datos.map(
        (
          {
            diagnosticoLaboral,
            diagnosticoReportarCIE10,
            fechaCalificacion,
          },
          index,
        ) => (
          // eslint-disable-next-line react/no-array-index-key
          <section key={index} className={estilos.contenedor_informacion}>

            <div className={estilos.span_dos_columnas}>
              <TextArea
                style={{ gridColumn: 'span 2' }}

                label="Diagnóstico enfermedad laboral"
                required
                value={diagnosticoLaboral}
                onChange={(e) => {
                  editarRecomendacionArreglo(
                    'enfermedadLaboral',
                    index,
                    'diagnosticoLaboral',
                    e.target.value,
                  );
                }}
              />
            </div>
            <div className={estilos.span_dos_columnas}>
              <TextArea
                label="Diagnóstico a reportar según CIE10 (en caso de conocerlo)"
                value={diagnosticoReportarCIE10}
                onChange={(e) => {
                  editarRecomendacionArreglo(
                    'enfermedadLaboral',
                    index,
                    'diagnosticoReportarCIE10',
                    e.target.value,
                  );
                }}
              />
            </div>
            <Date
              label="Fecha de calificación"
              value={fechaCalificacion}
              onChange={(e) => {
                editarRecomendacionArreglo(
                  'enfermedadLaboral',
                  index,
                  'fechaCalificacion',
                  e.target.value,
                );
              }}
              max={hoy}
            />
            <div className={estilos.seccion_botones}>
              <button
                onClick={() => {
                  setAbrirEvidencia(true);
                }}
                className={estilos.boton_evidencia}
                type="button"
              >
                Adjuntar evidencia
              </button>

              {' '}
              <Condicional condicion={abrirEvidencia}>
                <Evidencia
                  titulo="Subir evidencia"
                  close={() => setAbrirEvidencia(false)}
                  rutaStorage={`recomendaciones-medicas/enfermedad-laboral/${usuario.uid}/${index}`}
                  archivosCargados={(archivos) => {
                    editarRecomendacionArreglo(
                      'enfermedadLaboral',
                      index,
                      'archivos',
                      archivos,
                    );
                  }}
                />
              </Condicional>
              <Condicional condicion={datos.length > 1}>
                <button
                  onClick={() => {
                    eliminarRecomendacionArreglo(
                      'enfermedadLaboral',
                      index,
                    );
                  }}
                  className={estilos.boton_eliminar}
                  type="button"
                >
                  Eliminar diagnóstico
                </button>

              </Condicional>
            </div>
          </section>
        ),
      )}

      <button
        type="button"
        className={estilos.boton_agregar}
        onClick={() => {
          agregarRecomendacion(
            'enfermedadLaboral',
            STORE_RECOMENDACIONES.enfermedadLaboral[0],
          );
        }}
      >
        Agregar diagnóstico
      </button>

    </fieldset>
  );
};
export default ReporteEnfermedadLaboral;
