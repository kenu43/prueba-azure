import type { DriveStep } from 'driver.js';

export const GENERAL_TOUR_EPP: DriveStep[] = [
  {
    disableActiveInteraction: true,
    element: '#boton-solicitar',
    popover: {
      title: 'Solicitar EPP',
      description:
        'Este botón permite a los trabajadores realizar solicitudes de EPP necesarios para sus labores',
      side: 'bottom',
    },
  },
  {
    disableActiveInteraction: true,
    element: '#boton-registrar',
    popover: {
      title: 'Registrar EPP',
      description:
        'Aquí podrás registrar la entrega o el rechazo de elementos de EPP previamente solicitados',
      side: 'bottom',
    },
  },
  {
    disableActiveInteraction: true,
    element: '#boton-registro-dotaciones',
    popover: {
      title: 'Registrar dotaciones',
      description:
        'Utiliza este botón para registrar formalmente la entrega de dotaciones a los trabajadores',
      side: 'bottom',
    },
  },
  {
    disableActiveInteraction: true,
    element: '#refrescar-tabla',
    popover: {
      title: 'Actualizar tabla',
      description:
        'Permite actualizar en tiempo real la información de los trabajadores.',
      side: 'bottom',
    },
  },
  {
    disableActiveInteraction: true,
    element: '#boton-filtro',
    popover: {
      title: 'Filtrar tabla de elementos de proteccion personal',
      description:
        'Este botón permite refinar la búsqueda en la tabla de elementos de proteccion personal utilizando criterios como cédula, nombre, elemento, categoria',
      side: 'left',
    },
  },
  {
    disableActiveInteraction: true,
    element: '#tabla-epp',
    popover: {
      title: 'Tabla administración de trabajadores',
      description:
        'Esta tabla muestra los EPP y Dotaciones entregadas, junto a los datos del trabajador',
      side: 'left',
    },
  },
  {
    disableActiveInteraction: true,
    element: '.grupo-botones-small',
    popover: {
      title: 'Configuración de la tabla',
      description:
        'A través del botón de configuración, puede personalizar el contenido de la tabla, seleccionando las columnas que desea ver y definiendo la cantidad de filas que se muestran por página. Además, puede restaurar la vista original en cualquier momento si desea volver a la configuración predeterminada.',
      side: 'left',
    },
  },
  {
    disableActiveInteraction: true,
    element: '.header-arrow',
    popover: {
      title: 'Ordenar datos de la tabla',
      description:
        'Puede ordenar los datos de la tabla en orden ascendente o descendente según la columna que desee. Para ello, haga clic en el ícono ubicado en el encabezado de la columna correspondiente.',
      side: 'left',
    },
  },
  {
    disableActiveInteraction: true,
    element: '#pag-display',
    popover: {
      title: 'Paginación y total de registros',
      description:
        'En esta sección puede consultar la cantidad total de registros y desplazarse entre las diferentes páginas de la tabla. De clic en la enumeración o el ícono correspondiente para navegar entre páginas.',
      side: 'left',
    },
  },
];
