import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { TrabajadorType } from '../types/Types';

import { TRABAJADOR } from '../constantes/ConstGenerales';

export const useTrabajadoresRecomendacionesStore = create<TrabajadorType>()(
  devtools(() => ({ trabajador: TRABAJADOR }), {
    enabled: import.meta.env.DEV,
    name: 'Trabajadores Store',
  }),
);

export const guardarTrabajador = (trabajador: TrabajadorType) =>
  useTrabajadoresRecomendacionesStore.setState({ ...trabajador });

export const reiniciarTrabajador = () =>
  useTrabajadoresRecomendacionesStore.setState({ ...TRABAJADOR });
