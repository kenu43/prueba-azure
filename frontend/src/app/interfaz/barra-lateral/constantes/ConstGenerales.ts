import type { IConfiguraciones } from '../types/StoreTypes';

export const UsuarioConfigState = {
  configuraciones: {},
  temas: {},
  verModulo: true,
  verOtrosModulos: false,
};

export const configuraciones: IConfiguraciones = {
  notificaciones: {
    icono: 'notifications',
    nombre: 'Notificaciones',
    url: '/notificaciones',
    desplegar: true,
  },
  perfil: {
    icono: 'user_settings',
    nombre: 'Perfil de usuario',
    url: '/perfil-usuario',
    desplegar: false,
  },
  instructivos: {
    icono: 'instructions',
    nombre: 'Instructivos',
    url: '/instructivos',
    desplegar: false,
  },
  soporte: {
    icono: 'support',
    nombre: 'Chat de soporte',
    url: '/soporte-chat',
    desplegar: false,
  },
};

export const otrasConfiguraciones: IConfiguraciones = {
  configuraciones: {
    icono: 'config',
    nombre: 'Configuraciones',
    url: '/configuraciones',
    mostrarUrl: true,
    desplegar: false,
  },
  temas: {
    icono: 'appearence',
    nombre: 'Temas app',
    url: '/temas-app',
    mostrarUrl: true,
    desplegar: false,
  },
  actualizaciones: {
    icono: 'updates',
    nombre: 'Actualizaciones',
    url: '/actualizaciones',
    mostrarUrl: true,
    desplegar: false,
  },
  ai: {
    icono: 'ai',
    nombre: 'Asistente AI',
    url: '/asistente-ai',
    mostrarUrl: true,
    desplegar: false,
  },
  almacenamiento: {
    icono: 'storage',
    nombre: 'Almacenamiento',
    url: '/almacenamiento',
    mostrarUrl: true,
    desplegar: false,
  },
  conexiones: {
    icono: 'plugins',
    nombre: 'Conexiones',
    url: '/conexiones',
    mostrarUrl: true,
    desplegar: false,
  },
  legales: {
    icono: 'politics',
    nombre: 'Avisos legales',
    url: '/avisos-legales',
    mostrarUrl: true,
    desplegar: false,
  },
  seguridad: {
    icono: 'security',
    nombre: 'Seguridad',
    url: '/seguridad',
    mostrarUrl: true,
    desplegar: false,
  },
  sesion: {
    icono: 'logout',
    nombre: 'Salir de sesión',
    url: '/',
    mostrarUrl: true,
    desplegar: true,
  },
};

export const MapeoNombreIconoModulo = {
  trabajadores: { icono: 'trabajadorregistro', alias: 'Registro' },
  epp: { icono: 'proteccionEPP', alias: 'EPP' },
  dotacion: { icono: 'dotaciones', alias: 'Dotación' },
  recomendacionesMedicas: { icono: 'condicionesSalud', alias: 'Reporte de condiciones de salud' },
  cargueMasivoLaboral: { icono: 'informacion', alias: 'Cargue masivo laboral' },
  cargueMasivoComun: { icono: 'informacion', alias: 'Cargue masivo común' },
  reporteCondicionesSalud: { icono: 'informeCondicionesSalud', alias: 'Informe de condiciones de salud' },
  ordenesEntrega: { icono: 'ordenEntrega', alias: 'Órdenes de entrega' },
} as const;
