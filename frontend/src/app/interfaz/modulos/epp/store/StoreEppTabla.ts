import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import type { EppTablaType, RegistroType } from '../types/Types';

import { registro } from '../recursos/ListadoEPPTabla.json';

export const useStoreTabla = create(
  devtools<EppTablaType>(() => ({ registros: [...registro] }), {
    name: 'Epp Tabla Store',
    enabled: DEV_MODE,
  })
);

export const actualizarEstado = (cedula: string, nuevoEstado: string) =>
  useStoreTabla.setState(({ registros }) => ({
    registros: registros.map((registro) =>
      registro.trabajador.cedula === cedula
        ? {
            ...registro,
            infoEntrega: {
              ...registro.infoEntrega,
              estado: nuevoEstado,
            },
          }
        : registro
    ),
  }));

export const agregarRegistro = (nuevo: RegistroType) => {
  useStoreTabla.setState(({ registros }) => ({
    registros: [...registros, nuevo],
  }));
};
