import { getLocalDate } from 'utilidades/FuncionesGenerales';

import type { FiltrosDotacionType } from '../types/Types';

export const TRABAJADOR = {
  id: '',
  cedula: '',
  nombre: '',
  genero: '',
  fechaNacimiento: '',
  historiaOcupacional: {
    fechaIngresoCargo: '',
    cargo: '',
    area: '',
    horarioLaboral: '',
    rotacionesLaborales: '',
    tipoCargo: '',
  },
};

export const ELEMENTOS = [
  {
    cantidad: 1,
    elemento: '',
    talla: '',
    motivo: '',
    observaciones: '',
  },
];

export const STORE_INICIAL = {
  elementosSeleccionados: [],
};

export const FILTROS_INICIALES: FiltrosDotacionType = {
  cedula: '',
  nombre: '',
  estado: '',
  cedulaAplicado: '',
  nombreAplicado: '',
  estadoAplicado: '',
};

export const DOTACION_INICIAL = {
  elementosSeleccionados: ELEMENTOS,
  infoEntrega: {
    fechaSolicitud: getLocalDate().fecha,
    direccion: '',
    correo: '',
    ciudad: '',
    celular: '',
    estado: 'sin_revision',
  },
};

export const ESTADO = [
  {
    nombre: 'Sin revisión',
    codigo: 'sin_revision',
  },
  {
    nombre: 'Aprobado',
    codigo: 'aprobado',
  },
  {
    nombre: 'Rechazado',
    codigo: 'rechazado',
  },
  {
    nombre: 'Entregado',
    codigo: 'entregado',
  },
];

export const MOTIVO = [
  'Colaborador nuevo',
  'Reposición',
  'Deterioro',
  'Pérdida',
];
