import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { DEV_MODE } from 'configuraciones/VariablesEstaticasGlobales';

import { PLANES } from '../constantes/ConstGenerales';

export const PlanesStore = create(
  devtools(
    () => ({
      ...PLANES,
    }),
    { enabled: DEV_MODE, name: 'Planes store' }
  )
);
