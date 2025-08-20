export type ArchivoImportado = {
  id: string;
  nombre: string;
  tamannio: number;
  progreso: number;
  estado: string;
  tipo: string;
  blob: File;
  tiempoRestante?: string;
  url?: string;
};

export type CargueProps = {
  titulo: string;
  close: () => void;
  rutaStorage: string;
  archivosCargados: (resultado: { nombre: string; url: string }[]) => void;
  archivosGuardados?: Partial<ArchivoImportado>[];
};

export type TrabajadorExcel = {
  cedula?: string;
  nombre?: string;
  fechaNacimiento?: string;
  genero?: string;
  estadoCivil?: string;
  numeroHijos?: string | number;
  nivelEducativo?: string;
  profesion?: string;
  correoElectronico?: string;
  fechaIngreso?: string;
  cargo?: string;
  tipoCargo?: string;
  sede?: string;
  area?: string;
  fechaRetiro?: string;
  tipoContrato?: string;
  tipoDocumento?: string;
  fechadeRetiro?: string;
};

export type TrabajadorCampos = {
  [clave: string]: string | number | null | undefined;
};

export type TrabajadorNormalizado = {
  cedula?: string;
  fechaIngreso?: string;
  fechaNacimiento?: string;
  [clave: string]: string | undefined;
};
