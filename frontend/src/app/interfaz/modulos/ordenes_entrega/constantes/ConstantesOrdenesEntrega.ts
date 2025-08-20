export const ESTADOS_ORDEN_ENTREGA = [
  'No entregado',
  'Entregado',
  'Devuelto',
  'Aprobado',
] as const;

export type EstadoOrdenEntrega = typeof ESTADOS_ORDEN_ENTREGA[number];

export const ESTADOS_FILTRO_ORDEN_ENTREGA = [
  'Todos los estados',
  ...ESTADOS_ORDEN_ENTREGA,
] as const;
