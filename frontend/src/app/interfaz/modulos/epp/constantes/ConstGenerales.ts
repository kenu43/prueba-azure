import { getLocalDate } from 'utilidades/FuncionesGenerales';

import type { FiltrosEppType } from '../types/Types';

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
    evidencias: [],
  },
];

export const STORE_INICIAL = {
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

export const FILTROS_EPP: FiltrosEppType = {
  cedula: '',
  nombre: '',
  estado: '',
  cedulaAplicado: '',
  nombreAplicado: '',
  estadoAplicado: '',
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

export const APP_URL = import.meta.env.VITE_APP_URL;
