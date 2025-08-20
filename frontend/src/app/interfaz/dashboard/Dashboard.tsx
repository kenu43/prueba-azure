import { useSuspenseQuery } from '@apollo/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import BarraLateral from 'app/interfaz/barra-lateral/BarraLateral';
import Barrasuperior from 'app/interfaz/barra-superior/Barra-superior';
import ModalToast from 'comunes/funcionales/ModalToast';
import ModuloHuerfano from 'comunes/funcionales/ModuloHuerfano';

import type { configType } from './types/DashboardTypes';

import { ContenedorApp } from './estilos/Estilos';
import { MODULOS_ACCESO } from './peticiones/Queries';
import ErrorFallback from './secciones/ErrorComponent';
import PanelPrincipal from './secciones/Main';
import RutaProtegida from './secciones/RutaProtegida';

const Dashboard = () => {
  const { data } = useSuspenseQuery<configType>(MODULOS_ACCESO);

  return (
    <>
      <Barrasuperior />
      <BarraLateral />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ContenedorApp>
          <Routes>
            <Route
              index
              element={
                <PanelPrincipal modulos={data.getConfiguraciones.modulos} />
              }
            />
            {data.getConfiguraciones.modulos.map(modulo => (
              <Route
                key={modulo.titulo}
                path={modulo.url}
                element={<RutaProtegida modulo={modulo.llaveModulo} />}
              />
            ))}
            <Route path="*" element={<ModuloHuerfano />} />
          </Routes>
        </ContenedorApp>

        <ModalToast>
          <Toaster theme="system" visibleToasts={5} />
        </ModalToast>
      </ErrorBoundary>
    </>
  );
};

export default Dashboard;
