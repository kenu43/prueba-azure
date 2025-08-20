import { useApolloClient } from '@apollo/client';

import { MODULOS_ACCESO } from 'app/interfaz/dashboard/peticiones/Queries';
import { guardarToken } from 'app/store/PrincipalStore';

import type { ListasType } from './types/HookTypes';

const useListados = () => {
  const client = useApolloClient();
  const { getConfiguraciones } = client.readQuery({
    query: MODULOS_ACCESO,
  });

  guardarToken(getConfiguraciones.accessToken);

  return {
    listas: JSON.parse(getConfiguraciones?.listas) as ListasType<string>,
  };
};

export default useListados;
