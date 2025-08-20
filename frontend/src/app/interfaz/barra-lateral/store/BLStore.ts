
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { IBLState } from '../types/StoreTypes';

import { UsuarioConfigState } from '../constantes/ConstGenerales';

export const useBLStore = create(
  persist<IBLState>(
    set => ({
      ...UsuarioConfigState,
      abrirModulos: (ver): void => { set({ verModulo: ver }); },
      abrirOtrosModulos: (ver): void => { set({ verOtrosModulos: ver }); },
    }),
    {
      name: 'profile',
    },
  ),
);
