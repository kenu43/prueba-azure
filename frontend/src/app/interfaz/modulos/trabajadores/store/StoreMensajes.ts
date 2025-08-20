import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

type UITrabajadoresState = {
  tocoNacimiento: boolean;
  tocoIngreso: boolean;
  setTocoNacimiento: (valor: boolean) => void;
  setTocoIngreso: (valor: boolean) => void;
  reiniciarTocoNacimiento: () => void;
  reiniciarTocoIngreso: () => void;
};

export const useTrabajadoresTextoStore = create<UITrabajadoresState>()(
  devtools(
    set => ({
      tocoNacimiento: false,
      tocoIngreso: false,
      setTocoNacimiento: () => set({ tocoNacimiento: true }),
      setTocoIngreso: () => set({ tocoIngreso: true }),
      reiniciarTocoNacimiento: () => set({ tocoNacimiento: false }),
      reiniciarTocoIngreso: () => set({ tocoIngreso: false }),
    }),
    { enabled: DEV_MODE, name: 'TrabajadoresTextoStore' },
  ),
);
