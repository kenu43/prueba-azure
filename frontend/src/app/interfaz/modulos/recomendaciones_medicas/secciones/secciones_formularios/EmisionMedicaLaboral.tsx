import { useState } from 'react';

import Date from 'app/comunes/controles/Date';
import Numeric from 'app/comunes/controles/Numeric';
import { SelectString } from 'app/comunes/controles/select';
import Text from 'app/comunes/controles/Text';
import Evidencia from 'app/comunes/evidencias/Evidencia';
import Condicional from 'app/comunes/funcionales/Condicional';
import { useUserStore } from 'app/store/PrincipalStore';

import { ENTIDADES_RECOMENDACIONES, STORE_RECOMENDACIONES } from '../../constantes/ConstGenerales';
import estilos from '../../estilos/SeccionesFormularios.module.css';
import { agregarRecomendacion, editarRecomendacionArreglo, eliminarRecomendacionArreglo, useRecomendacionesMedicasStore } from '../../store/StoreRecomendaciones';

const EmisionMedicaLaboral = () => {
  const [abrirEvidencia, setAbrirEvidencia] = useState(false);
  const { usuario } = useUserStore();
  const datos = useRecomendacionesMedicasStore().emisionMedicaLaboral;
  const hoy = new globalThis.Date().toISOString().split('T')[0];
  const quinceDiasAtras = new globalThis.Date();
  quinceDiasAtras.setDate(quinceDiasAtras.getDate() - 15);
  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Reportar la emisión de recomendaciones médico - laborales</legend>

      {datos.map(
        (
          {
            duracionMeses,
            entidadRecomendacion,
            fechaInicioRecomendacion,
            nombreMedicoEmisor,
          },
          index,
        ) => (
          // eslint-disable-next-line react/no-array-index-key
          <section key={index} className={estilos.contenedor_informacion}>
            <SelectString
              label="Entidad que emite la recomendación"
              name={`entidadRecomendacion-${index}`}
              optionsArray={ENTIDADES_RECOMENDACIONES}
              onChange={(e) => {
                editarRecomendacionArreglo(
                  'emisionMedicaLaboral',
                  index,
                  'entidadRecomendacion',
                  e,
                );
              }}
              value={entidadRecomendacion}
            />
            <Text
              label="Nombre del médico emisor"
              value={nombreMedicoEmisor}
              onChange={(e) => {
                editarRecomendacionArreglo(
                  'emisionMedicaLaboral',
                  index,
                  'nombreMedicoEmisor',
                  e.target.value,
                );
              }}
            />
            <Date

              label="Fecha de inicio de la recomendación"
              value={fechaInicioRecomendacion}
              onChange={(e) => {
                editarRecomendacionArreglo(
                  'emisionMedicaLaboral',
                  index,
                  'fechaInicioRecomendacion',
                  e.target.value,

                );
              }}
              max={hoy}
              min={quinceDiasAtras.toISOString().split('T')[0]}
            />
            <Numeric
              label="Duración de las recomendaciones en meses"
              value={duracionMeses}
              onChange={(e) => {
                editarRecomendacionArreglo(
                  'emisionMedicaLaboral',
                  index,
                  'duracionMeses',
                  Number.parseInt(e.target.value) || 0,
                );
              }}
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

              <Condicional condicion={datos.length > 1}>
                <button
                  onClick={() => {
                    eliminarRecomendacionArreglo(
                      'emisionMedicaLaboral',
                      index,
                    );
                  }}
                  className={estilos.boton_eliminar}
                  type="button"
                >
                  Eliminar recomendación
                </button>
              </Condicional>
            </div>

            <Condicional condicion={abrirEvidencia}>
              <Evidencia
                titulo="Subir evidencia"
                close={() => setAbrirEvidencia(false)}
                rutaStorage={`recomendaciones-medicas/emision-medica-laboral/${usuario.uid}/${index}`}
                archivosCargados={(archivos) => {
                  editarRecomendacionArreglo(
                    'emisionMedicaLaboral',
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
            'emisionMedicaLaboral',
            STORE_RECOMENDACIONES.emisionMedicaLaboral[0],
          );
        }}
      >
        Agregar recomendación
      </button>
    </fieldset>
  );
};
export default EmisionMedicaLaboral;
