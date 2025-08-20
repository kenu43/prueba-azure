import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

import type { DataSearchStore } from '../types/SearchTypes';

const useDataSearchStore = create<DataSearchStore>(set => ({
  cedulaNit: '',
  id: '',
  nombreContratista: '',
  objectID: '',
  otroServicio: '',
  servicio: '',
  setItem: itemSelected => set({ ...itemSelected }),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('AlgoliaSearch', useDataSearchStore);
}

export default useDataSearchStore;
