import { useState } from 'react';
import algoliasearch from 'algoliasearch';

import { AlgoliaProps, AlgoliaStateProps } from './types/HookAlgolia';

const searchClientProd = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);

const useAlgolia = (opcionesBuscador: AlgoliaProps) => {
  const col = opcionesBuscador?.indexName;
  const [datos, setDatos] = useState<AlgoliaStateProps>({
    loading: false,
    error: false,
    data: [],
  });
  const llavesBuscador = searchClientProd;
  // Algolia configuration
  const index = llavesBuscador.initIndex(col);

  const consulta = async (keyWord: string) => {
    setDatos({ loading: false, error: false, data: [] });
    if (keyWord) {
      try {
        setDatos({ loading: true, error: false, data: [] });
        const data = await index.search(keyWord);
        setDatos({ loading: false, error: false, data });
      } catch (error) {
        setDatos({ loading: false, error: datos.error, data: [] });
      }
    }
  };

  return {
    loading: datos.loading,
    error: datos.error,
    datos: datos.data.hits,
    consulta,
  };
};

export default useAlgolia;
