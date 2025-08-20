import { useApolloClient } from '@apollo/client';
import { useShallow } from 'zustand/react/shallow';

import { MODULOS_ACCESO } from 'app/interfaz/dashboard/peticiones/Queries';
import { useUserStore } from 'app/store/PrincipalStore';

import type {
  IArbolPermiso,
  IObjetoPermiso,
  TModKey,
} from './types/PermisosTypes';

const asignarPermisosAdmin = (iam: IIAM) => {
  const modulos = Object.keys(iam.modulos);
  const paquetes = import.meta.env.VITE_PRIVILEGIOS.split(':');
  const aplicacionAdmin = paquetes[1];
  const infraAdmin = paquetes[2];

  const permisosAdmin = modulos.map((indexModulo) => {
    if (paquetes.length === 3) {
      return `${indexModulo}:${aplicacionAdmin}:${infraAdmin}`;
    }
    else {
      return `${indexModulo}:${aplicacionAdmin}`;
    }
  });

  return permisosAdmin.join('/');
};

const obtenerArbolPermisos: IArbolPermiso = (usuario, iam) => {
  let permisos = '';
  const esAdmin = usuario?.claims.firma;

  if (esAdmin && esAdmin === import.meta.env.VITE_FIRMA) {
    permisos = asignarPermisosAdmin(iam);
  }
  else {
    permisos = usuario?.claims.permisos ?? '';
  }

  const arbol = permisos?.split('/');

  const arbolPermisos = arbol.map((paquetePermisos: string): IObjetoPermiso => {
    const permisoResultado = paquetePermisos.split(':');
    const totalAplicacion = permisoResultado[1]?.length ?? 0;
    const totalInfraestructura = permisoResultado[2]?.length ?? 0;
    const accesos = [];
    const indexMod: TModKey = Number(permisoResultado[0]);

    // Arbol correspondiente a los módulos
    const moduloPermiso = iam.modulos[indexMod].llaveModulo;

    // Arbol correspondiente a los accessos
    for (let i = 0; i < totalAplicacion; i += 1) {
      const acceso = Number(permisoResultado[1].charAt(i));
      accesos.push(iam.acciones.aplicacion[acceso]);
    }

    // Arbol correspondiente a la infraestructura
    for (let i = 0; i < totalInfraestructura; i += 1) {
      const infra = Number(permisoResultado[2].charAt(i));
      accesos.push(iam.acciones.infraestructura[infra]);
    }

    return { [moduloPermiso]: accesos };
  });

  return arbolPermisos;
};

const usePermisos = () => {
  const { usuario } = useUserStore(useShallow(({ usuario }) => ({ usuario })));
  const client = useApolloClient();

  const { getConfiguraciones } = client.readQuery({ query: MODULOS_ACCESO });
  const permisos = obtenerArbolPermisos(usuario, getConfiguraciones);
  const acceso = permisos.reduce(
    (permAcc, permiso) => Object.assign(permAcc, permiso),
    {},
  );

  return {
    accesoModulos: Object.keys(acceso),
    accesos: acceso,
  };
};

export default usePermisos;
