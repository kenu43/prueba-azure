import { useShallow } from 'zustand/react/shallow';

import { SelectObject, SelectString } from 'app/comunes/controles/select';
import Text from 'app/comunes/controles/Text';
import ModalFiltro from 'app/comunes/funcionales/modalFiltros/ModalFiltro';

import { ESTADO } from '../constantes/ConstGenerales';
import estilos from '../estilos/FiltroEPP.module.css';
import {
  actualizarFiltroEpp,
  aplicarFiltroEpp,
  reiniciarFiltroEpp,
  useFiltrosEppStore,
} from '../store/StoreFiltrosEpp';
import { obtenerValue } from '../utilidades/Funciones';

const FiltrosEpp = ({ cerrar }: { cerrar: () => void }) => {
  const { cedula, nombre, estado } = useFiltrosEppStore(
    useShallow((state) => ({
      cedula: state.cedula,
      nombre: state.nombre,
      estado: state.estado,
    }))
  );

  return (
    <ModalFiltro
      functions={{
        close: cerrar,
        apply: () => {
          aplicarFiltroEpp();
          cerrar();
        },
        delete: () => {
          reiniciarFiltroEpp();
          cerrar();
        },
      }}
    >
      <main className={estilos.contenedor_filtro}>
        <Text
          label='Cédula'
          value={cedula}
          onChange={(e) => actualizarFiltroEpp('cedula', e.target.value)}
        />

        <Text
          label='Nombre'
          value={nombre}
          onChange={(e) => actualizarFiltroEpp('nombre', e.target.value)}
        />

        <SelectString
          onChange={() => {}}
          optionsArray={[]}
          label='Región'
          name='region'
        />

        <SelectString
          onChange={() => {}}
          optionsArray={[]}
          label='Ciudad'
          name='ciudad'
        />

        <SelectObject
          label='Estado'
          value={obtenerValue(estado, ESTADO)}
          name='estado'
          optionsArray={ESTADO}
          target='nombre'
          onChange={(e) => actualizarFiltroEpp('estado', e.codigo)}
        />
      </main>
    </ModalFiltro>
  );
};

export default FiltrosEpp;
