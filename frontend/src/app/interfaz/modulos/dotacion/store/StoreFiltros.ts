import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import type { FiltrosDotacionType } from '../types/Types';

import { FILTROS_INICIALES } from '../constantes/ConstGenerales';

export const useFiltrosDotacionStore = create<FiltrosDotacionType>()(
  devtools(
    () => ({
      ...FILTROS_INICIALES,
    }),
    { name: 'Filtros dotaciones Store', enabled: DEV_MODE }
  )
);

export const actualizarFiltroDotacion = (
  campo: keyof FiltrosDotacionType,
  valor: string
) =>
  useFiltrosDotacionStore.setState((state) => ({
    ...state,
    [campo]: valor,
  }));

export const aplicarFiltroEpp = () => {
  useFiltrosDotacionStore.setState((state) => ({
    ...state,
    cedulaAplicado: state.cedula,
    nombreAplicado: state.nombre,
    estadoAplicado: state.estado,
  }));
};

export const reiniciarFiltroEpp = () =>
  useFiltrosDotacionStore.setState(() => ({
    ...FILTROS_INICIALES,
  }));
