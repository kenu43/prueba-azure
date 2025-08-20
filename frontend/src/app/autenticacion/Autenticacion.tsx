import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

import Condicional from 'app/comunes/funcionales/Condicional';
import { useAutenticacion } from 'app/hooks/Auth';
import useDimensionPantalla from 'app/hooks/DimensionPantalla';
import ErrorFallback from 'comunes/informativos/ErrorComponent';

import estilos from './estilos/Generales.module.css';
import CargandoSeccion from './secciones/componentes/CargandoSeccion';
import FormLogin from './secciones/fomularios/FormLogin';
import RestaurarConstrasena from './secciones/fomularios/Restaurar';
import InformacionPrincipal from './secciones/informacion/MainInfo';
import useAutenticacionStore from './store/AutenticacionStore';

const Autenticacion = () => {
  useAutenticacion();
  const { seleccionada } = useAutenticacionStore(
    useShallow(({ seleccionada }) => ({ seleccionada })),
  );

  const wide = useDimensionPantalla('(min-width: 770px)');

  return (
    <main className={estilos.conntenedor_ppal}>
      <section className={estilos.contenedor_autenticacion}>
        <Condicional condicion={wide}>
          <InformacionPrincipal />
        </Condicional>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<CargandoSeccion />}>
            <section className={estilos.contenedor_animacion}>
              <div
                className={`${estilos.panel_animado} ${
                  seleccionada === 'restaurar' ? estilos.desplazar : ''
                }`}
              >
                <div className={estilos.panel_login}>
                  <FormLogin />
                </div>
                <div className={estilos.panel_restaurar}>
                  <RestaurarConstrasena />
                </div>
              </div>
            </section>
          </Suspense>
        </ErrorBoundary>
      </section>
      <Toaster theme="system" visibleToasts={5} />
    </main>
  );
};

export default Autenticacion;
