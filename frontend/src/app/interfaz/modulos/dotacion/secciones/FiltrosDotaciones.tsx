import { useShallow } from 'zustand/react/shallow';

import { SelectObject } from 'app/comunes/controles/select';
import Text from 'comunes/controles/Text';
import ModalFiltro from 'comunes/funcionales/modalFiltros/ModalFiltro';

import { obtenerValue } from '../../epp/utilidades/Funciones';
import { ESTADO } from '../constantes/ConstGenerales';
import estilos from '../estilos/Generales.module.css';
import {
  actualizarFiltroDotacion,
  useFiltrosDotacionStore,
} from '../store/StoreFiltros';

const FiltrosDotaciones = ({ cerrar }: { cerrar: () => void }) => {
  const { cedula, nombre, estado } = useFiltrosDotacionStore(
    useShallow((state) => ({
      cedula: state.cedula,
      nombre: state.nombre,
      estado: state.estado,
    }))
  );

  return (
    <ModalFiltro
      functions={{
        close() {
          cerrar();
        },
        apply: () => {
          cerrar();
        },
        delete: () => {
          cerrar();
        },
      }}
    >
      <main className={estilos.contenedor_filtro}>
        <div id='filtrar-cedula'>
          <Text
            value={cedula}
            label='Expediente'
            onChange={(e) => actualizarFiltroDotacion('cedula', e.target.value)}
          />
        </div>
        <div id='filtrar-nombre'>
          <Text
            value={nombre}
            label='Nombre'
            onChange={(e) => actualizarFiltroDotacion('nombre', e.target.value)}
          />
        </div>
        <SelectObject
          label='Estado'
          value={obtenerValue(estado, ESTADO)}
          name='estado'
          optionsArray={ESTADO}
          target='nombre'
          onChange={(e) => actualizarFiltroDotacion('estado', e.codigo)}
        />
      </main>
    </ModalFiltro>
  );
};

export default FiltrosDotaciones;
