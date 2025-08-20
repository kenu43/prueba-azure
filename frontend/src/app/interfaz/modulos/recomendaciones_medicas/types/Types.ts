export type TrabajadorType = {
  id: string;
  cedula: string;
  nombre: string;
  genero: string;
  fechaNacimiento: string;
  correo?: string;
  sap?: string;
  telefono?: string;
  ciudad?: string;
  region?: string;
  gerencia?: string;
  cargo?: string;
  nombreJefe?: string;
  correoJefe?: string;
};

export type Recomendacion = {
  cedula: string;
  nombre: string;
  recomendacion: string;
  gerencia: string;
  area: string;
  estadoReporte: string;
};
