export type TrabajadorOrdenEntrega = {
  cedula: string;
  nombre: string;
  region: string;
  ciudad: string;
  cargo: string;
  correo: string;
};

export type InfoEntregaOrdenEntrega = {
  fechaSolicitud: string;
  fechaEntrega?: string;
  celular: string;
  ciudad: string;
  correo: string;
  direccion: string;
  estado: 'Aprobado' | 'Entregado' | 'Devuelto';
  numeroOrden: string;
  proveedor: string;
  observaciones?: string;
};

export type OrdenEntrega = {
  trabajador: TrabajadorOrdenEntrega;
  infoEntrega: InfoEntregaOrdenEntrega;
};

export type FiltrosOrdenEntrega = {
  trabajador: string;
  estado: 'Aprobado' | 'Entregado' | 'Devuelto' | '';
  fechaDesde: string;
  fechaHasta: string;
};
