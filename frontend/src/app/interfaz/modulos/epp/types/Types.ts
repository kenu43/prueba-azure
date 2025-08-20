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

export type EvidenciasType = {
  nombre: string;
  url: string;
};

export type ElementosType = {
  cantidad: number;
  elemento: string;
  talla: string;
  motivo: string;
  observaciones: string;
  estado?: string;
  evidencias: EvidenciasType[];
};

export type InfoEntregaType = {
  fechaSolicitud: string;
  direccion: string;
  correo: string;
  ciudad: string;
  celular: string;
  estado: string;
};

export type EPPType = {
  elementosSeleccionados: ElementosType[];
  infoEntrega: InfoEntregaType;
};

export type FiltrosEppType = {
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

export type TrabajadorRegistroType = {
  cedula: string;
  SAP: string;
  cargo: string;
  ciudad: string;
  nombre: string;
  region: string;
};

export type RegistroType = {
  trabajador: TrabajadorRegistroType;
} & EPPType;

export type EppTablaType = {
  registros: RegistroType[];
};

export type AprobarElementosProps = {
  cedulaTrabajador: string;
  cerrar: () => void;
};

export type CorreoParametros = {
  correo: string;
  enlace: string;
};
