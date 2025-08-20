import type { FILTROS_TRABAJADORES } from '../constantes/ConstGenerales';

export type ClasificacionType = {
  label: string;
  codigo: string;
};

export type TrabajadoresType = {
  cedula: string;
  nombre: string;
  tipoDocumento: string;
  fechaNacimiento: string;
  genero: string;
  correo: string;
  fechaIngresoCargo: string;
  cargo: string;
  tipoCargo: string;
  gerencia: string;
  area: string;
  fechaRetiro: string;
  activo: boolean;
  id?: string;
  idEmpresa?: string;
  empresa: string;
  region: string;
  ciudad: string;
  Idsap: string;
};

export type EditarTrabajadorProps = {
  cerrar: () => void;
  idTrabajador: string;
  actualizarTrabajador: (t: TrabajadoresType) => void;
};

export type MensajeFechasProps = {
  cumple: string;
  noCumple: string;
  condicion: boolean;
};

export type FiltrosTrabajadoresType = typeof FILTROS_TRABAJADORES;
