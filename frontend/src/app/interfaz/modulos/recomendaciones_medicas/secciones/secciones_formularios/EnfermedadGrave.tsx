import { useState } from 'react';

import Date from 'app/comunes/controles/Date';
import TextArea from 'app/comunes/controles/TextArea';
import Evidencia from 'app/comunes/evidencias/Evidencia';
import Condicional from 'app/comunes/funcionales/Condicional';
import { useUserStore } from 'app/store/PrincipalStore';

import {
  STORE_RECOMENDACIONES,
} from '../../constantes/ConstGenerales';
import estilos from '../../estilos/SeccionesFormularios.module.css';
import {
  agregarRecomendacion,
  editarRecomendacionArreglo,
  eliminarRecomendacionArreglo,
  useRecomendacionesMedicasStore,
} from '../../store/StoreRecomendaciones';

const EnfermedadGrave = () => {
  const [abrirEvidencia, setAbrirEvidencia] = useState(false);
  const { usuario } = useUserStore();
  const datos = useRecomendacionesMedicasStore().enfermedadGrave;
  const hoy = new globalThis.Date().toISOString().split('T')[0];
  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Reportar una enfermedad grave o catastrófica</legend>

      {datos.map(
        (
          {
            diagnosticoReportar,
            fechaDiagnostico,
            proximoControlMedico,
            tratamientoActual,
            ultimoControlMedico,
          },
          index,
        ) => (
          // eslint-disable-next-line react/no-array-index-key
          <section key={index} className={estilos.contenedor_informacion}>
            <div className={estilos.span_dos_columnas}>
              <TextArea
                label="Diagnóstico a reportar"
                value={diagnosticoReportar}
                onChange={(e) => {
                  editarRecomendacionArreglo(
                    'enfermedadGrave',
                    index,
                    'diagnosticoReportar',
                    e.target.value,
                  );
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', gridColumn: '1/-1' }}>
              <Date
                label="Fecha diagnóstico "
                value={fechaDiagnostico}
                onChange={(e) => {
                  editarRecomendacionArreglo(
                    'enfermedadGrave',
                    index,
                    'fechaDiagnostico',
                    e.target.value,
                  );
                }}
                max={hoy}
              />
              <Date
                label="Último control médico"
                value={ultimoControlMedico}
                onChange={(e) => {
                  editarRecomendacionArreglo(
                    'enfermedadGrave',
                    index,
                    'ultimoControlMedico',
                    e.target.value,
                  );
                }}
                max={hoy}
              />

              <Date
                label="Próximo control médico "
                value={proximoControlMedico}
                onChange={(e) => {
                  editarRecomendacionArreglo(
                    'enfermedadGrave',
                    index,
                    'proximoControlMedico',
                    e.target.value,
                  );
                }}
                min={hoy}
              />
            </div>

            <div className={estilos.span_dos_columnas}>
              <TextArea
                label="Tratamiento actual "
                value={tratamientoActual}
                onChange={(e) => {
                  editarRecomendacionArreglo(
                    'enfermedadGrave',
                    index,
                    'tratamientoActual',
                    e.target.value,
                  );
                }}
              />
            </div>

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

              <Condicional condicion={datos.length > 1}>
                <button
                  onClick={() => {
                    eliminarRecomendacionArreglo('enfermedadGrave', index);
                  }}
                  className={estilos.boton_eliminar}
                  type="button"
                >
                  Eliminar diagnóstico
                </button>
              </Condicional>
            </div>
            <Condicional condicion={abrirEvidencia}>
              <Evidencia
                titulo="Subir evidencia"
                close={() => setAbrirEvidencia(false)}
                rutaStorage={`recomendaciones-medicas/enfermedad-grave/${usuario.uid}/${index}`}
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
          </section>
        ),
      )}
      <button
        type="button"
        className={estilos.boton_agregar}
        onClick={() => {
          agregarRecomendacion(
            'enfermedadGrave',
            STORE_RECOMENDACIONES.enfermedadGrave[0],
          );
        }}
      >
        Agregar diagnóstico
      </button>
    </fieldset>
  );
};
export default EnfermedadGrave;
