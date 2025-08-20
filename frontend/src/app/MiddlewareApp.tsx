import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import MainSkeleton from 'comunes/informativos/skeletons/MainSkeleton';

import Servidor from '../servidor/Servidor';
import Autenticacion from './autenticacion/Autenticacion';
import ErrorServer from './comunes/informativos/ErrorServer';
import { useUserStore } from './store/PrincipalStore';

const Dashboard = lazy(() => import('./interfaz/dashboard/Dashboard'));

const MiddlewareApp = () => {
  const currentTokenInStore = useUserStore(useShallow(({ token }) => token));

  console.warn(currentTokenInStore);

  if (!currentTokenInStore) {
    return (
      <Router>
        <Autenticacion />
      </Router>
    );
  }

  return (
    <Servidor>
      <Router>
        <ErrorBoundary FallbackComponent={ErrorServer}>
          <Suspense fallback={<MainSkeleton mensaje="Configurando la app..." />}>
            <Dashboard />
          </Suspense>
        </ErrorBoundary>
      </Router>
    </Servidor>
  );
};

export default MiddlewareApp;
