import type { DriveStep } from 'driver.js';

export const GENERAL_TRABAJADORES_TOUR: DriveStep[] = [
  {
    disableActiveInteraction: true,
    element: '#crear-trabajador',
    popover: {
      title: 'Crear trabajador',
      description:
        'Permite crear un trabajador por medio del formulario. Nota: para crear un trabajador por favor, seleccione una empresa.',
      side: 'bottom',
    },
  },
  {
    disableActiveInteraction: true,
    element: '#importar-trabajadores',
    popover: {
      title: 'Importar trabajadores',
      description:
        'Permite cargar de forma masiva mediante una plantilla de Excel los trabajadores de la empresa. Nota: para cargar de forma masiva por favor, seleccione una empresa.',
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
    element: '#filtro-trabajadores',
    popover: {
      title: 'Filtrar tabla de administración de trabajadores',
      description:
        'Este botón permite refinar la búsqueda en la tabla de administración de trabajadores utilizando criterios como cédula, nombre, tipo de cargo, fecha de ingreso y estado',
      side: 'left',
    },
  },
  {
    disableActiveInteraction: true,
    element: '#tabla_trabajadores',
    popover: {
      title: 'Tabla administración de trabajadores',
      description:
        'Esta tabla muestra todos los trabajadores creados, actualizados e inhabilitados.',
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
    element: '#editar-trabajador',
    popover: {
      title: 'Editar trabajador',
      description:
        'Con este botón podrá editar la información del trabajador correspondiente.',
      side: 'left',
    },
  },
  {
    disableActiveInteraction: true,
    element: '#reporte-individual',
    popover: {
      title: 'Reporte Individual',
      description:
        'Con este botón podrá generar el reporte individual del trabajador correspondiente.',
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
