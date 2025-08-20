import { ErrorBoundary } from 'react-error-boundary';
import { useShallow } from 'zustand/react/shallow';

import { TYPE_OF_DEVICE } from 'app/store/constantes/Configuraciones';
import { useUserStore } from 'app/store/PrincipalStore';
import Condicional from 'comunes/funcionales/Condicional';

import { version } from '../../../../package.json';
import ErrorFallback from '../dashboard/secciones/ErrorComponent';
import {
  Rol,
  UpperbarContainer,
  UserCont,
  UserContainer,
  UserName,
  Version,
} from './estilos/EstGenerales';
import Menu from './secciones/Menu';
import Navegacion from './secciones/Navegacion';
import Temporizador from './secciones/Temporizador';

const Barrasuperior = () => {
  const { usuario, external } = useUserStore(
    useShallow(({ usuario, external }) => ({
      usuario,
      external,
    })),
  );
  const isDevice = TYPE_OF_DEVICE.test(navigator.userAgent);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <UpperbarContainer>
        <Condicional condicion={!isDevice}>
          <UserCont>
            <Menu />
            <UserContainer>
              <UserName>{usuario?.claims?.name ?? 'Sin usuario'}</UserName>
              <Rol>{usuario?.claims?.rol ?? 'Sin rol'}</Rol>
            </UserContainer>
          </UserCont>
        </Condicional>

        <Navegacion />

        <Condicional condicion={external}>
          <Temporizador />
        </Condicional>
        <Version>{version}</Version>
      </UpperbarContainer>
    </ErrorBoundary>
  );
};

export default Barrasuperior;
