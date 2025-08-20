import type { DriveStep } from 'driver.js';

export const TOUR_ORDENES_ENTREGA: DriveStep[] = [
  {
    element: '#ordenes-entrega-modulo',
    popover: {
      title: '📦 Órdenes de Entrega',
      description: 'Bienvenido al módulo de órdenes de entrega. Aquí puedes consultar todas las órdenes realizadas por los trabajadores.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '#actualizar-ordenes',
    popover: {
      title: '🔄 Actualizar Datos',
      description: 'Utiliza este botón para refrescar la información de las órdenes de entrega y obtener los datos más recientes.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '#filtro-ordenes',
    popover: {
      title: '🔍 Filtros Avanzados',
      description: 'Haz clic aquí para abrir el panel de filtros. Puedes filtrar por trabajador, estado de entrega y rango de fechas.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '#tabla_ordenes_entrega',
    popover: {
      title: '📋 Tabla de Órdenes',
      description: 'Esta tabla muestra todas las órdenes de entrega. Incluye información del trabajador, fecha de solicitud, estado y número de orden.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '#ver-orden-entrega',
    popover: {
      title: 'Ver Detalles',
      description: 'Haz clic en este icono para ver todos los detalles de una orden específica, incluyendo información del trabajador y de la entrega.',
      side: 'left',
      align: 'center',
    },
  },
  {
    element: '.titulo_modulos',
    popover: {
      title: '✅ ¡Tour Completado!',
      description: 'Ya conoces las principales funcionalidades del módulo de órdenes de entrega. ¡Comienza a visualizar las órdenes de los trabajadores!',
      side: 'bottom',
      align: 'start',
    },
  },
];
