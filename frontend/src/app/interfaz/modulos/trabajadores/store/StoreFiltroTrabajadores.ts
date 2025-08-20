import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import type { FiltrosTrabajadoresType } from '../types/TrabajadoresTypes';

import { FILTROS_TRABAJADORES } from '../constantes/ConstGenerales';

export const useFiltrosTrabStore = create<FiltrosTrabajadoresType>()(
  devtools(
    () => ({
      ...FILTROS_TRABAJADORES,
    }),
    { enabled: DEV_MODE, name: 'Filtros Store' },
  ),
);

export const aplicarFiltroTrabajadores = () => {
  useFiltrosTrabStore.setState(state => ({
    ...state,
    idEmpresa: state.idEmpresa,
    activoAplicado: state.activo,
    cedulaAplicado: state.cedula,
    nombreAplicado: state.nombre,
    fechaIngresoIniAplicado: state.fechaIngresoIni,
    fechaIngresoFinAplicado: state.fechaIngresoFin,
    empresaAplicada: state.empresa
  }));
};

export const reiniciarFiltroTrabajadores = () => {
  useFiltrosTrabStore.setState(state => ({
    ...FILTROS_TRABAJADORES,
    idEmpresa: state.idEmpresa,
  }));
};

export const verGrupoEmpresarial = () => {
  useFiltrosTrabStore.setState({
    ...FILTROS_TRABAJADORES,
  });
};

export const actualizarFiltroTrabajadores = (
  filtroKey: keyof typeof FILTROS_TRABAJADORES,
  filtroValor?: number | string | boolean,
) => {
  useFiltrosTrabStore.setState((state) => {
    if (
      filtroKey === 'cedulaAplicado'
      && typeof filtroValor === 'string'
      && filtroValor.trim() !== ''
    ) {
      return {
        ...state,
        [filtroKey]: filtroValor,
        activo: undefined,
      };
    }

    return {
      ...state,
      [filtroKey]: filtroValor,
    };
  });
};
