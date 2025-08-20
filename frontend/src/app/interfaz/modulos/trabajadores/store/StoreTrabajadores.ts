import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { capitalizarPrimeraLetra } from 'app/interfaz/barra-lateral/secciones/perfil/funciones/FunPerfil';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import type { TrabajadoresType } from '../types/TrabajadoresTypes';

import { TRABAJADORES_INICIAL } from '../constantes/ConstGenerales';
import { calcularMenorEdad } from '../utilidades/Funciones';
import { useTrabajadoresTextoStore } from './StoreMensajes';

export const useTrabajadoresStore = create<TrabajadoresType>()(
  devtools(
    () => ({
      ...TRABAJADORES_INICIAL,
    }),
    { enabled: DEV_MODE, name: 'Trabajadores store' },
  ),
);

export const guardarDatos = (
  campo: keyof typeof TRABAJADORES_INICIAL,
  valor: string | number,
) => useTrabajadoresStore.setState({ [campo]: valor });

export const guardarFechaNac = (fecha: string) => {
  const { fechaIngresoCargo } = useTrabajadoresStore.getState();
  const fechaValida = calcularMenorEdad(fecha, fechaIngresoCargo);

  useTrabajadoresTextoStore.getState().setTocoNacimiento(true);

  return useTrabajadoresStore.setState((state) => {
    return {
      ...state,
      fechaNacimiento: fechaValida ? fecha : '',
      fechaIngresoCargo: fechaValida ? fechaIngresoCargo : '',
    };
  });
};

export const prepararDatosTrabajador = () => {
  const { fechaRetiro, genero, tipoCargo, ...restData }
    = useTrabajadoresStore.getState();

  return {
    ...restData,
    fechaRetiro,
    genero: genero.toLocaleLowerCase(),
    activo: fechaRetiro === '',
    tipoCargo: tipoCargo.toLocaleLowerCase(),
  };
};

export const prepararDatosTrabajadorEditar = (data: TrabajadoresType) => {
  const { idEmpresa, id, genero, tipoCargo, ...restData } = data;

  useTrabajadoresStore.setState({
    ...restData,
    genero: capitalizarPrimeraLetra(genero),
    tipoCargo: capitalizarPrimeraLetra(tipoCargo),
  });
};

export const reiniciarDatosTrabajador = () =>
  useTrabajadoresStore.setState({ ...TRABAJADORES_INICIAL });
