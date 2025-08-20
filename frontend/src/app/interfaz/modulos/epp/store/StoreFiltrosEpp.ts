import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import type { FiltrosEppType } from '../types/Types';

import { FILTROS_EPP } from '../constantes/ConstGenerales';

export const useFiltrosEppStore = create<FiltrosEppType>()(
  devtools(
    () => ({
      ...FILTROS_EPP,
    }),
    { name: 'Filtros EPP Store', enabled: DEV_MODE },
  ),
);

export const actualizarFiltroEpp = (
  campo: keyof FiltrosEppType,
  valor: string,
) =>
  useFiltrosEppStore.setState(state => ({
    ...state,
    [campo]: valor,
  }));

export const aplicarFiltroEpp = () => {
  useFiltrosEppStore.setState(state => ({
    ...state,
    cedulaAplicado: state.cedula,
    nombreAplicado: state.nombre,
    estadoAplicado: state.estado,
  }));
};

export const reiniciarFiltroEpp = () =>
  useFiltrosEppStore.setState(() => ({
    ...FILTROS_EPP,
  }));
