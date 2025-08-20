import { lazy } from 'react';

export const componentes = {
  planes: lazy(() => import('modulos/planes/Planes')),
  trabajadores: lazy(() => import('modulos/trabajadores/Trabajadores')),
  epp: lazy(() => import('modulos/epp/Epp')),
  dotacion: lazy(() => import('app/interfaz/modulos/dotacion/Dotacion')),
  recomendacionesMedicas: lazy(() => import('app/interfaz/modulos/recomendaciones_medicas/RecomendacionesMedicas')),
  cargueMasivoLaboral: lazy(() => import('modulos/cargue_masivo_laboral/CargueMasivoLaboral')),
  cargueMasivoComun: lazy(() => import('modulos/cargue_masivo_comun/CargueMasivoComun')),
  reporteCondicionesSalud: lazy(() => import('modulos/reporte_condiciones_salud/ReporteCondicionesSalud')),
  ordenesEntrega: lazy(() => import('modulos/ordenes_entrega/OrdenesEntrega')),
};
