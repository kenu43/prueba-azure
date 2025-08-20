import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import Numeric from 'app/comunes/controles/Numeric';
import Radio from 'app/comunes/controles/Radio';
import Text from 'app/comunes/controles/Text';
import TextArea from 'app/comunes/controles/TextArea';
import VerEvidenciaCargada from 'app/comunes/evidencias/VerEvidenciaCargada';
import Condicional from 'app/comunes/funcionales/Condicional';

import { MOTIVO } from '../../constantes/ConstGenerales';
import estilos from '../../estilos/ElementosSeleccionados.module.css';
import { EPP } from '../../recursos/Elementos.json';
import {
  editarElemento,
  useEppStore,
  useTrabajadorEppStore,
} from '../../store/StoreEpp';

const ElementosSeleccionados = () => {
  const [verEvidencia, setVerEvidencia] = useState(false);

  const { elementosSeleccionados } = useEppStore();
  const { cargo } = useTrabajadorEppStore(
    useShallow((state) => ({
      cargo: state.historiaOcupacional.cargo,
    }))
  );

  const opcionesListado = EPP.filter((el) => el.cargo.includes(cargo));

  const mapeoElementosSeleccionados =
    elementosSeleccionados?.map((sel) =>
      opcionesListado?.find((item) => item.codigo === sel.elemento)
    ) ?? [];

  return (
    <>
      <fieldset className={estilos.contenedor_seccion}>
        <legend>Elementos</legend>

        {mapeoElementosSeleccionados.map((elemento, i) => {
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
                  value={elementosSeleccionados[i]?.cantidad ?? ''}
                  onChange={(e) =>
                    editarElemento(i, 'cantidad', e.target.value)
                  }
                  required
                />
                <Condicional condicion={elemento?.talla}>
                  <Text
                    label='Talla'
                    value={elementosSeleccionados[i]?.talla ?? ''}
                    required
                    onChange={(e) => editarElemento(i, 'talla', e.target.value)}
                  />
                </Condicional>
                <Radio
                  id={`motivo-${i}`}
                  styleFont={{ alignSelf: 'flex-start', gridColumn: '1/-1' }}
                  label='Motivo'
                  value={elementosSeleccionados[i]?.motivo ?? ''}
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
                  value={elementosSeleccionados[i]?.observaciones ?? ''}
                  onChange={(e) =>
                    editarElemento(i, 'observaciones', e.target.value)
                  }
                />
                <button
                  type='button'
                  className={estilos.boton_evidencia}
                  onClick={() => setVerEvidencia(true)}
                >
                  Ver evidencias
                </button>
              </div>
              <Condicional condicion={verEvidencia}>
                <VerEvidenciaCargada
                  close={() => setVerEvidencia(false)}
                  evidencias={elementosSeleccionados[i]?.evidencias}
                />
              </Condicional>
            </details>
          );
        })}
      </fieldset>
    </>
  );
};

export default ElementosSeleccionados;
