import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import Numeric from 'app/comunes/controles/Numeric';
import Radio from 'app/comunes/controles/Radio';
import Text from 'app/comunes/controles/Text';
import TextArea from 'app/comunes/controles/TextArea';
import Evidencia from 'app/comunes/funcionales/cargarEvidencia/Evidencia';
import Condicional from 'app/comunes/funcionales/Condicional';
import { useUserStore } from 'app/store/PrincipalStore';

import { ELEMENTOS, MOTIVO } from '../../constantes/ConstGenerales';
import estilos from '../../estilos/ElementosSeleccionados.module.css';
import { EPP } from '../../recursos/Elementos.json';
import { editarElemento, useEppStore } from '../../store/StoreEpp';
import { revisarEvidencia } from '../../utilidades/Funciones';

const SeleccionarElementos = () => {
  const { usuario } = useUserStore();
  const elementosSeleccionados = useEppStore((s) => s.elementosSeleccionados);
  // const { historiaOcupacional } = useTrabajadorEppStore();
  const cargo = 'Zone Owner I';
  const [cargarEvidenciaDe, setCargarEvidenciaDe] = useState<number | null>(
    null
  );

  const opcionesListado = useMemo(
    () => EPP.filter((el) => el.cargo?.includes(cargo)),
    [cargo]
  );

  useEffect(() => {
    const actuales = useEppStore.getState().elementosSeleccionados;
    const byCodigo = new Map(actuales.map((e) => [e.elemento, e]));
    const normalizados = opcionesListado.map((opt) => {
      const existente = byCodigo.get(opt.codigo);
      return existente ?? { ...ELEMENTOS[0], elemento: opt.codigo };
    });
    const sameLength = normalizados.length === actuales.length;
    const sameOrder =
      sameLength &&
      normalizados.every(
        (n, i) => n.elemento === (actuales[i]?.elemento ?? '')
      );
    if (!sameLength || !sameOrder) {
      useEppStore.setState({ elementosSeleccionados: normalizados });
    }
  }, [opcionesListado]);

  return (
    <fieldset className={estilos.contenedor_seccion}>
      <legend>Elementos</legend>

      <Condicional condicion={opcionesListado.length === 0}>
        <p className={estilos.sin_elementos}>
          No hay elementos disponibles para el cargo seleccionado.
        </p>
      </Condicional>

      {opcionesListado.map((elemento, i) => {
        const fila = elementosSeleccionados[i];

        return (
          <details
            open
            key={elemento.codigo}
            className={`${estilos.details} ${estilos.fade_in}`}
          >
            <summary className={estilos.summary}>
              <img src={elemento.imagen} alt={`Imagen de ${elemento.label}`} />
              <div className={estilos.detalle_elemento}>
                <h4>{elemento.label}</h4>
                <p>{elemento.descripcion}</p>
              </div>
            </summary>

            <div className={estilos.contenedor_detalles}>
              <Numeric
                label='Cantidad'
                min={1}
                max={20}
                value={fila?.cantidad ?? 1}
                onChange={(e) => editarElemento(i, 'cantidad', e.target.value)}
                required
              />

              <Condicional condicion={!!elemento.talla}>
                <Text
                  label='Talla'
                  value={fila?.talla ?? ''}
                  required
                  onChange={(e) => editarElemento(i, 'talla', e.target.value)}
                />
              </Condicional>

              <Radio
                id={`motivo-${i}`}
                styleFont={{ alignSelf: 'flex-start', gridColumn: '1/-1' }}
                label='Motivo'
                value={fila?.motivo ?? ''}
                options={MOTIVO}
                onChange={(opt) =>
                  editarElemento(i, 'motivo', opt.target.value)
                }
                required
              />
            </div>

            <div className={estilos.contenedor_observaciones}>
              <TextArea
                style={{ maxWidth: '800px' }}
                label='Observaciones'
                value={fila?.observaciones ?? ''}
                onChange={(e) =>
                  editarElemento(i, 'observaciones', e.target.value)
                }
              />
              <button
                type='button'
                className={estilos.boton_evidencia}
                onClick={() => setCargarEvidenciaDe(i)}
              >
                Cargar evidencia
              </button>
            </div>

            <Condicional condicion={cargarEvidenciaDe === i}>
              <Evidencia
                close={() => setCargarEvidenciaDe(null)}
                titulo='Cargar'
                rutaStorage={`evidencias/epp/${usuario.uid}`}
                extensionesPermitidas={['imagen']}
                archivosGuardados={revisarEvidencia(fila.evidencias)}
                archivosCargados={(evidencias) => {
                  toast.success('Archivos cargados correctamente.');
                  editarElemento(i, 'evidencias', evidencias);
                  setCargarEvidenciaDe(null);
                }}
              />
            </Condicional>
          </details>
        );
      })}
    </fieldset>
  );
};

export default SeleccionarElementos;
