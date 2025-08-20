import { nanoid } from 'nanoid';

import { useUserStore } from 'app/store/PrincipalStore';
import { Etiqueta } from 'comunes/estilos/EstComunes';
import usePermisos from 'hooks/Permisos';

import {
  ContInfo,
  ContModPermisos,
  ContPerfil,
  ContPermisos,
  ContPrincipal,
  ContTituloMod,
} from './estilos/EstPerfil';
import CargarFoto from './secciones/CargarFoto';
import Mensajeria from './secciones/Mensajeria';

const PerfilUsuario = () => {
  const { usuario, iam } = useUserStore(state => state);
  const { accesos } = usePermisos();

  const modulosPermisos = Object.keys(accesos).map(modulo => ({
    nombreModulo: modulo,
    permisos: accesos[modulo],
  }));

  const numeroModulos = (modulo: string) => {
    return Object.values(iam.modulos).filter(
      (item: any) => item?.llaveModulo === modulo,
    )?.[0];
  };

  return (
    <ContPrincipal>
      <ContPerfil>
        <CargarFoto usuario={usuario?.claims} />

        <ContModPermisos>
          {modulosPermisos.map(modu => (
            <div key={modu.nombreModulo}>
              <ContTituloMod>
                {numeroModulos(modu.nombreModulo)?.titulo ?? ''}
              </ContTituloMod>
              <ContPermisos>
                {modu.permisos.map((permi: string) => (
                  <ContInfo key={nanoid()}>
                    <Etiqueta>{permi?.toLowerCase() ?? ''}</Etiqueta>
                  </ContInfo>
                ))}
              </ContPermisos>
            </div>

          ))}
        </ContModPermisos>
        <Mensajeria />
      </ContPerfil>
    </ContPrincipal>
  );
};
export default PerfilUsuario;
