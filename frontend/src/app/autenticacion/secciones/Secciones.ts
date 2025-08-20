import { lazy } from 'react';

export const componentesAutenticacion = {
  login: lazy(() => import('./fomularios/FormLogin')),
  restaurar: lazy(() => import('./fomularios/Restaurar')),
  mfa: lazy(() => import('./fomularios/GoogleAuth')),
};
