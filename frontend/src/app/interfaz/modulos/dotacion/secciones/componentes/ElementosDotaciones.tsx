import { useEffect, useMemo } from 'react';

import Numeric from 'app/comunes/controles/Numeric';
import Radio from 'app/comunes/controles/Radio';
import Text from 'app/comunes/controles/Text';
import TextArea from 'app/comunes/controles/TextArea';
import Condicional from 'app/comunes/funcionales/Condicional';

import { ELEMENTOS, MOTIVO } from '../../constantes/ConstGenerales';
import estilos from '../../estilos/ElementosSeleccionados.module.css';
import dotaciones from '../../recursos/ListadoDotaciones.json';
import { editarElemento, useDotacion } from '../../store/StoreDotacion';

const ElementosDotaciones = () => {
  const { elementosSeleccionados } = useDotacion();
  const cargo = 'Zone Owner I';

  const opcionesListado = useMemo(
    () => dotaciones.filter((el) => el.cargo?.includes(cargo)),
    [cargo]
  );

  useEffect(() => {
    const actuales = useDotacion.getState().elementosSeleccionados;
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
      useDotacion.setState({ elementosSeleccionados: normalizados });
    }
  }, [opcionesListado]);

  return (
    <>
      <fieldset className={estilos.contenedor_seccion}>
        <legend>Elementos</legend>

        <Condicional condicion={opcionesListado.length === 0}>
          <p className={estilos.sin_elementos}>No hay elementos</p>
        </Condicional>

        {opcionesListado.map((elemento, i) => {
          const fila = elementosSeleccionados[i];
          return (
            <details
              open
              key={elemento?.codigo ?? i}
              className={`${estilos.details} ${estilos.fade_in}`}
            >
              <summary className={estilos.summary}>
                <img
                  src={elemento?.imagen}
                  alt={`Imagen de ${elemento?.label}`}
                />
                <div className={estilos.detalle_elemento}>
                  <h4>{elemento?.label ?? ''}</h4>
                  <p>{elemento?.descripcion ?? ''}</p>
                </div>
              </summary>
              <div className={estilos.contenedor_detalles}>
                <Numeric
                  label='Cantidad'
                  min={1}
                  max={20}
                  value={fila?.cantidad ?? ''}
                  onChange={(e) =>
                    editarElemento(i, 'cantidad', e.target.value)
                  }
                  required
                />
                <Condicional condicion={elemento?.talla}>
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
              </div>
            </details>
          );
        })}
      </fieldset>
    </>
  );
};

export default ElementosDotaciones;
