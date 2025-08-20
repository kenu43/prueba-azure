import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { STORE_INICIAL } from '../constantes/ConstGenerales';

const useOrdenesCompraStore = create(
  devtools(() => ({
    ...STORE_INICIAL,
  })),
);
