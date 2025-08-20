export type TrabajadorType = {
  id: string;
  cedula: string;
  nombre: string;
  genero: string;
  fechaNacimiento: string;
  sap?: string;
  ciudad?: string;
  region?: string;
  historiaOcupacional: {
    fechaIngresoCargo: string;
    cargo: string;
    area: string;
    horarioLaboral: string;
    rotacionesLaborales: string;
    tipoCargo: string;
  };
};

export type ElementosType = {
  cantidad: number;
  elemento: string;
  talla: string;
  motivo: string;
  observaciones: string;
};

export type InfoEntregaType = {
  fechaSolicitud: string;
  direccion: string;
  correo: string;
  ciudad: string;
  celular: string;
  estado: string;
};

export type DotacionType = {
  elementosSeleccionados: ElementosType[];
  infoEntrega: InfoEntregaType;
};

export type FiltrosDotacionType = {
  cedula: string;
  nombre: string;
  estado: string;
  cedulaAplicado: string;
  nombreAplicado: string;
  estadoAplicado: string;
};

export type ClasificacionType = {
  nombre: string;
  codigo: string;
};

export type RegistroType = {
  cedula: string;
  nombre: string;
  fecha_solicitud: string;
  estado: string;
};
export type EppTablaType = {
  registros: RegistroType[];
};

export type AprobarElementosProps = {
  cerrar: () => void;
};
