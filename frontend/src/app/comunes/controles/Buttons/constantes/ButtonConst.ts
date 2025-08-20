import { colorsType, iconsType, sizesType } from '../types/ButtonTypes';

export const sizes: sizesType = {
  small: 'var(--space-fluid-2)',
  normal: '0.25em 0.5em',
  large: 'var(--space-fluid-4)',
  big: 'var(--space-fluid-5)',
};

export const colors: colorsType = {
  primary: ['var(--brand-primary)', 'var(--brand-8)'],
  secondary: ['var(--brand-secondary)', '#0dec38'],
  cancel: ['#f5aabb', '#ff88aa'],
  filter: ['var(--gray-2)', 'var(--gray-1)'],
  import: ['#7debf2', '#60a4ff'],
  download: ['#a5e29c', '#0dec38'],
  update: ['#7debf2', '#60a4ff'],
  removeFilter: ['var(--gray-6)', 'var(--gray-6)'],
  pendings: ['#ffe526', '#FCFFAB'],
  massive: ['var(--gray-5)', 'var(--gray-8)'],
  add: ['#f2f4b8', '#FCFFAB'],
  pdf: ['#c01c11', '#b30b00'],
  delete: ['var(--color-add-red-1)', 'var(--color-add-red-4)'],
  email: ['#c01c11', '#b30b00'],
  token: ['#bce3eb', '#90d9e8'],
  table: ['hsl(219, 13%, 75%)', 'hsl(219, 13%, 65%)'],
};

export const icons: iconsType = {
  import: 'import',
  new: 'new',
  filter: 'filter',
  cancel: 'cancel',
  download: 'download',
  update: 'update',
  removeFilter: 'removeFilter',
  pendings: 'pending',
  massive: 'massive',
  add: 'add',
  pdf: 'pdf',
  delete: 'borrar',
  edit: 'editar',
  duplicate: 'duplicar',
  email: 'email',
  table: 'table',
  token: 'token',
};

export const btnPermission: iconsType = {
  import: 'importar',
  new: 'crear',
  edit: 'editar',
  filter: 'leer',
  cancel: 'leer',
  download: 'exportar',
  update: 'leer',
  removeFilter: 'leer',
  pendings: 'pendientes',
  massive: 'masivas',
  add: 'leer',
  pdf: 'exportar',
  delete: 'borrar',
  duplicate: 'duplicar',
  email: 'llamar',
  table: 'leer',
  token: 'crearTokens',
  none: 'leer',
};
