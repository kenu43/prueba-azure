import { Suspense } from 'react';

import Denegado from 'comunes/informativos/Denegado';
import ModuloSkeleton from 'comunes/informativos/skeletons/ModuloSkeleton';
import usePermisos from 'hooks/Permisos';

import type { ProtectedProps } from '../types/DashboardTypes';

import { componentes } from './ModulosLazy';

const RutaProtegida = ({ modulo }: ProtectedProps) => {
  const { accesoModulos } = usePermisos();
  const tienePermiso = accesoModulos.includes(modulo);
  const Componente = componentes[modulo];

  if (!tienePermiso)
    return <Denegado />;

  return (
    <Suspense fallback={<ModuloSkeleton />}>
      <Componente />
    </Suspense>
  );
};

export default RutaProtegida;
